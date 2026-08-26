/* @SECTION: C++ Programming */
/* @CHAPTER: OOP FUNDAMENTALS */
/*
 * Each block below is a small, independent, self-contained example.
 * Compile individually: g++ file.cpp -o out
 */

/*
 * @PROGRAM: Define a class with private/public members
 * @INPUT: (none)
 * @OUTPUT: Name: Alice, Age: 30
 */
#include <iostream>
using namespace std;

class Person
{
private:
    string name;
    int age;

public:
    void set(string n, int a)
    {
        name = n;
        age = a;
    }
    void show() { cout << "Name: " << name << ", Age: " << age << endl; }
};

int main()
{
    Person p;
    p.set("Alice", 30);
    p.show();
    return 0;
}
/* @END */

/*
 * @PROGRAM: Create objects and call methods
 * @INPUT: two Car objects
 * @OUTPUT: Toyota is driving, Honda is driving
 */
#include <iostream>
using namespace std;

class Car
{
public:
    string brand;
    void drive() { cout << brand << " is driving" << endl; }
};

int main()
{
    Car car1, car2;
    car1.brand = "Toyota";
    car2.brand = "Honda";
    car1.drive();
    car2.drive();
    return 0;
}
/* @END */

/*
 * @PROGRAM: Constructor basics
 * @INPUT: (none)
 * @OUTPUT: Object created via constructor
 */
#include <iostream>
using namespace std;

class Demo
{
public:
    Demo() { cout << "Object created via constructor" << endl; }
};

