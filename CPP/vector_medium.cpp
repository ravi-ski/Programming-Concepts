#include <iostream>
#include <vector>
#include <algorithm>
#include <unordered_set>
#include <unordered_map>

using namespace std;

vector<int> removeDuplicates(const vector<int>& v);

vector<int> removeDuplicates(const vector<int>& v1){

    unordered_set<int> us;
    vector<int> v2;

    for(int v : v1 )
        if(us.insert(v).second)
            v2.push_back(v);

    return v2;
}

int main() {
    
    cout << "Remove duplicate while preserving order";
    vector <int> v1 = {1,2,3,4,5,6,6,7,7,9};

    cout << "\nBefore removing duplicates\n";
    for(int v:v1)
        cout << v ; 
    vector<int> v2 = removeDuplicates(v1);

    cout << "\nAfter removing duplicates\n";
    for(int v : v2)
        cout << v ; 





    cout << "Find duplicate values in vector" << endl;
    unordered_map<int, int> freq;
        for (int v : v1)
        ++freq[v];
        
    cout << "duplicate elements and their frequencies " << endl;
    for (const auto& [value, count] : freq){
        if(count > 1)
            cout << "value = " << value << "\t" << "times = " << count <<endl; ;
    }




    cout << "Just duplicates count" << endl;
    unordered_set<int> us;
    int total_duplicates = 0;

    for (int val : v1)
        // C++17 structured binding to capture the insertion boolean
        // auto [it, insert] = us.insert(val);
        if(!us.insert(val).second)
              total_duplicates++;

    cout << "Total Duplciates = " << total_duplicates << endl;


    cout << "Vector Pai Example" << endl;

    vector<pair<int,int>> coordinates = {
        {5,2},
        {1,3},
        {4,5},
        {6,7}
    };

    coordinates.push_back(make_pair(5,6));
    coordinates.emplace_back(7,8);

    for( const auto& [x,y] : coordinates)
    cout << "Coordinates (X,y) = " << x << y << endl;
        
    cout << "Accessing specific elements in the vector" << endl;
    cout << coordinates[0].first << coordinates[0].second << endl;

    cout << "Sorting vector pair elements, sort based on the first eleement" << endl;
    sort(coordinates.begin(), coordinates.end());
    
    for( const auto& [x,y] : coordinates)
        cout << "Coordinates (X,y) = " << x << y << endl;
}