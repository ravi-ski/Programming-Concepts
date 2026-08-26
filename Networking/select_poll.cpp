/* @SECTION: Networking */
/* @CHAPTER: SELECT, POLL, ASYNC IO AND SYNCHRONIZATION */
/*
 * Each block below is a small, independent, self-contained example.
 * Compile individually on Linux: g++ file.cpp -o out -lpthread
 */

/*
 * @PROGRAM: I/O multiplexing with select() on a TCP server
 * @INPUT: multiple clients connecting to port 8080
 * @OUTPUT: Client connected: <fd>, echoes back whatever each client sends
 */
#include <iostream>
#include <cstring>
#include <unistd.h>
#include <arpa/inet.h>
#include <sys/select.h>
using namespace std;

int main()
{
    int serverSocket = socket(AF_INET, SOCK_STREAM, 0);

    sockaddr_in address{};
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(8080);

    int option = 1;
    setsockopt(serverSocket, SOL_SOCKET, SO_REUSEADDR, &option, sizeof(option));
    bind(serverSocket, reinterpret_cast<sockaddr *>(&address), sizeof(address));
    listen(serverSocket, 5);

    fd_set masterSet;
    FD_ZERO(&masterSet);
    FD_SET(serverSocket, &masterSet);
    int maxSocket = serverSocket;

    cout << "select() server running on port 8080\n";

    while (true)
    {
        fd_set readySet = masterSet;
        int readyCount = select(maxSocket + 1, &readySet, nullptr, nullptr, nullptr);

        if (readyCount < 0)
        {
            perror("select");
            break;
        }

        for (int socketFd = 0; socketFd <= maxSocket; ++socketFd)
        {
            if (!FD_ISSET(socketFd, &readySet))
                continue;

            if (socketFd == serverSocket)
            {
                int clientSocket = accept(serverSocket, nullptr, nullptr);
                FD_SET(clientSocket, &masterSet);
                maxSocket = max(maxSocket, clientSocket);
                cout << "Client connected: " << clientSocket << '\n';
            }
            else
            {
                char buffer[1024];
                int bytes = recv(socketFd, buffer, sizeof(buffer), 0);

                if (bytes <= 0)
                {
                    cout << "Client disconnected: " << socketFd << '\n';
                    close(socketFd);
                    FD_CLR(socketFd, &masterSet);
                }
                else
                {
                    send(socketFd, buffer, bytes, 0);
                }
            }
        }
    }

    close(serverSocket);
    return 0;
}
/* @END */

/*
 * @PROGRAM: I/O multiplexing with poll() on a TCP server
 * @INPUT: multiple clients connecting to port 8081
 * @OUTPUT: Client connected: <fd>, echoes back whatever each client sends
 */
#include <iostream>
#include <vector>
#include <cstring>
#include <unistd.h>
#include <arpa/inet.h>
#include <poll.h>
using namespace std;

int main()
{
    int serverSocket = socket(AF_INET, SOCK_STREAM, 0);

    sockaddr_in address{};
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(8081);

    int option = 1;
    setsockopt(serverSocket, SOL_SOCKET, SO_REUSEADDR, &option, sizeof(option));
    bind(serverSocket, reinterpret_cast<sockaddr *>(&address), sizeof(address));
    listen(serverSocket, 5);

    vector<pollfd> fds;
    fds.push_back({serverSocket, POLLIN, 0}); /* poll() avoids select()'s FD_SETSIZE limit */

    cout << "poll() server running on port 8081\n";

    while (true)
    {
        int readyCount = poll(fds.data(), fds.size(), -1);
        if (readyCount < 0)
        {
            perror("poll");
            break;
        }

        for (size_t i = 0; i < fds.size(); i++)
        {
            if (!(fds[i].revents & POLLIN))
                continue;

            if (fds[i].fd == serverSocket)
            {
                int clientSocket = accept(serverSocket, nullptr, nullptr);
                fds.push_back({clientSocket, POLLIN, 0});
                cout << "Client connected: " << clientSocket << '\n';
            }
            else
            {
                char buffer[1024];
                int bytes = recv(fds[i].fd, buffer, sizeof(buffer), 0);

                if (bytes <= 0)
                {
                    cout << "Client disconnected: " << fds[i].fd << '\n';
                    close(fds[i].fd);
                    fds.erase(fds.begin() + i);
                    i--;
                }
                else
                {
                    send(fds[i].fd, buffer, bytes, 0);
                }
            }
        }
    }

    close(serverSocket);
    return 0;
}
/* @END */

/*
 * @PROGRAM: Asynchronous (non-blocking) socket I/O using O_NONBLOCK
 * @INPUT: a client socket configured for non-blocking connect/recv
 * @OUTPUT: recv() returns immediately with EWOULDBLOCK instead of blocking
 */
#include <iostream>
#include <cstring>
#include <cerrno>
#include <fcntl.h>
#include <unistd.h>
#include <arpa/inet.h>
using namespace std;

int main()
{
    int sock = socket(AF_INET, SOCK_STREAM, 0);

    int flags = fcntl(sock, F_GETFL, 0);
    fcntl(sock, F_SETFL, flags | O_NONBLOCK); /* makes connect()/recv()/send() non-blocking */

    char buffer[1024];
    int bytes = recv(sock, buffer, sizeof(buffer), 0);

    if (bytes == -1 && (errno == EWOULDBLOCK || errno == EAGAIN))
        cout << "recv() returned immediately with EWOULDBLOCK instead of blocking" << endl;

    close(sock);
    return 0;
}
/* @END */

/*
 * @PROGRAM: Mutex protecting a shared active-connection counter across client threads
 * @INPUT: 3 simulated client-handler threads incrementing/decrementing a counter
 * @OUTPUT: Final active connection count: 0 (correctly balanced, no race condition)
 */
#include <iostream>
#include <thread>
#include <mutex>
#include <vector>
using namespace std;

int activeConnections = 0;
mutex connectionMutex;

void handleClient()
{
    {
        lock_guard<mutex> lock(connectionMutex);
        activeConnections++;
    }
    /* ... simulate handling client I/O here ... */
    {
        lock_guard<mutex> lock(connectionMutex);
        activeConnections--;
    }
}

int main()
{
    vector<thread> clientHandlers;
    for (int i = 0; i < 3; i++)
        clientHandlers.emplace_back(handleClient);

    for (auto &t : clientHandlers)
        t.join();

    cout << "Final active connection count: " << activeConnections << " (correctly balanced, no race condition)" << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Condition variable notifying a worker thread when a new connection arrives
 * @INPUT: main thread simulates an incoming connection and notifies the worker
 * @OUTPUT: Worker woke up and processed the new connection
 */
#include <iostream>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <queue>
using namespace std;

queue<int> connectionQueue;
mutex queueMutex;
condition_variable queueCondition;

void connectionWorker()
{
    unique_lock<mutex> lock(queueMutex);
    queueCondition.wait(lock, []
                        { return !connectionQueue.empty(); });

    int clientSocket = connectionQueue.front();
    connectionQueue.pop();
    cout << "Worker woke up and processed the new connection: " << clientSocket << endl;
}

int main()
{
    thread worker(connectionWorker);

    {
        lock_guard<mutex> lock(queueMutex);
        connectionQueue.push(42); /* simulated new client socket fd */
    }
    queueCondition.notify_one();

    worker.join();
    return 0;
}
/* @END */
