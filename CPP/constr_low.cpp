#include <iostream>
using namespace std;


/* Constructors & destructors using base and derived classes*/
class BankAccount {
    
    public:
    string accountHolderName;
    
    BankAccount(const string& name)
    : accountHolderName(name) {
        cout << "Base account construction called \n";
    }
    
    //compiler will generates BankAccount :: ~BankAccount() = 0;
    virtual ~BankAccount () = default;
};

class TransactionHistory : public BankAccount {
    
    int *transaction;
    
    public:
    TransactionHistory(string holderName) 
    : BankAccount(holderName), transaction(new int[100]) {
        cout << "Memory allocated in transaction history \n";
    }
    
    // Prevent accidental copying because this class owns a raw pointer
    //TransactionHistory(const TransactionHistory& ) = delete;
    TransactionHistory& operator=(const TransactionHistory& ) = delete;
    
    ~TransactionHistory() {
        delete[] transaction;
        cout << "Released Transaction history \n";
    }
    
};





/* Constructors & destructors using base and derived classes*/
// first derived class desctructor and base class destructor invocation
class Base {
    
    int value;
    
    public:
    Base (int temp) : value(temp){
        cout <<"Base Constructor called\n";
    }
    
    virtual ~Base(){
        cout << " Base destructor \n";
    }
};

class Derived : public Base {
    
    int *ptr;
    
    public:
    Derived (int a, int b)
    : Base(a), ptr(new int[b]){
        
        cout << "Derived class constructor called \n";
    }
         
    ~Derived () {
        delete[] ptr;
        cout << "Derived class destructor called \n";
    }
};


class ShallowCopy {

    int *ptr;
    int size;

    public:
    
        ShallowCopy(int x) : size(x) {
            ptr = new int[size];
            cout << "Shallow copy constructor called \n";
        }

        void display() {
            cout << "Pointer address = " << ptr <<endl;
        }
        ~ShallowCopy() {
            cout << "Shollow copy destructor \n";
            delete[] ptr;
        }

        /* Preventing shallow copy methods*/

        // ShallowCopy(const ShallowCopy& )  = delete;
        // ShallowCopy& operator=(const ShallowCopy& ) = delete;

        /* Or Implement deep copy by stroing the size */
        // ShallowCopy(const ShallowCopy& src) 
        //     : ptr (new int[src.size]), size(src.size) {

        //     memcpy(ptr, src.ptr, size * sizeof(int));

        // }

};


int main() {
    
    /* Constructors & destructors using base and derived classes*/
    BankAccount* account = new TransactionHistory("Ravi");
    //Bellow operations not allowed since those marked as deleted
    // TransactionHistory a("Hello");
    // TransactionHistory b = a;
    // TransactionHistory c("Hello");
    // c = a;
    delete account;
    
    
    cout <<"\n\n\n\n"; 
    cout << "2. Constructors & destructors using base and derived classes\n";
    Derived *der = new Derived(10,20);
    delete der;
    

    cout<<"\n\n\n";
    cout << "3. Demonstrate Shallow Copy..\n";
    ShallowCopy scObj(10);
    ShallowCopy scObj1 = scObj;
    scObj.display();
    scObj1.display();


}