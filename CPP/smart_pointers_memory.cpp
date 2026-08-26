/* @SECTION: C++ Programming */
/* @CHAPTER: SMART POINTERS AND MEMORY MANAGEMENT */
/*
 * Each block below is a small, independent, self-contained example.
 * Compile individually: g++ file.cpp -o out (use -std=c++14 or newer)
 */

/*
 * @PROGRAM: unique_ptr basics
 * @INPUT: (none)
 * @OUTPUT: Value: 42
 */
#include <iostream>
#include <memory>
using namespace std;

int main()
{
    unique_ptr<int> ptr(new int(42));
    cout << "Value: " << *ptr << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: unique_ptr with a custom deleter
 * @INPUT: (none)
 * @OUTPUT: Custom deleter called
 */
#include <iostream>
#include <memory>
using namespace std;

int main()
{
    auto deleter = [](int *p)
    {
        cout << "Custom deleter called" << endl;
        delete p;
    };

    unique_ptr<int, decltype(deleter)> ptr(new int(10), deleter);
    return 0;
}
/* @END */

/*
 * @PROGRAM: Moving a unique_ptr (transfer ownership)
 * @INPUT: (none)
 * @OUTPUT: ptr1 is now empty, ptr2 owns the value: 5
 */
#include <iostream>
#include <memory>
using namespace std;

int main()
{
    unique_ptr<int> ptr1(new int(5));
    unique_ptr<int> ptr2 = move(ptr1); /* ownership transferred */

    cout << "ptr1 is now " << (ptr1 == nullptr ? "empty" : "not empty") << endl;
    cout << "ptr2 owns the value: " << *ptr2 << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: shared_ptr basics
 * @INPUT: (none)
 * @OUTPUT: Value: 100
 */
#include <iostream>
#include <memory>
using namespace std;

int main()
{
    shared_ptr<int> ptr(new int(100));
    cout << "Value: " << *ptr << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: shared_ptr use_count() demo
 * @INPUT: two shared_ptr instances pointing to the same object
 * @OUTPUT: Use count: 2
 */
#include <iostream>
#include <memory>
using namespace std;

int main()
{
    shared_ptr<int> a(new int(5));
    shared_ptr<int> b = a;

    cout << "Use count: " << a.use_count() << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: weak_ptr to break a circular reference
 * @INPUT: two objects referencing each other
 * @OUTPUT: Both objects destroyed correctly (no memory leak)
 */
#include <iostream>
#include <memory>
using namespace std;

struct B;

struct A
{
    shared_ptr<B> b;
    ~A() { cout << "A destroyed" << endl; }
};

struct B
{
    weak_ptr<A> a; /* weak_ptr avoids the reference cycle */
    ~B() { cout << "B destroyed" << endl; }
};

int main()
{
    auto a = make_shared<A>();
    auto b = make_shared<B>();
    a->b = b;
    b->a = a;

    cout << "Both objects destroyed correctly (no memory leak)" << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: make_unique usage
 * @INPUT: (none)
 * @OUTPUT: 25
 */
#include <iostream>
#include <memory>
using namespace std;

int main()
{
    auto ptr = make_unique<int>(25); /* safer than "new" + unique_ptr constructor */
    cout << *ptr << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: make_shared usage
 * @INPUT: (none)
 * @OUTPUT: 50
 */
#include <iostream>
#include <memory>
using namespace std;

int main()
{
    auto ptr = make_shared<int>(50); /* single allocation for object + control block */
    cout << *ptr << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: shared_ptr with a custom deleter
 * @INPUT: (none)
 * @OUTPUT: Custom deleter for shared_ptr called
 */
#include <iostream>
#include <memory>
using namespace std;

int main()
{
    shared_ptr<int> ptr(new int(1), [](int *p)
                        {
		cout << "Custom deleter for shared_ptr called" << endl;
		delete p; });
    return 0;
}
/* @END */

/*
 * @PROGRAM: Smart pointer managing a dynamically allocated array
 * @INPUT: array of 5 ints
 * @OUTPUT: 0 1 2 3 4
 */
#include <iostream>
#include <memory>
using namespace std;

int main()
{
    unique_ptr<int[]> arr(new int[5]);

    for (int i = 0; i < 5; i++)
        arr[i] = i;

    for (int i = 0; i < 5; i++)
        cout << arr[i] << " ";
    cout << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Raw pointer vs smart pointer comparison
 * @INPUT: (none)
 * @OUTPUT: Raw pointer requires manual delete; smart pointer cleans up automatically
 */
#include <iostream>
#include <memory>
using namespace std;

int main()
{
    int *raw = new int(1);
    delete raw; /* must remember to do this manually */

    unique_ptr<int> smart(new int(1)); /* cleaned up automatically at scope end */

    cout << "Raw pointer requires manual delete; smart pointer cleans up automatically" << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: new/delete basics
 * @INPUT: (none)
 * @OUTPUT: Value: 7
 */
#include <iostream>
using namespace std;

int main()
{
    int *ptr = new int(7);
    cout << "Value: " << *ptr << endl;
    delete ptr;
    return 0;
}
/* @END */

/*
 * @PROGRAM: new[]/delete[] for dynamic arrays
 * @INPUT: array of 3 ints
 * @OUTPUT: 10 20 30
 */
#include <iostream>
using namespace std;

int main()
{
    int *arr = new int[3]{10, 20, 30};

    for (int i = 0; i < 3; i++)
        cout << arr[i] << " ";
    cout << endl;

    delete[] arr; /* must use delete[] for arrays, not delete */
    return 0;
}
/* @END */

/*
 * @PROGRAM: Memory leak demonstration (missing delete)
 * @INPUT: allocate memory in a loop without freeing it
 * @OUTPUT: Leaked 1000 integers (no delete called - demonstration only)
 */
#include <iostream>
using namespace std;

int main()
{
    for (int i = 0; i < 1000; i++)
        new int(i); /* leaked: no matching delete, avoid this in real code */

    cout << "Leaked 1000 integers (no delete called - demonstration only)" << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Dangling pointer demonstration
 * @INPUT: use a pointer after the memory it points to is freed
 * @OUTPUT: Pointer set to nullptr immediately after delete to avoid dangling use
 */
#include <iostream>
using namespace std;

int main()
{
    int *ptr = new int(5);
    delete ptr;
    ptr = nullptr; /* best practice: avoid a dangling pointer */

    cout << "Pointer set to nullptr immediately after delete to avoid dangling use" << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: RAII pattern with a custom resource-managing class
 * @INPUT: (none)
 * @OUTPUT: File-like resource opened, File-like resource closed automatically
 */
#include <iostream>
using namespace std;

class FileHandle
{
public:
    FileHandle() { cout << "File-like resource opened" << endl; }
    ~FileHandle() { cout << "File-like resource closed automatically" << endl; }
};

int main()
{
    FileHandle f; /* resource released deterministically when f goes out of scope */
    return 0;
}
/* @END */

/*
 * @PROGRAM: Rule of Three - copy constructor, copy assignment, destructor
 * @INPUT: class managing a raw resource
 * @OUTPUT: Deep copy created independently of the original
 */
#include <iostream>
#include <cstring>
using namespace std;

class Buffer
{
    char *data;

public:
    Buffer(const char *text) { data = strdup(text); }
    Buffer(const Buffer &other) { data = strdup(other.data); } /* copy constructor */
    Buffer &operator=(const Buffer &other)                     /* copy assignment */
    {
        if (this != &other)
        {
            free(data);
            data = strdup(other.data);
        }
        return *this;
    }
    ~Buffer() { free(data); } /* destructor */
};

int main()
{
    Buffer a("hello");
    Buffer b = a; /* uses copy constructor */
    cout << "Deep copy created independently of the original" << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Rule of Five - adds move constructor and move assignment
 * @INPUT: class managing a raw resource, moved instead of copied
 * @OUTPUT: Resource moved without an extra deep copy
 */
#include <iostream>
#include <cstring>
using namespace std;

class Buffer
{
    char *data;

public:
    Buffer(const char *text) { data = strdup(text); }
    Buffer(const Buffer &other) { data = strdup(other.data); }
    Buffer(Buffer &&other) noexcept : data(other.data) { other.data = nullptr; } /* move ctor */
    Buffer &operator=(Buffer &&other) noexcept                                   /* move assignment */
    {
        if (this != &other)
        {
            free(data);
            data = other.data;
            other.data = nullptr;
        }
        return *this;
    }
    ~Buffer() { free(data); }
};

int main()
{
    Buffer a("hello");
    Buffer b = move(a); /* uses move constructor, no deep copy */
    cout << "Resource moved without an extra deep copy" << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Move semantics using std::move
 * @INPUT: move a std::string instead of copying it
 * @OUTPUT: source is now empty, destination holds: Hello World
 */
#include <iostream>
#include <string>
using namespace std;

int main()
{
    string source = "Hello World";
    string destination = move(source); /* avoids copying the string's buffer */

    cout << "source is now " << (source.empty() ? "empty" : "not empty") << endl;
    cout << "destination holds: " << destination << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::swap combined with move semantics
 * @INPUT: swap two vectors
 * @OUTPUT: Vectors swapped without copying their elements
 */
#include <iostream>
#include <vector>
using namespace std;

int main()
{
    vector<int> a = {1, 2, 3};
    vector<int> b = {4, 5, 6};

    swap(a, b); /* internally uses move semantics, no element-by-element copy */
    cout << "Vectors swapped without copying their elements" << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Simplified custom unique_ptr implementation
 * @INPUT: (none)
 * @OUTPUT: Value: 15, then automatically deleted at scope end
 */
#include <iostream>
using namespace std;

template <typename T>
class SimpleUniquePtr
{
    T *ptr;

public:
    explicit SimpleUniquePtr(T *p) : ptr(p) {}
    ~SimpleUniquePtr() { delete ptr; }
    T &operator*() { return *ptr; }
    SimpleUniquePtr(const SimpleUniquePtr &) = delete; /* non-copyable, like std::unique_ptr */
};

int main()
{
    SimpleUniquePtr<int> ptr(new int(15));
    cout << "Value: " << *ptr << ", then automatically deleted at scope end" << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: shared_ptr circular reference problem (memory leak without weak_ptr)
 * @INPUT: two shared_ptrs referencing each other
 * @OUTPUT: Circular shared_ptr reference would leak memory (fixed by using weak_ptr)
 */
#include <iostream>
#include <memory>
using namespace std;

struct Node
{
    shared_ptr<Node> next; /* if both nodes point to each other, neither's count reaches 0 */
    ~Node() { cout << "Node destroyed" << endl; }
};

int main()
{
    cout << "Circular shared_ptr reference would leak memory (fixed by using weak_ptr)" << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: weak_ptr::lock() usage
 * @INPUT: check if the managed object still exists
 * @OUTPUT: Object still alive: 7, Object has been destroyed
 */
#include <iostream>
#include <memory>
using namespace std;

int main()
{
    weak_ptr<int> weak;
    {
        shared_ptr<int> shared = make_shared<int>(7);
        weak = shared;

        if (auto locked = weak.lock())
            cout << "Object still alive: " << *locked << endl;
    }

    if (weak.expired())
        cout << "Object has been destroyed" << endl;

    return 0;
}
/* @END */

/*
 * @PROGRAM: Smart pointers stored in a container (vector of unique_ptr)
 * @INPUT: 3 dynamically allocated ints
 * @OUTPUT: 1 2 3
 */
#include <iostream>
#include <vector>
#include <memory>
using namespace std;

int main()
{
    vector<unique_ptr<int>> values;
    values.push_back(make_unique<int>(1));
    values.push_back(make_unique<int>(2));
    values.push_back(make_unique<int>(3));

    for (auto &v : values)
        cout << *v << " ";
    cout << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Passing a unique_ptr to a function (by value = move)
 * @INPUT: transfer ownership into a function
 * @OUTPUT: Function now owns the value: 99
 */
#include <iostream>
#include <memory>
using namespace std;

void takeOwnership(unique_ptr<int> ptr)
{
    cout << "Function now owns the value: " << *ptr << endl;
}

int main()
{
    unique_ptr<int> ptr = make_unique<int>(99);
    takeOwnership(move(ptr)); /* must explicitly move; unique_ptr can't be copied */
    return 0;
}
/* @END */

/*
 * @PROGRAM: Returning a unique_ptr from a function
 * @INPUT: factory function creating a new object
 * @OUTPUT: Created value: 33
 */
#include <iostream>
#include <memory>
using namespace std;

unique_ptr<int> createValue()
{
    return make_unique<int>(33); /* implicitly moved out via NRVO/move semantics */
}

int main()
{
    unique_ptr<int> ptr = createValue();
    cout << "Created value: " << *ptr << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: enable_shared_from_this usage
 * @INPUT: an object that needs to hand out a shared_ptr to itself
 * @OUTPUT: Retrieved a valid shared_ptr to self
 */
#include <iostream>
#include <memory>
using namespace std;

class Widget : public enable_shared_from_this<Widget>
{
public:
    shared_ptr<Widget> getSelf() { return shared_from_this(); }
};

int main()
{
    auto widget = make_shared<Widget>();
    auto self = widget->getSelf();

    cout << (self != nullptr ? "Retrieved a valid shared_ptr to self" : "Failed") << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Placement new
 * @INPUT: constructing an object in pre-allocated memory
 * @OUTPUT: Object constructed in place with value: 21
 */
#include <iostream>
using namespace std;

class Point
{
public:
    int x;
    Point(int v) : x(v) {}
};

int main()
{
    alignas(Point) char buffer[sizeof(Point)];
    Point *p = new (buffer) Point(21); /* construct directly into "buffer" */

    cout << "Object constructed in place with value: " << p->x << endl;
    p->~Point(); /* must manually call the destructor for placement new */
    return 0;
}
/* @END */

/*
 * @PROGRAM: Custom allocator concept demo
 * @INPUT: a minimal allocator that logs allocations
 * @OUTPUT: Allocating 4 bytes, Custom allocator used successfully
 */
#include <iostream>
#include <vector>
using namespace std;

template <typename T>
struct LoggingAllocator
{
    using value_type = T;
    LoggingAllocator() = default;

    T *allocate(size_t n)
    {
        cout << "Allocating " << n * sizeof(T) << " bytes" << endl;
        return static_cast<T *>(::operator new(n * sizeof(T)));
    }
    void deallocate(T *p, size_t) { ::operator delete(p); }
};

int main()
{
    vector<int, LoggingAllocator<int>> v;
    v.push_back(1);
    cout << "Custom allocator used successfully" << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Comparing manual memory management vs smart pointers
 * @INPUT: same task done with new/delete, then with unique_ptr
 * @OUTPUT: Manual: value=1 (must remember delete); Smart: value=1 (auto-cleaned)
 */
#include <iostream>
#include <memory>
using namespace std;

int main()
{
    int *manual = new int(1);
    cout << "Manual: value=" << *manual << " (must remember delete)" << endl;
    delete manual;

    unique_ptr<int> smart = make_unique<int>(1);
    cout << "Smart: value=" << *smart << " (auto-cleaned)" << endl;
    return 0;
}
/* @END */
