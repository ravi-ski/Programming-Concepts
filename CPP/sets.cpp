#include <iostream>
using namespace std;
#include <set>
#include <unordered_set>
#include <utility>

/* Description: SET
-- Stores only unique values; duplicates are ignored.
Elements are automatically stored in sorted order.
Default sorting is ascending.
-- implemented using a balanced binary search tree.
Insertion, deletion, and searching generally take O(log n) time.
Elements cannot be modified directly because changing one could break the sorted order.
-- Supports iterators and range-based loops.
-- Does not support index access such as s[0] */

/* Description : unordered_set features
-- Stores only unique values; duplicates are ignored.
Elements are not sorted.
-- Uses a hash table internally.
-- Search, insertion, and deletion are O(1) on average.
Worst-case operations can take O(n).
-- Supports iterators and range-based loops.
-- Does not support index access like s[0].
Elements cannot be modified directly.
Usually faster than set when sorted order is unnecessary. */

int main()
{
    set<int> numbers = { 1,3,5,6,4,3,2};

    cout << "Set values = \n";
    for (int num : numbers)
        cout << num;

    //set.insert(value) returns a std::pair containing an iterator and a boolean value
    auto [it, inserted] = numbers.insert(10);
    if (inserted)
        cout << "insertion success in set \n";

    auto show = [&](string info){
        cout << "Set values ..." << info << endl;
        for ( auto v : numbers)
            cout << v;
    };

    show("After insertion");
    for (auto it = numbers.begin(); it != numbers.end(); it++)
            cout << *it << "\t";

    it = numbers.find(10);

    if ( it != numbers.end())
        numbers.erase(it);

    show("after erasing 10");




    unordered_set<int> us = {30,24,53,45,20};

    auto usit = us.find(20);
    if (usit != us.end())
        cout << "value = " << *it <<endl;

    






}