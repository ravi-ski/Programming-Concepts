#include <iostream>
#include <thread>
#include <mutex>

using namespace std;

int balance = 0;
mutex balmutex;
mutex processMutex;

void increment(){
    
    lock_guard <mutex> lock1(balmutex);
    balance++;
    cout << "Balance amount " << balance << endl;
}

void processTask(int taskId) {

    unique_lock<mutex> lock1(processMutex);
    balance++;
    lock1.unlock();

    cout << "do some other work..." << endl;

    lock1.lock();
    //automatically ulock the mutex 
}

int main() {

    thread thread1(increment);
    thread thread2(increment);
    thread thread3(increment);
    
    thread1.join();
    thread2.join();
    thread3.join();
    
    /* unique_lock is used: to unlock and lock it 
    again the mutext when thread is doing some unrelavent work*/
    thread thread4(processTask);
    thread thread5(processTask);
    return 0;

}
