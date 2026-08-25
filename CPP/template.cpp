#include <iostream>
using namespace std;

template <typename T>
T findMaximum(T a, T b)
{
    return (a > b) ? a : b;
}

// Class templates
template <typename T>
class Calculator
{
private:
    T first;
    T second;

public:
    Calculator(T a, T b)
    {
        first = a;
        second = b;
    }

    T add()
    {
        return first + second;
    }

    T maximum()
    {
        return (first > second) ? first : second;
    }
};

int main()
{
    cout << "Maximum integer: "
         << findMaximum(10, 20) << '\n';

    cout << "Maximum double: "
         << findMaximum(5.5, 2.3) << '\n';

    cout << "Maximum character: "
         << findMaximum('A', 'Z') << '\n';

    // Class templates initilizations
    Calculator<int> integerCalculator(10, 20);
    cout << "Integer sum: "
         << integerCalculator.add() << '\n';

    Calculator<double> doubleCalculator(5.5, 2.3);
    cout << "Double sum: "
         << doubleCalculator.add() << '\n';

    return 0;
}