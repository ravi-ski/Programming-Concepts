
#include <iostream>
#include <utility>
using namespace std;

void bubbleSort(int arr[], int size)
{
    for (int i = 0; i < size - 1; i++)
    {
        bool swapped = false;

        // j also starts from 0, and traverse till size-i-1
        for (int j = 0; j < size - i - 1; j++)
        {
            if (arr[j] > arr[j + 1])
            {
                swap(arr[j], arr[j + 1]);
                /* If no exchanges occur during a complete pass,
                all elements are already sorted. */
                swapped = true;
            }
        }

        if (!swapped)
            break;
    }
}

void selectionSort(int arr[], int size)
{
    for (int i = 0; i < size - 1; i++)
    {
        // assign to i so it starts from i
        int minimumIndex = i;

        // Find the smallest element in the remaining array
        for (int j = i + 1; j < size; j++)
        {
            if (arr[j] < arr[minimumIndex])
            {
                minimumIndex = j;
            }
        }

        // Move the smallest element to its correct position
        if (minimumIndex != i)
        {
            swap(arr[i], arr[minimumIndex]);
        }
    }
}

void insertionSort(int arr[], int size)
{
    for (int i = 1; i < size; i++)
    {
        int current = arr[i];
        int j = i - 1;

        // Shift larger elements one position to the right
        while (j >= 0 && arr[j] > current)
        {
            arr[j + 1] = arr[j];
            j--;
        }

        // Insert current value into its correct position
        arr[j + 1] = current;
    }
}

int linearSearch(int arr[], int size, int target)
{
    for (int i = 0; i < size; i++)
    {
        if (arr[i] == target)
            return i;
    }

    return -1;
}

int binarySearch(int arr[], int size, int target)
{
    int low = 0;
    int high = size - 1;

    while (low <= high)
    {
        // Safe middle point calculation to prevent integer overflow
        int mid = low + (high - low) / 2;

        if (arr[mid] == target)
            return mid;

        if (arr[mid] < target)
            low = mid + 1;
        else
            high = mid - 1;
    }

    return -1;
}

/* int binarySearchIterative(const std::vector<int> &arr, int target)
{
    int low = 0;
    int high = arr.size() - 1;

    while (low <= high)
    {
        // Safe middle point calculation to prevent integer overflow
        int mid = low + (high - low) / 2;

        // Check if target is present at mid
        if (arr[mid] == target)
        {
            return mid;
        }
        // If target is greater, ignore left half
        else if (arr[mid] < target)
        {
            low = mid + 1;
        }
        // If target is smaller, ignore right half
        else
        {
            high = mid - 1;
        }
    }

    return -1; // Target not found
} */

void printArray(int arr[], int size)
{
    for (int i = 0; i < size; i++)
        cout << arr[i] << " ";

    cout << '\n';
}

int main()
{
    int numbers[] = {40, 10, 50, 20, 30};
    int size = sizeof(numbers) / sizeof(numbers[0]);
    int target = 20;

    // Linear search works without sorting
    int index = linearSearch(numbers, size, target);

    if (index != -1)
        cout << target << " found at index " << index << '\n';
    else
        cout << target << " not found\n";

    bubbleSort(numbers, size);

    cout << "Sorted array: ";
    printArray(numbers, size);

    // Binary search requires a sorted array
    index = binarySearch(numbers, size, target);

    if (index != -1)
        cout << target << " found at sorted index " << index << '\n';
    else
        cout << target << " not found\n";

    return 0;
}