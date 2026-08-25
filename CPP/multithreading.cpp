#include <iostream>
#include <thread>
#include <mutex>
#include <vector>
#include <future>
#include <stdexcept>
#include <exception>

using namespace std;
mutex balMutex;
int count =0;

void increment() {

    lock_guard<mutex> lock(balMutex);
    count++;
    cout << "count value = " << count << endl;
}

int process(int var) {
    lock_guard<mutex> lock(balMutex);
    var *=var;

    return var;
}

 void raiseexception(int val){

    cout << "Exception runtime error" << endl;
    throw runtime_error("Manural exception");
    /* throw length_error("array lenth");
    throw out_of_range("bad allocation");
    throw invalid_argument("Number of arguments wrong"); */
}

int main() {
    
    cout << " Entered main program\n";
    /* Vector of threads with locking mechanism to share common variable*/
    vector<std::thread> vec;
    for (int i = 0; i < 10; i++)
        vec.push_back(thread(increment));
    for (int i = 0; i < 10; i++)
        vec[i].join();


    /* Future threads to return values to caller*/
/*    future<int> result = async(launch::async, process, 10);
    cout << "value = " <<  result.get() << endl; */


    /* Thread unhandled exception causes main thread to crash*/
    //thread th1(raiseexception,10);
    //th1.join(); // will crash since exception not handled in thread.

    
    /* exception handling with future thread handling */
/*     auto handle = async(launch::async, raiseexception, 10);

    try {
        handle.get();
    }catch (exception &e) {
        cout << "exception "  << e.what();
    } */

    return 0;
}