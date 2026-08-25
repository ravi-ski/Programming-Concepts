#include <iostream>
#include <string>
#include <mutex>
#include <thread>

using namespace std;

/* Static variable initilization*/
class ConfigManager {
    private :
        string data;
        ConfigManager() {
            cout << "Initilizing ConfigManager" << endl;
            data = "It's single ton class";
        }
    
    public:
        ConfigManager(const ConfigManager& Ref) = delete;
        ConfigManager& operator=(const ConfigManager&ref ) = delete;

        static ConfigManager& getInstance() {
            static ConfigManager mInstance;
            return mInstance;
        }

        void display() {
            cout << "Data = " << data;
        }
};


/* Pointer type variable initilization */

class singletonPtr {

    private:
        static singletonPtr *instance_ptr;
        static mutex instanceMutex;

        singletonPtr() {
            cout <<"Singletone pointer constructor called \n";
        }

    public:
        singletonPtr(const singletonPtr &) = delete;
        singletonPtr& operator=(const singletonPtr& ref) = delete;

        static singletonPtr* getInstance() {

            if ( instance_ptr == nullptr) {

                lock_guard<mutex> lock(instanceMutex);

                if( instance_ptr == nullptr) {
                    instance_ptr = new singletonPtr();
                    return instance_ptr;
                }
            } else {
                return instance_ptr;
            }

            return instance_ptr;
        }

        void display(){
            cout <<"It's function call\n";
        }

        void log(const string& message) {
            cout << "Message = " << message << endl;
        }
};

/* Static variable initilization */
singletonPtr* singletonPtr::instance_ptr = nullptr;
mutex singletonPtr::instanceMutex;

void download () {
    singletonPtr::getInstance()->log("download content");
}

void upload() {

    singletonPtr::getInstance()->log("Upload content");
}

void backup() {
    singletonPtr::getInstance()->log("Backup content");
}



int main() {

    ConfigManager &ref = ConfigManager :: getInstance();
    ref.display();


/* Pointer type instance creation */
    singletonPtr *ptrInstance = singletonPtr :: getInstance();
    ptrInstance->display();



    /* Multithreading calls with singleton instance*/
    thread thread1(download);
    thread thread2(upload);
    thread thread3(backup);

    thread1.join();
    thread2.join();
    thread3.join();

    return 0;
    
}

