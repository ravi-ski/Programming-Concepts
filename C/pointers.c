#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* @SECTION: C Programming */
/* @CHAPTER: POINTERS */

typedef struct Point
{
	int x;
	int y;
} Point;

/*
 * @PROGRAM: Swap two numbers using a single pointer
 * @INPUT: a=5, b=10
 * @OUTPUT: a=10, b=5
 */
void swapSingle(int *a, int *b)
{
	int temp = *a;
	*a = *b;
	*b = temp;
}
/* @END */

/*
 * @PROGRAM: Swap two pointers using a double pointer
 * @INPUT: p1 -> 1, p2 -> 2
 * @OUTPUT: p1 -> 2, p2 -> 1
 */
void swapPointers(int **p1, int **p2)
{
	int *temp = *p1;
	*p1 = *p2;
	*p2 = temp;
}
/* @END */

/*
 * @PROGRAM: Pass by value vs pass by reference
 * @INPUT: 5
 * @OUTPUT: By value: 5, By reference: 6
 */
void incrementByValue(int x)
{
	x = x + 1;
	printf("By value (inside function): %d\n", x);
}

void incrementByReference(int *x)
{
	*x = *x + 1;
	printf("By reference (inside function): %d\n", *x);
}
/* @END */

/*
 * @PROGRAM: Pointer arithmetic - increment, decrement and comparison
 * @INPUT: 10, 20, 30
 * @OUTPUT: 10 20 30 (walked using pointer++ )
 */
void pointerArithmetic(int arr[], int n)
{
	int *ptr = arr;

	for (int i = 0; i < n; i++)
	{
		printf("%d ", *ptr);
		ptr++;
	}
	printf("\n");

	ptr--;
	printf("After one decrement, last element again: %d\n", *ptr);
}
/* @END */

/*
 * @PROGRAM: Traverse an array using a pointer
 * @INPUT: 1 2 3 4 5
 * @OUTPUT: 1 2 3 4 5
 */
void traverseArrayPointer(int arr[], int n)
{
	for (int *ptr = arr; ptr < arr + n; ptr++)
		printf("%d ", *ptr);
	printf("\n");
}
/* @END */

/*
 * @PROGRAM: Difference between a pointer and an array
 * @INPUT: int arr[5]
 * @OUTPUT: sizeof(arr) is the full array size, sizeof(ptr) is only the pointer size
 */
void pointerVsArrayDemo(void)
{
	int arr[5] = {1, 2, 3, 4, 5};
	int *ptr = arr;

	printf("sizeof(arr) = %zu bytes\n", sizeof(arr));
	printf("sizeof(ptr) = %zu bytes\n", sizeof(ptr));
	printf("arr and ptr both give %d as the first element\n", arr[0]);
}
/* @END */

/*
 * @PROGRAM: Pointer to an array vs array of pointers
 * @INPUT: matrix[2][3] and names[3]
 * @OUTPUT: Row 0: 1 2 3, Names: A B C
 */
void pointerToArrayVsArrayOfPointers(void)
{
	int matrix[2][3] = {{1, 2, 3}, {4, 5, 6}};
	int (*rowPtr)[3] = matrix;

	const char *names[3] = {"A", "B", "C"};

	printf("Row 0 via pointer-to-array: ");
	for (int i = 0; i < 3; i++)
		printf("%d ", rowPtr[0][i]);
	printf("\n");

	printf("Array of pointers: ");
	for (int i = 0; i < 3; i++)
		printf("%s ", names[i]);
	printf("\n");
}
/* @END */

/*
 * @PROGRAM: NULL pointer check
 * @INPUT: NULL
 * @OUTPUT: Pointer is NULL
 */
void nullPointerCheck(int *ptr)
{
	if (ptr == NULL)
		printf("Pointer is NULL\n");
	else
		printf("Pointer holds value: %d\n", *ptr);
}
/* @END */

/*
 * @PROGRAM: Dangling pointer and how to avoid it
 * @INPUT: (none)
 * @OUTPUT: Pointer set to NULL after free, safe to check before use
 */
