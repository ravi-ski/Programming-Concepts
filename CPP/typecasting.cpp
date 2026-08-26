/* @SECTION: C++ Programming */
/* @CHAPTER: TYPE CASTING AND RTTI */
/*
 * Each block below is a small, independent, self-contained example.
 * Compile individually: g++ file.cpp -o out -std=c++17
 */

/*
 * @PROGRAM: C-style cast basics
 * @INPUT: (int)3.9
 * @OUTPUT: 3
 */
#include <iostream>
using namespace std;

int main()
{
    double value = 3.9;
    int result = (int)value; /* old-style cast: works but hides intent/safety */
    cout << result << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: static_cast for numeric conversion
 * @INPUT: static_cast<int>(3.9)
 * @OUTPUT: 3
 */
#include <iostream>
using namespace std;

int main()
{
    double value = 3.9;
    int result = static_cast<int>(value); /* checked at compile time, clearer intent */
    cout << result << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: static_cast for pointer upcast (derived to base)
 * @INPUT: Dog* upcast to Animal*
 * @OUTPUT: Upcast succeeded, calling through base pointer
 */
#include <iostream>
using namespace std;

class Animal
{
public:
    virtual ~Animal() {}
};

class Dog : public Animal
{
};

int main()
{
    Dog dog;
    Animal *animal = static_cast<Animal *>(&dog); /* always safe: derived -> base */
    cout << "Upcast succeeded, calling through base pointer" << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: static_cast for pointer downcast (base to derived, unchecked)
 * @INPUT: Animal* known to actually point to a Dog
 * @OUTPUT: Downcast performed (no runtime check - programmer must be certain)
 */
#include <iostream>
using namespace std;

class Animal
{
public:
    virtual ~Animal() {}
};

class Dog : public Animal
{
public:
    void bark() { cout << "Downcast performed (no runtime check - programmer must be certain)" << endl; }
};

int main()
{
    Animal *animal = new Dog();
    Dog *dog = static_cast<Dog *>(animal); /* no runtime type check, unlike dynamic_cast */
    dog->bark();
    delete animal;
    return 0;
}
/* @END */

/*
 * @PROGRAM: dynamic_cast for safe downcasting with polymorphic classes
 * @INPUT: Animal* actually pointing to a Dog
 * @OUTPUT: Downcast succeeded: Woof!
 */
#include <iostream>
using namespace std;

class Animal
{
public:
    virtual ~Animal() {}
};

class Dog : public Animal
{
public:
    void bark() { cout << "Downcast succeeded: Woof!" << endl; }
};

int main()
{
    Animal *animal = new Dog();
    Dog *dog = dynamic_cast<Dog *>(animal); /* checked at runtime via RTTI */

    if (dog != nullptr)
        dog->bark();

    delete animal;
    return 0;
}
/* @END */

/*
 * @PROGRAM: dynamic_cast returning nullptr on a failed pointer cast
 * @INPUT: Animal* actually pointing to a Cat, cast attempted to Dog*
 * @OUTPUT: Cast failed: pointer is not actually a Dog
 */
#include <iostream>
using namespace std;

class Animal
{
public:
    virtual ~Animal() {}
};

class Dog : public Animal
{
};

class Cat : public Animal
{
};

int main()
{
    Animal *animal = new Cat();
    Dog *dog = dynamic_cast<Dog *>(animal);

    if (dog == nullptr)
        cout << "Cast failed: pointer is not actually a Dog" << endl;

    delete animal;
    return 0;
}
/* @END */

/*
 * @PROGRAM: dynamic_cast with references throwing std::bad_cast on failure
 * @INPUT: Animal& actually referring to a Cat, cast attempted to Dog&
 * @OUTPUT: Caught std::bad_cast: reference cast failed
 */
#include <iostream>
using namespace std;

class Animal
{
public:
    virtual ~Animal() {}
};

class Dog : public Animal
{
};

class Cat : public Animal
{
};

int main()
{
    Cat cat;
    Animal &animalRef = cat;

    try
    {
        Dog &dogRef = dynamic_cast<Dog &>(animalRef); /* throws bad_cast, unlike the pointer form */
        (void)dogRef;
    }
    catch (const bad_cast &)
    {
        cout << "Caught std::bad_cast: reference cast failed" << endl;
    }
    return 0;
}
/* @END */

/*
 * @PROGRAM: const_cast to remove constness
 * @INPUT: a const int reference passed to a legacy non-const function
 * @OUTPUT: Value after modification through const_cast: 20
 */
#include <iostream>
using namespace std;

void legacyModify(int &value) { value = 20; }

int main()
{
    const int value = 10;
    legacyModify(const_cast<int &>(value)); /* removes const so legacy API compiles */
    cout << "Value after modification through const_cast: " << value << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: const_cast to add constness
 * @INPUT: a non-const pointer treated as const
 * @OUTPUT: Value seen through const pointer: 5
 */
#include <iostream>
using namespace std;

int main()
{
    int value = 5;
    int *ptr = &value;
    const int *constPtr = const_cast<const int *>(ptr); /* adding const is always safe */

    cout << "Value seen through const pointer: " << *constPtr << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: reinterpret_cast between unrelated pointer types
 * @INPUT: int* reinterpreted as char*
 * @OUTPUT: First byte of the int, viewed as a raw char
 */
#include <iostream>
using namespace std;

int main()
{
    int value = 65; /* 'A' in ASCII, on a little-endian system */
    char *bytePtr = reinterpret_cast<char *>(&value);

    cout << "First byte of the int, viewed as a raw char: " << bytePtr[0] << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: reinterpret_cast between a pointer and an integer
 * @INPUT: convert a pointer to its numeric address and back
 * @OUTPUT: Round-tripped pointer matches the original
 */
#include <iostream>
using namespace std;

int main()
{
    int value = 42;
    int *ptr = &value;

    uintptr_t address = reinterpret_cast<uintptr_t>(ptr);
    int *restoredPtr = reinterpret_cast<int *>(address);

    cout << ((restoredPtr == ptr) ? "Round-tripped pointer matches the original" : "Mismatch") << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: typeid operator basics
 * @INPUT: typeid(int), typeid of a class instance
 * @OUTPUT: Type name printed for both a primitive and a class instance
 */
#include <iostream>
#include <typeinfo>
using namespace std;

class Widget
{
};

int main()
{
    int number = 5;
    Widget widget;

    cout << "int type: " << typeid(number).name() << endl;
    cout << "Widget type: " << typeid(widget).name() << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Comparing types using typeid
 * @INPUT: compare typeid of two different objects
 * @OUTPUT: Types are different
 */
#include <iostream>
#include <typeinfo>
using namespace std;

class Dog
{
};
class Cat
{
};

int main()
{
    Dog dog;
    Cat cat;

    cout << ((typeid(dog) == typeid(cat)) ? "Types are the same" : "Types are different") << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: RTTI: combining dynamic_cast and typeid to identify runtime type
 * @INPUT: Animal* pointing to a Dog
 * @OUTPUT: Runtime type identified as a Dog via typeid, confirmed by dynamic_cast
 */
#include <iostream>
#include <typeinfo>
using namespace std;

class Animal
{
public:
    virtual ~Animal() {}
};

class Dog : public Animal
{
};

int main()
{
    Animal *animal = new Dog();

    if (typeid(*animal) == typeid(Dog))
        cout << "Runtime type identified as a Dog via typeid, confirmed by dynamic_cast" << endl;

    delete animal;
    return 0;
}
/* @END */

/*
 * @PROGRAM: static_cast vs dynamic_cast - safety and cost comparison
 * @INPUT: (none)
 * @OUTPUT: static_cast has zero runtime cost but no safety check; dynamic_cast checks at runtime
 */
#include <iostream>
using namespace std;

int main()
{
    /* static_cast: resolved entirely at compile time, no RTTI lookup, but
     * an incorrect downcast is undefined behavior if the assumption is wrong.
     * dynamic_cast: performs a runtime check using RTTI, safely returning
     * nullptr (or throwing for references) on failure, at some runtime cost. */
    cout << "static_cast has zero runtime cost but no safety check; dynamic_cast checks at runtime" << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: static_cast between an enum and an int
 * @INPUT: Color::Green cast to int and back
 * @OUTPUT: 1, Green
 */
#include <iostream>
using namespace std;

enum class Color
{
    Red,
    Green,
    Blue
};

int main()
{
    Color c = Color::Green;
    int value = static_cast<int>(c);
    cout << value << endl;

    Color restored = static_cast<Color>(value);
    cout << (restored == Color::Green ? "Green" : "Other") << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: static_cast from void* back to a typed pointer
 * @INPUT: int* stored as void*
 * @OUTPUT: 99
 */
#include <iostream>
using namespace std;

int main()
{
    int value = 99;
    void *generic = &value;

    int *typed = static_cast<int *>(generic); /* void* -> T* requires an explicit cast */
    cout << *typed << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Explicit conversion operator overloading
 * @INPUT: static_cast<int>(Meters(5))
 * @OUTPUT: 5
 */
#include <iostream>
using namespace std;

class Meters
{
    int value;

public:
    Meters(int v) : value(v) {}
    explicit operator int() const { return value; } /* requires an explicit cast to use */
};

int main()
{
    Meters m(5);
    int value = static_cast<int>(m);
    cout << value << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Implicit conversion via a converting constructor
 * @INPUT: Fraction f = 5; (int implicitly converted to Fraction)
 * @OUTPUT: 5/1
 */
#include <iostream>
using namespace std;

class Fraction
{
    int numerator, denominator;

public:
    Fraction(int n, int d = 1) : numerator(n), denominator(d) {} /* not explicit: allows implicit conversion */
    void show() { cout << numerator << "/" << denominator << endl; }
};

int main()
{
    Fraction f = 5; /* implicitly calls Fraction(5, 1) */
    f.show();
    return 0;
}
/* @END */

/*
 * @PROGRAM: The explicit keyword preventing implicit conversion
 * @INPUT: Fraction(5) requires an explicit constructor call
 * @OUTPUT: Explicit constructor used, implicit conversion is not allowed
 */
#include <iostream>
using namespace std;

class Fraction
{
    int numerator;

public:
    explicit Fraction(int n) : numerator(n) {} /* blocks "Fraction f = 5;" from compiling */
    void show() { cout << "Explicit constructor used, implicit conversion is not allowed" << endl; }
};

int main()
{
    Fraction f(5); /* must be called explicitly */
    f.show();
    return 0;
}
/* @END */

/*
 * @PROGRAM: Casting away const with const_cast to call a legacy non-const API
 * @INPUT: a const char* passed to an old C-style function expecting char*
 * @OUTPUT: Legacy function received: hello
 */
#include <iostream>
#include <cstring>
using namespace std;

void legacyPrint(char *text) { cout << "Legacy function received: " << text << endl; }

int main()
{
    const char *text = "hello";
    legacyPrint(const_cast<char *>(text)); /* safe here only because legacyPrint doesn't modify it */
    return 0;
}
/* @END */

/*
 * @PROGRAM: dynamic_cast in a class hierarchy with multiple derived classes
 * @INPUT: Shape* pointing to a Circle, Square, or Triangle
 * @OUTPUT: Identified shape type: Circle
 */
#include <iostream>
using namespace std;

class Shape
{
public:
    virtual ~Shape() {}
};

class Circle : public Shape
{
};
class Square : public Shape
{
};
class Triangle : public Shape
{
};

int main()
{
    Shape *shape = new Circle();

    if (dynamic_cast<Circle *>(shape))
        cout << "Identified shape type: Circle" << endl;
    else if (dynamic_cast<Square *>(shape))
        cout << "Identified shape type: Square" << endl;
    else if (dynamic_cast<Triangle *>(shape))
        cout << "Identified shape type: Triangle" << endl;

    delete shape;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Using dynamic_cast to check an object's type before performing an operation
 * @INPUT: process a list of Animal* only if they are actually Dog*
 * @OUTPUT: Processed a Dog, Skipped a non-Dog animal
 */
#include <iostream>
#include <vector>
using namespace std;

class Animal
{
public:
    virtual ~Animal() {}
};

class Dog : public Animal
{
};
class Cat : public Animal
{
};

int main()
{
    vector<Animal *> animals = {new Dog(), new Cat()};

    for (Animal *animal : animals)
    {
        if (dynamic_cast<Dog *>(animal))
            cout << "Processed a Dog" << endl;
        else
            cout << "Skipped a non-Dog animal" << endl;
    }

    for (Animal *animal : animals)
        delete animal;
    return 0;
}
/* @END */

/*
 * @PROGRAM: static_cast with a user-defined conversion between custom types
 * @INPUT: static_cast<Fahrenheit>(Celsius(100))
 * @OUTPUT: 212
 */
#include <iostream>
using namespace std;

class Fahrenheit
{
public:
    double value;
    Fahrenheit(double v) : value(v) {}
};

class Celsius
{
    double value;

public:
    Celsius(double v) : value(v) {}
    operator Fahrenheit() const { return Fahrenheit(value * 9.0 / 5.0 + 32); }
};

int main()
{
    Celsius c(100);
    Fahrenheit f = static_cast<Fahrenheit>(c); /* invokes the user-defined conversion operator */
    cout << f.value << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: reinterpret_cast for type punning (use with caution)
 * @INPUT: view the bytes of a float as an unsigned int
 * @OUTPUT: Raw bit pattern of the float printed as an unsigned integer
 */
#include <iostream>
using namespace std;

int main()
{
    float value = 1.5f;
    unsigned int *bits = reinterpret_cast<unsigned int *>(&value); /* technically UB per strict aliasing, illustrative only */

    cout << "Raw bit pattern of the float printed as an unsigned integer: " << *bits << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Cast from int to a scoped enum using static_cast
 * @INPUT: static_cast<Direction>(2)
 * @OUTPUT: East
 */
#include <iostream>
using namespace std;

enum class Direction
{
    North,
    South,
    East,
    West
};

int main()
{
    int value = 2;
    Direction dir = static_cast<Direction>(value); /* required explicitly for enum class */

    cout << (dir == Direction::East ? "East" : "Other") << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Difference between static_cast and a C-style cast in safety
 * @INPUT: attempting an invalid cast at compile time
 * @OUTPUT: static_cast fails to compile for unrelated types, C-style cast may silently misbehave
 */
#include <iostream>
using namespace std;

class Unrelated
{
};

int main()
{
    /* static_cast<Unrelated*>(somePointerOfADifferentType) would fail to compile
     * if the types are truly unrelated, catching mistakes early. A C-style cast
     * "(Unrelated*)somePointer" would often compile anyway, silently misbehaving. */
    cout << "static_cast fails to compile for unrelated types, C-style cast may silently misbehave" << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Cross-cast between sibling classes using dynamic_cast and a common virtual base
 * @INPUT: cast from one interface pointer to a sibling interface implemented by the same object
 * @OUTPUT: Cross-cast succeeded between sibling interfaces
 */
#include <iostream>
using namespace std;

class Printable
{
public:
    virtual ~Printable() {}
};

class Serializable
{
public:
    virtual ~Serializable() {}
};

class Document : public Printable, public Serializable
{
};

int main()
{
    Document doc;
    Printable *printable = &doc;

    Serializable *serializable = dynamic_cast<Serializable *>(printable); /* cross-cast via RTTI */

    cout << (serializable != nullptr ? "Cross-cast succeeded between sibling interfaces" : "Failed") << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: dynamic_cast requires a polymorphic base class (at least one virtual function)
 * @INPUT: a base class with a virtual destructor enabling dynamic_cast
 * @OUTPUT: dynamic_cast works because Base has a virtual function (the destructor)
 */
#include <iostream>
using namespace std;

class Base
{
public:
    virtual ~Base() {} /* required: without any virtual function, dynamic_cast won't compile */
};

class Derived : public Base
{
};

int main()
{
    Base *base = new Derived();
    Derived *derived = dynamic_cast<Derived *>(base);

    cout << (derived != nullptr ? "dynamic_cast works because Base has a virtual function (the destructor)" : "Failed") << endl;

    delete base;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Printing the actual runtime type name using typeid(*ptr).name()
 * @INPUT: Base* actually pointing to a Derived object
 * @OUTPUT: Runtime type name printed (compiler-mangled, but distinct from "Base")
 */
#include <iostream>
#include <typeinfo>
using namespace std;

class Base
{
public:
    virtual ~Base() {}
};

class Derived : public Base
{
};

int main()
{
    Base *base = new Derived();
    cout << "Runtime type name: " << typeid(*base).name() << endl; /* resolves to Derived, not Base */

    delete base;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Narrowing conversion made explicit using static_cast
 * @INPUT: static_cast<short>(70000)
 * @OUTPUT: Explicit narrowing cast performed (value may overflow, done intentionally)
 */
#include <iostream>
using namespace std;

int main()
{
    int large = 70000;
    short narrowed = static_cast<short>(large); /* explicit: signals the overflow is intentional */

    cout << "Explicit narrowing cast performed (value may overflow, done intentionally): " << narrowed << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Using const_cast together with static_cast in a safe accessor pattern
 * @INPUT: a const member function reusing a non-const helper via const_cast
 * @OUTPUT: Reused non-const logic safely from a const context
 */
#include <iostream>
using namespace std;

class Data
{
    mutable int cachedValue = -1;

public:
    int computeExpensiveValue() { return 42; }

    int getValue() const
    {
        if (cachedValue == -1)
            cachedValue = const_cast<Data *>(this)->computeExpensiveValue();
        return cachedValue;
    }
};

int main()
{
    const Data d;
    cout << "Reused non-const logic safely from a const context: " << d.getValue() << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Choosing the right cast - a quick summary program
 * @INPUT: (none)
 * @OUTPUT: static_cast: related types; dynamic_cast: polymorphic downcast; const_cast: constness; reinterpret_cast: unrelated types
 */
#include <iostream>
using namespace std;

int main()
{
    cout << "static_cast: related types; "
         << "dynamic_cast: polymorphic downcast; "
         << "const_cast: constness; "
         << "reinterpret_cast: unrelated types" << endl;
    return 0;
}
/* @END */
