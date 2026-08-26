/* @SECTION: C++ Programming */
/* @CHAPTER: EXCEPTION HANDLING AND FILE I/O */
/*
 * Each block below is a small, independent, self-contained example.
 * Compile individually: g++ file.cpp -o out
 */

/*
 * @PROGRAM: Basic try/catch block
 * @INPUT: divide by zero
 * @OUTPUT: Caught exception: Division by zero
 */
#include <iostream>
#include <stdexcept>
using namespace std;

int main()
{
    try
    {
        throw runtime_error("Division by zero");
    }
    catch (const exception &e)
    {
        cout << "Caught exception: " << e.what() << endl;
    }
    return 0;
}
/* @END */

/*
 * @PROGRAM: Throwing and catching a custom exception
 * @INPUT: throw InvalidAge()
 * @OUTPUT: Caught: Age cannot be negative
 */
#include <iostream>
using namespace std;

class InvalidAge
{
public:
    string message = "Age cannot be negative";
};

int main()
{
    try
    {
        throw InvalidAge();
    }
    catch (const InvalidAge &e)
    {
        cout << "Caught: " << e.message << endl;
    }
    return 0;
}
/* @END */

/*
 * @PROGRAM: Catching multiple exception types
 * @INPUT: throw an int, then a string
 * @OUTPUT: Caught an int exception, Caught a string exception
 */
#include <iostream>
using namespace std;

void testCatch(bool throwInt)
{
    try
    {
        if (throwInt)
            throw 42;
        else
            throw string("error");
    }
    catch (int e)
    {
        cout << "Caught an int exception" << endl;
    }
    catch (const string &e)
    {
        cout << "Caught a string exception" << endl;
    }
}

int main()
{
    testCatch(true);
    testCatch(false);
    return 0;
}
/* @END */

/*
 * @PROGRAM: Catch-all handler using catch(...)
 * @INPUT: throw an unexpected type
 * @OUTPUT: Caught an unknown exception type
 */
#include <iostream>
using namespace std;

int main()
{
    try
    {
        throw 3.14; /* not specifically handled below */
    }
    catch (int e)
    {
        cout << "Caught int" << endl;
    }
    catch (...)
    {
        cout << "Caught an unknown exception type" << endl;
    }
    return 0;
}
/* @END */

/*
 * @PROGRAM: Rethrowing an exception
 * @INPUT: catch, log, then rethrow
 * @OUTPUT: Logged in inner handler, Handled in outer handler
 */
#include <iostream>
#include <stdexcept>
using namespace std;

void innerFunction()
{
    try
    {
        throw runtime_error("original error");
    }
    catch (...)
    {
        cout << "Logged in inner handler" << endl;
        throw; /* rethrow the same exception */
    }
}

int main()
{
    try
    {
        innerFunction();
    }
    catch (const exception &e)
    {
        cout << "Handled in outer handler" << endl;
    }
    return 0;
}
/* @END */

/*
 * @PROGRAM: Custom exception class deriving from std::exception
 * @INPUT: throw MyException
 * @OUTPUT: Custom exception occurred: Something went wrong
 */
#include <iostream>
#include <exception>
using namespace std;

class MyException : public exception
{
public:
    const char *what() const noexcept override { return "Something went wrong"; }
};

int main()
{
    try
    {
        throw MyException();
    }
    catch (const exception &e)
    {
        cout << "Custom exception occurred: " << e.what() << endl;
    }
    return 0;
}
/* @END */

/*
 * @PROGRAM: Using the what() message from a standard exception
 * @INPUT: std::out_of_range("index too large")
 * @OUTPUT: index too large
 */
#include <iostream>
#include <stdexcept>
using namespace std;

int main()
{
    try
    {
        throw out_of_range("index too large");
    }
    catch (const exception &e)
    {
        cout << e.what() << endl;
    }
    return 0;
}
/* @END */

/*
 * @PROGRAM: Stack unwinding demonstration
 * @INPUT: nested function calls with local objects
 * @OUTPUT: Destructor called during stack unwinding, Exception caught in main
 */
#include <iostream>
#include <stdexcept>
using namespace std;

class Tracker
{
public:
    ~Tracker() { cout << "Destructor called during stack unwinding" << endl; }
};

void risky()
{
    Tracker t;
    throw runtime_error("failure");
}

int main()
{
    try
    {
        risky();
    }
    catch (...)
    {
        cout << "Exception caught in main" << endl;
    }
    return 0;
}
/* @END */

/*
 * @PROGRAM: The noexcept specifier
 * @INPUT: (none)
 * @OUTPUT: This function promises not to throw
 */
#include <iostream>
using namespace std;

void safeFunction() noexcept
{
    cout << "This function promises not to throw" << endl;
}

int main()
{
    safeFunction();
    return 0;
}
/* @END */

/*
 * @PROGRAM: Exception safety using RAII
 * @INPUT: exception thrown while a resource is held
 * @OUTPUT: Resource acquired, Resource released automatically, Exception handled
 */
#include <iostream>
#include <stdexcept>
using namespace std;

