/* @SECTION: C++ Programming */
/* @CHAPTER: OPERATOR OVERLOADING AND TEMPLATES */
/*
 * Each block below is a small, independent, self-contained example.
 * Compile individually: g++ file.cpp -o out
 */

/*
 * @PROGRAM: Overload the + operator for a Complex number class
 * @INPUT: (2+3i) + (4+5i)
 * @OUTPUT: 6 + 8i
 */
#include <iostream>
using namespace std;

class Complex
{
public:
    double real, imag;
    Complex(double r, double i) : real(r), imag(i) {}
    Complex operator+(const Complex &other)
    {
        return Complex(real + other.real, imag + other.imag);
    }
    void show() { cout << real << " + " << imag << "i" << endl; }
};

int main()
{
    Complex a(2, 3), b(4, 5);
    Complex c = a + b;
    c.show();
    return 0;
}
/* @END */

/*
 * @PROGRAM: Overload the - operator
 * @INPUT: (5+7i) - (2+3i)
 * @OUTPUT: 3 + 4i
 */
#include <iostream>
using namespace std;

class Complex
{
public:
    double real, imag;
    Complex(double r, double i) : real(r), imag(i) {}
    Complex operator-(const Complex &other)
    {
        return Complex(real - other.real, imag - other.imag);
    }
    void show() { cout << real << " + " << imag << "i" << endl; }
};

int main()
{
    Complex a(5, 7), b(2, 3);
    Complex c = a - b;
    c.show();
    return 0;
}
/* @END */

/*
 * @PROGRAM: Overload the == operator (comparison)
 * @INPUT: Point(1,2) == Point(1,2)
 * @OUTPUT: Points are equal
 */
#include <iostream>
using namespace std;

class Point
{
    int x, y;

public:
    Point(int a, int b) : x(a), y(b) {}
    bool operator==(const Point &other) { return x == other.x && y == other.y; }
};

