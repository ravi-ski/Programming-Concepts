

#include <iostream>
using namespace std;

class Animal
{

public:
    virtual void sound()
    {
        cout << "It's Animal base class\n";
    }
    virtual ~Animal() = default;
};

class Dog : public Animal
{

public:
    virtual void sound() override
    {
        cout << "It's dog derived class";
    }
    virtual ~Dog() = default;
};

int main()
{
    Dog *dogPtr = new Dog;
    Animal *animalPtr = static_cast<Animal *>(dogPtr);
    animalPtr->sound();

    /* Base to derived: potentially unsafe downcasting
       This works only because animal actually points to a Dog.*/

    Animal *animal = new Dog();
    Dog *dog = static_cast<Dog *>(animal);

    Animal *animalPointer = new Animal;
    // Use dynamic_cast when the actual type is uncertain:
    /*     Dog *dog1 = static_cast<Dog *>(animalPointer); // Compiles, but unsafe
        cout << "Unsafe downcasting" << endl;
        dog1->sound(); */
}