void danglingPointerDemo(void)
{
	int *ptr = malloc(sizeof(int));

	if (ptr == NULL)
		return;

	*ptr = 42;
	printf("Before free: %d\n", *ptr);

	free(ptr);
	ptr = NULL; /* avoids a dangling pointer */

	if (ptr == NULL)
		printf("Pointer safely reset to NULL after free\n");
}
/* @END */

/*
 * @PROGRAM: Void pointer (generic pointer) demo
 * @INPUT: int 10, char A
 * @OUTPUT: As int: 10, As char: A
 */
void voidPointerDemo(void)
{
	int number = 10;
	char letter = 'A';
	void *generic = &number;

	printf("As int: %d\n", *(int *)generic);

	generic = &letter;
	printf("As char: %c\n", *(char *)generic);
}
/* @END */

/*
 * @PROGRAM: Constant pointer vs pointer to constant
 * @INPUT: value=1, value=2
 * @OUTPUT: Pointer to const cannot modify value; const pointer cannot repoint
 */
void constPointerDemo(void)
{
	int value = 1;
	int other = 2;

	const int *ptrToConst = &value; /* value cannot change through ptrToConst */
	int *const constPtr = &value;	 /* constPtr cannot point elsewhere */

	ptrToConst = &other; /* allowed: repointing is fine */
	*constPtr = 5;		  /* allowed: modifying the value is fine */

	printf("ptrToConst now reads: %d\n", *ptrToConst);
	printf("value via constPtr: %d\n", *constPtr);
}
/* @END */

/*
 * @PROGRAM: Double pointer to modify what a single pointer points to
 * @INPUT: value=10
 * @OUTPUT: value=11
 */
void incrementViaDoublePointer(int **pp)
{
	**pp = **pp + 1;
}
/* @END */

/*
 * @PROGRAM: Dynamic memory allocation using malloc
 * @INPUT: 5 elements
 * @OUTPUT: 0 1 2 3 4
 */
void dynamicMemoryAlloc(int n)
{
	int *arr = malloc((size_t)n * sizeof(int));

	if (arr == NULL)
		return;

	for (int i = 0; i < n; i++)
		arr[i] = i;

	for (int i = 0; i < n; i++)
		printf("%d ", arr[i]);
	printf("\n");

	free(arr);
}
/* @END */

/*
 * @PROGRAM: Dynamic 2D array using a double pointer
 * @INPUT: 2x3 matrix
 * @OUTPUT: 0 1 2 / 1 2 3
 */
void dynamic2DArray(int rows, int cols)
{
	int **matrix = malloc((size_t)rows * sizeof(int *));

	if (matrix == NULL)
		return;

	for (int i = 0; i < rows; i++)
		matrix[i] = malloc((size_t)cols * sizeof(int));

	for (int i = 0; i < rows; i++)
		for (int j = 0; j < cols; j++)
			matrix[i][j] = i + j;

	for (int i = 0; i < rows; i++)
	{
		for (int j = 0; j < cols; j++)
			printf("%d ", matrix[i][j]);
		printf("\n");
	}

	for (int i = 0; i < rows; i++)
		free(matrix[i]);
	free(matrix);
}
/* @END */

/*
 * @PROGRAM: Resize memory using realloc
 * @INPUT: start size 2, grow to 5
 * @OUTPUT: 0 1 0 0 0
 */
void reallocDemo(void)
{
	int *arr = malloc(2 * sizeof(int));

	if (arr == NULL)
		return;

	arr[0] = 0;
	arr[1] = 1;

	int *bigger = realloc(arr, 5 * sizeof(int));
	if (bigger == NULL)
	{
		free(arr);
		return;
	}
	arr = bigger;

	for (int i = 2; i < 5; i++)
		arr[i] = 0;

	for (int i = 0; i < 5; i++)
		printf("%d ", arr[i]);
	printf("\n");

	free(arr);
}
/* @END */

/*
 * @PROGRAM: Function pointer basics
 * @INPUT: 4, 3
 * @OUTPUT: Sum: 7
 */
int addNumbers(int a, int b)
{
	return a + b;
}

