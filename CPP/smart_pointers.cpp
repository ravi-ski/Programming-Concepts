#include <iostream>
#include <memory>

using namespace std;

class smart {
    
    public:
        smart() {
            cout << "smart constructor\n";
        }
        ~smart() {
            cout << "Smart desctructor\n";
        }

        void read(){
            cout << "Read called \n";
        }

};

int main() {

    /* Qunique_pointer */
    unique_ptr<smart> obj = make_unique<smart>(); // pass arguments insdie 
    obj->read();

    unique_ptr<smart> obj1 = move(obj);
    if ( obj == nullptr)
        cout << "\nFirst pointer is null pointer\n";


    /*Shared Pointer*/
    cout << " \nStart of shared pointer program\n ";
    shared_ptr<smart> obj2 = make_shared<smart>();
    shared_ptr<smart> obj3 = obj2;
    cout << "\nNumber of owners for shared lock = " << obj3.use_count();


        return 0;
}