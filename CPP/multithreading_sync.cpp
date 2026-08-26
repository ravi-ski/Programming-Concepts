/* @SECTION: C++ Programming */
/* @CHAPTER: MULTITHREADING AND SYNCHRONIZATION */
/*
 * Each block below is a small, independent, self-contained example.
 * Compile individually: g++ file.cpp -o out -lpthread -std=c++17
 */

/*
 * @PROGRAM: std::thread basics
 * @INPUT: (none)
 * @OUTPUT: Hello from a std::thread!
 */
#include <iostream>
#include <thread>
using namespace std;

void run()
{
    cout << "Hello from a std::thread!" << endl;
}

int main()
{
    thread t(run);
    t.join();
    return 0;
}
/* @END */

/*
 * @PROGRAM: Passing arguments to a thread
 * @INPUT: 42
 * @OUTPUT: Thread received: 42
 */
#include <iostream>
#include <thread>
using namespace std;

void run(int value)
{
    cout << "Thread received: " << value << endl;
}

int main()
{
    thread t(run, 42);
    t.join();
    return 0;
}
/* @END */

/*
 * @PROGRAM: Joining a thread
 * @INPUT: (none)
 * @OUTPUT: Main waits until the thread finishes
 */
#include <iostream>
#include <thread>
using namespace std;

