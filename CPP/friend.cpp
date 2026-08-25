#include <iostream>
using namespace std;

class Box
{
private:
    double length;
    double width;

    static int objectCount;

public:
    Box(double l, double w)
        : length(l), width(w)
    {
        objectCount++;
    }

    ~Box()
    {
        objectCount--;
    }

    // Const member function: does not modify the object
    double getArea() const
    {
        return length * width;
    }

    // Static function: belongs to the class
    static int getObjectCount()
    {
        return objectCount;
    }

    // Friend function declaration
    friend void compareBoxes(const Box &first,
                             const Box &second);
};

// Static member definition
int Box::objectCount = 0;

// Friend function can access private members
void compareBoxes(const Box &first, const Box &second)
{
    double firstArea = first.length * first.width;
    double secondArea = second.length * second.width;

    if (firstArea > secondArea)
        cout << "First box is larger\n";
    else if (secondArea > firstArea)
        cout << "Second box is larger\n";
    else
        cout << "Both boxes are equal\n";
}

/* Example for friend class */

/* Auditor can access all private members of BankAccount.
Friendship is one-way: BankAccount cannot access private members of Auditor.
Friendship is not inherited.
Friendship is not automatically mutual.
Use friend classes carefully because they weaken encapsulation.
 */

class BankAccount
{
private:
    string owner;
    double balance;

public:
    BankAccount(const string &name, double amount)
        : owner(name), balance(amount) {}

    // Auditor can access private members
    friend class Auditor;
};

class Auditor
{
public:
    void inspect(const BankAccount &account) const
    {
        cout << "Account owner: " << account.owner << '\n';
        cout << "Account balance: " << account.balance << '\n';
    }
};

int main()
{
    const Box box1(10, 5);
    Box box2(6, 4);

    // Allowed because getArea() is const
    cout << "Box 1 area: " << box1.getArea() << '\n';
    cout << "Box 2 area: " << box2.getArea() << '\n';

    // Static function called using class name
    cout << "Number of boxes: "
         << Box::getObjectCount() << '\n';

    compareBoxes(box1, box2);

    /* Friend class */
    BankAccount account("Ravi", 5000);
    Auditor auditor;
    auditor.inspect(account);

    return 0;
}