void functionPointerBasics(int a, int b)
{
	int (*funcPtr)(int, int) = addNumbers;

	printf("Sum: %d\n", funcPtr(a, b));
}
/* @END */

/*
 * @PROGRAM: Array of function pointers (menu dispatch)
 * @INPUT: 8, 2
 * @OUTPUT: Add: 10, Sub: 6, Mul: 16, Div: 4
 */
int opAdd(int a, int b) { return a + b; }
int opSub(int a, int b) { return a - b; }
int opMul(int a, int b) { return a * b; }
int opDiv(int a, int b) { return b != 0 ? a / b : 0; }

void arrayOfFunctionPointers(int a, int b)
{
	int (*operations[4])(int, int) = {opAdd, opSub, opMul, opDiv};
	const char *labels[4] = {"Add", "Sub", "Mul", "Div"};

	for (int i = 0; i < 4; i++)
		printf("%s: %d\n", labels[i], operations[i](a, b));
}
/* @END */

/*
 * @PROGRAM: Function pointer as a callback (custom comparator)
 * @INPUT: 5 2 9 1
 * @OUTPUT: 1 2 5 9
 */
int ascending(int a, int b) { return a > b; }

void bubbleSortWithCallback(int arr[], int n, int (*shouldSwap)(int, int))
{
	for (int i = 0; i < n - 1; i++)
		for (int j = 0; j < n - i - 1; j++)
			if (shouldSwap(arr[j], arr[j + 1]))
			{
				int temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
			}
}
/* @END */

/*
 * @PROGRAM: Pointer to a function returning a pointer
 * @INPUT: (none)
 * @OUTPUT: Hello from a function returning a pointer!
 */
const char *getGreeting(void)
{
	return "Hello from a function returning a pointer!";
}

const char *(*greetingFuncPtr)(void) = getGreeting;
/* @END */

/*
 * @PROGRAM: String length using a pointer
 * @INPUT: hello
 * @OUTPUT: Length: 5
 */
int stringLengthPointer(const char *str)
{
	const char *ptr = str;

	while (*ptr != '\0')
		ptr++;

	return (int)(ptr - str);
}
/* @END */

/*
 * @PROGRAM: String copy using a pointer
 * @INPUT: hello
 * @OUTPUT: hello
 */
void stringCopyPointer(char *dest, const char *src)
{
	while ((*dest++ = *src++) != '\0')
		;
}
/* @END */

/*
 * @PROGRAM: String reverse using a pointer
 * @INPUT: hello
 * @OUTPUT: olleh
 */
void stringReversePointer(char *str)
{
	char *start = str;
	char *end = str + strlen(str) - 1;

	while (start < end)
	{
		char temp = *start;
		*start = *end;
		*end = temp;
		start++;
		end--;
	}
}
/* @END */

/*
 * @PROGRAM: Find the maximum element in an array using a pointer
 * @INPUT: 3 7 2 9 4
 * @OUTPUT: Max: 9
 */
int findMaxPointer(int *arr, int n)
{
	int *max = arr;

	for (int *ptr = arr; ptr < arr + n; ptr++)
		if (*ptr > *max)
			max = ptr;

	return *max;
}
/* @END */

/*
 * @PROGRAM: Find the minimum element in an array using a pointer
 * @INPUT: 3 7 2 9 4
 * @OUTPUT: Min: 2
 */
int findMinPointer(int *arr, int n)
{
	int *min = arr;

	for (int *ptr = arr; ptr < arr + n; ptr++)
		if (*ptr < *min)
			min = ptr;

	return *min;
}
/* @END */

/*
 * @PROGRAM: Sum of array elements using a pointer
 * @INPUT: 1 2 3 4 5
 * @OUTPUT: Sum: 15
 */
int sumArrayPointer(int *arr, int n)
{
	int sum = 0;

	for (int *ptr = arr; ptr < arr + n; ptr++)
		sum += *ptr;

	return sum;
}
/* @END */

/*
 * @PROGRAM: Bubble sort using pointers
 * @INPUT: 5 2 9 1
 * @OUTPUT: 1 2 5 9
 */