int main()
{
    thread t([]
             { cout << "Worker thread running" << endl; });

    t.join(); /* blocks until the thread completes */
    cout << "Main waits until the thread finishes" << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Detaching a thread
 * @INPUT: (none)
 * @OUTPUT: Detached thread runs independently in the background
 */
#include <iostream>
#include <thread>
#include <chrono>
using namespace std;

int main()
{
    thread t([]
             { cout << "Detached thread runs independently in the background" << endl; });

    t.detach();
    this_thread::sleep_for(chrono::milliseconds(100)); /* let it finish for this demo */
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::mutex basics (lock/unlock)
 * @INPUT: (none)
 * @OUTPUT: Critical section entered and exited safely
 */
#include <iostream>
#include <mutex>
using namespace std;

int main()
{
    mutex m;

    m.lock();
    cout << "Critical section entered and exited safely" << endl;
    m.unlock();
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::lock_guard (RAII-style locking)
 * @INPUT: 2 threads incrementing a shared counter
 * @OUTPUT: Final counter value: 200000
 */
#include <iostream>
#include <thread>
#include <mutex>
using namespace std;

int counter = 0;
mutex m;

void increment()
{
    for (int i = 0; i < 100000; i++)
    {
        lock_guard<mutex> lock(m); /* automatically unlocks when it goes out of scope */
        counter++;
    }
}

int main()
{
    thread t1(increment), t2(increment);
    t1.join();
    t2.join();

    cout << "Final counter value: " << counter << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::unique_lock (more flexible than lock_guard)
 * @INPUT: (none)
 * @OUTPUT: Locked, temporarily unlocked, then relocked
 */
#include <iostream>
#include <mutex>
using namespace std;

int main()
{
    mutex m;
    unique_lock<mutex> lock(m);

    cout << "Locked, temporarily unlocked, then relocked" << endl;
    lock.unlock(); /* unique_lock allows manual unlock/relock, unlike lock_guard */
    lock.lock();
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::recursive_mutex
 * @INPUT: same thread locks the mutex twice (nested calls)
 * @OUTPUT: Outer lock acquired, Inner lock acquired (no deadlock)
 */
#include <iostream>
#include <mutex>
using namespace std;

recursive_mutex rm;

void inner()
{
    lock_guard<recursive_mutex> lock(rm);
    cout << "Inner lock acquired (no deadlock)" << endl;
}

void outer()
{
    lock_guard<recursive_mutex> lock(rm);
    cout << "Outer lock acquired" << endl;
    inner();
}

int main()
{
    outer();
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::timed_mutex with try_lock_for
 * @INPUT: wait at most 100ms for a locked mutex
 * @OUTPUT: Could not acquire the lock within the timeout
 */
#include <iostream>
#include <mutex>
#include <chrono>
using namespace std;

int main()
{
    timed_mutex tm;
    tm.lock(); /* held already, simulating contention */

    if (!tm.try_lock_for(chrono::milliseconds(100)))
        cout << "Could not acquire the lock within the timeout" << endl;

    tm.unlock();
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::condition_variable basics
 * @INPUT: worker waits until notified
 * @OUTPUT: Worker was notified and resumed
 */
#include <iostream>
#include <thread>
#include <mutex>
#include <condition_variable>
using namespace std;

mutex m;
condition_variable cv;
bool ready = false;

void worker()
{
    unique_lock<mutex> lock(m);
    cv.wait(lock, []
            { return ready; });
    cout << "Worker was notified and resumed" << endl;
}

int main()
{
    thread t(worker);

    {
        lock_guard<mutex> lock(m);
        ready = true;
    }
    cv.notify_one();

    t.join();
    return 0;
}
/* @END */

/*
 * @PROGRAM: Producer-consumer using a condition_variable
 * @INPUT: producer adds 5 items, consumer waits for each
 * @OUTPUT: Consumed: 0, Consumed: 1, ... Consumed: 4
 */
#include <iostream>
#include <thread>
#include <queue>
#include <mutex>
#include <condition_variable>
using namespace std;

queue<int> buffer;
mutex m;
condition_variable cv;
bool done = false;

void producer()
{
    for (int i = 0; i < 5; i++)
    {
        {
            lock_guard<mutex> lock(m);
            buffer.push(i);
        }
        cv.notify_one();
    }
    {
        lock_guard<mutex> lock(m);
        done = true;
    }
    cv.notify_one();
}

void consumer()
{
    while (true)
    {
        unique_lock<mutex> lock(m);
        cv.wait(lock, []
                { return !buffer.empty() || done; });

        while (!buffer.empty())
        {
            cout << "Consumed: " << buffer.front() << endl;
            buffer.pop();
        }
        if (done)
            break;
    }
}

int main()
{
    thread p(producer), c(consumer);
    p.join();
    c.join();
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::atomic basics
 * @INPUT: 2 threads each incrementing 100000 times
 * @OUTPUT: Final counter value: 200000 (correct without a mutex)
 */
#include <iostream>
#include <thread>
#include <atomic>
using namespace std;

atomic<int> counter(0);

void increment()
{
    for (int i = 0; i < 100000; i++)
        counter++;
}

int main()
{
    thread t1(increment), t2(increment);
    t1.join();
    t2.join();

    cout << "Final counter value: " << counter << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::atomic vs mutex - conceptual performance comparison
 * @INPUT: (none)
 * @OUTPUT: Atomics avoid OS-level locking overhead for simple operations
 */
#include <iostream>
using namespace std;

int main()
{
    /* std::atomic operations typically compile to a single lock-free CPU
     * instruction (e.g. lock xadd), while a mutex may involve a futex
     * syscall under contention - atomics are faster for simple counters. */
    cout << "Atomics avoid OS-level locking overhead for simple operations" << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::async and std::future basics
 * @INPUT: compute 6 * 7 asynchronously
 * @OUTPUT: Result: 42
 */
#include <iostream>
#include <future>
using namespace std;

int compute()
{
    return 6 * 7;
}

int main()
{
    future<int> result = async(launch::async, compute);
    cout << "Result: " << result.get() << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::promise and std::future
 * @INPUT: a worker thread sets the promise's value
 * @OUTPUT: Received from promise: 77
 */
#include <iostream>
#include <thread>
#include <future>
using namespace std;

void setValue(promise<int> p)
{
    p.set_value(77);
}

int main()
{
    promise<int> p;
    future<int> f = p.get_future();

    thread t(setValue, move(p));
    cout << "Received from promise: " << f.get() << endl;

    t.join();
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::packaged_task
 * @INPUT: wrap a function as a packaged_task and run it on a thread
 * @OUTPUT: Packaged task result: 15
 */
#include <iostream>
#include <thread>
#include <future>
using namespace std;

int add(int a, int b) { return a + b; }

int main()
{
    packaged_task<int(int, int)> task(add);
    future<int> result = task.get_future();

    thread t(move(task), 7, 8);
    cout << "Packaged task result: " << result.get() << endl;

    t.join();
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::call_once
 * @INPUT: 3 threads all trying to initialize
 * @OUTPUT: Initialized exactly once
 */
#include <iostream>
#include <thread>
#include <mutex>
using namespace std;

once_flag flag;

void initialize()
{
    cout << "Initialized exactly once" << endl;
}

void run()
{
    call_once(flag, initialize);
}

int main()
{
    thread t1(run), t2(run), t3(run);
    t1.join();
    t2.join();
    t3.join();
    return 0;
}
/* @END */

/*
 * @PROGRAM: Multiple threads incrementing a shared counter safely
 * @INPUT: 4 threads, 50000 increments each
 * @OUTPUT: Final counter value: 200000
 */
#include <iostream>
#include <thread>
#include <mutex>
#include <vector>
using namespace std;

int counter = 0;
mutex m;

void increment()
{
    for (int i = 0; i < 50000; i++)
    {
        lock_guard<mutex> lock(m);
        counter++;
    }
}

int main()
{
    vector<thread> threads;
    for (int i = 0; i < 4; i++)
        threads.emplace_back(increment);

    for (auto &t : threads)
        t.join();

    cout << "Final counter value: " << counter << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Race condition demo without synchronization
 * @INPUT: 2 threads incrementing without a mutex
 * @OUTPUT: Final counter value is usually less than 200000 (lost updates)
 */
#include <iostream>
#include <thread>
using namespace std;

int counter = 0;

void increment()
{
    for (int i = 0; i < 100000; i++)
        counter++; /* not atomic: read-modify-write race */
}

int main()
{
    thread t1(increment), t2(increment);
    t1.join();
    t2.join();

    cout << "Final counter value (expected 200000, likely less): " << counter << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Deadlock demo with two mutexes locked in different order
 * @INPUT: thread A locks m1 then m2; thread B locks m2 then m1
 * @OUTPUT: Both threads block forever waiting on each other (deadlock)
 */
#include <iostream>
#include <thread>
#include <mutex>
#include <chrono>
using namespace std;

mutex m1, m2;

void threadA()
{
    lock_guard<mutex> lockA(m1);
    this_thread::sleep_for(chrono::milliseconds(100));
    lock_guard<mutex> lockB(m2); /* blocks: threadB holds m2 and wants m1 */
}

void threadB()
{
    lock_guard<mutex> lockB(m2);
    this_thread::sleep_for(chrono::milliseconds(100));
    lock_guard<mutex> lockA(m1); /* blocks: threadA holds m1 and wants m2 */
}

int main()
{
    thread a(threadA), b(threadB);
    a.join(); /* this demo intentionally hangs, illustrating deadlock */
    b.join();
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::lock - locking multiple mutexes safely to avoid deadlock
 * @INPUT: two threads locking the same two mutexes in reverse order
 * @OUTPUT: Both threads complete without deadlocking
 */
#include <iostream>
#include <thread>
#include <mutex>
using namespace std;

mutex m1, m2;

void safeLock(int order)
{
    if (order == 1)
        lock(m1, m2); /* std::lock acquires both atomically, avoiding deadlock */
    else
        lock(m2, m1);

    lock_guard<mutex> lockA(m1, adopt_lock);
    lock_guard<mutex> lockB(m2, adopt_lock);

    cout << "Thread with order " << order << " completed safely" << endl;
}

int main()
{
    thread a(safeLock, 1), b(safeLock, 2);
    a.join();
    b.join();
    return 0;
}
/* @END */

/*
 * @PROGRAM: Basic thread pool implementation
 * @INPUT: 4 worker threads processing 8 tasks
 * @OUTPUT: Each task processed exactly once by one of the workers
 */
#include <iostream>
#include <thread>
#include <vector>
#include <mutex>
using namespace std;

int nextTask = 0;
mutex m;

void worker(int id)
{
    while (true)
    {
        int task;
        {
            lock_guard<mutex> lock(m);
            if (nextTask >= 8)
                return;
            task = nextTask++;
        }
        cout << "Task " << task << " processed by worker " << id << endl;
    }
}

int main()
{
    vector<thread> workers;
    for (int i = 0; i < 4; i++)
        workers.emplace_back(worker, i);

    for (auto &t : workers)
        t.join();

    return 0;
}
/* @END */

/*
 * @PROGRAM: std::this_thread::sleep_for
 * @INPUT: sleep for 200ms
 * @OUTPUT: Woke up after sleeping
 */
#include <iostream>
#include <thread>
#include <chrono>
using namespace std;

int main()
{
    this_thread::sleep_for(chrono::milliseconds(200));
    cout << "Woke up after sleeping" << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::this_thread::get_id
 * @INPUT: (none)
 * @OUTPUT: Running on thread ID: 0x...
 */
#include <iostream>
#include <thread>
using namespace std;

int main()
{
    cout << "Running on thread ID: " << this_thread::get_id() << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Parallel sum using multiple threads
 * @INPUT: array of 1,000,000 ints split across 4 threads
 * @OUTPUT: Total sum computed by combining each thread's partial sum
 */
#include <iostream>
#include <thread>
#include <vector>
using namespace std;

void sumRange(vector<int> &data, int start, int end, long &result)
{
    long sum = 0;
    for (int i = start; i < end; i++)
        sum += data[i];
    result = sum;
}

int main()
{
    const int size = 1000000;
    vector<int> data(size, 1);
    const int numThreads = 4;
    vector<thread> threads;
    vector<long> partial(numThreads);
    int chunk = size / numThreads;

    for (int i = 0; i < numThreads; i++)
    {
        int start = i * chunk;
        int end = (i == numThreads - 1) ? size : start + chunk;
        threads.emplace_back(sumRange, ref(data), start, end, ref(partial[i]));
    }

    for (auto &t : threads)
        t.join();

    long total = 0;
    for (long p : partial)
        total += p;

    cout << "Total sum: " << total << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::shared_mutex (reader-writer lock, C++17)
 * @INPUT: multiple readers, one writer
 * @OUTPUT: Readers run concurrently; the writer gets exclusive access
 */
#include <iostream>
#include <shared_mutex>
#include <mutex>
#include <thread>
using namespace std;

shared_mutex sm;
int sharedValue = 0;

void reader()
{
    shared_lock<shared_mutex> lock(sm); /* multiple readers allowed at once */
    cout << "Reader sees value: " << sharedValue << endl;
}

void writer()
{
    unique_lock<shared_mutex> lock(sm); /* exclusive access for writing */
    sharedValue = 42;
    cout << "Writer updated value to " << sharedValue << endl;
}

int main()
{
    thread w(writer);
    w.join();

    thread r1(reader), r2(reader);
    r1.join();
    r2.join();
    return 0;
}
/* @END */

/*
 * @PROGRAM: Thread-safe singleton using std::call_once
 * @INPUT: 5 threads requesting the singleton instance
 * @OUTPUT: Singleton created once
 */
#include <iostream>
#include <thread>
#include <mutex>
#include <memory>
using namespace std;

once_flag flag;
unique_ptr<int> instance;

int *getInstance()
{
    call_once(flag, []
              {
		instance = make_unique<int>(1);
		cout << "Singleton created once" << endl; });
    return instance.get();
}

int main()
{
    thread threads[5];
    for (auto &t : threads)
        t = thread(getInstance);
    for (auto &t : threads)
        t.join();
    return 0;
}
/* @END */

/*
 * @PROGRAM: Passing a lambda to a thread
 * @INPUT: capture a local variable by value
 * @OUTPUT: Lambda thread received captured value: 5
 */
#include <iostream>
#include <thread>
using namespace std;

int main()
{
    int value = 5;
    thread t([value]()
             { cout << "Lambda thread received captured value: " << value << endl; });
    t.join();
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::future::wait_for with a timeout
 * @INPUT: a task that takes 500ms, checked with a 100ms timeout
 * @OUTPUT: Task not finished yet after the timeout
 */
#include <iostream>
#include <future>
#include <thread>
#include <chrono>
using namespace std;

int slowTask()
{
    this_thread::sleep_for(chrono::milliseconds(500));
    return 1;
}

int main()
{
    future<int> result = async(launch::async, slowTask);

    if (result.wait_for(chrono::milliseconds(100)) == future_status::timeout)
        cout << "Task not finished yet after the timeout" << endl;

    result.wait(); /* wait for real completion before exiting */
    return 0;
}
/* @END */

/*
 * @PROGRAM: Joining all threads stored in a vector<thread>
 * @INPUT: 5 worker threads
 * @OUTPUT: Worker 0..4 finished, All threads joined
 */
#include <iostream>
#include <thread>
#include <vector>
using namespace std;

int main()
{
    vector<thread> threads;

    for (int i = 0; i < 5; i++)
        threads.emplace_back([i]
                             { cout << "Worker " << i << " finished" << endl; });

    for (auto &t : threads)
        t.join();

    cout << "All threads joined" << endl;
    return 0;
}
/* @END */
