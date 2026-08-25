#include <iostream>
#include <exception>
#include <stdexcept>
#include <fstream>

using namespace std;

class Resource {

    public:
        Resource () {
            cout << "Resource Constructor called\n";
        }
        ~Resource() {
            cout << "Resource Destructor Called \n";
        }
};

class Parser {
    public:
        void openConfig(string path) {
            Resource local;

            std::ifstream file(path);
            if( !file.is_open()){
                throw std::runtime_error("Config file path not found");
            }

        }
};

/* Normal Exception handling */
// int main() {
//     Parser config;
//     try {    
//         config.openConfig("INVALID PATH");
//         cout << " This line should be esacaped\n";
//     }

//     catch ( std::runtime_error &e) {
//         cout << "Runtime error = " << e.what();
//     }

//     catch ( std::exception &e) {
//         cout << "Standard exception = " << e.what();
//     }

//     catch (...) {
//         std::cerr << "Cought non standard or run time error \n";
//     }

// }


class Broken {

    int x;

    public:

        Broken (int y) : x(y) {
            cout << "Good class constructor called \n";
            throw runtime_error( "Run time error"); 
        }
};

class Good :public Broken {
    
    public:
        Good(int y) try : Broken(y) {
            cout << "Broken constructor called";
        }

        catch ( std::out_of_range &e) {
            cout << "Exception string " << e.what();
        }
};

//Constructor Exception handling
int main() {

    try {
        Good obj( 200 );
        cout << "This print shouldn't print \n";
    }

    catch (const std::runtime_error &e) {
        cout <<"agin catch it ? " << e.what();
    }

}