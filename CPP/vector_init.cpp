#include <algorithm>
#include <iostream>
#include <vector>

using namespace std;

int main() {
    vector <int> v1(10,20);
    vector <int> v2 = { 1,2,3,4,};
    vector <int> v3(v2);

    int arr[] = {10, 20 , 30 ,40, 50};
    int size = sizeof( arr)/sizeof(arr[0]);

    vector <int> v4(arr, arr+size);

    vector <int> v5(v4.begin(), v4.begin()+4);
    
    cout <<"values of first vector" << endl;
    for (const auto &ref : v1)
    cout << ref << "\t";
    
    cout <<"\n values of second vector" << endl;
    for (int val : v2)
         cout << val << "\t";
    
    cout <<"\n values of fifth vector" << endl;
    for (int val : v5)
        cout << val << "\t";
    
    //adding elements:
    v5.push_back(40);
    v5.emplace_back(50);
    v5.insert(v5.begin() + 1, 60);

    cout <<"\n values of fifth vector" << endl;
    for (int val : v5)
        cout << val << "\t";
        
        
        /* Accessing elements */
    cout << "\nfirst element \t" << v5.at(1) << endl;
    cout << "\npop front element \t" << v5.front() << "back element\t" << v5.back() <<endl;
    v5.pop_back(); // returns nothing
        
    if (!v5.empty()) {
        int last = v5.back();
        v5.pop_back();
    }
        
    for (int val : v5)
        cout << val << "\t";
    v5.erase(v5.begin()); //v.front() returns reference, and v.begin() returns iterator
    //This will erase the first element;


    //finding element in vector

    auto it = find(v5.begin(), v5.end(), 30);

    if ( it != v5.end())
        cout << "\nelement found" << endl;

    cout << "printing through Iterator \n ";
    for( auto it = v5.begin(); it != v5.end(); it++)    
            cout  << *it << "\t";

    cout << "\nAfter sorting...";
    sort(v5.begin(), v5.end());
    for (int v : v5)
        cout << v << "\t";
}