void bubbleSortPointer(int *arr, int n)
{
	for (int *i = arr; i < arr + n - 1; i++)
		for (int *j = arr; j < arr + n - (i - arr) - 1; j++)
			if (*j > *(j + 1))
			{
				int temp = *j;
				*j = *(j + 1);
				*(j + 1) = temp;
			}
}
/* @END */

/*
 * @PROGRAM: Swap strings using a double pointer
 * @INPUT: s1="Hello", s2="World"
 * @OUTPUT: s1="World", s2="Hello"
 */
void swapStrings(char **s1, char **s2)
{
	char *temp = *s1;
	*s1 = *s2;
	*s2 = temp;
}
/* @END */

/*
 * @PROGRAM: Pointer to a structure and member access
 * @INPUT: x=3, y=4
 * @OUTPUT: x=3, y=4
 */
void pointerToStruct(Point *p)
{
	printf("x=%d, y=%d\n", p->x, p->y);
}
/* @END */

/*
 * @PROGRAM: Array of pointers to strings
 * @INPUT: Apple, Banana, Cherry
 * @OUTPUT: Apple Banana Cherry
 */
void arrayOfPointersToStrings(void)
{
	const char *fruits[3] = {"Apple", "Banana", "Cherry"};

	for (int i = 0; i < 3; i++)
		printf("%s ", fruits[i]);
	printf("\n");
}
/* @END */

/*
 * @PROGRAM: sizeof pointer vs sizeof array
 * @INPUT: int arr[10]
 * @OUTPUT: sizeof(arr)=40, sizeof(ptr)=8 (platform dependent)
 */
void sizeofPointerVsArray(void)
{
	int arr[10];
	int *ptr = arr;

	printf("sizeof(arr) = %zu\n", sizeof(arr));
	printf("sizeof(ptr) = %zu\n", sizeof(ptr));
}
/* @END */

static void readLine(char *buffer, int size)
{
	if (fgets(buffer, size, stdin) != NULL)
		buffer[strcspn(buffer, "\n")] = '\0';
}

static void printMenu(void)
{
	printf("\n--- Pointer Interview Programs ---\n");
	printf(" 1. Swap two numbers using a single pointer\n");
	printf(" 2. Swap two pointers using a double pointer\n");
	printf(" 3. Pass by value vs pass by reference\n");
	printf(" 4. Pointer arithmetic\n");
	printf(" 5. Traverse an array using a pointer\n");
	printf(" 6. Pointer vs array (sizeof demo)\n");
	printf(" 7. Pointer to an array vs array of pointers\n");
	printf(" 8. NULL pointer check\n");
	printf(" 9. Dangling pointer demo\n");
	printf("10. Void pointer demo\n");
	printf("11. Const pointer vs pointer to const\n");
	printf("12. Double pointer modifies a single pointer's value\n");
	printf("13. Dynamic memory allocation (malloc)\n");
	printf("14. Dynamic 2D array (double pointer)\n");
	printf("15. Resize memory (realloc)\n");
	printf("16. Function pointer basics\n");
	printf("17. Array of function pointers\n");
	printf("18. Function pointer as a callback\n");
	printf("19. Function returning a pointer\n");
	printf("20. String length using a pointer\n");
	printf("21. String copy using a pointer\n");
	printf("22. String reverse using a pointer\n");
	printf("23. Find max using a pointer\n");
	printf("24. Find min using a pointer\n");
	printf("25. Sum of array using a pointer\n");
	printf("26. Bubble sort using pointers\n");
	printf("27. Swap strings using a double pointer\n");
	printf("28. Pointer to a structure\n");
	printf("29. Array of pointers to strings\n");
	printf("30. sizeof pointer vs sizeof array\n");
	printf(" 0. Exit\n");
	printf("Choose an option: ");
}