int main()
{
    Demo d;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Parameterized constructor
 * @INPUT: Point(3, 4)
 * @OUTPUT: Point(3, 4)
 */
#include <iostream>
using namespace std;

class Point
{
    int x, y;

public:
    Point(int a, int b) : x(a), y(b) {}
    void show() { cout << "Point(" << x << ", " << y << ")" << endl; }
};

int main()
{
    Point p(3, 4);
    p.show();
    return 0;
}
/* @END */

/*
 * @PROGRAM: Copy constructor
 * @INPUT: copy an existing Box object
 * @OUTPUT: Original width: 5, Copy width: 5
 */
#include <iostream>
using namespace std;

class Box
{
public:
    int width;
    Box(int w) : width(w) {}
    Box(const Box &other) : width(other.width) {}
};

int main()
{
    Box original(5);
    Box copy = original;
    cout << "Original width: " << original.width << ", Copy width: " << copy.width << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Destructor
 * @INPUT: (none)
 * @OUTPUT: Constructed, Destructed
 */
#include <iostream>
using namespace std;

class Resource
{
public:
    Resource() { cout << "Constructed" << endl; }
    ~Resource() { cout << "Destructed" << endl; }
};

int main()
{
    Resource r;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Default arguments in a constructor
 * @INPUT: no arguments, then an explicit argument
 * @OUTPUT: Volume: 1, Volume: 27
 */
#include <iostream>
using namespace std;

class Cube
{
    int side;

public:
    Cube(int s = 1) : side(s) {}
    int volume() { return side * side * side; }
};

int main()
{
    Cube c1;
    Cube c2(3);
    cout << "Volume: " << c1.volume() << endl;
    cout << "Volume: " << c2.volume() << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Using the "this" pointer
 * @INPUT: same-named parameter as member variable
 * @OUTPUT: Value set to: 42
 */
#include <iostream>
using namespace std;

class Holder
{
    int value;

public:
    void setValue(int value) { this->value = value; }
    void show() { cout << "Value set to: " << value << endl; }
};

int main()
{
    Holder h;
    h.setValue(42);
    h.show();
    return 0;
}
/* @END */

/*
 * @PROGRAM: Static data member shared across all objects
 * @INPUT: create 3 objects
 * @OUTPUT: Total objects created: 3
 */
#include <iostream>
using namespace std;

class Counter
{
public:
    static int count;
    Counter() { count++; }
};

int Counter::count = 0;

int main()
{
    Counter a, b, c;
    cout << "Total objects created: " << Counter::count << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Static member function
 * @INPUT: (none)
 * @OUTPUT: Called without any object instance
 */
#include <iostream>
using namespace std;

class Utility
{
public:
    static void greet() { cout << "Called without any object instance" << endl; }
};

int main()
{
    Utility::greet();
    return 0;
}
/* @END */

/*
 * @PROGRAM: Const member function
 * @INPUT: (none)
 * @OUTPUT: Value: 10
 */
#include <iostream>
using namespace std;

class ReadOnly
{
    int value = 10;

public:
    int getValue() const { return value; }
};

int main()
{
    const ReadOnly obj;
    cout << "Value: " << obj.getValue() << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Friend function accessing private members
 * @INPUT: Box with width = 8
 * @OUTPUT: Width via friend function: 8
 */
#include <iostream>
using namespace std;

class Box
{
    int width = 8;

public:
    friend void printWidth(const Box &b);
};

void printWidth(const Box &b)
{
    cout << "Width via friend function: " << b.width << endl;
}

int main()
{
    Box b;
    printWidth(b);
    return 0;
}
/* @END */

/*
 * @PROGRAM: Friend class
 * @INPUT: (none)
 * @OUTPUT: Engine started via friend class access
 */
#include <iostream>
using namespace std;

class Engine
{
    bool running = false;
    friend class Mechanic;
};

class Mechanic
{
public:
    void start(Engine &e)
    {
        e.running = true;
        cout << "Engine started via friend class access" << endl;
    }
};

int main()
{
    Engine e;
    Mechanic m;
    m.start(e);
    return 0;
}
/* @END */

/*
 * @PROGRAM: Single inheritance
 * @INPUT: (none)
 * @OUTPUT: Animal eats, Dog barks
 */
#include <iostream>
using namespace std;

class Animal
{
public:
    void eat() { cout << "Animal eats" << endl; }
};

class Dog : public Animal
{
public:
    void bark() { cout << "Dog barks" << endl; }
};

int main()
{
    Dog d;
    d.eat();
    d.bark();
    return 0;
}
/* @END */

/*
 * @PROGRAM: Multiple inheritance
 * @INPUT: (none)
 * @OUTPUT: Flies, Swims
 */
#include <iostream>
using namespace std;

class Flyer
{
public:
    void fly() { cout << "Flies" << endl; }
};

class Swimmer
{
public:
    void swim() { cout << "Swims" << endl; }
};

class Duck : public Flyer, public Swimmer
{
};

int main()
{
    Duck d;
    d.fly();
    d.swim();
    return 0;
}
/* @END */

/*
 * @PROGRAM: Multilevel inheritance
 * @INPUT: (none)
 * @OUTPUT: Base, Derived1, Derived2
 */
#include <iostream>
using namespace std;

class Base
{
public:
    void show() { cout << "Base" << endl; }
};

class Derived1 : public Base
{
public:
    void show1() { cout << "Derived1" << endl; }
};

class Derived2 : public Derived1
{
public:
    void show2() { cout << "Derived2" << endl; }
};

int main()
{
    Derived2 d;
    d.show();
    d.show1();
    d.show2();
    return 0;
}
/* @END */

/*
 * @PROGRAM: Hierarchical inheritance
 * @INPUT: (none)
 * @OUTPUT: Car drives, Bike rides
 */
#include <iostream>
using namespace std;

class Vehicle
{
public:
    void info() { cout << "Vehicle" << endl; }
};

class Car : public Vehicle
{
public:
    void drive() { cout << "Car drives" << endl; }
};

class Bike : public Vehicle
{
public:
    void ride() { cout << "Bike rides" << endl; }
};

int main()
{
    Car c;
    Bike b;
    c.drive();
    b.ride();
    return 0;
}
/* @END */

/*
 * @PROGRAM: Hybrid inheritance and the diamond problem
 * @INPUT: (none)
 * @OUTPUT: Compiler error/ambiguity without virtual inheritance (demonstrated in comments)
 */
#include <iostream>
using namespace std;

class Base
{
public:
    int value = 1;
};

class Derived1 : public Base
{
};

class Derived2 : public Base
{
};

/* Combined : public Derived1, public Derived2 would create TWO copies of Base,
 * so "combined.value" becomes ambiguous without virtual inheritance. */
class Combined : public Derived1, public Derived2
{
};

int main()
{
    Combined c;
    cout << "Derived1::value = " << c.Derived1::value << endl;
    cout << "Derived2::value = " << c.Derived2::value << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Virtual base class to resolve the diamond problem
 * @INPUT: (none)
 * @OUTPUT: Single shared value: 1
 */
#include <iostream>
using namespace std;

class Base
{
public:
    int value = 1;
};

class Derived1 : virtual public Base
{
};

class Derived2 : virtual public Base
{
};

class Combined : public Derived1, public Derived2
{
};

int main()
{
    Combined c;
    cout << "Single shared value: " << c.value << endl; /* no ambiguity now */
    return 0;
}
/* @END */

/*
 * @PROGRAM: Function overriding
 * @INPUT: (none)
 * @OUTPUT: Derived version called
 */
#include <iostream>
using namespace std;

class Base
{
public:
    void show() { cout << "Base version called" << endl; }
};

class Derived : public Base
{
public:
    void show() { cout << "Derived version called" << endl; }
};

int main()
{
    Derived d;
    d.show();
    return 0;
}
/* @END */

/*
 * @PROGRAM: Virtual functions and runtime polymorphism
 * @INPUT: Base pointer pointing to a Derived object
 * @OUTPUT: Derived::speak() called through a base pointer
 */
#include <iostream>
using namespace std;

class Animal
{
public:
    virtual void speak() { cout << "Animal::speak()" << endl; }
};

class Dog : public Animal
{
public:
    void speak() override { cout << "Derived::speak() called through a base pointer" << endl; }
};

int main()
{
    Animal *a = new Dog();
    a->speak(); /* resolved at runtime via the vtable */
    delete a;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Pure virtual functions and abstract classes
 * @INPUT: (none)
 * @OUTPUT: Circle area: 78.5
 */
#include <iostream>
using namespace std;

class Shape
{
public:
    virtual double area() const = 0; /* pure virtual: makes Shape abstract */
};

class Circle : public Shape
{
    double radius;

public:
    Circle(double r) : radius(r) {}
    double area() const override { return 3.14 * radius * radius; }
};

int main()
{
    Shape *s = new Circle(5);
    cout << "Circle area: " << s->area() << endl;
    delete s;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Function overloading (compile-time polymorphism)
 * @INPUT: add(2, 3), add(2.5, 3.5)
 * @OUTPUT: 5, 6
 */
#include <iostream>
using namespace std;

int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }

int main()
{
    cout << add(2, 3) << endl;
    cout << add(2.5, 3.5) << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Constructor overloading
 * @INPUT: Box(), Box(5)
 * @OUTPUT: Side: 1, Side: 5
 */
#include <iostream>
using namespace std;

class Box
{
    int side;

public:
    Box() : side(1) {}
    Box(int s) : side(s) {}
    void show() { cout << "Side: " << side << endl; }
};

int main()
{
    Box a, b(5);
    a.show();
    b.show();
    return 0;
}
/* @END */

/*
 * @PROGRAM: Access specifiers (public/private/protected)
 * @INPUT: (none)
 * @OUTPUT: Protected member accessible from derived class: 5
 */
#include <iostream>
using namespace std;

class Base
{
protected:
    int protectedValue = 5;

private:
    int privateValue = 10; /* not accessible from Derived */
};

class Derived : public Base
{
public:
    void show() { cout << "Protected member accessible from derived class: " << protectedValue << endl; }
};

int main()
{
    Derived d;
    d.show();
    return 0;
}
/* @END */

/*
 * @PROGRAM: Encapsulation using getters/setters
 * @INPUT: setBalance(100)
 * @OUTPUT: Balance: 100
 */
#include <iostream>
using namespace std;

class Account
{
    double balance = 0;

public:
    void setBalance(double b) { balance = (b >= 0) ? b : 0; } /* validation kept internal */
    double getBalance() const { return balance; }
};

int main()
{
    Account acc;
    acc.setBalance(100);
    cout << "Balance: " << acc.getBalance() << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Abstraction using an abstract class as an interface
 * @INPUT: (none)
 * @OUTPUT: Printing via an abstract Printer interface
 */
#include <iostream>
using namespace std;

class Printer
{
public:
    virtual void print() = 0;
    virtual ~Printer() {}
};

class ConsolePrinter : public Printer
{
public:
    void print() override { cout << "Printing via an abstract Printer interface" << endl; }
};

int main()
{
    Printer *p = new ConsolePrinter();
    p->print();
    delete p;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Object composition (has-a relationship)
 * @INPUT: Car has-a Engine
 * @OUTPUT: Engine started, Car driving
 */
#include <iostream>
using namespace std;

class Engine
{
public:
    void start() { cout << "Engine started" << endl; }
};

class Car
{
    Engine engine; /* composition: Car "has-a" Engine */

public:
    void drive()
    {
        engine.start();
        cout << "Car driving" << endl;
    }
};

int main()
{
    Car car;
    car.drive();
    return 0;
}
/* @END */

/*
 * @PROGRAM: Object slicing problem
 * @INPUT: assigning a Derived object to a Base object (by value)
 * @OUTPUT: Base::show() called (derived part is "sliced off")
 */
#include <iostream>
using namespace std;

class Base
{
public:
    virtual void show() { cout << "Base::show() called (derived part is \"sliced off\")" << endl; }
};

class Derived : public Base
{
public:
    void show() override { cout << "Derived::show() called" << endl; }
};

int main()
{
    Derived d;
    Base b = d; /* slicing: only the Base part is copied */
    b.show();   /* calls Base::show(), NOT Derived::show() */
    return 0;
}
/* @END */

/*
 * @PROGRAM: Importance of a virtual destructor in polymorphic base classes
 * @INPUT: deleting a Derived object through a Base pointer
 * @OUTPUT: Derived destructor called, Base destructor called (both run correctly)
 */
#include <iostream>
using namespace std;

class Base
{
public:
    virtual ~Base() { cout << "Base destructor called" << endl; }
};

class Derived : public Base
{
public:
    ~Derived() override { cout << "Derived destructor called" << endl; }
};

int main()
{
    Base *b = new Derived();
    delete b; /* with a virtual destructor, both destructors run in the right order */
    return 0;
}
/* @END */
