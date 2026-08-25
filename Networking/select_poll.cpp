#include <iostream>
#include <cstring>
#include <unistd.h>
#include <arpa/inet.h>
#include <sys/select.h>
using namespace std;

int main() {
    int serverSocket = socket(AF_INET, SOCK_STREAM, 0);

    sockaddr_in address{};
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(8080);

    int option = 1;
    setsockopt(serverSocket, SOL_SOCKET, SO_REUSEADDR,
               &option, sizeof(option));

    bind(serverSocket,
         reinterpret_cast<sockaddr*>(&address),
         sizeof(address));

    listen(serverSocket, 5);

    fd_set masterSet;
    FD_ZERO(&masterSet);
    FD_SET(serverSocket, &masterSet);

    int maxSocket = serverSocket;

    cout << "select() server running on port 8080\n";

    while (true) {
        fd_set readySet = masterSet;

        int readyCount =
            select(maxSocket + 1, &readySet, nullptr, nullptr, nullptr);

        if (readyCount < 0) {
            perror("select");
            break;
        }

        for (int socketFd = 0; socketFd <= maxSocket; ++socketFd) {
            if (!FD_ISSET(socketFd, &readySet))
                continue;

            if (socketFd == serverSocket) {
                int clientSocket = accept(serverSocket, nullptr, nullptr);

                FD_SET(clientSocket, &masterSet);
                maxSocket = max(maxSocket, clientSocket);

                cout << "Client connected: " << clientSocket << '\n';
            }
            else {
                char buffer[1024];

                int bytes = recv(socketFd, buffer, sizeof(buffer), 0);

                if (bytes <= 0) {
                    cout << "Client disconnected: " << socketFd << '\n';

                    close(socketFd);
                    FD_CLR(socketFd, &masterSet);
                }
                else {
                    send(socketFd, buffer, bytes, 0);
                }
            }
        }
    }

    close(serverSocket);
}