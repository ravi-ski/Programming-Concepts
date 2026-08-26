/* @SECTION: C++ Programming */
/* @CHAPTER: STRING PROGRAMS */
/*
 * Each block below is a small, independent, self-contained example.
 * Compile individually: g++ file.cpp -o out -std=c++17
 */

/*
 * @PROGRAM: Reverse a string using std::reverse
 * @INPUT: hello
 * @OUTPUT: olleh
 */
#include <iostream>
#include <algorithm>
using namespace std;

int main()
{
    string s = "hello";
    reverse(s.begin(), s.end());
    cout << s << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Check if a string is a palindrome
 * @INPUT: madam
 * @OUTPUT: madam is a palindrome
 */
#include <iostream>
#include <algorithm>
using namespace std;

bool isPalindrome(const string &s)
{
    string reversed = s;
    reverse(reversed.begin(), reversed.end());
    return s == reversed;
}

int main()
{
    string s = "madam";
    cout << s << (isPalindrome(s) ? " is a palindrome" : " is not a palindrome") << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Convert a string to uppercase and lowercase using std::transform
 * @INPUT: Hello World
 * @OUTPUT: HELLO WORLD, hello world
 */
#include <iostream>
#include <algorithm>
using namespace std;

int main()
{
    string s = "Hello World";
    string upper = s, lower = s;

    transform(upper.begin(), upper.end(), upper.begin(), ::toupper);
    transform(lower.begin(), lower.end(), lower.begin(), ::tolower);

    cout << upper << ", " << lower << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Split a string by a delimiter using stringstream
 * @INPUT: "apple,banana,cherry"
 * @OUTPUT: apple | banana | cherry
 */
#include <iostream>
#include <sstream>
#include <vector>
using namespace std;

int main()
{
    string s = "apple,banana,cherry";
    stringstream ss(s);
    string token;
    vector<string> parts;

    while (getline(ss, token, ','))
        parts.push_back(token);

    for (size_t i = 0; i < parts.size(); i++)
        cout << parts[i] << (i + 1 < parts.size() ? " | " : "\n");

    return 0;
}
/* @END */

/*
 * @PROGRAM: Join strings with a delimiter
 * @INPUT: {"apple", "banana", "cherry"}
 * @OUTPUT: apple, banana, cherry
 */
#include <iostream>
#include <vector>
using namespace std;

string join(const vector<string> &parts, const string &delimiter)
{
    string result;
    for (size_t i = 0; i < parts.size(); i++)
    {
        result += parts[i];
        if (i + 1 < parts.size())
            result += delimiter;
    }
    return result;
}

int main()
{
    vector<string> fruits = {"apple", "banana", "cherry"};
    cout << join(fruits, ", ") << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Trim leading and trailing whitespace
 * @INPUT: "   hello world   "
 * @OUTPUT: "hello world"
 */
#include <iostream>
using namespace std;

string trim(const string &s)
{
    size_t start = s.find_first_not_of(" \t\n");
    size_t end = s.find_last_not_of(" \t\n");
    return (start == string::npos) ? "" : s.substr(start, end - start + 1);
}

int main()
{
    string s = "   hello world   ";
    cout << "\"" << trim(s) << "\"" << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Count occurrences of a substring
 * @INPUT: "ababab", sub = "ab"
 * @OUTPUT: Occurrences: 3
 */
#include <iostream>
using namespace std;

int countOccurrences(const string &s, const string &sub)
{
    int count = 0;
    size_t pos = 0;

    while ((pos = s.find(sub, pos)) != string::npos)
    {
        count++;
        pos += sub.length();
    }
    return count;
}

int main()
{
    cout << "Occurrences: " << countOccurrences("ababab", "ab") << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Replace all occurrences of a substring
 * @INPUT: "foo bar foo", replace "foo" with "baz"
 * @OUTPUT: baz bar baz
 */
#include <iostream>
using namespace std;

string replaceAll(string s, const string &from, const string &to)
{
    size_t pos = 0;
    while ((pos = s.find(from, pos)) != string::npos)
    {
        s.replace(pos, from.length(), to);
        pos += to.length();
    }
    return s;
}

int main()
{
    cout << replaceAll("foo bar foo", "foo", "baz") << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Check if a string starts with or ends with a given prefix/suffix
 * @INPUT: "hello_world.txt"
 * @OUTPUT: Starts with "hello": true, Ends with ".txt": true
 */
#include <iostream>
using namespace std;

bool startsWith(const string &s, const string &prefix)
{
    return s.size() >= prefix.size() && s.compare(0, prefix.size(), prefix) == 0;
}

bool endsWith(const string &s, const string &suffix)
{
    return s.size() >= suffix.size() && s.compare(s.size() - suffix.size(), suffix.size(), suffix) == 0;
}

int main()
{
    string s = "hello_world.txt";
    cout << boolalpha;
    cout << "Starts with \"hello\": " << startsWith(s, "hello") << endl;
    cout << "Ends with \".txt\": " << endsWith(s, ".txt") << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Convert a string to a number using stoi/stod
 * @INPUT: "42", "3.14"
 * @OUTPUT: int: 42, double: 3.14
 */
#include <iostream>
using namespace std;

int main()
{
    int i = stoi("42");
    double d = stod("3.14");
    cout << "int: " << i << ", double: " << d << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Convert a number to a string using std::to_string
 * @INPUT: 42, 3.14
 * @OUTPUT: 42, 3.140000
 */
#include <iostream>
using namespace std;

int main()
{
    string a = to_string(42);
    string b = to_string(3.14);
    cout << a << ", " << b << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Compare strings using ==, <, and compare()
 * @INPUT: "apple" vs "banana"
 * @OUTPUT: Not equal, apple < banana, compare() returns a negative value
 */
#include <iostream>
using namespace std;

int main()
{
    string a = "apple", b = "banana";

    cout << ((a == b) ? "Equal" : "Not equal") << endl;
    cout << ((a < b) ? "apple < banana" : "apple >= banana") << endl;
    cout << "compare() returns a " << (a.compare(b) < 0 ? "negative value" : "non-negative value") << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Concatenate strings using + and append()
 * @INPUT: "Hello" + " " + "World"
 * @OUTPUT: Hello World
 */
#include <iostream>
using namespace std;

int main()
{
    string result = "Hello";
    result += " ";
    result.append("World");
    cout << result << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Find and erase a substring
 * @INPUT: "Hello, World!", erase "World"
 * @OUTPUT: Hello, !
 */
#include <iostream>
using namespace std;

int main()
{
    string s = "Hello, World!";
    size_t pos = s.find("World");

    if (pos != string::npos)
        s.erase(pos, string("World").length());

    cout << s << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Insert text into a string at a specific position
 * @INPUT: "Hello World", insert "Beautiful " at position 6
 * @OUTPUT: Hello Beautiful World
 */
#include <iostream>
using namespace std;

int main()
{
    string s = "Hello World";
    s.insert(6, "Beautiful ");
    cout << s << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Substring extraction using substr()
 * @INPUT: "Hello World", substr(6, 5)
 * @OUTPUT: World
 */
#include <iostream>
using namespace std;

int main()
{
    string s = "Hello World";
    cout << s.substr(6, 5) << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Check if a string contains only digits using std::all_of
 * @INPUT: "12345"
 * @OUTPUT: Numeric
 */
#include <iostream>
#include <algorithm>
#include <cctype>
using namespace std;

int main()
{
    string s = "12345";
    bool isNumeric = all_of(s.begin(), s.end(), ::isdigit);
    cout << (isNumeric ? "Numeric" : "Not numeric") << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Remove all whitespace from a string
 * @INPUT: "H e l l o"
 * @OUTPUT: Hello
 */
#include <iostream>
#include <algorithm>
using namespace std;

int main()
{
    string s = "H e l l o";
    s.erase(remove(s.begin(), s.end(), ' '), s.end());
    cout << s << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Count vowels and consonants using std::count_if
 * @INPUT: "hello world"
 * @OUTPUT: Vowels: 3, Consonants: 7
 */
#include <iostream>
#include <algorithm>
#include <cctype>
using namespace std;

bool isVowel(char c)
{
    c = tolower(c);
    return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
}

int main()
{
    string s = "hello world";
    int vowels = count_if(s.begin(), s.end(), isVowel);
    int consonants = count_if(s.begin(), s.end(), [](char c)
                              { return isalpha(c) && !isVowel(c); });

    cout << "Vowels: " << vowels << ", Consonants: " << consonants << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Find the first non-repeating character using a map
 * @INPUT: "swiss"
 * @OUTPUT: w
 */
#include <iostream>
#include <unordered_map>
using namespace std;

int main()
{
    string s = "swiss";
    unordered_map<char, int> counts;

    for (char c : s)
        counts[c]++;

    for (char c : s)
    {
        if (counts[c] == 1)
        {
            cout << c << endl;
            break;
        }
    }
    return 0;
}
/* @END */

/*
 * @PROGRAM: Anagram check using sorted strings
 * @INPUT: "listen", "silent"
 * @OUTPUT: Anagrams
 */
#include <iostream>
#include <algorithm>
using namespace std;

int main()
{
    string a = "listen", b = "silent";
    string sortedA = a, sortedB = b;

    sort(sortedA.begin(), sortedA.end());
    sort(sortedB.begin(), sortedB.end());

    cout << ((sortedA == sortedB) ? "Anagrams" : "Not anagrams") << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Longest common prefix among a vector of strings
 * @INPUT: {"flower", "flow", "flight"}
 * @OUTPUT: fl
 */
#include <iostream>
#include <vector>
using namespace std;

string longestCommonPrefix(const vector<string> &words)
{
    if (words.empty())
        return "";

    string prefix = words[0];
    for (const auto &word : words)
    {
        while (word.find(prefix) != 0)
            prefix = prefix.substr(0, prefix.size() - 1);
    }
    return prefix;
}

int main()
{
    vector<string> words = {"flower", "flow", "flight"};
    cout << longestCommonPrefix(words) << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Tokenize a sentence into words
 * @INPUT: "The quick brown fox"
 * @OUTPUT: The | quick | brown | fox
 */
#include <iostream>
#include <sstream>
using namespace std;

int main()
{
    string sentence = "The quick brown fox";
    stringstream ss(sentence);
    string word;
    bool first = true;

    while (ss >> word)
    {
        if (!first)
            cout << " | ";
        cout << word;
        first = false;
    }
    cout << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Reverse the words in a sentence
 * @INPUT: "Hello World From CPP"
 * @OUTPUT: CPP From World Hello
 */
#include <iostream>
#include <sstream>
#include <vector>
using namespace std;

int main()
{
    string sentence = "Hello World From CPP";
    stringstream ss(sentence);
    vector<string> words;
    string word;

    while (ss >> word)
        words.push_back(word);

    for (auto it = words.rbegin(); it != words.rend(); ++it)
        cout << *it << (next(it) != words.rend() ? " " : "\n");

    return 0;
}
/* @END */

/*
 * @PROGRAM: Check if a string is a rotation of another
 * @INPUT: "waterbottle", "erbottlewat"
 * @OUTPUT: Rotations
 */
#include <iostream>
using namespace std;

int main()
{
    string a = "waterbottle", b = "erbottlewat";
    string combined = a + a;

    cout << ((a.size() == b.size() && combined.find(b) != string::npos) ? "Rotations" : "Not rotations") << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Convert std::string to a C-style string and back
 * @INPUT: "Hello"
 * @OUTPUT: C-string: Hello, back to std::string: Hello
 */
#include <iostream>
#include <cstring>
using namespace std;

int main()
{
    string s = "Hello";
    const char *cstr = s.c_str();
    cout << "C-string: " << cstr << endl;

    string back(cstr);
    cout << "back to std::string: " << back << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: std::string_view basics (avoids copying the underlying string)
 * @INPUT: "Hello World"
 * @OUTPUT: World
 */
#include <iostream>
#include <string_view>
using namespace std;

int main()
{
    string s = "Hello World";
    string_view view(s);
    string_view sub = view.substr(6, 5); /* no allocation, just a view into "s" */

    cout << sub << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Use std::regex to validate a simple email pattern
 * @INPUT: "user@example.com"
 * @OUTPUT: Valid email format
 */
#include <iostream>
#include <regex>
using namespace std;

int main()
{
    string email = "user@example.com";
    regex pattern(R"(^[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}$)");

    cout << (regex_match(email, pattern) ? "Valid email format" : "Invalid email format") << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Use std::regex to find and replace matches
 * @INPUT: "The rain in Spain", replace vowels with '*'
 * @OUTPUT: Th* r**n *n Sp**n
 */
#include <iostream>
#include <regex>
using namespace std;

int main()
{
    string s = "The rain in Spain";
    regex vowels("[aeiouAEIOU]");

    cout << regex_replace(s, vowels, "*") << endl;
    return 0;
}
/* @END */

/*
 * @PROGRAM: Build a string incrementally using std::ostringstream
 * @INPUT: name="Alice", age=30
 * @OUTPUT: Name: Alice, Age: 30
 */
#include <iostream>
#include <sstream>
using namespace std;

int main()
{
    ostringstream oss;
    oss << "Name: " << "Alice" << ", Age: " << 30;

    cout << oss.str() << endl;
    return 0;
}
/* @END */
