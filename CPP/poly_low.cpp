#include <iostream>
#include <memory>
#include <string>
#include <vector>
using namespace std;

class BankAccount {
    
    string accountHolderName;

    protected:
        double balance;

    public:
        BankAccount(string name, double value)
            : accountHolderName(name), balance(value) {}

        virtual void applyMonthlyUpdate() = 0;
        virtual void display() const = 0;

        virtual ~BankAccount() = default;
};

class SavingAccount : public BankAccount{

    double interest;

    public:

    SavingAccount(string name, double value, double rate)
        :   BankAccount(name, value),interest(rate) {}
    void applyMonthlyUpdate() override{
        balance += interest;
        
        cout << "Savings account interest added" <<endl;
    }

    void display() const{
        cout <<"Total Balance amount = " << balance << endl;
    }
    
    // This is not required to provide sicne compiler automatically generates 
    ~SavingAccount() override = default;
};

class CurrentAccount : public BankAccount {
    double charges;

    public:
        CurrentAccount( string name, double interest, double lcharges)
            : BankAccount(name, interest), charges(lcharges) {}
        void applyMonthlyUpdate() override {
            balance += charges;
        }

        void display() const{
            cout << "Current Account Balance = " << balance << endl;
        }
        
};


int main(){
    
    vector<unique_ptr<BankAccount>> account;

    account.push_back(make_unique<SavingAccount>("Ravi", 1000, 1));
    account.push_back(make_unique<CurrentAccount>("Raja",200,100));

    for ( const auto& acc : account){
        acc->applyMonthlyUpdate();
        acc->display();
    }

}