int main()
{
    Point p1(1, 2), p2(1, 2);
    cout << ((p1 == p2) ? "Points are equal" : "Points differ") << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Overload the << operator for printing (as a friend function)
 * @INPUT: Point(3, 4)
 * @OUTPUT: (3, 4)
 */
#include <iostream>
using namespace std;

class Point
{
    int x, y;

public:
    Point(int a, int b) : x(a), y(b) {}
    friend ostream &operator<<(ostream &os, const Point &p);
};

ostream &operator<<(ostream &os, const Point &p)
{
    os << "(" << p.x << ", " << p.y << ")";
    return os;
}

int main()
{
    Point p(3, 4);
    cout << p << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Overload the >> operator for input
 * @INPUT: "10 20" typed by the user
 * @OUTPUT: Read point: (10, 20)
 */
#include <iostream>
using namespace std;

class Point
{
public:
    int x, y;
    friend istream &operator>>(istream &is, Point &p);
};

istream &operator>>(istream &is, Point &p)
{
    is >> p.x >> p.y;
    return is;
}

int main()
{
    Point p;
    cin >> p;
    cout << "Read point: (" << p.x << ", " << p.y << ")" << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Overload the [] (subscript) operator for a custom array class
 * @INPUT: myArray[2] = 99
 * @OUTPUT: 99
 */
#include <iostream>
using namespace std;

class MyArray
{
    int data[10] = {0};

public:
    int &operator[](int index) { return data[index]; }
};

int main()
{
    MyArray arr;
    arr[2] = 99;
    cout << arr[2] << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Overload the () operator (functor)
 * @INPUT: Multiplier(3)(5)
 * @OUTPUT: 15
 */
#include <iostream>
using namespace std;

class Multiplier
{
    int factor;

public:
    Multiplier(int f) : factor(f) {}
    int operator()(int value) { return value * factor; }
};

int main()
{
    Multiplier triple(3);
    cout << triple(5) << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Overload the prefix ++ operator
 * @INPUT: ++counter starting at 5
 * @OUTPUT: 6
 */
#include <iostream>
using namespace std;

class Counter
{
    int value;

public:
    Counter(int v) : value(v) {}
    Counter &operator++()
    {
        value++;
        return *this;
    }
    int get() { return value; }
};

int main()
{
    Counter c(5);
    ++c;
    cout << c.get() << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Overload the postfix ++ operator
 * @INPUT: counter++ starting at 5
 * @OUTPUT: Before: 5, After: 6
 */
#include <iostream>
using namespace std;

class Counter
{
    int value;

public:
    Counter(int v) : value(v) {}
    Counter operator++(int) /* dummy int marks it as postfix */
    {
        Counter old = *this;
        value++;
        return old;
    }
    int get() { return value; }
};

int main()
{
    Counter c(5);
    Counter before = c++;
    cout << "Before: " << before.get() << ", After: " << c.get() << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Overload the assignment (=) operator for a deep copy
 * @INPUT: assign one Buffer object to another
 * @OUTPUT: Deep copy successful, both buffers hold independent data
 */
#include <iostream>
#include <cstring>
using namespace std;

class Buffer
{
    char *data;

public:
    Buffer(const char *text) { data = strdup(text); }
    Buffer &operator=(const Buffer &other)
    {
        if (this != &other)
        {
            free(data);
            data = strdup(other.data);
        }
        return *this;
    }
    ~Buffer() { free(data); }
    const char *get() { return data; }
};

int main()
{
    Buffer a("original");
    Buffer b("temp");
    b = a; /* deep copy, not a shared pointer */
    cout << "Deep copy successful, both buffers hold independent data" << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Overload the + operator as a friend function
 * @INPUT: Vector2D(1,2) + Vector2D(3,4)
 * @OUTPUT: (4, 6)
 */
#include <iostream>
using namespace std;

class Vector2D
{
public:
    int x, y;
    Vector2D(int a, int b) : x(a), y(b) {}
    friend Vector2D operator+(const Vector2D &a, const Vector2D &b);
};

Vector2D operator+(const Vector2D &a, const Vector2D &b)
{
    return Vector2D(a.x + b.x, a.y + b.y);
}

int main()
{
    Vector2D v1(1, 2), v2(3, 4);
    Vector2D result = v1 + v2;
    cout << "(" << result.x << ", " << result.y << ")" << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Overload the -> operator (smart-pointer style)
 * @INPUT: wrapping a raw pointer
 * @OUTPUT: Accessing member through overloaded -> operator: 42
 */
#include <iostream>
using namespace std;

class Data
{
public:
    int value = 42;
};

class Wrapper
{
    Data *ptr;

public:
    Wrapper(Data *p) : ptr(p) {}
    Data *operator->() { return ptr; }
};

int main()
{
    Data d;
    Wrapper w(&d);
    cout << "Accessing member through overloaded -> operator: " << w->value << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Overload the * (dereference) operator
 * @INPUT: wrapping an int value
 * @OUTPUT: Dereferenced value: 100
 */
#include <iostream>
using namespace std;

class Box
{
    int value;

public:
    Box(int v) : value(v) {}
    int operator*() { return value; }
};

int main()
{
    Box b(100);
    cout << "Dereferenced value: " << *b << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Overload the < operator to sort custom objects
 * @INPUT: sort a list of Student objects by marks
 * @OUTPUT: Students sorted by marks ascending
 */
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Student
{
public:
    string name;
    int marks;
    bool operator<(const Student &other) const { return marks < other.marks; }
};

int main()
{
    vector<Student> students = {{"A", 80}, {"B", 60}, {"C", 90}};
    sort(students.begin(), students.end());

    for (auto &s : students)
        cout << s.name << ": " << s.marks << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Function template - generic max()
 * @INPUT: max(3, 7), max(2.5, 1.5)
 * @OUTPUT: 7, 2.5
 */
#include <iostream>
using namespace std;

template <typename T>
T myMax(T a, T b)
{
    return (a > b) ? a : b;
}

int main()
{
    cout << myMax(3, 7) << endl;
    cout << myMax(2.5, 1.5) << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Function template - generic swap()
 * @INPUT: swap(5, 10)
 * @OUTPUT: a=10, b=5
 */
#include <iostream>
using namespace std;

template <typename T>
void mySwap(T &a, T &b)
{
    T temp = a;
    a = b;
    b = temp;
}

int main()
{
    int a = 5, b = 10;
    mySwap(a, b);
    cout << "a=" << a << ", b=" << b << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Class template - generic Stack<T>
 * @INPUT: push 1, 2, 3 then pop
 * @OUTPUT: Popped: 3
 */
#include <iostream>
#include <vector>
using namespace std;

template <typename T>
class Stack
{
    vector<T> data;

public:
    void push(T value) { data.push_back(value); }
    T pop()
    {
        T top = data.back();
        data.pop_back();
        return top;
    }
};

int main()
{
    Stack<int> s;
    s.push(1);
    s.push(2);
    s.push(3);
    cout << "Popped: " << s.pop() << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Class template - generic Pair<T1, T2>
 * @INPUT: Pair<string, int>("age", 30)
 * @OUTPUT: age: 30
 */
#include <iostream>
using namespace std;

template <typename T1, typename T2>
class Pair
{
public:
    T1 first;
    T2 second;
    Pair(T1 a, T2 b) : first(a), second(b) {}
};

int main()
{
    Pair<string, int> p("age", 30);
    cout << p.first << ": " << p.second << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Template with multiple type parameters and a return type
 * @INPUT: add<int, double>(3, 2.5)
 * @OUTPUT: 5.5
 */
#include <iostream>
using namespace std;

template <typename T1, typename T2>
auto add(T1 a, T2 b) -> decltype(a + b)
{
    return a + b;
}

int main()
{
    cout << add(3, 2.5) << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Template specialization
 * @INPUT: describe<int>(5), describe<const char*>("hi")
 * @OUTPUT: Generic type, Specialized for strings: hi
 */
#include <iostream>
using namespace std;

template <typename T>
void describe(T value)
{
    cout << "Generic type" << endl;
}

template <>
void describe(const char *value)
{
    cout << "Specialized for strings: " << value << endl;
}

int main()
{
    describe(5);
    describe("hi");
    return 0;
}
/* @END */

/*
 * @PROGRAM: Variadic templates (sum of N arguments)
 * @INPUT: sum(1, 2, 3, 4)
 * @OUTPUT: 10
 */
#include <iostream>
using namespace std;

template <typename T>
T sum(T value)
{
    return value;
}

template <typename T, typename... Args>
T sum(T first, Args... rest)
{
    return first + sum(rest...);
}

int main()
{
    cout << sum(1, 2, 3, 4) << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Template with a default template argument
 * @INPUT: Container<int> and Container<>
 * @OUTPUT: Uses default type when none is specified
 */
#include <iostream>
using namespace std;

template <typename T = int>
class Container
{
public:
    T value;
    Container(T v) : value(v) {}
};

int main()
{
    Container<> c(5); /* uses default template argument T = int */
    cout << "Uses default type when none is specified: " << c.value << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Template function overloading vs full specialization
 * @INPUT: process(5) matches the overload for int explicitly
 * @OUTPUT: Overload for int called: 5
 */
#include <iostream>
using namespace std;

template <typename T>
void process(T value)
{
    cout << "Generic template called" << endl;
}

void process(int value)
{
    cout << "Overload for int called: " << value << endl;
}

int main()
{
    process(5);   /* non-template overload preferred over template */
    process(2.5); /* falls back to the template version */
    return 0;
}
/* @END */

/*
 * @PROGRAM: Generic singly linked list using templates
 * @INPUT: push 1, 2, 3
 * @OUTPUT: 3 2 1
 */
#include <iostream>
using namespace std;

template <typename T>
struct Node
{
    T data;
    Node *next;
};

template <typename T>
class LinkedList
{
    Node<T> *head = nullptr;

public:
    void pushFront(T value)
    {
        Node<T> *node = new Node<T>{value, head};
        head = node;
    }
    void print()
    {
        for (Node<T> *cur = head; cur != nullptr; cur = cur->next)
            cout << cur->data << " ";
        cout << endl;
    }
};

int main()
{
    LinkedList<int> list;
    list.pushFront(1);
    list.pushFront(2);
    list.pushFront(3);
    list.print();
    return 0;
}
/* @END */

/*
 * @PROGRAM: constexpr function template evaluated at compile time
 * @INPUT: square(5)
 * @OUTPUT: 25
 */
#include <iostream>
using namespace std;

template <typename T>
constexpr T square(T value)
{
    return value * value;
}

int main()
{
    constexpr int result = square(5); /* computed at compile time */
    cout << result << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: SFINAE / std::enable_if simple demo
 * @INPUT: process(5) for integral types only
 * @OUTPUT: Processing an integral type: 5
 */
#include <iostream>
#include <type_traits>
using namespace std;

template <typename T>
typename enable_if<is_integral<T>::value, void>::type
process(T value)
{
    cout << "Processing an integral type: " << value << endl;
}

int main()
{
    process(5); /* only compiles for integral types thanks to enable_if */
    return 0;
}
/* @END */

/*
 * @PROGRAM: Template metaprogramming - factorial computed at compile time
 * @INPUT: Factorial<5>::value
 * @OUTPUT: 120
 */
#include <iostream>
using namespace std;

template <int N>
struct Factorial
{
    static const int value = N * Factorial<N - 1>::value;
};

template <>
struct Factorial<0>
{
    static const int value = 1;
};

int main()
{
    cout << Factorial<5>::value << endl; /* computed entirely at compile time */
    return 0;
}
/* @END */

/*
 * @PROGRAM: Overload the += (compound assignment) operator
 * @INPUT: Money(100) += Money(50)
 * @OUTPUT: 150
 */
#include <iostream>
using namespace std;

class Money
{
    int amount;

public:
    Money(int a) : amount(a) {}
    Money &operator+=(const Money &other)
    {
        amount += other.amount;
        return *this;
    }
    int get() { return amount; }
};

int main()
{
    Money wallet(100);
    Money bonus(50);
    wallet += bonus;
    cout << wallet.get() << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Overload the unary - operator (negation)
 * @INPUT: -Point(3, 4)
 * @OUTPUT: (-3, -4)
 */
#include <iostream>
using namespace std;

class Point
{
public:
    int x, y;
    Point(int a, int b) : x(a), y(b) {}
    Point operator-() const { return Point(-x, -y); }
};

int main()
{
    Point p(3, 4);
    Point negated = -p;
    cout << "(" << negated.x << ", " << negated.y << ")" << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Overload new/delete operators for custom memory tracking
 * @INPUT: allocate and free one MyClass object
 * @OUTPUT: Custom new called, Custom delete called
 */
#include <iostream>
using namespace std;

class MyClass
{
public:
    void *operator new(size_t size)
    {
        cout << "Custom new called" << endl;
        return malloc(size);
    }
    void operator delete(void *ptr)
    {
        cout << "Custom delete called" << endl;
        free(ptr);
    }
};

int main()
{
    MyClass *obj = new MyClass();
    delete obj;
    return 0;
}
/* @END */