class Resource
{
public:
    Resource() { cout << "Resource acquired" << endl; }
    ~Resource() { cout << "Resource released automatically" << endl; }
};

int main()
{
    try
    {
        Resource r; /* released via destructor even if an exception is thrown */
        throw runtime_error("failure");
    }
    catch (...)
    {
        cout << "Exception handled" << endl;
    }
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::out_of_range exception from vector::at()
 * @INPUT: vector of size 3, access index 10
 * @OUTPUT: Caught: vector::_M_range_check ... (out_of_range message)
 */
#include <iostream>
#include <vector>
#include <stdexcept>
using namespace std;

int main()
{
    vector<int> v = {1, 2, 3};

    try
    {
        cout << v.at(10) << endl; /* throws std::out_of_range, unlike v[10] */
    }
    catch (const out_of_range &e)
    {
        cout << "Caught: " << e.what() << endl;
    }
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::invalid_argument and std::runtime_error usage
 * @INPUT: negative value passed to a function expecting non-negative
 * @OUTPUT: Caught: Value must be non-negative
 */
#include <iostream>
#include <stdexcept>
using namespace std;

void validate(int value)
{
    if (value < 0)
        throw invalid_argument("Value must be non-negative");
}

int main()
{
    try
    {
        validate(-5);
    }
    catch (const invalid_argument &e)
    {
        cout << "Caught: " << e.what() << endl;
    }
    return 0;
}
/* @END */

/*
 * @PROGRAM: Nested try/catch blocks
 * @INPUT: inner exception handled separately from outer
 * @OUTPUT: Inner catch handled it, Outer code continues normally
 */
#include <iostream>
#include <stdexcept>
using namespace std;

int main()
{
    try
    {
        try
        {
            throw runtime_error("inner failure");
        }
        catch (const exception &e)
        {
            cout << "Inner catch handled it" << endl;
        }
        cout << "Outer code continues normally" << endl;
    }
    catch (...)
    {
        cout << "This won't run" << endl;
    }
    return 0;
}
/* @END */

/*
 * @PROGRAM: Exception thrown from a constructor
 * @INPUT: construct an object with an invalid value
 * @OUTPUT: Caught: Invalid initial value
 */
#include <iostream>
#include <stdexcept>
using namespace std;

class Positive
{
public:
    Positive(int value)
    {
        if (value <= 0)
            throw invalid_argument("Invalid initial value");
    }
};

int main()
{
    try
    {
        Positive p(-1);
    }
    catch (const exception &e)
    {
        cout << "Caught: " << e.what() << endl;
    }
    return 0;
}
/* @END */

/*
 * @PROGRAM: Function-try-block (catching exceptions from constructor init list)
 * @INPUT: base class constructor throws
 * @OUTPUT: Caught in function-try-block: base failed
 */
#include <iostream>
#include <stdexcept>
using namespace std;

class Base
{
public:
    Base() { throw runtime_error("base failed"); }
};

class Derived : public Base
{
public:
    Derived()
    try : Base()
    {
    }
    catch (const exception &e)
    {
        cout << "Caught in function-try-block: " << e.what() << endl;
    }
};

int main()
{
    try
    {
        Derived d;
    }
    catch (...)
    {
        cout << "Exception propagated after function-try-block" << endl;
    }
    return 0;
}
/* @END */

/*
 * @PROGRAM: Writing to a file using ofstream
 * @INPUT: "Hello, File!"
 * @OUTPUT: File written successfully
 */
#include <iostream>
#include <fstream>
using namespace std;

int main()
{
    ofstream out("output.txt");
    out << "Hello, File!" << endl;
    out.close();
    cout << "File written successfully" << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Reading from a file using ifstream
 * @INPUT: output.txt containing "Hello, File!"
 * @OUTPUT: Hello, File!
 */
#include <iostream>
#include <fstream>
using namespace std;

int main()
{
    ifstream in("output.txt");
    string line;

    if (getline(in, line))
        cout << line << endl;

    return 0;
}
/* @END */

/*
 * @PROGRAM: Appending to a file
 * @INPUT: append "Another line" to output.txt
 * @OUTPUT: Line appended successfully
 */
#include <iostream>
#include <fstream>
using namespace std;

int main()
{
    ofstream out("output.txt", ios::app);
    out << "Another line" << endl;
    out.close();
    cout << "Line appended successfully" << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Reading a file line by line
 * @INPUT: a multi-line text file
 * @OUTPUT: Each line printed with its line number
 */
#include <iostream>
#include <fstream>
using namespace std;

int main()
{
    ifstream in("output.txt");
    string line;
    int lineNumber = 1;

    while (getline(in, line))
        cout << lineNumber++ << ": " << line << endl;

    return 0;
}
/* @END */

/*
 * @PROGRAM: Checking if a file exists/opened successfully
 * @INPUT: "missing.txt" (does not exist)
 * @OUTPUT: Failed to open file
 */
#include <iostream>
#include <fstream>
using namespace std;

int main()
{
    ifstream in("missing.txt");

    if (!in.is_open())
        cout << "Failed to open file" << endl;
    else
        cout << "File opened successfully" << endl;

    return 0;
}
/* @END */

/*
 * @PROGRAM: Binary file read/write
 * @INPUT: write an int in binary, then read it back
 * @OUTPUT: Read back value: 12345
 */
#include <iostream>
#include <fstream>
using namespace std;

int main()
{
    int value = 12345;

    ofstream out("data.bin", ios::binary);
    out.write(reinterpret_cast<char *>(&value), sizeof(value));
    out.close();

    int readValue;
    ifstream in("data.bin", ios::binary);
    in.read(reinterpret_cast<char *>(&readValue), sizeof(readValue));

    cout << "Read back value: " << readValue << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Reading formatted numeric data from a file
 * @INPUT: file containing "10 20 30"
 * @OUTPUT: Sum: 60
 */
#include <iostream>
#include <fstream>
using namespace std;

int main()
{
    ofstream out("numbers.txt");
    out << "10 20 30";
    out.close();

    ifstream in("numbers.txt");
    int a, b, c;
    in >> a >> b >> c;

    cout << "Sum: " << (a + b + c) << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Using fstream to both read and write the same file
 * @INPUT: write then read back without reopening
 * @OUTPUT: Value read back: 99
 */
#include <iostream>
#include <fstream>
using namespace std;

int main()
{
    fstream file("shared.txt", ios::in | ios::out | ios::trunc);
    file << 99;
    file.seekg(0); /* rewind before reading */

    int value;
    file >> value;
    cout << "Value read back: " << value << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Copying file contents using streams
 * @INPUT: copy output.txt to copy.txt
 * @OUTPUT: File copied successfully
 */
#include <iostream>
#include <fstream>
using namespace std;

int main()
{
    ifstream src("output.txt");
    ofstream dst("copy.txt");

    dst << src.rdbuf(); /* stream the whole buffer across */
    cout << "File copied successfully" << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Counting lines and words in a file
 * @INPUT: a text file with several lines
 * @OUTPUT: Lines: 3, Words: 8
 */
#include <iostream>
#include <fstream>
#include <sstream>
using namespace std;

int main()
{
    ofstream out("count.txt");
    out << "hello world\nfoo bar baz\none two three";
    out.close();

    ifstream in("count.txt");
    string line;
    int lines = 0, words = 0;

    while (getline(in, line))
    {
        lines++;
        istringstream iss(line);
        string word;
        while (iss >> word)
            words++;
    }

    cout << "Lines: " << lines << ", Words: " << words << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Using std::stringstream to parse a string
 * @INPUT: "42 3.14 hello"
 * @OUTPUT: int=42, double=3.14, word=hello
 */
#include <iostream>
#include <sstream>
using namespace std;

int main()
{
    stringstream ss("42 3.14 hello");
    int i;
    double d;
    string word;

    ss >> i >> d >> word;
    cout << "int=" << i << ", double=" << d << ", word=" << word << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Writing structured (CSV-like) data to a file
 * @INPUT: name,age rows
 * @OUTPUT: CSV file written with header and two rows
 */
#include <iostream>
#include <fstream>
using namespace std;

int main()
{
    ofstream out("people.csv");
    out << "name,age\n";
    out << "Alice,30\n";
    out << "Bob,25\n";
    out.close();

    cout << "CSV file written with header and two rows" << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Combining exception handling with file I/O
 * @INPUT: attempt to open a non-existent file and throw if it fails
 * @OUTPUT: Caught: Could not open file
 */
#include <iostream>
#include <fstream>
#include <stdexcept>
using namespace std;

void readRequiredFile(const string &path)
{
    ifstream in(path);
    if (!in.is_open())
        throw runtime_error("Could not open file");
}

int main()
{
    try
    {
        readRequiredFile("does_not_exist.txt");
    }
    catch (const exception &e)
    {
        cout << "Caught: " << e.what() << endl;
    }
    return 0;
}
/* @END */

/*
 * @PROGRAM: Custom exception hierarchy (base + derived exceptions)
 * @INPUT: throw a NetworkException (derived from AppException)
 * @OUTPUT: Caught as base type: Network failure
 */
#include <iostream>
using namespace std;

class AppException
{
public:
    virtual string message() const { return "Generic application error"; }
    virtual ~AppException() {}
};

class NetworkException : public AppException
{
public:
    string message() const override { return "Network failure"; }
};

int main()
{
    try
    {
        throw NetworkException();
    }
    catch (const AppException &e) /* caught via the common base type */
    {
        cout << "Caught as base type: " << e.message() << endl;
    }
    return 0;
}
/* @END */

/*
 * @PROGRAM: Using std::set_terminate for uncaught exceptions
 * @INPUT: an exception escapes all try/catch blocks
 * @OUTPUT: Custom terminate handler invoked
 */
#include <iostream>
#include <cstdlib>
using namespace std;

void customTerminate()
{
    cout << "Custom terminate handler invoked" << endl;
    abort();
}

int main()
{
    set_terminate(customTerminate);
    /* In a real scenario, an uncaught throw here would invoke customTerminate(). */
    cout << "Terminate handler registered (not triggered in this safe demo)" << endl;
    return 0;
}
/* @END */
