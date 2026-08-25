#include <iostream>
#include <stack>
#include <string>
#include <queue>

using namespace std;

int main() {


    cout << " Stack Use case \n";
    stack<string> setValues;
    
    setValues.push("google.com");
    setValues.push("youtube.com");
    
    while ( !setValues.empty()) {
        cout << setValues.top() << endl;
        setValues.pop();
    }
    
    
    cout << " Queue Use case \n";
    queue<int> q;
    q.push(10);
    q.push(20);
    
    while (!q.empty()) {
        cout << "Front = " << q.front() << endl;
        q.pop();
    }
    
   cout << " Queue Use case with Vector \n";
   vector<int> v = { 10,20,30,40,50};

   for ( auto value : v)
        q.push(value);

   
   cout << "Lambda function\n";
   auto printqueue = [](queue<int> values) {
        while ( !values.empty()) {
            cout << values.front();
            values.pop();
        }
    };

    printqueue(q);

}