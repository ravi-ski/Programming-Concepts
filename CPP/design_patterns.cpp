/* @SECTION: C++ Programming */
/* @CHAPTER: DESIGN PATTERNS */
/*
 * Each block below is a small, independent, self-contained example.
 * Compile individually: g++ file.cpp -o out
 */

/*
 * @PROGRAM: Singleton pattern
 * @INPUT: (none)
 * @OUTPUT: Both references point to the same instance
 */
#include <iostream>
using namespace std;

class Singleton
{
    static Singleton *instance;
    Singleton() {}

public:
    static Singleton *getInstance()
    {
        if (instance == nullptr)
            instance = new Singleton();
        return instance;
    }
};

Singleton *Singleton::instance = nullptr;

int main()
{
    Singleton *a = Singleton::getInstance();
    Singleton *b = Singleton::getInstance();
    cout << ((a == b) ? "Both references point to the same instance" : "Different instances") << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Factory Method pattern
 * @INPUT: create a Circle or Square via a factory
 * @OUTPUT: Drawing a Circle, Drawing a Square
 */
#include <iostream>
#include <memory>
using namespace std;

class Shape
{
public:
    virtual void draw() = 0;
    virtual ~Shape() {}
};

class Circle : public Shape
{
public:
    void draw() override { cout << "Drawing a Circle" << endl; }
};

class Square : public Shape
{
public:
    void draw() override { cout << "Drawing a Square" << endl; }
};

unique_ptr<Shape> createShape(const string &type)
{
    if (type == "circle")
        return make_unique<Circle>();
    return make_unique<Square>();
}

int main()
{
    createShape("circle")->draw();
    createShape("square")->draw();
    return 0;
}
/* @END */

/*
 * @PROGRAM: Abstract Factory pattern
 * @INPUT: create a matching Button and Checkbox for a UI theme
 * @OUTPUT: Rendering a Dark Button, Rendering a Dark Checkbox
 */
#include <iostream>
using namespace std;

class Button
{
public:
    virtual void render() = 0;
    virtual ~Button() {}
};

class Checkbox
{
public:
    virtual void render() = 0;
    virtual ~Checkbox() {}
};

class DarkButton : public Button
{
public:
    void render() override { cout << "Rendering a Dark Button" << endl; }
};

class DarkCheckbox : public Checkbox
{
public:
    void render() override { cout << "Rendering a Dark Checkbox" << endl; }
};

class UIFactory
{
public:
    virtual Button *createButton() = 0;
    virtual Checkbox *createCheckbox() = 0;
    virtual ~UIFactory() {}
};

class DarkThemeFactory : public UIFactory
{
public:
    Button *createButton() override { return new DarkButton(); }
    Checkbox *createCheckbox() override { return new DarkCheckbox(); }
};

int main()
{
    DarkThemeFactory factory;
    factory.createButton()->render();
    factory.createCheckbox()->render();
    return 0;
}
/* @END */

/*
 * @PROGRAM: Builder pattern
 * @INPUT: build a Burger step by step
 * @OUTPUT: Burger: Bun + Patty + Cheese + Lettuce
 */
#include <iostream>
using namespace std;

class Burger
{
public:
    string description;
};

class BurgerBuilder
{
    Burger burger;

public:
    BurgerBuilder &addBun()
    {
        burger.description += "Bun + ";
        return *this;
    }
    BurgerBuilder &addPatty()
    {
        burger.description += "Patty + ";
        return *this;
    }
    BurgerBuilder &addCheese()
    {
        burger.description += "Cheese + ";
        return *this;
    }
    BurgerBuilder &addLettuce()
    {
        burger.description += "Lettuce";
        return *this;
    }
    Burger build() { return burger; }
};

int main()
{
    Burger b = BurgerBuilder().addBun().addPatty().addCheese().addLettuce().build();
    cout << "Burger: " << b.description << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Prototype pattern
 * @INPUT: clone an existing object instead of constructing a new one
 * @OUTPUT: Cloned shape with radius: 5
 */
#include <iostream>
#include <memory>
using namespace std;

class Shape
{
public:
    int radius;
    virtual unique_ptr<Shape> clone() = 0;
    virtual ~Shape() {}
};

class Circle : public Shape
{
public:
    Circle(int r) { radius = r; }
    unique_ptr<Shape> clone() override { return make_unique<Circle>(*this); }
};

int main()
{
    Circle original(5);
    unique_ptr<Shape> copy = original.clone();
    cout << "Cloned shape with radius: " << copy->radius << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Adapter pattern
 * @INPUT: adapt an old interface to a new one expected by client code
 * @OUTPUT: Adapted call: Legacy printer printing "Hello"
 */
#include <iostream>
using namespace std;

class LegacyPrinter
{
public:
    void oldPrint(const string &text) { cout << "Legacy printer printing \"" << text << "\"" << endl; }
};

class ModernPrinter
{
public:
    virtual void print(const string &text) = 0;
    virtual ~ModernPrinter() {}
};

class PrinterAdapter : public ModernPrinter
{
    LegacyPrinter legacy;

public:
    void print(const string &text) override
    {
        cout << "Adapted call: ";
        legacy.oldPrint(text);
    }
};

int main()
{
    PrinterAdapter adapter;
    adapter.print("Hello");
    return 0;
}
/* @END */

/*
 * @PROGRAM: Bridge pattern
 * @INPUT: decouple an abstraction (Remote) from its implementation (Device)
 * @OUTPUT: TV: turning on
 */
#include <iostream>
using namespace std;

class Device
{
public:
    virtual void turnOn() = 0;
    virtual ~Device() {}
};

class TV : public Device
{
public:
    void turnOn() override { cout << "TV: turning on" << endl; }
};

class Remote
{
protected:
    Device *device;

public:
    Remote(Device *d) : device(d) {}
    virtual void pressPower() { device->turnOn(); }
};

int main()
{
    TV tv;
    Remote remote(&tv);
    remote.pressPower();
    return 0;
}
/* @END */

/*
 * @PROGRAM: Composite pattern
 * @INPUT: a tree of files and folders
 * @OUTPUT: File: a.txt, Folder contains: File: b.txt, File: c.txt
 */
#include <iostream>
#include <vector>
#include <memory>
using namespace std;

class FileSystemItem
{
public:
    virtual void show() = 0;
    virtual ~FileSystemItem() {}
};

class File : public FileSystemItem
{
    string name;

public:
    File(string n) : name(n) {}
    void show() override { cout << "File: " << name << endl; }
};

class Folder : public FileSystemItem
{
    vector<shared_ptr<FileSystemItem>> children;

public:
    void add(shared_ptr<FileSystemItem> item) { children.push_back(item); }
    void show() override
    {
        cout << "Folder contains:" << endl;
        for (auto &child : children)
            child->show();
    }
};

int main()
{
    auto file1 = make_shared<File>("a.txt");
    file1->show();

    Folder folder;
    folder.add(make_shared<File>("b.txt"));
    folder.add(make_shared<File>("c.txt"));
    folder.show();

    return 0;
}
/* @END */

/*
 * @PROGRAM: Decorator pattern
 * @INPUT: wrap a base Coffee with a Milk decorator
 * @OUTPUT: Coffee with Milk costs 7
 */
#include <iostream>
using namespace std;

class Coffee
{
public:
    virtual int cost() = 0;
    virtual string description() = 0;
    virtual ~Coffee() {}
};

class PlainCoffee : public Coffee
{
public:
    int cost() override { return 5; }
    string description() override { return "Coffee"; }
};

class MilkDecorator : public Coffee
{
    Coffee *base;

public:
    MilkDecorator(Coffee *c) : base(c) {}
    int cost() override { return base->cost() + 2; }
    string description() override { return base->description() + " with Milk"; }
};

int main()
{
    PlainCoffee plain;
    MilkDecorator withMilk(&plain);
    cout << withMilk.description() << " costs " << withMilk.cost() << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Facade pattern
 * @INPUT: a single simplified interface hiding subsystem complexity
 * @OUTPUT: CPU started, Memory loaded, Disk read, Computer booted
 */
#include <iostream>
using namespace std;

class CPU
{
public:
    void start() { cout << "CPU started" << endl; }
};

class Memory
{
public:
    void load() { cout << "Memory loaded" << endl; }
};

class Disk
{
public:
    void read() { cout << "Disk read" << endl; }
};

class ComputerFacade
{
    CPU cpu;
    Memory memory;
    Disk disk;

public:
    void boot()
    {
        cpu.start();
        memory.load();
        disk.read();
        cout << "Computer booted" << endl;
    }
};

int main()
{
    ComputerFacade computer;
    computer.boot();
    return 0;
}
/* @END */

/*
 * @PROGRAM: Flyweight pattern
 * @INPUT: reuse shared character formatting objects
 * @OUTPUT: Reused 1 shared "Bold" style object for 3 characters
 */
#include <iostream>
#include <map>
#include <memory>
using namespace std;

class CharacterStyle
{
public:
    string styleName;
    CharacterStyle(string s) : styleName(s) {}
};

class StyleFactory
{
    map<string, shared_ptr<CharacterStyle>> styles;

public:
    shared_ptr<CharacterStyle> getStyle(const string &name)
    {
        if (styles.find(name) == styles.end())
            styles[name] = make_shared<CharacterStyle>(name);
        return styles[name]; /* shared/reused instead of duplicated per character */
    }
};

int main()
{
    StyleFactory factory;
    auto s1 = factory.getStyle("Bold");
    auto s2 = factory.getStyle("Bold");
    auto s3 = factory.getStyle("Bold");

    cout << "Reused 1 shared \"Bold\" style object for 3 characters" << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Proxy pattern
 * @INPUT: access a real object through a proxy that adds access control
 * @OUTPUT: Access granted, Loading real resource, Resource used
 */
#include <iostream>
using namespace std;

class Resource
{
public:
    virtual void use() = 0;
    virtual ~Resource() {}
};

class RealResource : public Resource
{
public:
    RealResource() { cout << "Loading real resource" << endl; }
    void use() override { cout << "Resource used" << endl; }
};

class ResourceProxy : public Resource
{
    RealResource *real = nullptr;

public:
    void use() override
    {
        cout << "Access granted" << endl;
        if (real == nullptr)
            real = new RealResource(); /* lazy-loaded through the proxy */
        real->use();
    }
};

int main()
{
    ResourceProxy proxy;
    proxy.use();
    return 0;
}
/* @END */

/*
 * @PROGRAM: Observer pattern
 * @INPUT: notify all subscribers when a subject changes
 * @OUTPUT: Observer 1 notified: value=10, Observer 2 notified: value=10
 */
#include <iostream>
#include <vector>
#include <functional>
using namespace std;

class Subject
{
    vector<function<void(int)>> observers;

public:
    void subscribe(function<void(int)> observer) { observers.push_back(observer); }
    void setValue(int value)
    {
        for (auto &observer : observers)
            observer(value);
    }
};

int main()
{
    Subject subject;
    subject.subscribe([](int v)
                      { cout << "Observer 1 notified: value=" << v << endl; });
    subject.subscribe([](int v)
                      { cout << "Observer 2 notified: value=" << v << endl; });

    subject.setValue(10);
    return 0;
}
/* @END */

/*
 * @PROGRAM: Strategy pattern
 * @INPUT: switch sorting strategy at runtime
 * @OUTPUT: Sorted ascending: 1 2 3, Sorted descending: 3 2 1
 */
#include <iostream>
#include <vector>
#include <algorithm>
#include <functional>
using namespace std;

class Sorter
{
    function<void(vector<int> &)> strategy;

public:
    void setStrategy(function<void(vector<int> &)> s) { strategy = s; }
    void sortData(vector<int> &data) { strategy(data); }
};

int main()
{
    vector<int> data = {3, 1, 2};
    Sorter sorter;

    sorter.setStrategy([](vector<int> &v)
                       { sort(v.begin(), v.end()); });
    sorter.sortData(data);
    cout << "Sorted ascending: ";
    for (int x : data)
        cout << x << " ";
    cout << endl;

    sorter.setStrategy([](vector<int> &v)
                       { sort(v.begin(), v.end(), greater<int>()); });
    sorter.sortData(data);
    cout << "Sorted descending: ";
    for (int x : data)
        cout << x << " ";
    cout << endl;

    return 0;
}
/* @END */

/*
 * @PROGRAM: Command pattern
 * @INPUT: encapsulate a light-switch action as a command object
 * @OUTPUT: Light turned ON
 */
#include <iostream>
using namespace std;

class Command
{
public:
    virtual void execute() = 0;
    virtual ~Command() {}
};

class Light
{
public:
    void turnOn() { cout << "Light turned ON" << endl; }
};

class LightOnCommand : public Command
{
    Light &light;

public:
    LightOnCommand(Light &l) : light(l) {}
    void execute() override { light.turnOn(); }
};

int main()
{
    Light light;
    LightOnCommand command(light);
    command.execute();
    return 0;
}
/* @END */

/*
 * @PROGRAM: Iterator pattern
 * @INPUT: custom collection with its own iterator
 * @OUTPUT: 10 20 30
 */
#include <iostream>
#include <vector>
using namespace std;

class Collection
{
    vector<int> items = {10, 20, 30};

public:
    auto begin() { return items.begin(); }
    auto end() { return items.end(); }
};

int main()
{
    Collection collection;
    for (int x : collection) /* works because begin()/end() are defined */
        cout << x << " ";
    cout << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Template Method pattern
 * @INPUT: a fixed algorithm skeleton with customizable steps
 * @OUTPUT: Prepare base, Add specific topping, Serve
 */
#include <iostream>
using namespace std;

class Recipe
{
public:
    void make()
    {
        prepareBase();
        addTopping();
        serve();
    }
    void prepareBase() { cout << "Prepare base" << endl; }
    virtual void addTopping() = 0; /* customizable step */
    void serve() { cout << "Serve" << endl; }
    virtual ~Recipe() {}
};

class PizzaRecipe : public Recipe
{
public:
    void addTopping() override { cout << "Add specific topping" << endl; }
};

int main()
{
    PizzaRecipe pizza;
    pizza.make();
    return 0;
}
/* @END */

/*
 * @PROGRAM: State pattern
 * @INPUT: a traffic light cycling through states
 * @OUTPUT: Red -> Green -> Yellow -> Red
 */
#include <iostream>
using namespace std;

class State
{
public:
    virtual string name() = 0;
    virtual State *next() = 0;
    virtual ~State() {}
};

class RedState;
class GreenState;
class YellowState;

class RedState : public State
{
public:
    string name() override { return "Red"; }
    State *next() override;
};

class GreenState : public State
{
public:
    string name() override { return "Green"; }
    State *next() override;
};

class YellowState : public State
{
public:
    string name() override { return "Yellow"; }
    State *next() override { return new RedState(); }
};

State *RedState::next() { return new GreenState(); }
State *GreenState::next() { return new YellowState(); }

int main()
{
    State *state = new RedState();
    for (int i = 0; i < 3; i++)
    {
        cout << state->name() << " -> ";
        state = state->next();
    }
    cout << state->name() << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Chain of Responsibility pattern
 * @INPUT: a support ticket escalated through handler levels
 * @OUTPUT: Level 2 handled the request
 */
#include <iostream>
using namespace std;

class Handler
{
protected:
    Handler *next = nullptr;

public:
    void setNext(Handler *h) { next = h; }
    virtual void handle(int level)
    {
        if (next != nullptr)
            next->handle(level);
    }
    virtual ~Handler() {}
};

class Level1Handler : public Handler
{
public:
    void handle(int level) override
    {
        if (level == 1)
            cout << "Level 1 handled the request" << endl;
        else
            Handler::handle(level);
    }
};

class Level2Handler : public Handler
{
public:
    void handle(int level) override
    {
        if (level == 2)
            cout << "Level 2 handled the request" << endl;
        else
            Handler::handle(level);
    }
};

int main()
{
    Level1Handler l1;
    Level2Handler l2;
    l1.setNext(&l2);

    l1.handle(2);
    return 0;
}
/* @END */

/*
 * @PROGRAM: Mediator pattern
 * @INPUT: two chat users communicating through a mediator
 * @OUTPUT: User2 received: Hello from User1
 */
#include <iostream>
using namespace std;

class ChatMediator
{
public:
    virtual void sendMessage(const string &msg, const string &from) = 0;
    virtual ~ChatMediator() {}
};

class ChatRoom : public ChatMediator
{
public:
    void sendMessage(const string &msg, const string &from) override
    {
        cout << "User2 received: " << msg << " from " << from << endl;
    }
};

int main()
{
    ChatRoom room;
    room.sendMessage("Hello", "User1");
    return 0;
}
/* @END */

/*
 * @PROGRAM: Memento pattern
 * @INPUT: save and restore an editor's text state
 * @OUTPUT: Restored text: Hello
 */
#include <iostream>
using namespace std;

class Memento
{
public:
    string state;
    Memento(string s) : state(s) {}
};

class Editor
{
    string text;

public:
    void setText(string t) { text = t; }
    Memento save() { return Memento(text); }
    void restore(const Memento &m) { text = m.state; }
    string getText() { return text; }
};

int main()
{
    Editor editor;
    editor.setText("Hello");
    Memento saved = editor.save();

    editor.setText("Changed");
    editor.restore(saved);

    cout << "Restored text: " << editor.getText() << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Visitor pattern
 * @INPUT: a visitor operating on different shape types
 * @OUTPUT: Visiting a Circle, Visiting a Square
 */
#include <iostream>
using namespace std;

class Circle;
class Square;

class Visitor
{
public:
    virtual void visit(Circle &c) = 0;
    virtual void visit(Square &s) = 0;
    virtual ~Visitor() {}
};

class Shape
{
public:
    virtual void accept(Visitor &v) = 0;
    virtual ~Shape() {}
};

class Circle : public Shape
{
public:
    void accept(Visitor &v) override { v.visit(*this); }
};

class Square : public Shape
{
public:
    void accept(Visitor &v) override { v.visit(*this); }
};

class PrintVisitor : public Visitor
{
public:
    void visit(Circle &c) override { cout << "Visiting a Circle" << endl; }
    void visit(Square &s) override { cout << "Visiting a Square" << endl; }
};

int main()
{
    PrintVisitor visitor;
    Circle circle;
    Square square;

    circle.accept(visitor);
    square.accept(visitor);
    return 0;
}
/* @END */

/*
 * @PROGRAM: Interpreter pattern (simple expression evaluator)
 * @INPUT: evaluate "3 + 4"
 * @OUTPUT: Result: 7
 */
#include <iostream>
using namespace std;

class Expression
{
public:
    virtual int interpret() = 0;
    virtual ~Expression() {}
};

class Number : public Expression
{
    int value;

public:
    Number(int v) : value(v) {}
    int interpret() override { return value; }
};

class Add : public Expression
{
    Expression *left, *right;

public:
    Add(Expression *l, Expression *r) : left(l), right(r) {}
    int interpret() override { return left->interpret() + right->interpret(); }
};

int main()
{
    Number three(3), four(4);
    Add expression(&three, &four);

    cout << "Result: " << expression.interpret() << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Null Object pattern
 * @INPUT: use a NullLogger instead of checking for a null pointer everywhere
 * @OUTPUT: (silently does nothing, no null-pointer checks needed)
 */
#include <iostream>
using namespace std;

class Logger
{
public:
    virtual void log(const string &msg) = 0;
    virtual ~Logger() {}
};

class ConsoleLogger : public Logger
{
public:
    void log(const string &msg) override { cout << msg << endl; }
};

class NullLogger : public Logger
{
public:
    void log(const string &msg) override { /* intentionally does nothing */ }
};

void process(Logger &logger)
{
    logger.log("Processing started");
}

int main()
{
    NullLogger nullLogger;
    process(nullLogger); /* safe to call, no crash, no output */

    ConsoleLogger consoleLogger;
    process(consoleLogger);
    return 0;
}
/* @END */

/*
 * @PROGRAM: Dependency Injection concept demo
 * @INPUT: inject a Logger dependency into a Service instead of creating it internally
 * @OUTPUT: Service using injected logger: Task completed
 */
#include <iostream>
using namespace std;

class Logger
{
public:
    void log(const string &msg) { cout << "Service using injected logger: " << msg << endl; }
};

class Service
{
    Logger &logger;

public:
    Service(Logger &l) : logger(l) {} /* dependency injected via constructor */
    void doWork() { logger.log("Task completed"); }
};

int main()
{
    Logger logger;
    Service service(logger);
    service.doWork();
    return 0;
}
/* @END */

/*
 * @PROGRAM: RAII as a resource-management pattern
 * @INPUT: a lock guard released automatically at scope end
 * @OUTPUT: Resource acquired, Resource released
 */
#include <iostream>
using namespace std;

class ScopedResource
{
public:
    ScopedResource() { cout << "Resource acquired" << endl; }
    ~ScopedResource() { cout << "Resource released" << endl; }
};

int main()
{
    ScopedResource resource; /* released deterministically when it goes out of scope */
    return 0;
}
/* @END */

/*
 * @PROGRAM: Pimpl idiom (pointer to implementation)
 * @INPUT: hide implementation details behind an opaque pointer
 * @OUTPUT: Widget processed value: 10
 */
#include <iostream>
#include <memory>
using namespace std;

class Widget
{
    class Impl; /* forward-declared, defined below - hides internals from callers */
    unique_ptr<Impl> impl;

public:
    Widget();
    ~Widget();
    void process(int value);
};

class Widget::Impl
{
public:
    void process(int value) { cout << "Widget processed value: " << value << endl; }
};

Widget::Widget() : impl(make_unique<Impl>()) {}
Widget::~Widget() = default;
void Widget::process(int value) { impl->process(value); }

int main()
{
    Widget w;
    w.process(10);
    return 0;
}
/* @END */

/*
 * @PROGRAM: CRTP (Curiously Recurring Template Pattern)
 * @INPUT: static polymorphism without virtual function overhead
 * @OUTPUT: Derived::implementation() called via CRTP
 */
#include <iostream>
using namespace std;

template <typename Derived>
class Base
{
public:
    void interface() { static_cast<Derived *>(this)->implementation(); }
};

class Derived : public Base<Derived>
{
public:
    void implementation() { cout << "Derived::implementation() called via CRTP" << endl; }
};

int main()
{
    Derived d;
    d.interface(); /* resolved at compile time, no vtable lookup needed */
    return 0;
}
/* @END */

/*
 * @PROGRAM: Object Pool pattern
 * @INPUT: reuse objects from a pool instead of constructing new ones each time
 * @OUTPUT: Reused object from pool, Reused object from pool
 */
#include <iostream>
#include <vector>
#include <memory>
using namespace std;

class Connection
{
public:
    void use() { cout << "Reused object from pool" << endl; }
};

class ConnectionPool
{
    vector<unique_ptr<Connection>> pool;

public:
    ConnectionPool() { pool.push_back(make_unique<Connection>()); }
    Connection *acquire() { return pool.front().get(); } /* simplified: always reuses the same one */
};

int main()
{
    ConnectionPool pool;
    pool.acquire()->use();
    pool.acquire()->use();
    return 0;
}
/* @END */

/*
 * @PROGRAM: Simplified MVC (Model-View-Controller) pattern
 * @INPUT: controller updates the model, view renders it
 * @OUTPUT: Displaying student: Alice, Grade: A
 */
#include <iostream>
using namespace std;

class StudentModel
{
public:
    string name;
    string grade;
};

class StudentView
{
public:
    void display(const StudentModel &model)
    {
        cout << "Displaying student: " << model.name << ", Grade: " << model.grade << endl;
    }
};

class StudentController
{
    StudentModel &model;
    StudentView &view;

public:
    StudentController(StudentModel &m, StudentView &v) : model(m), view(v) {}
    void updateGrade(const string &grade) { model.grade = grade; }
    void render() { view.display(model); }
};

int main()
{
    StudentModel model;
    model.name = "Alice";

    StudentView view;
    StudentController controller(model, view);

    controller.updateGrade("A");
    controller.render();
    return 0;
}
/* @END */
