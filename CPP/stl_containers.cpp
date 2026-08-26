/* @SECTION: C++ Programming */
/* @CHAPTER: STL CONTAINERS */
/*
 * Each block below is a small, independent, self-contained example.
 * Compile individually: g++ file.cpp -o out
 */

/*
 * @PROGRAM: std::vector basics - push_back and iterate
 * @INPUT: 10, 20, 30
 * @OUTPUT: 10 20 30
 */
#include <iostream>
#include <vector>
using namespace std;

int main()
{
    vector<int> v;
    v.push_back(10);
    v.push_back(20);
    v.push_back(30);

    for (int x : v)
        cout << x << " ";
    cout << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::vector - insert and erase
 * @INPUT: {10, 20, 30}, insert 15 at index 1, erase index 2
 * @OUTPUT: 10 15 30
 */
#include <iostream>
#include <vector>
using namespace std;

int main()
{
    vector<int> v = {10, 20, 30};
    v.insert(v.begin() + 1, 15);
    v.erase(v.begin() + 2);

    for (int x : v)
        cout << x << " ";
    cout << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::vector - sort using std::sort
 * @INPUT: {5, 2, 8, 1}
 * @OUTPUT: 1 2 5 8
 */
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main()
{
    vector<int> v = {5, 2, 8, 1};
    sort(v.begin(), v.end());

    for (int x : v)
        cout << x << " ";
    cout << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::list basics (doubly linked list container)
 * @INPUT: push_back 1, 2, push_front 0
 * @OUTPUT: 0 1 2
 */
#include <iostream>
#include <list>
using namespace std;

int main()
{
    list<int> l;
    l.push_back(1);
    l.push_back(2);
    l.push_front(0);

    for (int x : l)
        cout << x << " ";
    cout << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::deque basics (double-ended queue)
 * @INPUT: push_back 2, push_front 1
 * @OUTPUT: 1 2
 */
#include <iostream>
#include <deque>
using namespace std;

int main()
{
    deque<int> dq;
    dq.push_back(2);
    dq.push_front(1);

    for (int x : dq)
        cout << x << " ";
    cout << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::set basics (unique sorted elements)
 * @INPUT: insert 5, 3, 5, 1
 * @OUTPUT: 1 3 5
 */
#include <iostream>
#include <set>
using namespace std;

int main()
{
    set<int> s = {5, 3, 5, 1};

    for (int x : s)
        cout << x << " ";
    cout << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::multiset basics (allows duplicate elements, kept sorted)
 * @INPUT: insert 5, 3, 5, 1
 * @OUTPUT: 1 3 5 5
 */
#include <iostream>
#include <set>
using namespace std;

int main()
{
    multiset<int> ms = {5, 3, 5, 1};

    for (int x : ms)
        cout << x << " ";
    cout << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::map basics (sorted key-value pairs)
 * @INPUT: {"b":2, "a":1}
 * @OUTPUT: a: 1, b: 2
 */
#include <iostream>
#include <map>
using namespace std;

int main()
{
    map<string, int> m;
    m["b"] = 2;
    m["a"] = 1;

    for (auto &[key, value] : m) /* iterates in sorted key order */
        cout << key << ": " << value << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::multimap basics (multiple values per key)
 * @INPUT: insert two values under key "fruit"
 * @OUTPUT: fruit: apple, fruit: banana
 */
#include <iostream>
#include <map>
using namespace std;

int main()
{
    multimap<string, string> mm;
    mm.insert({"fruit", "apple"});
    mm.insert({"fruit", "banana"});

    for (auto &[key, value] : mm)
        cout << key << ": " << value << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::unordered_map basics (hash map, no ordering guarantee)
 * @INPUT: {"x":1, "y":2}
 * @OUTPUT: Lookup "x": 1
 */
#include <iostream>
#include <unordered_map>
using namespace std;

int main()
{
    unordered_map<string, int> um = {{"x", 1}, {"y", 2}};
    cout << "Lookup \"x\": " << um["x"] << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::unordered_set basics (hash set, no ordering guarantee)
 * @INPUT: insert 1, 2, 2, 3
 * @OUTPUT: Set contains 3 unique elements
 */
#include <iostream>
#include <unordered_set>
using namespace std;

int main()
{
    unordered_set<int> us = {1, 2, 2, 3};
    cout << "Set contains " << us.size() << " unique elements" << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::stack basics (LIFO)
 * @INPUT: push 1, 2, 3
 * @OUTPUT: 3 2 1
 */
#include <iostream>
#include <stack>
using namespace std;

int main()
{
    stack<int> st;
    st.push(1);
    st.push(2);
    st.push(3);

    while (!st.empty())
    {
        cout << st.top() << " ";
        st.pop();
    }
    cout << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::queue basics (FIFO)
 * @INPUT: push 1, 2, 3
 * @OUTPUT: 1 2 3
 */
#include <iostream>
#include <queue>
using namespace std;

int main()
{
    queue<int> q;
    q.push(1);
    q.push(2);
    q.push(3);

    while (!q.empty())
    {
        cout << q.front() << " ";
        q.pop();
    }
    cout << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::priority_queue basics (max-heap by default)
 * @INPUT: push 3, 1, 4, 1, 5
 * @OUTPUT: 5 4 3 1 1
 */
#include <iostream>
#include <queue>
using namespace std;

int main()
{
    priority_queue<int> pq;
    for (int x : {3, 1, 4, 1, 5})
        pq.push(x);

    while (!pq.empty())
    {
        cout << pq.top() << " ";
        pq.pop();
    }
    cout << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::pair basics
 * @INPUT: make_pair("age", 30)
 * @OUTPUT: age: 30
 */
#include <iostream>
using namespace std;

int main()
{
    pair<string, int> p = make_pair("age", 30);
    cout << p.first << ": " << p.second << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::tuple basics
 * @INPUT: make_tuple("Alice", 30, 5.6)
 * @OUTPUT: Alice, 30, 5.6
 */
#include <iostream>
#include <tuple>
using namespace std;

int main()
{
    auto person = make_tuple("Alice", 30, 5.6);
    cout << get<0>(person) << ", " << get<1>(person) << ", " << get<2>(person) << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Iterators - begin/end traversal
 * @INPUT: {1, 2, 3}
 * @OUTPUT: 1 2 3
 */
#include <iostream>
#include <vector>
using namespace std;

int main()
{
    vector<int> v = {1, 2, 3};

    for (auto it = v.begin(); it != v.end(); ++it)
        cout << *it << " ";
    cout << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::find algorithm
 * @INPUT: search for 30 in {10, 20, 30, 40}
 * @OUTPUT: Found 30 in the vector
 */
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main()
{
    vector<int> v = {10, 20, 30, 40};
    auto it = find(v.begin(), v.end(), 30);

    if (it != v.end())
        cout << "Found " << *it << " in the vector" << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::accumulate algorithm
 * @INPUT: {1, 2, 3, 4, 5}
 * @OUTPUT: Sum: 15
 */
#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

int main()
{
    vector<int> v = {1, 2, 3, 4, 5};
    int sum = accumulate(v.begin(), v.end(), 0);
    cout << "Sum: " << sum << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::transform algorithm
 * @INPUT: {1, 2, 3} doubled
 * @OUTPUT: 2 4 6
 */
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main()
{
    vector<int> v = {1, 2, 3};
    vector<int> result(v.size());

    transform(v.begin(), v.end(), result.begin(), [](int x)
              { return x * 2; });

    for (int x : result)
        cout << x << " ";
    cout << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::for_each algorithm with a lambda
 * @INPUT: {1, 2, 3}
 * @OUTPUT: 1 2 3
 */
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main()
{
    vector<int> v = {1, 2, 3};
    for_each(v.begin(), v.end(), [](int x)
             { cout << x << " "; });
    cout << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::count_if with a lambda predicate
 * @INPUT: count even numbers in {1, 2, 3, 4, 5, 6}
 * @OUTPUT: Even count: 3
 */
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main()
{
    vector<int> v = {1, 2, 3, 4, 5, 6};
    int evenCount = count_if(v.begin(), v.end(), [](int x)
                             { return x % 2 == 0; });
    cout << "Even count: " << evenCount << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::sort with a custom comparator (descending order)
 * @INPUT: {5, 2, 8, 1}
 * @OUTPUT: 8 5 2 1
 */
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main()
{
    vector<int> v = {5, 2, 8, 1};
    sort(v.begin(), v.end(), greater<int>());

    for (int x : v)
        cout << x << " ";
    cout << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Sort a vector of custom objects by a field
 * @INPUT: Employees sorted by salary
 * @OUTPUT: Employees printed in ascending salary order
 */
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Employee
{
    string name;
    int salary;
};

int main()
{
    vector<Employee> employees = {{"A", 5000}, {"B", 3000}, {"C", 7000}};

    sort(employees.begin(), employees.end(), [](const Employee &a, const Employee &b)
         { return a.salary < b.salary; });

    for (auto &e : employees)
        cout << e.name << ": " << e.salary << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::map iteration and modification
 * @INPUT: increment every value in a map by 10
 * @OUTPUT: a: 11, b: 22
 */
#include <iostream>
#include <map>
using namespace std;

int main()
{
    map<string, int> m = {{"a", 1}, {"b", 12}};

    for (auto &[key, value] : m)
        value += 10;

    for (auto &[key, value] : m)
        cout << key << ": " << value << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::array (fixed-size container)
 * @INPUT: {1, 2, 3}
 * @OUTPUT: Size: 3, Sum: 6
 */
#include <iostream>
#include <array>
#include <numeric>
using namespace std;

int main()
{
    array<int, 3> arr = {1, 2, 3};
    cout << "Size: " << arr.size() << ", Sum: " << accumulate(arr.begin(), arr.end(), 0) << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Range-based for loop over containers
 * @INPUT: {10, 20, 30}
 * @OUTPUT: 10 20 30
 */
#include <iostream>
#include <vector>
using namespace std;

int main()
{
    vector<int> v = {10, 20, 30};

    for (const auto &x : v)
        cout << x << " ";
    cout << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::string as a container (common operations)
 * @INPUT: "Hello"
 * @OUTPUT: Length: 5, Uppercase: HELLO
 */
#include <iostream>
#include <algorithm>
using namespace std;

int main()
{
    string s = "Hello";
    cout << "Length: " << s.length() << endl;

    transform(s.begin(), s.end(), s.begin(), ::toupper);
    cout << "Uppercase: " << s << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::bitset basics
 * @INPUT: bitset<8> representing the number 5
 * @OUTPUT: 00000101
 */
#include <iostream>
#include <bitset>
using namespace std;

int main()
{
    bitset<8> bits(5);
    cout << bits << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Combining STL algorithms - remove_if + erase idiom
 * @INPUT: {1, 2, 3, 4, 5, 6}, remove even numbers
 * @OUTPUT: 1 3 5
 */
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main()
{
    vector<int> v = {1, 2, 3, 4, 5, 6};

    v.erase(remove_if(v.begin(), v.end(), [](int x)
                      { return x % 2 == 0; }),
            v.end());

    for (int x : v)
        cout << x << " ";
    cout << endl;
    return 0;
}
/* @END */