int main(void)
{
	char bufferA[256];
	char bufferB[256];
	int choice;

	do
	{
		printMenu();
		if (scanf("%d", &choice) != 1)
			break;
		while (getchar() != '\n')
			;

		switch (choice)
		{
		case 1:
		{
			int a = 5, b = 10;

			swapSingle(&a, &b);
			printf("a=%d, b=%d\n", a, b);
			break;
		}
		case 2:
		{
			int x = 1, y = 2;
			int *p1 = &x;
			int *p2 = &y;

			swapPointers(&p1, &p2);
			printf("*p1=%d, *p2=%d\n", *p1, *p2);
			break;
		}
		case 3:
		{
			int value = 5;

			incrementByValue(value);
			printf("Value after by-value call (unchanged): %d\n", value);
			incrementByReference(&value);
			printf("Value after by-reference call: %d\n", value);
			break;
		}
		case 4:
		{
			int arr[] = {10, 20, 30};

			pointerArithmetic(arr, 3);
			break;
		}
		case 5:
		{
			int arr[] = {1, 2, 3, 4, 5};

			traverseArrayPointer(arr, 5);
			break;
		}
		case 6:
			pointerVsArrayDemo();
			break;
		case 7:
			pointerToArrayVsArrayOfPointers();
			break;
		case 8:
			nullPointerCheck(NULL);
			break;
		case 9:
			danglingPointerDemo();
			break;
		case 10:
			voidPointerDemo();
			break;
		case 11:
			constPointerDemo();
			break;
		case 12:
		{
			int value = 10;
			int *p = &value;

			incrementViaDoublePointer(&p);
			printf("value=%d\n", value);
			break;
		}
		case 13:
			dynamicMemoryAlloc(5);
			break;
		case 14:
			dynamic2DArray(2, 3);
			break;
		case 15:
			reallocDemo();
			break;
		case 16:
			functionPointerBasics(4, 3);
			break;
		case 17:
			arrayOfFunctionPointers(8, 2);
			break;
		case 18:
		{
			int arr[] = {5, 2, 9, 1};
			int n = (int)(sizeof(arr) / sizeof(arr[0]));

			bubbleSortWithCallback(arr, n, ascending);
			for (int i = 0; i < n; i++)
				printf("%d ", arr[i]);
			printf("\n");
			break;
		}
		case 19:
			printf("%s\n", greetingFuncPtr());
			break;
		case 20:
			printf("Enter string: ");
			readLine(bufferA, sizeof(bufferA));
			printf("Length: %d\n", stringLengthPointer(bufferA));
			break;
		case 21:
			printf("Enter string: ");
			readLine(bufferA, sizeof(bufferA));
			stringCopyPointer(bufferB, bufferA);
			printf("Copied: %s\n", bufferB);
			break;
		case 22:
			printf("Enter string: ");
			readLine(bufferA, sizeof(bufferA));
			stringReversePointer(bufferA);
			printf("Reversed: %s\n", bufferA);
			break;
		case 23:
		{
			int arr[] = {3, 7, 2, 9, 4};

			printf("Max: %d\n", findMaxPointer(arr, 5));
			break;
		}
		case 24:
		{
			int arr[] = {3, 7, 2, 9, 4};

			printf("Min: %d\n", findMinPointer(arr, 5));
			break;
		}
		case 25:
		{
			int arr[] = {1, 2, 3, 4, 5};

			printf("Sum: %d\n", sumArrayPointer(arr, 5));
			break;
		}
		case 26:
		{
			int arr[] = {5, 2, 9, 1};
			int n = (int)(sizeof(arr) / sizeof(arr[0]));

			bubbleSortPointer(arr, n);
			for (int i = 0; i < n; i++)
				printf("%d ", arr[i]);
			printf("\n");
			break;
		}
		case 27:
		{
			char *s1 = "Hello";
			char *s2 = "World";

			swapStrings(&s1, &s2);
			printf("s1=%s, s2=%s\n", s1, s2);
			break;
		}
		case 28:
		{
			Point p = {3, 4};

			pointerToStruct(&p);
			break;
		}
		case 29:
			arrayOfPointersToStrings();
			break;
		case 30:
			sizeofPointerVsArray();
			break;
		case 0:
			printf("Goodbye!\n");
			break;
		default:
			printf("Invalid option.\n");
			break;
		}
	} while (choice != 0);

	return 0;
}
