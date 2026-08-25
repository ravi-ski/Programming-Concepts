#include <iostream>
#include <fstream>
#include <string>

using namespace std;

int main()
{
    ofstream file("data.txt", ios::app); // app for append

    if (!file)
        return 1;
    file << "Ravi Kumar\n";
    file.close();

    ifstream file1("data.txt");
    string line;

    if (!file1)
    {
        cout << "Unable to open file \n";
        return 1;
    }
    while (getline(file1, line))
        cout << "Line = " << line;

    /* Read , Write, */
    fstream file2("data.txt", ios::in | ios::app | ios::out);
    if (!file2)
        cout << "File opening failed\n";

    file2 << "New Record \n";

    file2.flush();
    file2.clear();

    /* flush() ensures buffered output is written.
    seekg() changes the reading position (g means get).
    seekp() changes the writing position (p means put).
     */

    file2.seekg(0, ios::beg);
    while (getline(file2, line))
    {
        cout << line << endl;
    }

    return 0;
}