const CATALOG = [
  {
    "section": "C Programming",
    "chapters": [
      {
        "chapter": "POINTERS",
        "folder": "C",
        "programs": [
          {
            "name": "Swap two numbers using a single pointer",
            "input": "a=5, b=10",
            "output": "a=10, b=5",
            "code": "void swapSingle(int *a, int *b)\n{\n\tint temp = *a;\n\t*a = *b;\n\t*b = temp;\n}"
          },
          {
            "name": "Swap two pointers using a double pointer",
            "input": "p1 -> 1, p2 -> 2",
            "output": "p1 -> 2, p2 -> 1",
            "code": "void swapPointers(int **p1, int **p2)\n{\n\tint *temp = *p1;\n\t*p1 = *p2;\n\t*p2 = temp;\n}"
          },
          {
            "name": "Pass by value vs pass by reference",
            "input": "5",
            "output": "By value: 5, By reference: 6",
            "code": "void incrementByValue(int x)\n{\n\tx = x + 1;\n\tprintf(\"By value (inside function): %d\\n\", x);\n}\n\nvoid incrementByReference(int *x)\n{\n\t*x = *x + 1;\n\tprintf(\"By reference (inside function): %d\\n\", *x);\n}"
          },
          {
            "name": "Pointer arithmetic - increment, decrement and comparison",
            "input": "10, 20, 30",
            "output": "10 20 30 (walked using pointer++ )",
            "code": "void pointerArithmetic(int arr[], int n)\n{\n\tint *ptr = arr;\n\n\tfor (int i = 0; i < n; i++)\n\t{\n\t\tprintf(\"%d \", *ptr);\n\t\tptr++;\n\t}\n\tprintf(\"\\n\");\n\n\tptr--;\n\tprintf(\"After one decrement, last element again: %d\\n\", *ptr);\n}"
          },
          {
            "name": "Traverse an array using a pointer",
            "input": "1 2 3 4 5",
            "output": "1 2 3 4 5",
            "code": "void traverseArrayPointer(int arr[], int n)\n{\n\tfor (int *ptr = arr; ptr < arr + n; ptr++)\n\t\tprintf(\"%d \", *ptr);\n\tprintf(\"\\n\");\n}"
          },
          {
            "name": "Difference between a pointer and an array",
            "input": "int arr[5]",
            "output": "sizeof(arr) is the full array size, sizeof(ptr) is only the pointer size",
            "code": "void pointerVsArrayDemo(void)\n{\n\tint arr[5] = {1, 2, 3, 4, 5};\n\tint *ptr = arr;\n\n\tprintf(\"sizeof(arr) = %zu bytes\\n\", sizeof(arr));\n\tprintf(\"sizeof(ptr) = %zu bytes\\n\", sizeof(ptr));\n\tprintf(\"arr and ptr both give %d as the first element\\n\", arr[0]);\n}"
          },
          {
            "name": "Pointer to an array vs array of pointers",
            "input": "matrix[2][3] and names[3]",
            "output": "Row 0: 1 2 3, Names: A B C",
            "code": "void pointerToArrayVsArrayOfPointers(void)\n{\n\tint matrix[2][3] = {{1, 2, 3}, {4, 5, 6}};\n\tint (*rowPtr)[3] = matrix;\n\n\tconst char *names[3] = {\"A\", \"B\", \"C\"};\n\n\tprintf(\"Row 0 via pointer-to-array: \");\n\tfor (int i = 0; i < 3; i++)\n\t\tprintf(\"%d \", rowPtr[0][i]);\n\tprintf(\"\\n\");\n\n\tprintf(\"Array of pointers: \");\n\tfor (int i = 0; i < 3; i++)\n\t\tprintf(\"%s \", names[i]);\n\tprintf(\"\\n\");\n}"
          },
          {
            "name": "NULL pointer check",
            "input": "NULL",
            "output": "Pointer is NULL",
            "code": "void nullPointerCheck(int *ptr)\n{\n\tif (ptr == NULL)\n\t\tprintf(\"Pointer is NULL\\n\");\n\telse\n\t\tprintf(\"Pointer holds value: %d\\n\", *ptr);\n}"
          },
          {
            "name": "Dangling pointer and how to avoid it",
            "input": "(none)",
            "output": "Pointer set to NULL after free, safe to check before use",
            "code": "void danglingPointerDemo(void)\n{\n\tint *ptr = malloc(sizeof(int));\n\n\tif (ptr == NULL)\n\t\treturn;\n\n\t*ptr = 42;\n\tprintf(\"Before free: %d\\n\", *ptr);\n\n\tfree(ptr);\n\tptr = NULL; /* avoids a dangling pointer */\n\n\tif (ptr == NULL)\n\t\tprintf(\"Pointer safely reset to NULL after free\\n\");\n}"
          },
          {
            "name": "Void pointer (generic pointer) demo",
            "input": "int 10, char A",
            "output": "As int: 10, As char: A",
            "code": "void voidPointerDemo(void)\n{\n\tint number = 10;\n\tchar letter = 'A';\n\tvoid *generic = &number;\n\n\tprintf(\"As int: %d\\n\", *(int *)generic);\n\n\tgeneric = &letter;\n\tprintf(\"As char: %c\\n\", *(char *)generic);\n}"
          },
          {
            "name": "Constant pointer vs pointer to constant",
            "input": "value=1, value=2",
            "output": "Pointer to const cannot modify value; const pointer cannot repoint",
            "code": "void constPointerDemo(void)\n{\n\tint value = 1;\n\tint other = 2;\n\n\tconst int *ptrToConst = &value; /* value cannot change through ptrToConst */\n\tint *const constPtr = &value;\t /* constPtr cannot point elsewhere */\n\n\tptrToConst = &other; /* allowed: repointing is fine */\n\t*constPtr = 5;\t\t  /* allowed: modifying the value is fine */\n\n\tprintf(\"ptrToConst now reads: %d\\n\", *ptrToConst);\n\tprintf(\"value via constPtr: %d\\n\", *constPtr);\n}"
          },
          {
            "name": "Double pointer to modify what a single pointer points to",
            "input": "value=10",
            "output": "value=11",
            "code": "void incrementViaDoublePointer(int **pp)\n{\n\t**pp = **pp + 1;\n}"
          },
          {
            "name": "Dynamic memory allocation using malloc",
            "input": "5 elements",
            "output": "0 1 2 3 4",
            "code": "void dynamicMemoryAlloc(int n)\n{\n\tint *arr = malloc((size_t)n * sizeof(int));\n\n\tif (arr == NULL)\n\t\treturn;\n\n\tfor (int i = 0; i < n; i++)\n\t\tarr[i] = i;\n\n\tfor (int i = 0; i < n; i++)\n\t\tprintf(\"%d \", arr[i]);\n\tprintf(\"\\n\");\n\n\tfree(arr);\n}"
          },
          {
            "name": "Dynamic 2D array using a double pointer",
            "input": "2x3 matrix",
            "output": "0 1 2 / 1 2 3",
            "code": "void dynamic2DArray(int rows, int cols)\n{\n\tint **matrix = malloc((size_t)rows * sizeof(int *));\n\n\tif (matrix == NULL)\n\t\treturn;\n\n\tfor (int i = 0; i < rows; i++)\n\t\tmatrix[i] = malloc((size_t)cols * sizeof(int));\n\n\tfor (int i = 0; i < rows; i++)\n\t\tfor (int j = 0; j < cols; j++)\n\t\t\tmatrix[i][j] = i + j;\n\n\tfor (int i = 0; i < rows; i++)\n\t{\n\t\tfor (int j = 0; j < cols; j++)\n\t\t\tprintf(\"%d \", matrix[i][j]);\n\t\tprintf(\"\\n\");\n\t}\n\n\tfor (int i = 0; i < rows; i++)\n\t\tfree(matrix[i]);\n\tfree(matrix);\n}"
          },
          {
            "name": "Resize memory using realloc",
            "input": "start size 2, grow to 5",
            "output": "0 1 0 0 0",
            "code": "void reallocDemo(void)\n{\n\tint *arr = malloc(2 * sizeof(int));\n\n\tif (arr == NULL)\n\t\treturn;\n\n\tarr[0] = 0;\n\tarr[1] = 1;\n\n\tint *bigger = realloc(arr, 5 * sizeof(int));\n\tif (bigger == NULL)\n\t{\n\t\tfree(arr);\n\t\treturn;\n\t}\n\tarr = bigger;\n\n\tfor (int i = 2; i < 5; i++)\n\t\tarr[i] = 0;\n\n\tfor (int i = 0; i < 5; i++)\n\t\tprintf(\"%d \", arr[i]);\n\tprintf(\"\\n\");\n\n\tfree(arr);\n}"
          },
          {
            "name": "Function pointer basics",
            "input": "4, 3",
            "output": "Sum: 7",
            "code": "int addNumbers(int a, int b)\n{\n\treturn a + b;\n}\n\nvoid functionPointerBasics(int a, int b)\n{\n\tint (*funcPtr)(int, int) = addNumbers;\n\n\tprintf(\"Sum: %d\\n\", funcPtr(a, b));\n}"
          },
          {
            "name": "Array of function pointers (menu dispatch)",
            "input": "8, 2",
            "output": "Add: 10, Sub: 6, Mul: 16, Div: 4",
            "code": "int opAdd(int a, int b) { return a + b; }\nint opSub(int a, int b) { return a - b; }\nint opMul(int a, int b) { return a * b; }\nint opDiv(int a, int b) { return b != 0 ? a / b : 0; }\n\nvoid arrayOfFunctionPointers(int a, int b)\n{\n\tint (*operations[4])(int, int) = {opAdd, opSub, opMul, opDiv};\n\tconst char *labels[4] = {\"Add\", \"Sub\", \"Mul\", \"Div\"};\n\n\tfor (int i = 0; i < 4; i++)\n\t\tprintf(\"%s: %d\\n\", labels[i], operations[i](a, b));\n}"
          },
          {
            "name": "Function pointer as a callback (custom comparator)",
            "input": "5 2 9 1",
            "output": "1 2 5 9",
            "code": "int ascending(int a, int b) { return a > b; }\n\nvoid bubbleSortWithCallback(int arr[], int n, int (*shouldSwap)(int, int))\n{\n\tfor (int i = 0; i < n - 1; i++)\n\t\tfor (int j = 0; j < n - i - 1; j++)\n\t\t\tif (shouldSwap(arr[j], arr[j + 1]))\n\t\t\t{\n\t\t\t\tint temp = arr[j];\n\t\t\t\tarr[j] = arr[j + 1];\n\t\t\t\tarr[j + 1] = temp;\n\t\t\t}\n}"
          },
          {
            "name": "Pointer to a function returning a pointer",
            "input": "(none)",
            "output": "Hello from a function returning a pointer!",
            "code": "const char *getGreeting(void)\n{\n\treturn \"Hello from a function returning a pointer!\";\n}\n\nconst char *(*greetingFuncPtr)(void) = getGreeting;"
          },
          {
            "name": "String length using a pointer",
            "input": "hello",
            "output": "Length: 5",
            "code": "int stringLengthPointer(const char *str)\n{\n\tconst char *ptr = str;\n\n\twhile (*ptr != '\\0')\n\t\tptr++;\n\n\treturn (int)(ptr - str);\n}"
          },
          {
            "name": "String copy using a pointer",
            "input": "hello",
            "output": "hello",
            "code": "void stringCopyPointer(char *dest, const char *src)\n{\n\twhile ((*dest++ = *src++) != '\\0')\n\t\t;\n}"
          },
          {
            "name": "String reverse using a pointer",
            "input": "hello",
            "output": "olleh",
            "code": "void stringReversePointer(char *str)\n{\n\tchar *start = str;\n\tchar *end = str + strlen(str) - 1;\n\n\twhile (start < end)\n\t{\n\t\tchar temp = *start;\n\t\t*start = *end;\n\t\t*end = temp;\n\t\tstart++;\n\t\tend--;\n\t}\n}"
          },
          {
            "name": "Find the maximum element in an array using a pointer",
            "input": "3 7 2 9 4",
            "output": "Max: 9",
            "code": "int findMaxPointer(int *arr, int n)\n{\n\tint *max = arr;\n\n\tfor (int *ptr = arr; ptr < arr + n; ptr++)\n\t\tif (*ptr > *max)\n\t\t\tmax = ptr;\n\n\treturn *max;\n}"
          },
          {
            "name": "Find the minimum element in an array using a pointer",
            "input": "3 7 2 9 4",
            "output": "Min: 2",
            "code": "int findMinPointer(int *arr, int n)\n{\n\tint *min = arr;\n\n\tfor (int *ptr = arr; ptr < arr + n; ptr++)\n\t\tif (*ptr < *min)\n\t\t\tmin = ptr;\n\n\treturn *min;\n}"
          },
          {
            "name": "Sum of array elements using a pointer",
            "input": "1 2 3 4 5",
            "output": "Sum: 15",
            "code": "int sumArrayPointer(int *arr, int n)\n{\n\tint sum = 0;\n\n\tfor (int *ptr = arr; ptr < arr + n; ptr++)\n\t\tsum += *ptr;\n\n\treturn sum;\n}"
          },
          {
            "name": "Bubble sort using pointers",
            "input": "5 2 9 1",
            "output": "1 2 5 9",
            "code": "void bubbleSortPointer(int *arr, int n)\n{\n\tfor (int *i = arr; i < arr + n - 1; i++)\n\t\tfor (int *j = arr; j < arr + n - (i - arr) - 1; j++)\n\t\t\tif (*j > *(j + 1))\n\t\t\t{\n\t\t\t\tint temp = *j;\n\t\t\t\t*j = *(j + 1);\n\t\t\t\t*(j + 1) = temp;\n\t\t\t}\n}"
          },
          {
            "name": "Swap strings using a double pointer",
            "input": "s1=\"Hello\", s2=\"World\"",
            "output": "s1=\"World\", s2=\"Hello\"",
            "code": "void swapStrings(char **s1, char **s2)\n{\n\tchar *temp = *s1;\n\t*s1 = *s2;\n\t*s2 = temp;\n}"
          },
          {
            "name": "Pointer to a structure and member access",
            "input": "x=3, y=4",
            "output": "x=3, y=4",
            "code": "void pointerToStruct(Point *p)\n{\n\tprintf(\"x=%d, y=%d\\n\", p->x, p->y);\n}"
          },
          {
            "name": "Array of pointers to strings",
            "input": "Apple, Banana, Cherry",
            "output": "Apple Banana Cherry",
            "code": "void arrayOfPointersToStrings(void)\n{\n\tconst char *fruits[3] = {\"Apple\", \"Banana\", \"Cherry\"};\n\n\tfor (int i = 0; i < 3; i++)\n\t\tprintf(\"%s \", fruits[i]);\n\tprintf(\"\\n\");\n}"
          },
          {
            "name": "sizeof pointer vs sizeof array",
            "input": "int arr[10]",
            "output": "sizeof(arr)=40, sizeof(ptr)=8 (platform dependent)",
            "code": "void sizeofPointerVsArray(void)\n{\n\tint arr[10];\n\tint *ptr = arr;\n\n\tprintf(\"sizeof(arr) = %zu\\n\", sizeof(arr));\n\tprintf(\"sizeof(ptr) = %zu\\n\", sizeof(ptr));\n}"
          }
        ],
        "path": "C/pointers.c"
      },
      {
        "chapter": "STRING PROGRAMS",
        "folder": "C",
        "programs": [
          {
            "name": "Reverse a character array string",
            "input": "hello",
            "output": "olleh",
            "code": "void reverseString(char str[])\n{\n\tint left = 0;\n\tint right = (int)strlen(str) - 1;\n\n\twhile (left < right)\n\t{\n\t\tchar temp = str[left];\n\t\tstr[left] = str[right];\n\t\tstr[right] = temp;\n\t\tleft++;\n\t\tright--;\n\t}\n}"
          },
          {
            "name": "Check if a string is a palindrome",
            "input": "madam",
            "output": "madam is a palindrome",
            "code": "int isPalindrome(const char *str)\n{\n\tint left = 0;\n\tint right = (int)strlen(str) - 1;\n\n\twhile (left < right)\n\t{\n\t\tif (str[left] != str[right])\n\t\t\treturn 0;\n\t\tleft++;\n\t\tright--;\n\t}\n\treturn 1;\n}"
          },
          {
            "name": "Count vowels and consonants in a string",
            "input": "hello world",
            "output": "Vowels: 3, Consonants: 7",
            "code": "void countVowelsConsonants(const char *str, int *vowels, int *consonants)\n{\n\t*vowels = 0;\n\t*consonants = 0;\n\tfor (int i = 0; str[i] != '\\0'; i++)\n\t{\n\t\tchar c = (char)tolower((unsigned char)str[i]);\n\n\t\tif (!isalpha((unsigned char)c))\n\t\t\tcontinue;\n\t\tif (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u')\n\t\t\t(*vowels)++;\n\t\telse\n\t\t\t(*consonants)++;\n\t}\n}"
          },
          {
            "name": "Find the length of a string without strlen",
            "input": "hello",
            "output": "Length: 5",
            "code": "int stringLength(const char *str)\n{\n\tint length = 0;\n\n\twhile (str[length] != '\\0')\n\t\tlength++;\n\treturn length;\n}"
          },
          {
            "name": "Check if two strings are anagrams",
            "input": "listen, silent",
            "output": "Anagrams",
            "code": "int areAnagrams(const char *a, const char *b)\n{\n\tint counts[256] = {0};\n\n\tif (strlen(a) != strlen(b))\n\t\treturn 0;\n\n\tfor (int i = 0; a[i] != '\\0'; i++)\n\t\tcounts[(unsigned char)a[i]]++;\n\tfor (int i = 0; b[i] != '\\0'; i++)\n\t\tcounts[(unsigned char)b[i]]--;\n\n\tfor (int i = 0; i < 256; i++)\n\t\tif (counts[i] != 0)\n\t\t\treturn 0;\n\treturn 1;\n}"
          },
          {
            "name": "Remove duplicate characters from a string",
            "input": "programming",
            "output": "progamin",
            "code": "void removeDuplicates(char str[])\n{\n\tint seen[256] = {0};\n\tint writeIndex = 0;\n\n\tfor (int i = 0; str[i] != '\\0'; i++)\n\t{\n\t\tunsigned char c = (unsigned char)str[i];\n\n\t\tif (!seen[c])\n\t\t{\n\t\t\tseen[c] = 1;\n\t\t\tstr[writeIndex++] = (char)c;\n\t\t}\n\t}\n\tstr[writeIndex] = '\\0';\n}"
          },
          {
            "name": "Find the first non-repeating character",
            "input": "swiss",
            "output": "w",
            "code": "char firstNonRepeatingChar(const char *str)\n{\n\tint counts[256] = {0};\n\n\tfor (int i = 0; str[i] != '\\0'; i++)\n\t\tcounts[(unsigned char)str[i]]++;\n\n\tfor (int i = 0; str[i] != '\\0'; i++)\n\t\tif (counts[(unsigned char)str[i]] == 1)\n\t\t\treturn str[i];\n\n\treturn '\\0';\n}"
          },
          {
            "name": "Count the frequency of each character",
            "input": "aabbc",
            "output": "a:2 b:2 c:1",
            "code": "void charFrequency(const char *str)\n{\n\tint counts[256] = {0};\n\n\tfor (int i = 0; str[i] != '\\0'; i++)\n\t\tcounts[(unsigned char)str[i]]++;\n\n\tfor (int c = 0; c < 256; c++)\n\t\tif (counts[c] > 0)\n\t\t\tprintf(\"%c:%d \", c, counts[c]);\n\tprintf(\"\\n\");\n}"
          },
          {
            "name": "Convert a string to uppercase",
            "input": "Hello World",
            "output": "HELLO WORLD",
            "code": "void toUpperCase(char str[])\n{\n\tfor (int i = 0; str[i] != '\\0'; i++)\n\t\tstr[i] = (char)toupper((unsigned char)str[i]);\n}"
          },
          {
            "name": "Convert a string to lowercase",
            "input": "Hello World",
            "output": "hello world",
            "code": "void toLowerCase(char str[])\n{\n\tfor (int i = 0; str[i] != '\\0'; i++)\n\t\tstr[i] = (char)tolower((unsigned char)str[i]);\n}"
          },
          {
            "name": "Check if a string contains only digits",
            "input": "12345",
            "output": "Numeric",
            "code": "int isNumeric(const char *str)\n{\n\tif (*str == '\\0')\n\t\treturn 0;\n\n\tfor (int i = 0; str[i] != '\\0'; i++)\n\t\tif (!isdigit((unsigned char)str[i]))\n\t\t\treturn 0;\n\treturn 1;\n}"
          },
          {
            "name": "Reverse the words in a sentence",
            "input": "Hello World From C",
            "output": "C From World Hello",
            "code": "void reverseWords(char str[])\n{\n\treverseString(str);\n\n\tint start = 0;\n\tint length = (int)strlen(str);\n\n\tfor (int i = 0; i <= length; i++)\n\t{\n\t\tif (str[i] == ' ' || str[i] == '\\0')\n\t\t{\n\t\t\tint left = start;\n\t\t\tint right = i - 1;\n\n\t\t\twhile (left < right)\n\t\t\t{\n\t\t\t\tchar temp = str[left];\n\t\t\t\tstr[left] = str[right];\n\t\t\t\tstr[right] = temp;\n\t\t\t\tleft++;\n\t\t\t\tright--;\n\t\t\t}\n\t\t\tstart = i + 1;\n\t\t}\n\t}\n}"
          },
          {
            "name": "Count the number of words in a sentence",
            "input": "Hello World From C",
            "output": "Word count: 4",
            "code": "int countWords(const char *str)\n{\n\tint count = 0;\n\tint inWord = 0;\n\n\tfor (int i = 0; str[i] != '\\0'; i++)\n\t{\n\t\tif (str[i] != ' ' && !inWord)\n\t\t{\n\t\t\tinWord = 1;\n\t\t\tcount++;\n\t\t}\n\t\telse if (str[i] == ' ')\n\t\t{\n\t\t\tinWord = 0;\n\t\t}\n\t}\n\treturn count;\n}"
          },
          {
            "name": "Find a substring within a string (strstr implementation)",
            "input": "hello world, world",
            "output": "Found at index 6",
            "code": "int myStrStr(const char *haystack, const char *needle)\n{\n\tint haystackLen = (int)strlen(haystack);\n\tint needleLen = (int)strlen(needle);\n\n\tif (needleLen == 0)\n\t\treturn 0;\n\n\tfor (int i = 0; i <= haystackLen - needleLen; i++)\n\t{\n\t\tint j = 0;\n\n\t\twhile (j < needleLen && haystack[i + j] == needle[j])\n\t\t\tj++;\n\t\tif (j == needleLen)\n\t\t\treturn i;\n\t}\n\treturn -1;\n}"
          },
          {
            "name": "Remove all whitespaces from a string",
            "input": "H e l l o",
            "output": "Hello",
            "code": "void removeSpaces(char str[])\n{\n\tint writeIndex = 0;\n\n\tfor (int i = 0; str[i] != '\\0'; i++)\n\t\tif (str[i] != ' ')\n\t\t\tstr[writeIndex++] = str[i];\n\tstr[writeIndex] = '\\0';\n}"
          },
          {
            "name": "Find the maximum occurring character",
            "input": "programming",
            "output": "r",
            "code": "char maxOccurringChar(const char *str)\n{\n\tint counts[256] = {0};\n\tint maxCount = 0;\n\n\tfor (int i = 0; str[i] != '\\0'; i++)\n\t\tcounts[(unsigned char)str[i]]++;\n\n\tfor (int c = 0; c < 256; c++)\n\t\tif (counts[c] > maxCount)\n\t\t\tmaxCount = counts[c];\n\n\tfor (int i = 0; str[i] != '\\0'; i++)\n\t\tif (counts[(unsigned char)str[i]] == maxCount)\n\t\t\treturn str[i];\n\n\treturn '\\0';\n}"
          },
          {
            "name": "Toggle the case of each character",
            "input": "Hello World",
            "output": "hELLO wORLD",
            "code": "void toggleCase(char str[])\n{\n\tfor (int i = 0; str[i] != '\\0'; i++)\n\t{\n\t\tif (islower((unsigned char)str[i]))\n\t\t\tstr[i] = (char)toupper((unsigned char)str[i]);\n\t\telse if (isupper((unsigned char)str[i]))\n\t\t\tstr[i] = (char)tolower((unsigned char)str[i]);\n\t}\n}"
          },
          {
            "name": "Check if two strings are rotations of each other",
            "input": "waterbottle, erbottlewat",
            "output": "Rotations",
            "code": "int areRotations(const char *a, const char *b)\n{\n\tchar combined[256];\n\tsize_t lenA = strlen(a);\n\tsize_t lenB = strlen(b);\n\n\tif (lenA != lenB || lenA >= sizeof(combined) / 2)\n\t\treturn 0;\n\n\tsnprintf(combined, sizeof(combined), \"%s%s\", a, a);\n\treturn myStrStr(combined, b) != -1;\n}"
          },
          {
            "name": "Implement strcpy",
            "input": "copytest",
            "output": "copytest",
            "code": "char *myStrcpy(char dest[], const char src[])\n{\n\tint i = 0;\n\n\twhile ((dest[i] = src[i]) != '\\0')\n\t\ti++;\n\treturn dest;\n}"
          },
          {
            "name": "Implement strcat",
            "input": "Hello , World",
            "output": "Hello World",
            "code": "char *myStrcat(char dest[], const char src[])\n{\n\tint destLen = (int)strlen(dest);\n\tint i = 0;\n\n\twhile ((dest[destLen + i] = src[i]) != '\\0')\n\t\ti++;\n\treturn dest;\n}"
          },
          {
            "name": "Convert a string to integer (atoi implementation)",
            "input": "-1234",
            "output": "-1234",
            "code": "int myAtoi(const char *str)\n{\n\tint result = 0;\n\tint sign = 1;\n\tint i = 0;\n\n\tif (str[0] == '-' || str[0] == '+')\n\t{\n\t\tsign = (str[0] == '-') ? -1 : 1;\n\t\ti++;\n\t}\n\n\tfor (; str[i] != '\\0'; i++)\n\t{\n\t\tif (!isdigit((unsigned char)str[i]))\n\t\t\tbreak;\n\t\tresult = result * 10 + (str[i] - '0');\n\t}\n\treturn result * sign;\n}"
          }
        ],
        "path": "C/strings.c"
      },
      {
        "chapter": "LINKED LIST (DSA)",
        "folder": "DSA",
        "programs": [
          {
            "name": "Create a node and a simple singly linked list",
            "input": "10 -> 20 -> 30",
            "output": "10 -> 20 -> 30 -> NULL",
            "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node\n{\n\tint data;\n\tstruct Node *next;\n};\n\nstatic struct Node *createNode(int data)\n{\n\tstruct Node *node = malloc(sizeof(struct Node));\n\tnode->data = data;\n\tnode->next = NULL;\n\treturn node;\n}\n\nint main(void)\n{\n\tstruct Node *head = createNode(10);\n\thead->next = createNode(20);\n\thead->next->next = createNode(30);\n\n\tfor (struct Node *cur = head; cur != NULL; cur = cur->next)\n\t\tprintf(\"%d -> \", cur->data);\n\tprintf(\"NULL\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Insert a node at the beginning of a linked list",
            "input": "list = 20 -> 30, insert 10",
            "output": "10 -> 20 -> 30 -> NULL",
            "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node\n{\n\tint data;\n\tstruct Node *next;\n};\n\nstatic struct Node *insertAtBeginning(struct Node *head, int data)\n{\n\tstruct Node *node = malloc(sizeof(struct Node));\n\tnode->data = data;\n\tnode->next = head;\n\treturn node;\n}\n\nint main(void)\n{\n\tstruct Node *head = malloc(sizeof(struct Node));\n\thead->data = 20;\n\thead->next = malloc(sizeof(struct Node));\n\thead->next->data = 30;\n\thead->next->next = NULL;\n\n\thead = insertAtBeginning(head, 10);\n\n\tfor (struct Node *cur = head; cur != NULL; cur = cur->next)\n\t\tprintf(\"%d -> \", cur->data);\n\tprintf(\"NULL\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Insert a node at the end of a linked list",
            "input": "list = 10 -> 20, insert 30",
            "output": "10 -> 20 -> 30 -> NULL",
            "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node\n{\n\tint data;\n\tstruct Node *next;\n};\n\nstatic struct Node *insertAtEnd(struct Node *head, int data)\n{\n\tstruct Node *node = malloc(sizeof(struct Node));\n\tnode->data = data;\n\tnode->next = NULL;\n\n\tif (head == NULL)\n\t\treturn node;\n\n\tstruct Node *cur = head;\n\twhile (cur->next != NULL)\n\t\tcur = cur->next;\n\tcur->next = node;\n\n\treturn head;\n}\n\nint main(void)\n{\n\tstruct Node *head = malloc(sizeof(struct Node));\n\thead->data = 10;\n\thead->next = malloc(sizeof(struct Node));\n\thead->next->data = 20;\n\thead->next->next = NULL;\n\n\thead = insertAtEnd(head, 30);\n\n\tfor (struct Node *cur = head; cur != NULL; cur = cur->next)\n\t\tprintf(\"%d -> \", cur->data);\n\tprintf(\"NULL\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Insert a node at a given position",
            "input": "list = 10 -> 20 -> 40, insert 30 at position 2 (0-indexed)",
            "output": "10 -> 20 -> 30 -> 40 -> NULL",
            "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node\n{\n\tint data;\n\tstruct Node *next;\n};\n\nstatic struct Node *insertAtPosition(struct Node *head, int data, int position)\n{\n\tstruct Node *node = malloc(sizeof(struct Node));\n\tnode->data = data;\n\n\tif (position == 0)\n\t{\n\t\tnode->next = head;\n\t\treturn node;\n\t}\n\n\tstruct Node *cur = head;\n\tfor (int i = 0; i < position - 1 && cur != NULL; i++)\n\t\tcur = cur->next;\n\n\tnode->next = cur->next;\n\tcur->next = node;\n\treturn head;\n}\n\nint main(void)\n{\n\tstruct Node *head = malloc(sizeof(struct Node));\n\thead->data = 10;\n\thead->next = malloc(sizeof(struct Node));\n\thead->next->data = 20;\n\thead->next->next = malloc(sizeof(struct Node));\n\thead->next->next->data = 40;\n\thead->next->next->next = NULL;\n\n\thead = insertAtPosition(head, 30, 2);\n\n\tfor (struct Node *cur = head; cur != NULL; cur = cur->next)\n\t\tprintf(\"%d -> \", cur->data);\n\tprintf(\"NULL\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Delete the first node of a linked list",
            "input": "list = 10 -> 20 -> 30",
            "output": "20 -> 30 -> NULL",
            "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node\n{\n\tint data;\n\tstruct Node *next;\n};\n\nstatic struct Node *deleteFromBeginning(struct Node *head)\n{\n\tif (head == NULL)\n\t\treturn NULL;\n\n\tstruct Node *newHead = head->next;\n\tfree(head);\n\treturn newHead;\n}\n\nint main(void)\n{\n\tstruct Node *head = malloc(sizeof(struct Node));\n\thead->data = 10;\n\thead->next = malloc(sizeof(struct Node));\n\thead->next->data = 20;\n\thead->next->next = malloc(sizeof(struct Node));\n\thead->next->next->data = 30;\n\thead->next->next->next = NULL;\n\n\thead = deleteFromBeginning(head);\n\n\tfor (struct Node *cur = head; cur != NULL; cur = cur->next)\n\t\tprintf(\"%d -> \", cur->data);\n\tprintf(\"NULL\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Delete the last node of a linked list",
            "input": "list = 10 -> 20 -> 30",
            "output": "10 -> 20 -> NULL",
            "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node\n{\n\tint data;\n\tstruct Node *next;\n};\n\nstatic struct Node *deleteFromEnd(struct Node *head)\n{\n\tif (head == NULL || head->next == NULL)\n\t{\n\t\tfree(head);\n\t\treturn NULL;\n\t}\n\n\tstruct Node *cur = head;\n\twhile (cur->next->next != NULL)\n\t\tcur = cur->next;\n\n\tfree(cur->next);\n\tcur->next = NULL;\n\treturn head;\n}\n\nint main(void)\n{\n\tstruct Node *head = malloc(sizeof(struct Node));\n\thead->data = 10;\n\thead->next = malloc(sizeof(struct Node));\n\thead->next->data = 20;\n\thead->next->next = malloc(sizeof(struct Node));\n\thead->next->next->data = 30;\n\thead->next->next->next = NULL;\n\n\thead = deleteFromEnd(head);\n\n\tfor (struct Node *cur = head; cur != NULL; cur = cur->next)\n\t\tprintf(\"%d -> \", cur->data);\n\tprintf(\"NULL\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Delete a node by value",
            "input": "list = 10 -> 20 -> 30, delete 20",
            "output": "10 -> 30 -> NULL",
            "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node\n{\n\tint data;\n\tstruct Node *next;\n};\n\nstatic struct Node *deleteByValue(struct Node *head, int value)\n{\n\tif (head == NULL)\n\t\treturn NULL;\n\n\tif (head->data == value)\n\t{\n\t\tstruct Node *newHead = head->next;\n\t\tfree(head);\n\t\treturn newHead;\n\t}\n\n\tstruct Node *cur = head;\n\twhile (cur->next != NULL && cur->next->data != value)\n\t\tcur = cur->next;\n\n\tif (cur->next != NULL)\n\t{\n\t\tstruct Node *toDelete = cur->next;\n\t\tcur->next = toDelete->next;\n\t\tfree(toDelete);\n\t}\n\n\treturn head;\n}\n\nint main(void)\n{\n\tstruct Node *head = malloc(sizeof(struct Node));\n\thead->data = 10;\n\thead->next = malloc(sizeof(struct Node));\n\thead->next->data = 20;\n\thead->next->next = malloc(sizeof(struct Node));\n\thead->next->next->data = 30;\n\thead->next->next->next = NULL;\n\n\thead = deleteByValue(head, 20);\n\n\tfor (struct Node *cur = head; cur != NULL; cur = cur->next)\n\t\tprintf(\"%d -> \", cur->data);\n\tprintf(\"NULL\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Search for a value in a linked list",
            "input": "list = 10 -> 20 -> 30, search 20",
            "output": "Found 20 in the list",
            "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node\n{\n\tint data;\n\tstruct Node *next;\n};\n\nstatic int search(struct Node *head, int value)\n{\n\tfor (struct Node *cur = head; cur != NULL; cur = cur->next)\n\t\tif (cur->data == value)\n\t\t\treturn 1;\n\treturn 0;\n}\n\nint main(void)\n{\n\tstruct Node *head = malloc(sizeof(struct Node));\n\thead->data = 10;\n\thead->next = malloc(sizeof(struct Node));\n\thead->next->data = 20;\n\thead->next->next = malloc(sizeof(struct Node));\n\thead->next->next->data = 30;\n\thead->next->next->next = NULL;\n\n\tif (search(head, 20))\n\t\tprintf(\"Found 20 in the list\\n\");\n\telse\n\t\tprintf(\"20 not found\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Find the length of a linked list",
            "input": "list = 10 -> 20 -> 30",
            "output": "Length: 3",
            "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node\n{\n\tint data;\n\tstruct Node *next;\n};\n\nstatic int length(struct Node *head)\n{\n\tint count = 0;\n\tfor (struct Node *cur = head; cur != NULL; cur = cur->next)\n\t\tcount++;\n\treturn count;\n}\n\nint main(void)\n{\n\tstruct Node *head = malloc(sizeof(struct Node));\n\thead->data = 10;\n\thead->next = malloc(sizeof(struct Node));\n\thead->next->data = 20;\n\thead->next->next = malloc(sizeof(struct Node));\n\thead->next->next->data = 30;\n\thead->next->next->next = NULL;\n\n\tprintf(\"Length: %d\\n\", length(head));\n\treturn 0;\n}"
          },
          {
            "name": "Reverse a linked list (iterative)",
            "input": "list = 10 -> 20 -> 30",
            "output": "30 -> 20 -> 10 -> NULL",
            "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node\n{\n\tint data;\n\tstruct Node *next;\n};\n\nstatic struct Node *reverseIterative(struct Node *head)\n{\n\tstruct Node *prev = NULL;\n\tstruct Node *cur = head;\n\n\twhile (cur != NULL)\n\t{\n\t\tstruct Node *next = cur->next;\n\t\tcur->next = prev;\n\t\tprev = cur;\n\t\tcur = next;\n\t}\n\n\treturn prev;\n}\n\nint main(void)\n{\n\tstruct Node *head = malloc(sizeof(struct Node));\n\thead->data = 10;\n\thead->next = malloc(sizeof(struct Node));\n\thead->next->data = 20;\n\thead->next->next = malloc(sizeof(struct Node));\n\thead->next->next->data = 30;\n\thead->next->next->next = NULL;\n\n\thead = reverseIterative(head);\n\n\tfor (struct Node *cur = head; cur != NULL; cur = cur->next)\n\t\tprintf(\"%d -> \", cur->data);\n\tprintf(\"NULL\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Reverse a linked list (recursive)",
            "input": "list = 10 -> 20 -> 30",
            "output": "30 -> 20 -> 10 -> NULL",
            "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node\n{\n\tint data;\n\tstruct Node *next;\n};\n\nstatic struct Node *reverseRecursive(struct Node *head)\n{\n\tif (head == NULL || head->next == NULL)\n\t\treturn head;\n\n\tstruct Node *newHead = reverseRecursive(head->next);\n\thead->next->next = head;\n\thead->next = NULL;\n\n\treturn newHead;\n}\n\nint main(void)\n{\n\tstruct Node *head = malloc(sizeof(struct Node));\n\thead->data = 10;\n\thead->next = malloc(sizeof(struct Node));\n\thead->next->data = 20;\n\thead->next->next = malloc(sizeof(struct Node));\n\thead->next->next->data = 30;\n\thead->next->next->next = NULL;\n\n\thead = reverseRecursive(head);\n\n\tfor (struct Node *cur = head; cur != NULL; cur = cur->next)\n\t\tprintf(\"%d -> \", cur->data);\n\tprintf(\"NULL\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Detect a cycle in a linked list (Floyd's cycle detection)",
            "input": "list with the last node pointing back into the middle",
            "output": "Cycle detected",
            "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node\n{\n\tint data;\n\tstruct Node *next;\n};\n\nstatic int hasCycle(struct Node *head)\n{\n\tstruct Node *slow = head, *fast = head;\n\n\twhile (fast != NULL && fast->next != NULL)\n\t{\n\t\tslow = slow->next;\n\t\tfast = fast->next->next;\n\t\tif (slow == fast)\n\t\t\treturn 1;\n\t}\n\treturn 0;\n}\n\nint main(void)\n{\n\tstruct Node *head = malloc(sizeof(struct Node));\n\thead->data = 10;\n\thead->next = malloc(sizeof(struct Node));\n\thead->next->data = 20;\n\thead->next->next = malloc(sizeof(struct Node));\n\thead->next->next->data = 30;\n\thead->next->next->next = head->next; /* create a cycle back into the list */\n\n\tprintf(\"%s\\n\", hasCycle(head) ? \"Cycle detected\" : \"No cycle\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Find the middle of a linked list (slow/fast pointer)",
            "input": "list = 10 -> 20 -> 30 -> 40 -> 50",
            "output": "Middle element: 30",
            "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node\n{\n\tint data;\n\tstruct Node *next;\n};\n\nstatic struct Node *findMiddle(struct Node *head)\n{\n\tstruct Node *slow = head, *fast = head;\n\n\twhile (fast != NULL && fast->next != NULL)\n\t{\n\t\tslow = slow->next;\n\t\tfast = fast->next->next;\n\t}\n\treturn slow;\n}\n\nint main(void)\n{\n\tstruct Node *head = NULL, *tail = NULL;\n\n\tfor (int i = 1; i <= 5; i++)\n\t{\n\t\tstruct Node *node = malloc(sizeof(struct Node));\n\t\tnode->data = i * 10;\n\t\tnode->next = NULL;\n\t\tif (head == NULL)\n\t\t\thead = tail = node;\n\t\telse\n\t\t{\n\t\t\ttail->next = node;\n\t\t\ttail = node;\n\t\t}\n\t}\n\n\tprintf(\"Middle element: %d\\n\", findMiddle(head)->data);\n\treturn 0;\n}"
          },
          {
            "name": "Remove duplicates from a sorted linked list",
            "input": "list = 10 -> 10 -> 20 -> 30 -> 30",
            "output": "10 -> 20 -> 30 -> NULL",
            "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node\n{\n\tint data;\n\tstruct Node *next;\n};\n\nstatic void removeDuplicatesSorted(struct Node *head)\n{\n\tstruct Node *cur = head;\n\n\twhile (cur != NULL && cur->next != NULL)\n\t{\n\t\tif (cur->data == cur->next->data)\n\t\t{\n\t\t\tstruct Node *duplicate = cur->next;\n\t\t\tcur->next = cur->next->next;\n\t\t\tfree(duplicate);\n\t\t}\n\t\telse\n\t\t\tcur = cur->next;\n\t}\n}\n\nint main(void)\n{\n\tint values[] = {10, 10, 20, 30, 30};\n\tstruct Node *head = NULL, *tail = NULL;\n\n\tfor (int i = 0; i < 5; i++)\n\t{\n\t\tstruct Node *node = malloc(sizeof(struct Node));\n\t\tnode->data = values[i];\n\t\tnode->next = NULL;\n\t\tif (head == NULL)\n\t\t\thead = tail = node;\n\t\telse\n\t\t{\n\t\t\ttail->next = node;\n\t\t\ttail = node;\n\t\t}\n\t}\n\n\tremoveDuplicatesSorted(head);\n\n\tfor (struct Node *cur = head; cur != NULL; cur = cur->next)\n\t\tprintf(\"%d -> \", cur->data);\n\tprintf(\"NULL\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Remove duplicates from an unsorted linked list",
            "input": "list = 10 -> 20 -> 10 -> 30 -> 20",
            "output": "10 -> 20 -> 30 -> NULL",
            "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node\n{\n\tint data;\n\tstruct Node *next;\n};\n\nstatic void removeDuplicatesUnsorted(struct Node *head)\n{\n\tint seen[1000] = {0};\n\tstruct Node *cur = head;\n\n\tseen[cur->data] = 1;\n\n\twhile (cur->next != NULL)\n\t{\n\t\tif (seen[cur->next->data])\n\t\t{\n\t\t\tstruct Node *duplicate = cur->next;\n\t\t\tcur->next = cur->next->next;\n\t\t\tfree(duplicate);\n\t\t}\n\t\telse\n\t\t{\n\t\t\tseen[cur->next->data] = 1;\n\t\t\tcur = cur->next;\n\t\t}\n\t}\n}\n\nint main(void)\n{\n\tint values[] = {10, 20, 10, 30, 20};\n\tstruct Node *head = NULL, *tail = NULL;\n\n\tfor (int i = 0; i < 5; i++)\n\t{\n\t\tstruct Node *node = malloc(sizeof(struct Node));\n\t\tnode->data = values[i];\n\t\tnode->next = NULL;\n\t\tif (head == NULL)\n\t\t\thead = tail = node;\n\t\telse\n\t\t{\n\t\t\ttail->next = node;\n\t\t\ttail = node;\n\t\t}\n\t}\n\n\tremoveDuplicatesUnsorted(head);\n\n\tfor (struct Node *cur = head; cur != NULL; cur = cur->next)\n\t\tprintf(\"%d -> \", cur->data);\n\tprintf(\"NULL\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Merge two sorted linked lists",
            "input": "list1 = 10 -> 30 -> 50, list2 = 20 -> 40 -> 60",
            "output": "10 -> 20 -> 30 -> 40 -> 50 -> 60 -> NULL",
            "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node\n{\n\tint data;\n\tstruct Node *next;\n};\n\nstatic struct Node *mergeSorted(struct Node *a, struct Node *b)\n{\n\tstruct Node dummy;\n\tstruct Node *tail = &dummy;\n\tdummy.next = NULL;\n\n\twhile (a != NULL && b != NULL)\n\t{\n\t\tif (a->data <= b->data)\n\t\t{\n\t\t\ttail->next = a;\n\t\t\ta = a->next;\n\t\t}\n\t\telse\n\t\t{\n\t\t\ttail->next = b;\n\t\t\tb = b->next;\n\t\t}\n\t\ttail = tail->next;\n\t}\n\n\ttail->next = (a != NULL) ? a : b;\n\treturn dummy.next;\n}\n\nstatic struct Node *buildList(int values[], int n)\n{\n\tstruct Node *head = NULL, *tail = NULL;\n\tfor (int i = 0; i < n; i++)\n\t{\n\t\tstruct Node *node = malloc(sizeof(struct Node));\n\t\tnode->data = values[i];\n\t\tnode->next = NULL;\n\t\tif (head == NULL)\n\t\t\thead = tail = node;\n\t\telse\n\t\t{\n\t\t\ttail->next = node;\n\t\t\ttail = node;\n\t\t}\n\t}\n\treturn head;\n}\n\nint main(void)\n{\n\tint values1[] = {10, 30, 50};\n\tint values2[] = {20, 40, 60};\n\n\tstruct Node *list1 = buildList(values1, 3);\n\tstruct Node *list2 = buildList(values2, 3);\n\tstruct Node *merged = mergeSorted(list1, list2);\n\n\tfor (struct Node *cur = merged; cur != NULL; cur = cur->next)\n\t\tprintf(\"%d -> \", cur->data);\n\tprintf(\"NULL\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Find the Nth node from the end of a linked list",
            "input": "list = 10 -> 20 -> 30 -> 40 -> 50, N = 2",
            "output": "2nd node from end: 40",
            "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node\n{\n\tint data;\n\tstruct Node *next;\n};\n\nstatic struct Node *nthFromEnd(struct Node *head, int n)\n{\n\tstruct Node *first = head, *second = head;\n\n\tfor (int i = 0; i < n; i++)\n\t\tfirst = first->next;\n\n\twhile (first != NULL)\n\t{\n\t\tfirst = first->next;\n\t\tsecond = second->next;\n\t}\n\n\treturn second;\n}\n\nint main(void)\n{\n\tstruct Node *head = NULL, *tail = NULL;\n\n\tfor (int i = 1; i <= 5; i++)\n\t{\n\t\tstruct Node *node = malloc(sizeof(struct Node));\n\t\tnode->data = i * 10;\n\t\tnode->next = NULL;\n\t\tif (head == NULL)\n\t\t\thead = tail = node;\n\t\telse\n\t\t{\n\t\t\ttail->next = node;\n\t\t\ttail = node;\n\t\t}\n\t}\n\n\tprintf(\"2nd node from end: %d\\n\", nthFromEnd(head, 2)->data);\n\treturn 0;\n}"
          },
          {
            "name": "Check if a linked list is a palindrome",
            "input": "list = 1 -> 2 -> 3 -> 2 -> 1",
            "output": "The list is a palindrome",
            "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node\n{\n\tint data;\n\tstruct Node *next;\n};\n\nstatic int isPalindrome(struct Node *head)\n{\n\tint values[1000], count = 0;\n\n\tfor (struct Node *cur = head; cur != NULL; cur = cur->next)\n\t\tvalues[count++] = cur->data;\n\n\tfor (int i = 0, j = count - 1; i < j; i++, j--)\n\t\tif (values[i] != values[j])\n\t\t\treturn 0;\n\n\treturn 1;\n}\n\nint main(void)\n{\n\tint data[] = {1, 2, 3, 2, 1};\n\tstruct Node *head = NULL, *tail = NULL;\n\n\tfor (int i = 0; i < 5; i++)\n\t{\n\t\tstruct Node *node = malloc(sizeof(struct Node));\n\t\tnode->data = data[i];\n\t\tnode->next = NULL;\n\t\tif (head == NULL)\n\t\t\thead = tail = node;\n\t\telse\n\t\t{\n\t\t\ttail->next = node;\n\t\t\ttail = node;\n\t\t}\n\t}\n\n\tprintf(\"%s\\n\", isPalindrome(head) ? \"The list is a palindrome\" : \"Not a palindrome\");\n\treturn 0;\n}"
          },
          {
            "name": "Sort a linked list using merge sort",
            "input": "list = 40 -> 10 -> 30 -> 20",
            "output": "10 -> 20 -> 30 -> 40 -> NULL",
            "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node\n{\n\tint data;\n\tstruct Node *next;\n};\n\nstatic struct Node *merge(struct Node *a, struct Node *b)\n{\n\tif (a == NULL)\n\t\treturn b;\n\tif (b == NULL)\n\t\treturn a;\n\n\tif (a->data <= b->data)\n\t{\n\t\ta->next = merge(a->next, b);\n\t\treturn a;\n\t}\n\tb->next = merge(a, b->next);\n\treturn b;\n}\n\nstatic struct Node *split(struct Node *head)\n{\n\tstruct Node *slow = head, *fast = head->next;\n\n\twhile (fast != NULL && fast->next != NULL)\n\t{\n\t\tslow = slow->next;\n\t\tfast = fast->next->next;\n\t}\n\n\tstruct Node *second = slow->next;\n\tslow->next = NULL;\n\treturn second;\n}\n\nstatic struct Node *mergeSort(struct Node *head)\n{\n\tif (head == NULL || head->next == NULL)\n\t\treturn head;\n\n\tstruct Node *second = split(head);\n\thead = mergeSort(head);\n\tsecond = mergeSort(second);\n\n\treturn merge(head, second);\n}\n\nint main(void)\n{\n\tint values[] = {40, 10, 30, 20};\n\tstruct Node *head = NULL, *tail = NULL;\n\n\tfor (int i = 0; i < 4; i++)\n\t{\n\t\tstruct Node *node = malloc(sizeof(struct Node));\n\t\tnode->data = values[i];\n\t\tnode->next = NULL;\n\t\tif (head == NULL)\n\t\t\thead = tail = node;\n\t\telse\n\t\t{\n\t\t\ttail->next = node;\n\t\t\ttail = node;\n\t\t}\n\t}\n\n\thead = mergeSort(head);\n\n\tfor (struct Node *cur = head; cur != NULL; cur = cur->next)\n\t\tprintf(\"%d -> \", cur->data);\n\tprintf(\"NULL\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Swap nodes in pairs",
            "input": "list = 10 -> 20 -> 30 -> 40",
            "output": "20 -> 10 -> 40 -> 30 -> NULL",
            "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node\n{\n\tint data;\n\tstruct Node *next;\n};\n\nstatic struct Node *swapPairs(struct Node *head)\n{\n\tif (head == NULL || head->next == NULL)\n\t\treturn head;\n\n\tstruct Node *newHead = head->next;\n\thead->next = swapPairs(newHead->next);\n\tnewHead->next = head;\n\n\treturn newHead;\n}\n\nint main(void)\n{\n\tstruct Node *head = NULL, *tail = NULL;\n\n\tfor (int i = 1; i <= 4; i++)\n\t{\n\t\tstruct Node *node = malloc(sizeof(struct Node));\n\t\tnode->data = i * 10;\n\t\tnode->next = NULL;\n\t\tif (head == NULL)\n\t\t\thead = tail = node;\n\t\telse\n\t\t{\n\t\t\ttail->next = node;\n\t\t\ttail = node;\n\t\t}\n\t}\n\n\thead = swapPairs(head);\n\n\tfor (struct Node *cur = head; cur != NULL; cur = cur->next)\n\t\tprintf(\"%d -> \", cur->data);\n\tprintf(\"NULL\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Rotate a linked list by k places",
            "input": "list = 10 -> 20 -> 30 -> 40 -> 50, k = 2",
            "output": "30 -> 40 -> 50 -> 10 -> 20 -> NULL",
            "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node\n{\n\tint data;\n\tstruct Node *next;\n};\n\nstatic struct Node *rotate(struct Node *head, int k)\n{\n\tif (head == NULL)\n\t\treturn NULL;\n\n\tint length = 1;\n\tstruct Node *tail = head;\n\twhile (tail->next != NULL)\n\t{\n\t\ttail = tail->next;\n\t\tlength++;\n\t}\n\n\tk = k % length;\n\tif (k == 0)\n\t\treturn head;\n\n\tstruct Node *newTail = head;\n\tfor (int i = 0; i < length - k - 1; i++)\n\t\tnewTail = newTail->next;\n\n\tstruct Node *newHead = newTail->next;\n\tnewTail->next = NULL;\n\ttail->next = head;\n\n\treturn newHead;\n}\n\nint main(void)\n{\n\tstruct Node *head = NULL, *tail = NULL;\n\n\tfor (int i = 1; i <= 5; i++)\n\t{\n\t\tstruct Node *node = malloc(sizeof(struct Node));\n\t\tnode->data = i * 10;\n\t\tnode->next = NULL;\n\t\tif (head == NULL)\n\t\t\thead = tail = node;\n\t\telse\n\t\t{\n\t\t\ttail->next = node;\n\t\t\ttail = node;\n\t\t}\n\t}\n\n\thead = rotate(head, 2);\n\n\tfor (struct Node *cur = head; cur != NULL; cur = cur->next)\n\t\tprintf(\"%d -> \", cur->data);\n\tprintf(\"NULL\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Find the intersection point of two linked lists",
            "input": "two lists that merge into a shared tail",
            "output": "Intersection at node with value: 30",
            "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node\n{\n\tint data;\n\tstruct Node *next;\n};\n\nstatic int listLength(struct Node *head)\n{\n\tint len = 0;\n\tfor (struct Node *cur = head; cur != NULL; cur = cur->next)\n\t\tlen++;\n\treturn len;\n}\n\nstatic struct Node *findIntersection(struct Node *a, struct Node *b)\n{\n\tint lenA = listLength(a), lenB = listLength(b);\n\n\twhile (lenA > lenB)\n\t{\n\t\ta = a->next;\n\t\tlenA--;\n\t}\n\twhile (lenB > lenA)\n\t{\n\t\tb = b->next;\n\t\tlenB--;\n\t}\n\n\twhile (a != b)\n\t{\n\t\ta = a->next;\n\t\tb = b->next;\n\t}\n\n\treturn a;\n}\n\nint main(void)\n{\n\tstruct Node *shared = malloc(sizeof(struct Node));\n\tshared->data = 30;\n\tshared->next = malloc(sizeof(struct Node));\n\tshared->next->data = 40;\n\tshared->next->next = NULL;\n\n\tstruct Node *listA = malloc(sizeof(struct Node));\n\tlistA->data = 10;\n\tlistA->next = shared;\n\n\tstruct Node *listB = malloc(sizeof(struct Node));\n\tlistB->data = 20;\n\tlistB->next = malloc(sizeof(struct Node));\n\tlistB->next->data = 25;\n\tlistB->next->next = shared;\n\n\tstruct Node *intersection = findIntersection(listA, listB);\n\tprintf(\"Intersection at node with value: %d\\n\", intersection->data);\n\n\treturn 0;\n}"
          },
          {
            "name": "Delete a linked list completely (free all memory)",
            "input": "list = 10 -> 20 -> 30",
            "output": "List fully freed, head is now NULL",
            "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node\n{\n\tint data;\n\tstruct Node *next;\n};\n\nstatic struct Node *deleteList(struct Node *head)\n{\n\twhile (head != NULL)\n\t{\n\t\tstruct Node *next = head->next;\n\t\tfree(head);\n\t\thead = next;\n\t}\n\treturn NULL;\n}\n\nint main(void)\n{\n\tstruct Node *head = malloc(sizeof(struct Node));\n\thead->data = 10;\n\thead->next = malloc(sizeof(struct Node));\n\thead->next->data = 20;\n\thead->next->next = malloc(sizeof(struct Node));\n\thead->next->next->data = 30;\n\thead->next->next->next = NULL;\n\n\thead = deleteList(head);\n\tprintf(\"List fully freed, head is now %s\\n\", head == NULL ? \"NULL\" : \"not NULL\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Copy/clone a linked list",
            "input": "list = 10 -> 20 -> 30",
            "output": "Cloned list: 10 -> 20 -> 30 -> NULL",
            "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node\n{\n\tint data;\n\tstruct Node *next;\n};\n\nstatic struct Node *cloneList(struct Node *head)\n{\n\tif (head == NULL)\n\t\treturn NULL;\n\n\tstruct Node *newHead = malloc(sizeof(struct Node));\n\tnewHead->data = head->data;\n\tnewHead->next = cloneList(head->next);\n\n\treturn newHead;\n}\n\nint main(void)\n{\n\tstruct Node *head = malloc(sizeof(struct Node));\n\thead->data = 10;\n\thead->next = malloc(sizeof(struct Node));\n\thead->next->data = 20;\n\thead->next->next = malloc(sizeof(struct Node));\n\thead->next->next->data = 30;\n\thead->next->next->next = NULL;\n\n\tstruct Node *clone = cloneList(head);\n\n\tprintf(\"Cloned list: \");\n\tfor (struct Node *cur = clone; cur != NULL; cur = cur->next)\n\t\tprintf(\"%d -> \", cur->data);\n\tprintf(\"NULL\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Convert a linked list to an array",
            "input": "list = 10 -> 20 -> 30",
            "output": "Array: [10, 20, 30]",
            "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node\n{\n\tint data;\n\tstruct Node *next;\n};\n\nstatic int listToArray(struct Node *head, int arr[])\n{\n\tint count = 0;\n\tfor (struct Node *cur = head; cur != NULL; cur = cur->next)\n\t\tarr[count++] = cur->data;\n\treturn count;\n}\n\nint main(void)\n{\n\tstruct Node *head = malloc(sizeof(struct Node));\n\thead->data = 10;\n\thead->next = malloc(sizeof(struct Node));\n\thead->next->data = 20;\n\thead->next->next = malloc(sizeof(struct Node));\n\thead->next->next->data = 30;\n\thead->next->next->next = NULL;\n\n\tint arr[10];\n\tint count = listToArray(head, arr);\n\n\tprintf(\"Array: [\");\n\tfor (int i = 0; i < count; i++)\n\t\tprintf(\"%d%s\", arr[i], (i < count - 1) ? \", \" : \"\");\n\tprintf(\"]\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Add two numbers represented as linked lists (digits in reverse order)",
            "input": "342 (2->4->3) + 465 (5->6->4)",
            "output": "807 (7->0->8)",
            "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node\n{\n\tint data;\n\tstruct Node *next;\n};\n\nstatic struct Node *addLists(struct Node *a, struct Node *b)\n{\n\tstruct Node dummy;\n\tstruct Node *tail = &dummy;\n\tint carry = 0;\n\tdummy.next = NULL;\n\n\twhile (a != NULL || b != NULL || carry != 0)\n\t{\n\t\tint sum = carry;\n\t\tif (a != NULL)\n\t\t{\n\t\t\tsum += a->data;\n\t\t\ta = a->next;\n\t\t}\n\t\tif (b != NULL)\n\t\t{\n\t\t\tsum += b->data;\n\t\t\tb = b->next;\n\t\t}\n\n\t\tcarry = sum / 10;\n\t\ttail->next = malloc(sizeof(struct Node));\n\t\ttail->next->data = sum % 10;\n\t\ttail->next->next = NULL;\n\t\ttail = tail->next;\n\t}\n\n\treturn dummy.next;\n}\n\nstatic struct Node *buildList(int values[], int n)\n{\n\tstruct Node *head = NULL, *tail = NULL;\n\tfor (int i = 0; i < n; i++)\n\t{\n\t\tstruct Node *node = malloc(sizeof(struct Node));\n\t\tnode->data = values[i];\n\t\tnode->next = NULL;\n\t\tif (head == NULL)\n\t\t\thead = tail = node;\n\t\telse\n\t\t{\n\t\t\ttail->next = node;\n\t\t\ttail = node;\n\t\t}\n\t}\n\treturn head;\n}\n\nint main(void)\n{\n\tint digitsA[] = {2, 4, 3}; /* represents 342 */\n\tint digitsB[] = {5, 6, 4}; /* represents 465 */\n\n\tstruct Node *a = buildList(digitsA, 3);\n\tstruct Node *b = buildList(digitsB, 3);\n\tstruct Node *result = addLists(a, b);\n\n\tprintf(\"Result (reversed digits): \");\n\tfor (struct Node *cur = result; cur != NULL; cur = cur->next)\n\t\tprintf(\"%d \", cur->data); /* prints 7 0 8, representing 807 */\n\tprintf(\"\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Doubly linked list - insert and traverse",
            "input": "insert 10, 20, 30 at the end",
            "output": "Forward: 10 20 30, Backward: 30 20 10",
            "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct DNode\n{\n\tint data;\n\tstruct DNode *prev;\n\tstruct DNode *next;\n};\n\nstatic struct DNode *insertEnd(struct DNode *head, int data)\n{\n\tstruct DNode *node = malloc(sizeof(struct DNode));\n\tnode->data = data;\n\tnode->next = NULL;\n\n\tif (head == NULL)\n\t{\n\t\tnode->prev = NULL;\n\t\treturn node;\n\t}\n\n\tstruct DNode *cur = head;\n\twhile (cur->next != NULL)\n\t\tcur = cur->next;\n\n\tcur->next = node;\n\tnode->prev = cur;\n\treturn head;\n}\n\nint main(void)\n{\n\tstruct DNode *head = NULL;\n\n\thead = insertEnd(head, 10);\n\thead = insertEnd(head, 20);\n\thead = insertEnd(head, 30);\n\n\tprintf(\"Forward: \");\n\tstruct DNode *tail = head;\n\tfor (struct DNode *cur = head; cur != NULL; cur = cur->next)\n\t{\n\t\tprintf(\"%d \", cur->data);\n\t\ttail = cur;\n\t}\n\n\tprintf(\"\\nBackward: \");\n\tfor (struct DNode *cur = tail; cur != NULL; cur = cur->prev)\n\t\tprintf(\"%d \", cur->data);\n\tprintf(\"\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Doubly linked list - delete a node",
            "input": "list = 10 <-> 20 <-> 30, delete 20",
            "output": "10 <-> 30",
            "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct DNode\n{\n\tint data;\n\tstruct DNode *prev;\n\tstruct DNode *next;\n};\n\nstatic struct DNode *deleteNode(struct DNode *head, int value)\n{\n\tstruct DNode *cur = head;\n\n\twhile (cur != NULL && cur->data != value)\n\t\tcur = cur->next;\n\n\tif (cur == NULL)\n\t\treturn head;\n\n\tif (cur->prev != NULL)\n\t\tcur->prev->next = cur->next;\n\telse\n\t\thead = cur->next;\n\n\tif (cur->next != NULL)\n\t\tcur->next->prev = cur->prev;\n\n\tfree(cur);\n\treturn head;\n}\n\nint main(void)\n{\n\tstruct DNode *head = malloc(sizeof(struct DNode));\n\thead->data = 10;\n\thead->prev = NULL;\n\thead->next = malloc(sizeof(struct DNode));\n\thead->next->data = 20;\n\thead->next->prev = head;\n\thead->next->next = malloc(sizeof(struct DNode));\n\thead->next->next->data = 30;\n\thead->next->next->prev = head->next;\n\thead->next->next->next = NULL;\n\n\thead = deleteNode(head, 20);\n\n\tfor (struct DNode *cur = head; cur != NULL; cur = cur->next)\n\t\tprintf(\"%d \", cur->data);\n\tprintf(\"\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Circular linked list - insert and traverse",
            "input": "insert 10, 20, 30",
            "output": "10 -> 20 -> 30 -> (back to 10)",
            "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node\n{\n\tint data;\n\tstruct Node *next;\n};\n\nstatic struct Node *insertCircular(struct Node *last, int data)\n{\n\tstruct Node *node = malloc(sizeof(struct Node));\n\tnode->data = data;\n\n\tif (last == NULL)\n\t{\n\t\tnode->next = node;\n\t\treturn node;\n\t}\n\n\tnode->next = last->next;\n\tlast->next = node;\n\treturn node;\n}\n\nint main(void)\n{\n\tstruct Node *last = NULL;\n\n\tlast = insertCircular(last, 10);\n\tlast = insertCircular(last, 20);\n\tlast = insertCircular(last, 30);\n\n\tstruct Node *head = last->next;\n\tstruct Node *cur = head;\n\n\tdo\n\t{\n\t\tprintf(\"%d -> \", cur->data);\n\t\tcur = cur->next;\n\t} while (cur != head);\n\tprintf(\"(back to %d)\\n\", head->data);\n\n\treturn 0;\n}"
          },
          {
            "name": "Circular linked list - detect the cycle and break it back to a simple list",
            "input": "circular list 10 -> 20 -> 30 -> (back to 10)",
            "output": "Cycle broken: 10 -> 20 -> 30 -> NULL",
            "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node\n{\n\tint data;\n\tstruct Node *next;\n};\n\nstatic void breakCycle(struct Node *head)\n{\n\tstruct Node *slow = head, *fast = head;\n\n\twhile (fast != NULL && fast->next != NULL)\n\t{\n\t\tslow = slow->next;\n\t\tfast = fast->next->next;\n\t\tif (slow == fast)\n\t\t\tbreak;\n\t}\n\n\tif (fast == NULL || fast->next == NULL)\n\t\treturn; /* no cycle found */\n\n\tslow = head;\n\tif (slow == fast)\n\t{\n\t\twhile (fast->next != slow)\n\t\t\tfast = fast->next;\n\t}\n\telse\n\t{\n\t\twhile (slow->next != fast->next)\n\t\t{\n\t\t\tslow = slow->next;\n\t\t\tfast = fast->next;\n\t\t}\n\t}\n\n\tfast->next = NULL; /* cut the link that closed the loop */\n}\n\nint main(void)\n{\n\tstruct Node *n1 = malloc(sizeof(struct Node));\n\tstruct Node *n2 = malloc(sizeof(struct Node));\n\tstruct Node *n3 = malloc(sizeof(struct Node));\n\n\tn1->data = 10;\n\tn2->data = 20;\n\tn3->data = 30;\n\tn1->next = n2;\n\tn2->next = n3;\n\tn3->next = n1; /* circular */\n\n\tbreakCycle(n1);\n\n\tprintf(\"Cycle broken: \");\n\tfor (struct Node *cur = n1; cur != NULL; cur = cur->next)\n\t\tprintf(\"%d -> \", cur->data);\n\tprintf(\"NULL\\n\");\n\n\treturn 0;\n}"
          }
        ],
        "path": "DSA/linkedlist.c"
      }
    ]
  },
  {
    "section": "C++ Programming",
    "chapters": [
      {
        "chapter": "DESIGN PATTERNS",
        "folder": "CPP",
        "programs": [
          {
            "name": "Singleton pattern",
            "input": "(none)",
            "output": "Both references point to the same instance",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Singleton\n{\n    static Singleton *instance;\n    Singleton() {}\n\npublic:\n    static Singleton *getInstance()\n    {\n        if (instance == nullptr)\n            instance = new Singleton();\n        return instance;\n    }\n};\n\nSingleton *Singleton::instance = nullptr;\n\nint main()\n{\n    Singleton *a = Singleton::getInstance();\n    Singleton *b = Singleton::getInstance();\n    cout << ((a == b) ? \"Both references point to the same instance\" : \"Different instances\") << endl;\n    return 0;\n}"
          },
          {
            "name": "Factory Method pattern",
            "input": "create a Circle or Square via a factory",
            "output": "Drawing a Circle, Drawing a Square",
            "code": "#include <iostream>\n#include <memory>\nusing namespace std;\n\nclass Shape\n{\npublic:\n    virtual void draw() = 0;\n    virtual ~Shape() {}\n};\n\nclass Circle : public Shape\n{\npublic:\n    void draw() override { cout << \"Drawing a Circle\" << endl; }\n};\n\nclass Square : public Shape\n{\npublic:\n    void draw() override { cout << \"Drawing a Square\" << endl; }\n};\n\nunique_ptr<Shape> createShape(const string &type)\n{\n    if (type == \"circle\")\n        return make_unique<Circle>();\n    return make_unique<Square>();\n}\n\nint main()\n{\n    createShape(\"circle\")->draw();\n    createShape(\"square\")->draw();\n    return 0;\n}"
          },
          {
            "name": "Abstract Factory pattern",
            "input": "create a matching Button and Checkbox for a UI theme",
            "output": "Rendering a Dark Button, Rendering a Dark Checkbox",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Button\n{\npublic:\n    virtual void render() = 0;\n    virtual ~Button() {}\n};\n\nclass Checkbox\n{\npublic:\n    virtual void render() = 0;\n    virtual ~Checkbox() {}\n};\n\nclass DarkButton : public Button\n{\npublic:\n    void render() override { cout << \"Rendering a Dark Button\" << endl; }\n};\n\nclass DarkCheckbox : public Checkbox\n{\npublic:\n    void render() override { cout << \"Rendering a Dark Checkbox\" << endl; }\n};\n\nclass UIFactory\n{\npublic:\n    virtual Button *createButton() = 0;\n    virtual Checkbox *createCheckbox() = 0;\n    virtual ~UIFactory() {}\n};\n\nclass DarkThemeFactory : public UIFactory\n{\npublic:\n    Button *createButton() override { return new DarkButton(); }\n    Checkbox *createCheckbox() override { return new DarkCheckbox(); }\n};\n\nint main()\n{\n    DarkThemeFactory factory;\n    factory.createButton()->render();\n    factory.createCheckbox()->render();\n    return 0;\n}"
          },
          {
            "name": "Builder pattern",
            "input": "build a Burger step by step",
            "output": "Burger: Bun + Patty + Cheese + Lettuce",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Burger\n{\npublic:\n    string description;\n};\n\nclass BurgerBuilder\n{\n    Burger burger;\n\npublic:\n    BurgerBuilder &addBun()\n    {\n        burger.description += \"Bun + \";\n        return *this;\n    }\n    BurgerBuilder &addPatty()\n    {\n        burger.description += \"Patty + \";\n        return *this;\n    }\n    BurgerBuilder &addCheese()\n    {\n        burger.description += \"Cheese + \";\n        return *this;\n    }\n    BurgerBuilder &addLettuce()\n    {\n        burger.description += \"Lettuce\";\n        return *this;\n    }\n    Burger build() { return burger; }\n};\n\nint main()\n{\n    Burger b = BurgerBuilder().addBun().addPatty().addCheese().addLettuce().build();\n    cout << \"Burger: \" << b.description << endl;\n    return 0;\n}"
          },
          {
            "name": "Prototype pattern",
            "input": "clone an existing object instead of constructing a new one",
            "output": "Cloned shape with radius: 5",
            "code": "#include <iostream>\n#include <memory>\nusing namespace std;\n\nclass Shape\n{\npublic:\n    int radius;\n    virtual unique_ptr<Shape> clone() = 0;\n    virtual ~Shape() {}\n};\n\nclass Circle : public Shape\n{\npublic:\n    Circle(int r) { radius = r; }\n    unique_ptr<Shape> clone() override { return make_unique<Circle>(*this); }\n};\n\nint main()\n{\n    Circle original(5);\n    unique_ptr<Shape> copy = original.clone();\n    cout << \"Cloned shape with radius: \" << copy->radius << endl;\n    return 0;\n}"
          },
          {
            "name": "Adapter pattern",
            "input": "adapt an old interface to a new one expected by client code",
            "output": "Adapted call: Legacy printer printing \"Hello\"",
            "code": "#include <iostream>\nusing namespace std;\n\nclass LegacyPrinter\n{\npublic:\n    void oldPrint(const string &text) { cout << \"Legacy printer printing \\\"\" << text << \"\\\"\" << endl; }\n};\n\nclass ModernPrinter\n{\npublic:\n    virtual void print(const string &text) = 0;\n    virtual ~ModernPrinter() {}\n};\n\nclass PrinterAdapter : public ModernPrinter\n{\n    LegacyPrinter legacy;\n\npublic:\n    void print(const string &text) override\n    {\n        cout << \"Adapted call: \";\n        legacy.oldPrint(text);\n    }\n};\n\nint main()\n{\n    PrinterAdapter adapter;\n    adapter.print(\"Hello\");\n    return 0;\n}"
          },
          {
            "name": "Bridge pattern",
            "input": "decouple an abstraction (Remote) from its implementation (Device)",
            "output": "TV: turning on",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Device\n{\npublic:\n    virtual void turnOn() = 0;\n    virtual ~Device() {}\n};\n\nclass TV : public Device\n{\npublic:\n    void turnOn() override { cout << \"TV: turning on\" << endl; }\n};\n\nclass Remote\n{\nprotected:\n    Device *device;\n\npublic:\n    Remote(Device *d) : device(d) {}\n    virtual void pressPower() { device->turnOn(); }\n};\n\nint main()\n{\n    TV tv;\n    Remote remote(&tv);\n    remote.pressPower();\n    return 0;\n}"
          },
          {
            "name": "Composite pattern",
            "input": "a tree of files and folders",
            "output": "File: a.txt, Folder contains: File: b.txt, File: c.txt",
            "code": "#include <iostream>\n#include <vector>\n#include <memory>\nusing namespace std;\n\nclass FileSystemItem\n{\npublic:\n    virtual void show() = 0;\n    virtual ~FileSystemItem() {}\n};\n\nclass File : public FileSystemItem\n{\n    string name;\n\npublic:\n    File(string n) : name(n) {}\n    void show() override { cout << \"File: \" << name << endl; }\n};\n\nclass Folder : public FileSystemItem\n{\n    vector<shared_ptr<FileSystemItem>> children;\n\npublic:\n    void add(shared_ptr<FileSystemItem> item) { children.push_back(item); }\n    void show() override\n    {\n        cout << \"Folder contains:\" << endl;\n        for (auto &child : children)\n            child->show();\n    }\n};\n\nint main()\n{\n    auto file1 = make_shared<File>(\"a.txt\");\n    file1->show();\n\n    Folder folder;\n    folder.add(make_shared<File>(\"b.txt\"));\n    folder.add(make_shared<File>(\"c.txt\"));\n    folder.show();\n\n    return 0;\n}"
          },
          {
            "name": "Decorator pattern",
            "input": "wrap a base Coffee with a Milk decorator",
            "output": "Coffee with Milk costs 7",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Coffee\n{\npublic:\n    virtual int cost() = 0;\n    virtual string description() = 0;\n    virtual ~Coffee() {}\n};\n\nclass PlainCoffee : public Coffee\n{\npublic:\n    int cost() override { return 5; }\n    string description() override { return \"Coffee\"; }\n};\n\nclass MilkDecorator : public Coffee\n{\n    Coffee *base;\n\npublic:\n    MilkDecorator(Coffee *c) : base(c) {}\n    int cost() override { return base->cost() + 2; }\n    string description() override { return base->description() + \" with Milk\"; }\n};\n\nint main()\n{\n    PlainCoffee plain;\n    MilkDecorator withMilk(&plain);\n    cout << withMilk.description() << \" costs \" << withMilk.cost() << endl;\n    return 0;\n}"
          },
          {
            "name": "Facade pattern",
            "input": "a single simplified interface hiding subsystem complexity",
            "output": "CPU started, Memory loaded, Disk read, Computer booted",
            "code": "#include <iostream>\nusing namespace std;\n\nclass CPU\n{\npublic:\n    void start() { cout << \"CPU started\" << endl; }\n};\n\nclass Memory\n{\npublic:\n    void load() { cout << \"Memory loaded\" << endl; }\n};\n\nclass Disk\n{\npublic:\n    void read() { cout << \"Disk read\" << endl; }\n};\n\nclass ComputerFacade\n{\n    CPU cpu;\n    Memory memory;\n    Disk disk;\n\npublic:\n    void boot()\n    {\n        cpu.start();\n        memory.load();\n        disk.read();\n        cout << \"Computer booted\" << endl;\n    }\n};\n\nint main()\n{\n    ComputerFacade computer;\n    computer.boot();\n    return 0;\n}"
          },
          {
            "name": "Flyweight pattern",
            "input": "reuse shared character formatting objects",
            "output": "Reused 1 shared \"Bold\" style object for 3 characters",
            "code": "#include <iostream>\n#include <map>\n#include <memory>\nusing namespace std;\n\nclass CharacterStyle\n{\npublic:\n    string styleName;\n    CharacterStyle(string s) : styleName(s) {}\n};\n\nclass StyleFactory\n{\n    map<string, shared_ptr<CharacterStyle>> styles;\n\npublic:\n    shared_ptr<CharacterStyle> getStyle(const string &name)\n    {\n        if (styles.find(name) == styles.end())\n            styles[name] = make_shared<CharacterStyle>(name);\n        return styles[name]; /* shared/reused instead of duplicated per character */\n    }\n};\n\nint main()\n{\n    StyleFactory factory;\n    auto s1 = factory.getStyle(\"Bold\");\n    auto s2 = factory.getStyle(\"Bold\");\n    auto s3 = factory.getStyle(\"Bold\");\n\n    cout << \"Reused 1 shared \\\"Bold\\\" style object for 3 characters\" << endl;\n    return 0;\n}"
          },
          {
            "name": "Proxy pattern",
            "input": "access a real object through a proxy that adds access control",
            "output": "Access granted, Loading real resource, Resource used",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Resource\n{\npublic:\n    virtual void use() = 0;\n    virtual ~Resource() {}\n};\n\nclass RealResource : public Resource\n{\npublic:\n    RealResource() { cout << \"Loading real resource\" << endl; }\n    void use() override { cout << \"Resource used\" << endl; }\n};\n\nclass ResourceProxy : public Resource\n{\n    RealResource *real = nullptr;\n\npublic:\n    void use() override\n    {\n        cout << \"Access granted\" << endl;\n        if (real == nullptr)\n            real = new RealResource(); /* lazy-loaded through the proxy */\n        real->use();\n    }\n};\n\nint main()\n{\n    ResourceProxy proxy;\n    proxy.use();\n    return 0;\n}"
          },
          {
            "name": "Observer pattern",
            "input": "notify all subscribers when a subject changes",
            "output": "Observer 1 notified: value=10, Observer 2 notified: value=10",
            "code": "#include <iostream>\n#include <vector>\n#include <functional>\nusing namespace std;\n\nclass Subject\n{\n    vector<function<void(int)>> observers;\n\npublic:\n    void subscribe(function<void(int)> observer) { observers.push_back(observer); }\n    void setValue(int value)\n    {\n        for (auto &observer : observers)\n            observer(value);\n    }\n};\n\nint main()\n{\n    Subject subject;\n    subject.subscribe([](int v)\n                      { cout << \"Observer 1 notified: value=\" << v << endl; });\n    subject.subscribe([](int v)\n                      { cout << \"Observer 2 notified: value=\" << v << endl; });\n\n    subject.setValue(10);\n    return 0;\n}"
          },
          {
            "name": "Strategy pattern",
            "input": "switch sorting strategy at runtime",
            "output": "Sorted ascending: 1 2 3, Sorted descending: 3 2 1",
            "code": "#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <functional>\nusing namespace std;\n\nclass Sorter\n{\n    function<void(vector<int> &)> strategy;\n\npublic:\n    void setStrategy(function<void(vector<int> &)> s) { strategy = s; }\n    void sortData(vector<int> &data) { strategy(data); }\n};\n\nint main()\n{\n    vector<int> data = {3, 1, 2};\n    Sorter sorter;\n\n    sorter.setStrategy([](vector<int> &v)\n                       { sort(v.begin(), v.end()); });\n    sorter.sortData(data);\n    cout << \"Sorted ascending: \";\n    for (int x : data)\n        cout << x << \" \";\n    cout << endl;\n\n    sorter.setStrategy([](vector<int> &v)\n                       { sort(v.begin(), v.end(), greater<int>()); });\n    sorter.sortData(data);\n    cout << \"Sorted descending: \";\n    for (int x : data)\n        cout << x << \" \";\n    cout << endl;\n\n    return 0;\n}"
          },
          {
            "name": "Command pattern",
            "input": "encapsulate a light-switch action as a command object",
            "output": "Light turned ON",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Command\n{\npublic:\n    virtual void execute() = 0;\n    virtual ~Command() {}\n};\n\nclass Light\n{\npublic:\n    void turnOn() { cout << \"Light turned ON\" << endl; }\n};\n\nclass LightOnCommand : public Command\n{\n    Light &light;\n\npublic:\n    LightOnCommand(Light &l) : light(l) {}\n    void execute() override { light.turnOn(); }\n};\n\nint main()\n{\n    Light light;\n    LightOnCommand command(light);\n    command.execute();\n    return 0;\n}"
          },
          {
            "name": "Iterator pattern",
            "input": "custom collection with its own iterator",
            "output": "10 20 30",
            "code": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Collection\n{\n    vector<int> items = {10, 20, 30};\n\npublic:\n    auto begin() { return items.begin(); }\n    auto end() { return items.end(); }\n};\n\nint main()\n{\n    Collection collection;\n    for (int x : collection) /* works because begin()/end() are defined */\n        cout << x << \" \";\n    cout << endl;\n    return 0;\n}"
          },
          {
            "name": "Template Method pattern",
            "input": "a fixed algorithm skeleton with customizable steps",
            "output": "Prepare base, Add specific topping, Serve",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Recipe\n{\npublic:\n    void make()\n    {\n        prepareBase();\n        addTopping();\n        serve();\n    }\n    void prepareBase() { cout << \"Prepare base\" << endl; }\n    virtual void addTopping() = 0; /* customizable step */\n    void serve() { cout << \"Serve\" << endl; }\n    virtual ~Recipe() {}\n};\n\nclass PizzaRecipe : public Recipe\n{\npublic:\n    void addTopping() override { cout << \"Add specific topping\" << endl; }\n};\n\nint main()\n{\n    PizzaRecipe pizza;\n    pizza.make();\n    return 0;\n}"
          },
          {
            "name": "State pattern",
            "input": "a traffic light cycling through states",
            "output": "Red -> Green -> Yellow -> Red",
            "code": "#include <iostream>\nusing namespace std;\n\nclass State\n{\npublic:\n    virtual string name() = 0;\n    virtual State *next() = 0;\n    virtual ~State() {}\n};\n\nclass RedState;\nclass GreenState;\nclass YellowState;\n\nclass RedState : public State\n{\npublic:\n    string name() override { return \"Red\"; }\n    State *next() override;\n};\n\nclass GreenState : public State\n{\npublic:\n    string name() override { return \"Green\"; }\n    State *next() override;\n};\n\nclass YellowState : public State\n{\npublic:\n    string name() override { return \"Yellow\"; }\n    State *next() override { return new RedState(); }\n};\n\nState *RedState::next() { return new GreenState(); }\nState *GreenState::next() { return new YellowState(); }\n\nint main()\n{\n    State *state = new RedState();\n    for (int i = 0; i < 3; i++)\n    {\n        cout << state->name() << \" -> \";\n        state = state->next();\n    }\n    cout << state->name() << endl;\n    return 0;\n}"
          },
          {
            "name": "Chain of Responsibility pattern",
            "input": "a support ticket escalated through handler levels",
            "output": "Level 2 handled the request",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Handler\n{\nprotected:\n    Handler *next = nullptr;\n\npublic:\n    void setNext(Handler *h) { next = h; }\n    virtual void handle(int level)\n    {\n        if (next != nullptr)\n            next->handle(level);\n    }\n    virtual ~Handler() {}\n};\n\nclass Level1Handler : public Handler\n{\npublic:\n    void handle(int level) override\n    {\n        if (level == 1)\n            cout << \"Level 1 handled the request\" << endl;\n        else\n            Handler::handle(level);\n    }\n};\n\nclass Level2Handler : public Handler\n{\npublic:\n    void handle(int level) override\n    {\n        if (level == 2)\n            cout << \"Level 2 handled the request\" << endl;\n        else\n            Handler::handle(level);\n    }\n};\n\nint main()\n{\n    Level1Handler l1;\n    Level2Handler l2;\n    l1.setNext(&l2);\n\n    l1.handle(2);\n    return 0;\n}"
          },
          {
            "name": "Mediator pattern",
            "input": "two chat users communicating through a mediator",
            "output": "User2 received: Hello from User1",
            "code": "#include <iostream>\nusing namespace std;\n\nclass ChatMediator\n{\npublic:\n    virtual void sendMessage(const string &msg, const string &from) = 0;\n    virtual ~ChatMediator() {}\n};\n\nclass ChatRoom : public ChatMediator\n{\npublic:\n    void sendMessage(const string &msg, const string &from) override\n    {\n        cout << \"User2 received: \" << msg << \" from \" << from << endl;\n    }\n};\n\nint main()\n{\n    ChatRoom room;\n    room.sendMessage(\"Hello\", \"User1\");\n    return 0;\n}"
          },
          {
            "name": "Memento pattern",
            "input": "save and restore an editor's text state",
            "output": "Restored text: Hello",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Memento\n{\npublic:\n    string state;\n    Memento(string s) : state(s) {}\n};\n\nclass Editor\n{\n    string text;\n\npublic:\n    void setText(string t) { text = t; }\n    Memento save() { return Memento(text); }\n    void restore(const Memento &m) { text = m.state; }\n    string getText() { return text; }\n};\n\nint main()\n{\n    Editor editor;\n    editor.setText(\"Hello\");\n    Memento saved = editor.save();\n\n    editor.setText(\"Changed\");\n    editor.restore(saved);\n\n    cout << \"Restored text: \" << editor.getText() << endl;\n    return 0;\n}"
          },
          {
            "name": "Visitor pattern",
            "input": "a visitor operating on different shape types",
            "output": "Visiting a Circle, Visiting a Square",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Circle;\nclass Square;\n\nclass Visitor\n{\npublic:\n    virtual void visit(Circle &c) = 0;\n    virtual void visit(Square &s) = 0;\n    virtual ~Visitor() {}\n};\n\nclass Shape\n{\npublic:\n    virtual void accept(Visitor &v) = 0;\n    virtual ~Shape() {}\n};\n\nclass Circle : public Shape\n{\npublic:\n    void accept(Visitor &v) override { v.visit(*this); }\n};\n\nclass Square : public Shape\n{\npublic:\n    void accept(Visitor &v) override { v.visit(*this); }\n};\n\nclass PrintVisitor : public Visitor\n{\npublic:\n    void visit(Circle &c) override { cout << \"Visiting a Circle\" << endl; }\n    void visit(Square &s) override { cout << \"Visiting a Square\" << endl; }\n};\n\nint main()\n{\n    PrintVisitor visitor;\n    Circle circle;\n    Square square;\n\n    circle.accept(visitor);\n    square.accept(visitor);\n    return 0;\n}"
          },
          {
            "name": "Interpreter pattern (simple expression evaluator)",
            "input": "evaluate \"3 + 4\"",
            "output": "Result: 7",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Expression\n{\npublic:\n    virtual int interpret() = 0;\n    virtual ~Expression() {}\n};\n\nclass Number : public Expression\n{\n    int value;\n\npublic:\n    Number(int v) : value(v) {}\n    int interpret() override { return value; }\n};\n\nclass Add : public Expression\n{\n    Expression *left, *right;\n\npublic:\n    Add(Expression *l, Expression *r) : left(l), right(r) {}\n    int interpret() override { return left->interpret() + right->interpret(); }\n};\n\nint main()\n{\n    Number three(3), four(4);\n    Add expression(&three, &four);\n\n    cout << \"Result: \" << expression.interpret() << endl;\n    return 0;\n}"
          },
          {
            "name": "Null Object pattern",
            "input": "use a NullLogger instead of checking for a null pointer everywhere",
            "output": "(silently does nothing, no null-pointer checks needed)",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Logger\n{\npublic:\n    virtual void log(const string &msg) = 0;\n    virtual ~Logger() {}\n};\n\nclass ConsoleLogger : public Logger\n{\npublic:\n    void log(const string &msg) override { cout << msg << endl; }\n};\n\nclass NullLogger : public Logger\n{\npublic:\n    void log(const string &msg) override { /* intentionally does nothing */ }\n};\n\nvoid process(Logger &logger)\n{\n    logger.log(\"Processing started\");\n}\n\nint main()\n{\n    NullLogger nullLogger;\n    process(nullLogger); /* safe to call, no crash, no output */\n\n    ConsoleLogger consoleLogger;\n    process(consoleLogger);\n    return 0;\n}"
          },
          {
            "name": "Dependency Injection concept demo",
            "input": "inject a Logger dependency into a Service instead of creating it internally",
            "output": "Service using injected logger: Task completed",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Logger\n{\npublic:\n    void log(const string &msg) { cout << \"Service using injected logger: \" << msg << endl; }\n};\n\nclass Service\n{\n    Logger &logger;\n\npublic:\n    Service(Logger &l) : logger(l) {} /* dependency injected via constructor */\n    void doWork() { logger.log(\"Task completed\"); }\n};\n\nint main()\n{\n    Logger logger;\n    Service service(logger);\n    service.doWork();\n    return 0;\n}"
          },
          {
            "name": "RAII as a resource-management pattern",
            "input": "a lock guard released automatically at scope end",
            "output": "Resource acquired, Resource released",
            "code": "#include <iostream>\nusing namespace std;\n\nclass ScopedResource\n{\npublic:\n    ScopedResource() { cout << \"Resource acquired\" << endl; }\n    ~ScopedResource() { cout << \"Resource released\" << endl; }\n};\n\nint main()\n{\n    ScopedResource resource; /* released deterministically when it goes out of scope */\n    return 0;\n}"
          },
          {
            "name": "Pimpl idiom (pointer to implementation)",
            "input": "hide implementation details behind an opaque pointer",
            "output": "Widget processed value: 10",
            "code": "#include <iostream>\n#include <memory>\nusing namespace std;\n\nclass Widget\n{\n    class Impl; /* forward-declared, defined below - hides internals from callers */\n    unique_ptr<Impl> impl;\n\npublic:\n    Widget();\n    ~Widget();\n    void process(int value);\n};\n\nclass Widget::Impl\n{\npublic:\n    void process(int value) { cout << \"Widget processed value: \" << value << endl; }\n};\n\nWidget::Widget() : impl(make_unique<Impl>()) {}\nWidget::~Widget() = default;\nvoid Widget::process(int value) { impl->process(value); }\n\nint main()\n{\n    Widget w;\n    w.process(10);\n    return 0;\n}"
          },
          {
            "name": "CRTP (Curiously Recurring Template Pattern)",
            "input": "static polymorphism without virtual function overhead",
            "output": "Derived::implementation() called via CRTP",
            "code": "#include <iostream>\nusing namespace std;\n\ntemplate <typename Derived>\nclass Base\n{\npublic:\n    void interface() { static_cast<Derived *>(this)->implementation(); }\n};\n\nclass Derived : public Base<Derived>\n{\npublic:\n    void implementation() { cout << \"Derived::implementation() called via CRTP\" << endl; }\n};\n\nint main()\n{\n    Derived d;\n    d.interface(); /* resolved at compile time, no vtable lookup needed */\n    return 0;\n}"
          },
          {
            "name": "Object Pool pattern",
            "input": "reuse objects from a pool instead of constructing new ones each time",
            "output": "Reused object from pool, Reused object from pool",
            "code": "#include <iostream>\n#include <vector>\n#include <memory>\nusing namespace std;\n\nclass Connection\n{\npublic:\n    void use() { cout << \"Reused object from pool\" << endl; }\n};\n\nclass ConnectionPool\n{\n    vector<unique_ptr<Connection>> pool;\n\npublic:\n    ConnectionPool() { pool.push_back(make_unique<Connection>()); }\n    Connection *acquire() { return pool.front().get(); } /* simplified: always reuses the same one */\n};\n\nint main()\n{\n    ConnectionPool pool;\n    pool.acquire()->use();\n    pool.acquire()->use();\n    return 0;\n}"
          },
          {
            "name": "Simplified MVC (Model-View-Controller) pattern",
            "input": "controller updates the model, view renders it",
            "output": "Displaying student: Alice, Grade: A",
            "code": "#include <iostream>\nusing namespace std;\n\nclass StudentModel\n{\npublic:\n    string name;\n    string grade;\n};\n\nclass StudentView\n{\npublic:\n    void display(const StudentModel &model)\n    {\n        cout << \"Displaying student: \" << model.name << \", Grade: \" << model.grade << endl;\n    }\n};\n\nclass StudentController\n{\n    StudentModel &model;\n    StudentView &view;\n\npublic:\n    StudentController(StudentModel &m, StudentView &v) : model(m), view(v) {}\n    void updateGrade(const string &grade) { model.grade = grade; }\n    void render() { view.display(model); }\n};\n\nint main()\n{\n    StudentModel model;\n    model.name = \"Alice\";\n\n    StudentView view;\n    StudentController controller(model, view);\n\n    controller.updateGrade(\"A\");\n    controller.render();\n    return 0;\n}"
          }
        ],
        "path": "CPP/design_patterns.cpp"
      },
      {
        "chapter": "EXCEPTION HANDLING AND FILE I/O",
        "folder": "CPP",
        "programs": [
          {
            "name": "Basic try/catch block",
            "input": "divide by zero",
            "output": "Caught exception: Division by zero",
            "code": "#include <iostream>\n#include <stdexcept>\nusing namespace std;\n\nint main()\n{\n    try\n    {\n        throw runtime_error(\"Division by zero\");\n    }\n    catch (const exception &e)\n    {\n        cout << \"Caught exception: \" << e.what() << endl;\n    }\n    return 0;\n}"
          },
          {
            "name": "Throwing and catching a custom exception",
            "input": "throw InvalidAge()",
            "output": "Caught: Age cannot be negative",
            "code": "#include <iostream>\nusing namespace std;\n\nclass InvalidAge\n{\npublic:\n    string message = \"Age cannot be negative\";\n};\n\nint main()\n{\n    try\n    {\n        throw InvalidAge();\n    }\n    catch (const InvalidAge &e)\n    {\n        cout << \"Caught: \" << e.message << endl;\n    }\n    return 0;\n}"
          },
          {
            "name": "Catching multiple exception types",
            "input": "throw an int, then a string",
            "output": "Caught an int exception, Caught a string exception",
            "code": "#include <iostream>\nusing namespace std;\n\nvoid testCatch(bool throwInt)\n{\n    try\n    {\n        if (throwInt)\n            throw 42;\n        else\n            throw string(\"error\");\n    }\n    catch (int e)\n    {\n        cout << \"Caught an int exception\" << endl;\n    }\n    catch (const string &e)\n    {\n        cout << \"Caught a string exception\" << endl;\n    }\n}\n\nint main()\n{\n    testCatch(true);\n    testCatch(false);\n    return 0;\n}"
          },
          {
            "name": "Catch-all handler using catch(...)",
            "input": "throw an unexpected type",
            "output": "Caught an unknown exception type",
            "code": "#include <iostream>\nusing namespace std;\n\nint main()\n{\n    try\n    {\n        throw 3.14; /* not specifically handled below */\n    }\n    catch (int e)\n    {\n        cout << \"Caught int\" << endl;\n    }\n    catch (...)\n    {\n        cout << \"Caught an unknown exception type\" << endl;\n    }\n    return 0;\n}"
          },
          {
            "name": "Rethrowing an exception",
            "input": "catch, log, then rethrow",
            "output": "Logged in inner handler, Handled in outer handler",
            "code": "#include <iostream>\n#include <stdexcept>\nusing namespace std;\n\nvoid innerFunction()\n{\n    try\n    {\n        throw runtime_error(\"original error\");\n    }\n    catch (...)\n    {\n        cout << \"Logged in inner handler\" << endl;\n        throw; /* rethrow the same exception */\n    }\n}\n\nint main()\n{\n    try\n    {\n        innerFunction();\n    }\n    catch (const exception &e)\n    {\n        cout << \"Handled in outer handler\" << endl;\n    }\n    return 0;\n}"
          },
          {
            "name": "Custom exception class deriving from std::exception",
            "input": "throw MyException",
            "output": "Custom exception occurred: Something went wrong",
            "code": "#include <iostream>\n#include <exception>\nusing namespace std;\n\nclass MyException : public exception\n{\npublic:\n    const char *what() const noexcept override { return \"Something went wrong\"; }\n};\n\nint main()\n{\n    try\n    {\n        throw MyException();\n    }\n    catch (const exception &e)\n    {\n        cout << \"Custom exception occurred: \" << e.what() << endl;\n    }\n    return 0;\n}"
          },
          {
            "name": "Using the what() message from a standard exception",
            "input": "std::out_of_range(\"index too large\")",
            "output": "index too large",
            "code": "#include <iostream>\n#include <stdexcept>\nusing namespace std;\n\nint main()\n{\n    try\n    {\n        throw out_of_range(\"index too large\");\n    }\n    catch (const exception &e)\n    {\n        cout << e.what() << endl;\n    }\n    return 0;\n}"
          },
          {
            "name": "Stack unwinding demonstration",
            "input": "nested function calls with local objects",
            "output": "Destructor called during stack unwinding, Exception caught in main",
            "code": "#include <iostream>\n#include <stdexcept>\nusing namespace std;\n\nclass Tracker\n{\npublic:\n    ~Tracker() { cout << \"Destructor called during stack unwinding\" << endl; }\n};\n\nvoid risky()\n{\n    Tracker t;\n    throw runtime_error(\"failure\");\n}\n\nint main()\n{\n    try\n    {\n        risky();\n    }\n    catch (...)\n    {\n        cout << \"Exception caught in main\" << endl;\n    }\n    return 0;\n}"
          },
          {
            "name": "The noexcept specifier",
            "input": "(none)",
            "output": "This function promises not to throw",
            "code": "#include <iostream>\nusing namespace std;\n\nvoid safeFunction() noexcept\n{\n    cout << \"This function promises not to throw\" << endl;\n}\n\nint main()\n{\n    safeFunction();\n    return 0;\n}"
          },
          {
            "name": "Exception safety using RAII",
            "input": "exception thrown while a resource is held",
            "output": "Resource acquired, Resource released automatically, Exception handled",
            "code": "#include <iostream>\n#include <stdexcept>\nusing namespace std;\n\nclass Resource\n{\npublic:\n    Resource() { cout << \"Resource acquired\" << endl; }\n    ~Resource() { cout << \"Resource released automatically\" << endl; }\n};\n\nint main()\n{\n    try\n    {\n        Resource r; /* released via destructor even if an exception is thrown */\n        throw runtime_error(\"failure\");\n    }\n    catch (...)\n    {\n        cout << \"Exception handled\" << endl;\n    }\n    return 0;\n}"
          },
          {
            "name": "std::out_of_range exception from vector::at()",
            "input": "vector of size 3, access index 10",
            "output": "Caught: vector::_M_range_check ... (out_of_range message)",
            "code": "#include <iostream>\n#include <vector>\n#include <stdexcept>\nusing namespace std;\n\nint main()\n{\n    vector<int> v = {1, 2, 3};\n\n    try\n    {\n        cout << v.at(10) << endl; /* throws std::out_of_range, unlike v[10] */\n    }\n    catch (const out_of_range &e)\n    {\n        cout << \"Caught: \" << e.what() << endl;\n    }\n    return 0;\n}"
          },
          {
            "name": "std::invalid_argument and std::runtime_error usage",
            "input": "negative value passed to a function expecting non-negative",
            "output": "Caught: Value must be non-negative",
            "code": "#include <iostream>\n#include <stdexcept>\nusing namespace std;\n\nvoid validate(int value)\n{\n    if (value < 0)\n        throw invalid_argument(\"Value must be non-negative\");\n}\n\nint main()\n{\n    try\n    {\n        validate(-5);\n    }\n    catch (const invalid_argument &e)\n    {\n        cout << \"Caught: \" << e.what() << endl;\n    }\n    return 0;\n}"
          },
          {
            "name": "Nested try/catch blocks",
            "input": "inner exception handled separately from outer",
            "output": "Inner catch handled it, Outer code continues normally",
            "code": "#include <iostream>\n#include <stdexcept>\nusing namespace std;\n\nint main()\n{\n    try\n    {\n        try\n        {\n            throw runtime_error(\"inner failure\");\n        }\n        catch (const exception &e)\n        {\n            cout << \"Inner catch handled it\" << endl;\n        }\n        cout << \"Outer code continues normally\" << endl;\n    }\n    catch (...)\n    {\n        cout << \"This won't run\" << endl;\n    }\n    return 0;\n}"
          },
          {
            "name": "Exception thrown from a constructor",
            "input": "construct an object with an invalid value",
            "output": "Caught: Invalid initial value",
            "code": "#include <iostream>\n#include <stdexcept>\nusing namespace std;\n\nclass Positive\n{\npublic:\n    Positive(int value)\n    {\n        if (value <= 0)\n            throw invalid_argument(\"Invalid initial value\");\n    }\n};\n\nint main()\n{\n    try\n    {\n        Positive p(-1);\n    }\n    catch (const exception &e)\n    {\n        cout << \"Caught: \" << e.what() << endl;\n    }\n    return 0;\n}"
          },
          {
            "name": "Function-try-block (catching exceptions from constructor init list)",
            "input": "base class constructor throws",
            "output": "Caught in function-try-block: base failed",
            "code": "#include <iostream>\n#include <stdexcept>\nusing namespace std;\n\nclass Base\n{\npublic:\n    Base() { throw runtime_error(\"base failed\"); }\n};\n\nclass Derived : public Base\n{\npublic:\n    Derived()\n    try : Base()\n    {\n    }\n    catch (const exception &e)\n    {\n        cout << \"Caught in function-try-block: \" << e.what() << endl;\n    }\n};\n\nint main()\n{\n    try\n    {\n        Derived d;\n    }\n    catch (...)\n    {\n        cout << \"Exception propagated after function-try-block\" << endl;\n    }\n    return 0;\n}"
          },
          {
            "name": "Writing to a file using ofstream",
            "input": "\"Hello, File!\"",
            "output": "File written successfully",
            "code": "#include <iostream>\n#include <fstream>\nusing namespace std;\n\nint main()\n{\n    ofstream out(\"output.txt\");\n    out << \"Hello, File!\" << endl;\n    out.close();\n    cout << \"File written successfully\" << endl;\n    return 0;\n}"
          },
          {
            "name": "Reading from a file using ifstream",
            "input": "output.txt containing \"Hello, File!\"",
            "output": "Hello, File!",
            "code": "#include <iostream>\n#include <fstream>\nusing namespace std;\n\nint main()\n{\n    ifstream in(\"output.txt\");\n    string line;\n\n    if (getline(in, line))\n        cout << line << endl;\n\n    return 0;\n}"
          },
          {
            "name": "Appending to a file",
            "input": "append \"Another line\" to output.txt",
            "output": "Line appended successfully",
            "code": "#include <iostream>\n#include <fstream>\nusing namespace std;\n\nint main()\n{\n    ofstream out(\"output.txt\", ios::app);\n    out << \"Another line\" << endl;\n    out.close();\n    cout << \"Line appended successfully\" << endl;\n    return 0;\n}"
          },
          {
            "name": "Reading a file line by line",
            "input": "a multi-line text file",
            "output": "Each line printed with its line number",
            "code": "#include <iostream>\n#include <fstream>\nusing namespace std;\n\nint main()\n{\n    ifstream in(\"output.txt\");\n    string line;\n    int lineNumber = 1;\n\n    while (getline(in, line))\n        cout << lineNumber++ << \": \" << line << endl;\n\n    return 0;\n}"
          },
          {
            "name": "Checking if a file exists/opened successfully",
            "input": "\"missing.txt\" (does not exist)",
            "output": "Failed to open file",
            "code": "#include <iostream>\n#include <fstream>\nusing namespace std;\n\nint main()\n{\n    ifstream in(\"missing.txt\");\n\n    if (!in.is_open())\n        cout << \"Failed to open file\" << endl;\n    else\n        cout << \"File opened successfully\" << endl;\n\n    return 0;\n}"
          },
          {
            "name": "Binary file read/write",
            "input": "write an int in binary, then read it back",
            "output": "Read back value: 12345",
            "code": "#include <iostream>\n#include <fstream>\nusing namespace std;\n\nint main()\n{\n    int value = 12345;\n\n    ofstream out(\"data.bin\", ios::binary);\n    out.write(reinterpret_cast<char *>(&value), sizeof(value));\n    out.close();\n\n    int readValue;\n    ifstream in(\"data.bin\", ios::binary);\n    in.read(reinterpret_cast<char *>(&readValue), sizeof(readValue));\n\n    cout << \"Read back value: \" << readValue << endl;\n    return 0;\n}"
          },
          {
            "name": "Reading formatted numeric data from a file",
            "input": "file containing \"10 20 30\"",
            "output": "Sum: 60",
            "code": "#include <iostream>\n#include <fstream>\nusing namespace std;\n\nint main()\n{\n    ofstream out(\"numbers.txt\");\n    out << \"10 20 30\";\n    out.close();\n\n    ifstream in(\"numbers.txt\");\n    int a, b, c;\n    in >> a >> b >> c;\n\n    cout << \"Sum: \" << (a + b + c) << endl;\n    return 0;\n}"
          },
          {
            "name": "Using fstream to both read and write the same file",
            "input": "write then read back without reopening",
            "output": "Value read back: 99",
            "code": "#include <iostream>\n#include <fstream>\nusing namespace std;\n\nint main()\n{\n    fstream file(\"shared.txt\", ios::in | ios::out | ios::trunc);\n    file << 99;\n    file.seekg(0); /* rewind before reading */\n\n    int value;\n    file >> value;\n    cout << \"Value read back: \" << value << endl;\n    return 0;\n}"
          },
          {
            "name": "Copying file contents using streams",
            "input": "copy output.txt to copy.txt",
            "output": "File copied successfully",
            "code": "#include <iostream>\n#include <fstream>\nusing namespace std;\n\nint main()\n{\n    ifstream src(\"output.txt\");\n    ofstream dst(\"copy.txt\");\n\n    dst << src.rdbuf(); /* stream the whole buffer across */\n    cout << \"File copied successfully\" << endl;\n    return 0;\n}"
          },
          {
            "name": "Counting lines and words in a file",
            "input": "a text file with several lines",
            "output": "Lines: 3, Words: 8",
            "code": "#include <iostream>\n#include <fstream>\n#include <sstream>\nusing namespace std;\n\nint main()\n{\n    ofstream out(\"count.txt\");\n    out << \"hello world\\nfoo bar baz\\none two three\";\n    out.close();\n\n    ifstream in(\"count.txt\");\n    string line;\n    int lines = 0, words = 0;\n\n    while (getline(in, line))\n    {\n        lines++;\n        istringstream iss(line);\n        string word;\n        while (iss >> word)\n            words++;\n    }\n\n    cout << \"Lines: \" << lines << \", Words: \" << words << endl;\n    return 0;\n}"
          },
          {
            "name": "Using std::stringstream to parse a string",
            "input": "\"42 3.14 hello\"",
            "output": "int=42, double=3.14, word=hello",
            "code": "#include <iostream>\n#include <sstream>\nusing namespace std;\n\nint main()\n{\n    stringstream ss(\"42 3.14 hello\");\n    int i;\n    double d;\n    string word;\n\n    ss >> i >> d >> word;\n    cout << \"int=\" << i << \", double=\" << d << \", word=\" << word << endl;\n    return 0;\n}"
          },
          {
            "name": "Writing structured (CSV-like) data to a file",
            "input": "name,age rows",
            "output": "CSV file written with header and two rows",
            "code": "#include <iostream>\n#include <fstream>\nusing namespace std;\n\nint main()\n{\n    ofstream out(\"people.csv\");\n    out << \"name,age\\n\";\n    out << \"Alice,30\\n\";\n    out << \"Bob,25\\n\";\n    out.close();\n\n    cout << \"CSV file written with header and two rows\" << endl;\n    return 0;\n}"
          },
          {
            "name": "Combining exception handling with file I/O",
            "input": "attempt to open a non-existent file and throw if it fails",
            "output": "Caught: Could not open file",
            "code": "#include <iostream>\n#include <fstream>\n#include <stdexcept>\nusing namespace std;\n\nvoid readRequiredFile(const string &path)\n{\n    ifstream in(path);\n    if (!in.is_open())\n        throw runtime_error(\"Could not open file\");\n}\n\nint main()\n{\n    try\n    {\n        readRequiredFile(\"does_not_exist.txt\");\n    }\n    catch (const exception &e)\n    {\n        cout << \"Caught: \" << e.what() << endl;\n    }\n    return 0;\n}"
          },
          {
            "name": "Custom exception hierarchy (base + derived exceptions)",
            "input": "throw a NetworkException (derived from AppException)",
            "output": "Caught as base type: Network failure",
            "code": "#include <iostream>\nusing namespace std;\n\nclass AppException\n{\npublic:\n    virtual string message() const { return \"Generic application error\"; }\n    virtual ~AppException() {}\n};\n\nclass NetworkException : public AppException\n{\npublic:\n    string message() const override { return \"Network failure\"; }\n};\n\nint main()\n{\n    try\n    {\n        throw NetworkException();\n    }\n    catch (const AppException &e) /* caught via the common base type */\n    {\n        cout << \"Caught as base type: \" << e.message() << endl;\n    }\n    return 0;\n}"
          },
          {
            "name": "Using std::set_terminate for uncaught exceptions",
            "input": "an exception escapes all try/catch blocks",
            "output": "Custom terminate handler invoked",
            "code": "#include <iostream>\n#include <cstdlib>\nusing namespace std;\n\nvoid customTerminate()\n{\n    cout << \"Custom terminate handler invoked\" << endl;\n    abort();\n}\n\nint main()\n{\n    set_terminate(customTerminate);\n    /* In a real scenario, an uncaught throw here would invoke customTerminate(). */\n    cout << \"Terminate handler registered (not triggered in this safe demo)\" << endl;\n    return 0;\n}"
          }
        ],
        "path": "CPP/exception_file_io.cpp"
      },
      {
        "chapter": "MULTITHREADING AND SYNCHRONIZATION",
        "folder": "CPP",
        "programs": [
          {
            "name": "std::thread basics",
            "input": "(none)",
            "output": "Hello from a std::thread!",
            "code": "#include <iostream>\n#include <thread>\nusing namespace std;\n\nvoid run()\n{\n    cout << \"Hello from a std::thread!\" << endl;\n}\n\nint main()\n{\n    thread t(run);\n    t.join();\n    return 0;\n}"
          },
          {
            "name": "Passing arguments to a thread",
            "input": "42",
            "output": "Thread received: 42",
            "code": "#include <iostream>\n#include <thread>\nusing namespace std;\n\nvoid run(int value)\n{\n    cout << \"Thread received: \" << value << endl;\n}\n\nint main()\n{\n    thread t(run, 42);\n    t.join();\n    return 0;\n}"
          },
          {
            "name": "Joining a thread",
            "input": "(none)",
            "output": "Main waits until the thread finishes",
            "code": "#include <iostream>\n#include <thread>\nusing namespace std;\n\nint main()\n{\n    thread t([]\n             { cout << \"Worker thread running\" << endl; });\n\n    t.join(); /* blocks until the thread completes */\n    cout << \"Main waits until the thread finishes\" << endl;\n    return 0;\n}"
          },
          {
            "name": "Detaching a thread",
            "input": "(none)",
            "output": "Detached thread runs independently in the background",
            "code": "#include <iostream>\n#include <thread>\n#include <chrono>\nusing namespace std;\n\nint main()\n{\n    thread t([]\n             { cout << \"Detached thread runs independently in the background\" << endl; });\n\n    t.detach();\n    this_thread::sleep_for(chrono::milliseconds(100)); /* let it finish for this demo */\n    return 0;\n}"
          },
          {
            "name": "std::mutex basics (lock/unlock)",
            "input": "(none)",
            "output": "Critical section entered and exited safely",
            "code": "#include <iostream>\n#include <mutex>\nusing namespace std;\n\nint main()\n{\n    mutex m;\n\n    m.lock();\n    cout << \"Critical section entered and exited safely\" << endl;\n    m.unlock();\n    return 0;\n}"
          },
          {
            "name": "std::lock_guard (RAII-style locking)",
            "input": "2 threads incrementing a shared counter",
            "output": "Final counter value: 200000",
            "code": "#include <iostream>\n#include <thread>\n#include <mutex>\nusing namespace std;\n\nint counter = 0;\nmutex m;\n\nvoid increment()\n{\n    for (int i = 0; i < 100000; i++)\n    {\n        lock_guard<mutex> lock(m); /* automatically unlocks when it goes out of scope */\n        counter++;\n    }\n}\n\nint main()\n{\n    thread t1(increment), t2(increment);\n    t1.join();\n    t2.join();\n\n    cout << \"Final counter value: \" << counter << endl;\n    return 0;\n}"
          },
          {
            "name": "std::unique_lock (more flexible than lock_guard)",
            "input": "(none)",
            "output": "Locked, temporarily unlocked, then relocked",
            "code": "#include <iostream>\n#include <mutex>\nusing namespace std;\n\nint main()\n{\n    mutex m;\n    unique_lock<mutex> lock(m);\n\n    cout << \"Locked, temporarily unlocked, then relocked\" << endl;\n    lock.unlock(); /* unique_lock allows manual unlock/relock, unlike lock_guard */\n    lock.lock();\n    return 0;\n}"
          },
          {
            "name": "std::recursive_mutex",
            "input": "same thread locks the mutex twice (nested calls)",
            "output": "Outer lock acquired, Inner lock acquired (no deadlock)",
            "code": "#include <iostream>\n#include <mutex>\nusing namespace std;\n\nrecursive_mutex rm;\n\nvoid inner()\n{\n    lock_guard<recursive_mutex> lock(rm);\n    cout << \"Inner lock acquired (no deadlock)\" << endl;\n}\n\nvoid outer()\n{\n    lock_guard<recursive_mutex> lock(rm);\n    cout << \"Outer lock acquired\" << endl;\n    inner();\n}\n\nint main()\n{\n    outer();\n    return 0;\n}"
          },
          {
            "name": "std::timed_mutex with try_lock_for",
            "input": "wait at most 100ms for a locked mutex",
            "output": "Could not acquire the lock within the timeout",
            "code": "#include <iostream>\n#include <mutex>\n#include <chrono>\nusing namespace std;\n\nint main()\n{\n    timed_mutex tm;\n    tm.lock(); /* held already, simulating contention */\n\n    if (!tm.try_lock_for(chrono::milliseconds(100)))\n        cout << \"Could not acquire the lock within the timeout\" << endl;\n\n    tm.unlock();\n    return 0;\n}"
          },
          {
            "name": "std::condition_variable basics",
            "input": "worker waits until notified",
            "output": "Worker was notified and resumed",
            "code": "#include <iostream>\n#include <thread>\n#include <mutex>\n#include <condition_variable>\nusing namespace std;\n\nmutex m;\ncondition_variable cv;\nbool ready = false;\n\nvoid worker()\n{\n    unique_lock<mutex> lock(m);\n    cv.wait(lock, []\n            { return ready; });\n    cout << \"Worker was notified and resumed\" << endl;\n}\n\nint main()\n{\n    thread t(worker);\n\n    {\n        lock_guard<mutex> lock(m);\n        ready = true;\n    }\n    cv.notify_one();\n\n    t.join();\n    return 0;\n}"
          },
          {
            "name": "Producer-consumer using a condition_variable",
            "input": "producer adds 5 items, consumer waits for each",
            "output": "Consumed: 0, Consumed: 1, ... Consumed: 4",
            "code": "#include <iostream>\n#include <thread>\n#include <queue>\n#include <mutex>\n#include <condition_variable>\nusing namespace std;\n\nqueue<int> buffer;\nmutex m;\ncondition_variable cv;\nbool done = false;\n\nvoid producer()\n{\n    for (int i = 0; i < 5; i++)\n    {\n        {\n            lock_guard<mutex> lock(m);\n            buffer.push(i);\n        }\n        cv.notify_one();\n    }\n    {\n        lock_guard<mutex> lock(m);\n        done = true;\n    }\n    cv.notify_one();\n}\n\nvoid consumer()\n{\n    while (true)\n    {\n        unique_lock<mutex> lock(m);\n        cv.wait(lock, []\n                { return !buffer.empty() || done; });\n\n        while (!buffer.empty())\n        {\n            cout << \"Consumed: \" << buffer.front() << endl;\n            buffer.pop();\n        }\n        if (done)\n            break;\n    }\n}\n\nint main()\n{\n    thread p(producer), c(consumer);\n    p.join();\n    c.join();\n    return 0;\n}"
          },
          {
            "name": "std::atomic basics",
            "input": "2 threads each incrementing 100000 times",
            "output": "Final counter value: 200000 (correct without a mutex)",
            "code": "#include <iostream>\n#include <thread>\n#include <atomic>\nusing namespace std;\n\natomic<int> counter(0);\n\nvoid increment()\n{\n    for (int i = 0; i < 100000; i++)\n        counter++;\n}\n\nint main()\n{\n    thread t1(increment), t2(increment);\n    t1.join();\n    t2.join();\n\n    cout << \"Final counter value: \" << counter << endl;\n    return 0;\n}"
          },
          {
            "name": "std::atomic vs mutex - conceptual performance comparison",
            "input": "(none)",
            "output": "Atomics avoid OS-level locking overhead for simple operations",
            "code": "#include <iostream>\nusing namespace std;\n\nint main()\n{\n    /* std::atomic operations typically compile to a single lock-free CPU\n     * instruction (e.g. lock xadd), while a mutex may involve a futex\n     * syscall under contention - atomics are faster for simple counters. */\n    cout << \"Atomics avoid OS-level locking overhead for simple operations\" << endl;\n    return 0;\n}"
          },
          {
            "name": "std::async and std::future basics",
            "input": "compute 6 * 7 asynchronously",
            "output": "Result: 42",
            "code": "#include <iostream>\n#include <future>\nusing namespace std;\n\nint compute()\n{\n    return 6 * 7;\n}\n\nint main()\n{\n    future<int> result = async(launch::async, compute);\n    cout << \"Result: \" << result.get() << endl;\n    return 0;\n}"
          },
          {
            "name": "std::promise and std::future",
            "input": "a worker thread sets the promise's value",
            "output": "Received from promise: 77",
            "code": "#include <iostream>\n#include <thread>\n#include <future>\nusing namespace std;\n\nvoid setValue(promise<int> p)\n{\n    p.set_value(77);\n}\n\nint main()\n{\n    promise<int> p;\n    future<int> f = p.get_future();\n\n    thread t(setValue, move(p));\n    cout << \"Received from promise: \" << f.get() << endl;\n\n    t.join();\n    return 0;\n}"
          },
          {
            "name": "std::packaged_task",
            "input": "wrap a function as a packaged_task and run it on a thread",
            "output": "Packaged task result: 15",
            "code": "#include <iostream>\n#include <thread>\n#include <future>\nusing namespace std;\n\nint add(int a, int b) { return a + b; }\n\nint main()\n{\n    packaged_task<int(int, int)> task(add);\n    future<int> result = task.get_future();\n\n    thread t(move(task), 7, 8);\n    cout << \"Packaged task result: \" << result.get() << endl;\n\n    t.join();\n    return 0;\n}"
          },
          {
            "name": "std::call_once",
            "input": "3 threads all trying to initialize",
            "output": "Initialized exactly once",
            "code": "#include <iostream>\n#include <thread>\n#include <mutex>\nusing namespace std;\n\nonce_flag flag;\n\nvoid initialize()\n{\n    cout << \"Initialized exactly once\" << endl;\n}\n\nvoid run()\n{\n    call_once(flag, initialize);\n}\n\nint main()\n{\n    thread t1(run), t2(run), t3(run);\n    t1.join();\n    t2.join();\n    t3.join();\n    return 0;\n}"
          },
          {
            "name": "Multiple threads incrementing a shared counter safely",
            "input": "4 threads, 50000 increments each",
            "output": "Final counter value: 200000",
            "code": "#include <iostream>\n#include <thread>\n#include <mutex>\n#include <vector>\nusing namespace std;\n\nint counter = 0;\nmutex m;\n\nvoid increment()\n{\n    for (int i = 0; i < 50000; i++)\n    {\n        lock_guard<mutex> lock(m);\n        counter++;\n    }\n}\n\nint main()\n{\n    vector<thread> threads;\n    for (int i = 0; i < 4; i++)\n        threads.emplace_back(increment);\n\n    for (auto &t : threads)\n        t.join();\n\n    cout << \"Final counter value: \" << counter << endl;\n    return 0;\n}"
          },
          {
            "name": "Race condition demo without synchronization",
            "input": "2 threads incrementing without a mutex",
            "output": "Final counter value is usually less than 200000 (lost updates)",
            "code": "#include <iostream>\n#include <thread>\nusing namespace std;\n\nint counter = 0;\n\nvoid increment()\n{\n    for (int i = 0; i < 100000; i++)\n        counter++; /* not atomic: read-modify-write race */\n}\n\nint main()\n{\n    thread t1(increment), t2(increment);\n    t1.join();\n    t2.join();\n\n    cout << \"Final counter value (expected 200000, likely less): \" << counter << endl;\n    return 0;\n}"
          },
          {
            "name": "Deadlock demo with two mutexes locked in different order",
            "input": "thread A locks m1 then m2; thread B locks m2 then m1",
            "output": "Both threads block forever waiting on each other (deadlock)",
            "code": "#include <iostream>\n#include <thread>\n#include <mutex>\n#include <chrono>\nusing namespace std;\n\nmutex m1, m2;\n\nvoid threadA()\n{\n    lock_guard<mutex> lockA(m1);\n    this_thread::sleep_for(chrono::milliseconds(100));\n    lock_guard<mutex> lockB(m2); /* blocks: threadB holds m2 and wants m1 */\n}\n\nvoid threadB()\n{\n    lock_guard<mutex> lockB(m2);\n    this_thread::sleep_for(chrono::milliseconds(100));\n    lock_guard<mutex> lockA(m1); /* blocks: threadA holds m1 and wants m2 */\n}\n\nint main()\n{\n    thread a(threadA), b(threadB);\n    a.join(); /* this demo intentionally hangs, illustrating deadlock */\n    b.join();\n    return 0;\n}"
          },
          {
            "name": "std::lock - locking multiple mutexes safely to avoid deadlock",
            "input": "two threads locking the same two mutexes in reverse order",
            "output": "Both threads complete without deadlocking",
            "code": "#include <iostream>\n#include <thread>\n#include <mutex>\nusing namespace std;\n\nmutex m1, m2;\n\nvoid safeLock(int order)\n{\n    if (order == 1)\n        lock(m1, m2); /* std::lock acquires both atomically, avoiding deadlock */\n    else\n        lock(m2, m1);\n\n    lock_guard<mutex> lockA(m1, adopt_lock);\n    lock_guard<mutex> lockB(m2, adopt_lock);\n\n    cout << \"Thread with order \" << order << \" completed safely\" << endl;\n}\n\nint main()\n{\n    thread a(safeLock, 1), b(safeLock, 2);\n    a.join();\n    b.join();\n    return 0;\n}"
          },
          {
            "name": "Basic thread pool implementation",
            "input": "4 worker threads processing 8 tasks",
            "output": "Each task processed exactly once by one of the workers",
            "code": "#include <iostream>\n#include <thread>\n#include <vector>\n#include <mutex>\nusing namespace std;\n\nint nextTask = 0;\nmutex m;\n\nvoid worker(int id)\n{\n    while (true)\n    {\n        int task;\n        {\n            lock_guard<mutex> lock(m);\n            if (nextTask >= 8)\n                return;\n            task = nextTask++;\n        }\n        cout << \"Task \" << task << \" processed by worker \" << id << endl;\n    }\n}\n\nint main()\n{\n    vector<thread> workers;\n    for (int i = 0; i < 4; i++)\n        workers.emplace_back(worker, i);\n\n    for (auto &t : workers)\n        t.join();\n\n    return 0;\n}"
          },
          {
            "name": "std::this_thread::sleep_for",
            "input": "sleep for 200ms",
            "output": "Woke up after sleeping",
            "code": "#include <iostream>\n#include <thread>\n#include <chrono>\nusing namespace std;\n\nint main()\n{\n    this_thread::sleep_for(chrono::milliseconds(200));\n    cout << \"Woke up after sleeping\" << endl;\n    return 0;\n}"
          },
          {
            "name": "std::this_thread::get_id",
            "input": "(none)",
            "output": "Running on thread ID: 0x...",
            "code": "#include <iostream>\n#include <thread>\nusing namespace std;\n\nint main()\n{\n    cout << \"Running on thread ID: \" << this_thread::get_id() << endl;\n    return 0;\n}"
          },
          {
            "name": "Parallel sum using multiple threads",
            "input": "array of 1,000,000 ints split across 4 threads",
            "output": "Total sum computed by combining each thread's partial sum",
            "code": "#include <iostream>\n#include <thread>\n#include <vector>\nusing namespace std;\n\nvoid sumRange(vector<int> &data, int start, int end, long &result)\n{\n    long sum = 0;\n    for (int i = start; i < end; i++)\n        sum += data[i];\n    result = sum;\n}\n\nint main()\n{\n    const int size = 1000000;\n    vector<int> data(size, 1);\n    const int numThreads = 4;\n    vector<thread> threads;\n    vector<long> partial(numThreads);\n    int chunk = size / numThreads;\n\n    for (int i = 0; i < numThreads; i++)\n    {\n        int start = i * chunk;\n        int end = (i == numThreads - 1) ? size : start + chunk;\n        threads.emplace_back(sumRange, ref(data), start, end, ref(partial[i]));\n    }\n\n    for (auto &t : threads)\n        t.join();\n\n    long total = 0;\n    for (long p : partial)\n        total += p;\n\n    cout << \"Total sum: \" << total << endl;\n    return 0;\n}"
          },
          {
            "name": "std::shared_mutex (reader-writer lock, C++17)",
            "input": "multiple readers, one writer",
            "output": "Readers run concurrently; the writer gets exclusive access",
            "code": "#include <iostream>\n#include <shared_mutex>\n#include <mutex>\n#include <thread>\nusing namespace std;\n\nshared_mutex sm;\nint sharedValue = 0;\n\nvoid reader()\n{\n    shared_lock<shared_mutex> lock(sm); /* multiple readers allowed at once */\n    cout << \"Reader sees value: \" << sharedValue << endl;\n}\n\nvoid writer()\n{\n    unique_lock<shared_mutex> lock(sm); /* exclusive access for writing */\n    sharedValue = 42;\n    cout << \"Writer updated value to \" << sharedValue << endl;\n}\n\nint main()\n{\n    thread w(writer);\n    w.join();\n\n    thread r1(reader), r2(reader);\n    r1.join();\n    r2.join();\n    return 0;\n}"
          },
          {
            "name": "Thread-safe singleton using std::call_once",
            "input": "5 threads requesting the singleton instance",
            "output": "Singleton created once",
            "code": "#include <iostream>\n#include <thread>\n#include <mutex>\n#include <memory>\nusing namespace std;\n\nonce_flag flag;\nunique_ptr<int> instance;\n\nint *getInstance()\n{\n    call_once(flag, []\n              {\n\t\tinstance = make_unique<int>(1);\n\t\tcout << \"Singleton created once\" << endl; });\n    return instance.get();\n}\n\nint main()\n{\n    thread threads[5];\n    for (auto &t : threads)\n        t = thread(getInstance);\n    for (auto &t : threads)\n        t.join();\n    return 0;\n}"
          },
          {
            "name": "Passing a lambda to a thread",
            "input": "capture a local variable by value",
            "output": "Lambda thread received captured value: 5",
            "code": "#include <iostream>\n#include <thread>\nusing namespace std;\n\nint main()\n{\n    int value = 5;\n    thread t([value]()\n             { cout << \"Lambda thread received captured value: \" << value << endl; });\n    t.join();\n    return 0;\n}"
          },
          {
            "name": "std::future::wait_for with a timeout",
            "input": "a task that takes 500ms, checked with a 100ms timeout",
            "output": "Task not finished yet after the timeout",
            "code": "#include <iostream>\n#include <future>\n#include <thread>\n#include <chrono>\nusing namespace std;\n\nint slowTask()\n{\n    this_thread::sleep_for(chrono::milliseconds(500));\n    return 1;\n}\n\nint main()\n{\n    future<int> result = async(launch::async, slowTask);\n\n    if (result.wait_for(chrono::milliseconds(100)) == future_status::timeout)\n        cout << \"Task not finished yet after the timeout\" << endl;\n\n    result.wait(); /* wait for real completion before exiting */\n    return 0;\n}"
          },
          {
            "name": "Joining all threads stored in a vector<thread>",
            "input": "5 worker threads",
            "output": "Worker 0..4 finished, All threads joined",
            "code": "#include <iostream>\n#include <thread>\n#include <vector>\nusing namespace std;\n\nint main()\n{\n    vector<thread> threads;\n\n    for (int i = 0; i < 5; i++)\n        threads.emplace_back([i]\n                             { cout << \"Worker \" << i << \" finished\" << endl; });\n\n    for (auto &t : threads)\n        t.join();\n\n    cout << \"All threads joined\" << endl;\n    return 0;\n}"
          }
        ],
        "path": "CPP/multithreading_sync.cpp"
      },
      {
        "chapter": "OOP FUNDAMENTALS",
        "folder": "CPP",
        "programs": [
          {
            "name": "Define a class with private/public members",
            "input": "(none)",
            "output": "Name: Alice, Age: 30",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Person\n{\nprivate:\n    string name;\n    int age;\n\npublic:\n    void set(string n, int a)\n    {\n        name = n;\n        age = a;\n    }\n    void show() { cout << \"Name: \" << name << \", Age: \" << age << endl; }\n};\n\nint main()\n{\n    Person p;\n    p.set(\"Alice\", 30);\n    p.show();\n    return 0;\n}"
          },
          {
            "name": "Create objects and call methods",
            "input": "two Car objects",
            "output": "Toyota is driving, Honda is driving",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Car\n{\npublic:\n    string brand;\n    void drive() { cout << brand << \" is driving\" << endl; }\n};\n\nint main()\n{\n    Car car1, car2;\n    car1.brand = \"Toyota\";\n    car2.brand = \"Honda\";\n    car1.drive();\n    car2.drive();\n    return 0;\n}"
          },
          {
            "name": "Constructor basics",
            "input": "(none)",
            "output": "Object created via constructor",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Demo\n{\npublic:\n    Demo() { cout << \"Object created via constructor\" << endl; }\n};\n\nint main()\n{\n    Demo d;\n    return 0;\n}"
          },
          {
            "name": "Parameterized constructor",
            "input": "Point(3, 4)",
            "output": "Point(3, 4)",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Point\n{\n    int x, y;\n\npublic:\n    Point(int a, int b) : x(a), y(b) {}\n    void show() { cout << \"Point(\" << x << \", \" << y << \")\" << endl; }\n};\n\nint main()\n{\n    Point p(3, 4);\n    p.show();\n    return 0;\n}"
          },
          {
            "name": "Copy constructor",
            "input": "copy an existing Box object",
            "output": "Original width: 5, Copy width: 5",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Box\n{\npublic:\n    int width;\n    Box(int w) : width(w) {}\n    Box(const Box &other) : width(other.width) {}\n};\n\nint main()\n{\n    Box original(5);\n    Box copy = original;\n    cout << \"Original width: \" << original.width << \", Copy width: \" << copy.width << endl;\n    return 0;\n}"
          },
          {
            "name": "Destructor",
            "input": "(none)",
            "output": "Constructed, Destructed",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Resource\n{\npublic:\n    Resource() { cout << \"Constructed\" << endl; }\n    ~Resource() { cout << \"Destructed\" << endl; }\n};\n\nint main()\n{\n    Resource r;\n    return 0;\n}"
          },
          {
            "name": "Default arguments in a constructor",
            "input": "no arguments, then an explicit argument",
            "output": "Volume: 1, Volume: 27",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Cube\n{\n    int side;\n\npublic:\n    Cube(int s = 1) : side(s) {}\n    int volume() { return side * side * side; }\n};\n\nint main()\n{\n    Cube c1;\n    Cube c2(3);\n    cout << \"Volume: \" << c1.volume() << endl;\n    cout << \"Volume: \" << c2.volume() << endl;\n    return 0;\n}"
          },
          {
            "name": "Using the \"this\" pointer",
            "input": "same-named parameter as member variable",
            "output": "Value set to: 42",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Holder\n{\n    int value;\n\npublic:\n    void setValue(int value) { this->value = value; }\n    void show() { cout << \"Value set to: \" << value << endl; }\n};\n\nint main()\n{\n    Holder h;\n    h.setValue(42);\n    h.show();\n    return 0;\n}"
          },
          {
            "name": "Static data member shared across all objects",
            "input": "create 3 objects",
            "output": "Total objects created: 3",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Counter\n{\npublic:\n    static int count;\n    Counter() { count++; }\n};\n\nint Counter::count = 0;\n\nint main()\n{\n    Counter a, b, c;\n    cout << \"Total objects created: \" << Counter::count << endl;\n    return 0;\n}"
          },
          {
            "name": "Static member function",
            "input": "(none)",
            "output": "Called without any object instance",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Utility\n{\npublic:\n    static void greet() { cout << \"Called without any object instance\" << endl; }\n};\n\nint main()\n{\n    Utility::greet();\n    return 0;\n}"
          },
          {
            "name": "Const member function",
            "input": "(none)",
            "output": "Value: 10",
            "code": "#include <iostream>\nusing namespace std;\n\nclass ReadOnly\n{\n    int value = 10;\n\npublic:\n    int getValue() const { return value; }\n};\n\nint main()\n{\n    const ReadOnly obj;\n    cout << \"Value: \" << obj.getValue() << endl;\n    return 0;\n}"
          },
          {
            "name": "Friend function accessing private members",
            "input": "Box with width = 8",
            "output": "Width via friend function: 8",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Box\n{\n    int width = 8;\n\npublic:\n    friend void printWidth(const Box &b);\n};\n\nvoid printWidth(const Box &b)\n{\n    cout << \"Width via friend function: \" << b.width << endl;\n}\n\nint main()\n{\n    Box b;\n    printWidth(b);\n    return 0;\n}"
          },
          {
            "name": "Friend class",
            "input": "(none)",
            "output": "Engine started via friend class access",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Engine\n{\n    bool running = false;\n    friend class Mechanic;\n};\n\nclass Mechanic\n{\npublic:\n    void start(Engine &e)\n    {\n        e.running = true;\n        cout << \"Engine started via friend class access\" << endl;\n    }\n};\n\nint main()\n{\n    Engine e;\n    Mechanic m;\n    m.start(e);\n    return 0;\n}"
          },
          {
            "name": "Single inheritance",
            "input": "(none)",
            "output": "Animal eats, Dog barks",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Animal\n{\npublic:\n    void eat() { cout << \"Animal eats\" << endl; }\n};\n\nclass Dog : public Animal\n{\npublic:\n    void bark() { cout << \"Dog barks\" << endl; }\n};\n\nint main()\n{\n    Dog d;\n    d.eat();\n    d.bark();\n    return 0;\n}"
          },
          {
            "name": "Multiple inheritance",
            "input": "(none)",
            "output": "Flies, Swims",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Flyer\n{\npublic:\n    void fly() { cout << \"Flies\" << endl; }\n};\n\nclass Swimmer\n{\npublic:\n    void swim() { cout << \"Swims\" << endl; }\n};\n\nclass Duck : public Flyer, public Swimmer\n{\n};\n\nint main()\n{\n    Duck d;\n    d.fly();\n    d.swim();\n    return 0;\n}"
          },
          {
            "name": "Multilevel inheritance",
            "input": "(none)",
            "output": "Base, Derived1, Derived2",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Base\n{\npublic:\n    void show() { cout << \"Base\" << endl; }\n};\n\nclass Derived1 : public Base\n{\npublic:\n    void show1() { cout << \"Derived1\" << endl; }\n};\n\nclass Derived2 : public Derived1\n{\npublic:\n    void show2() { cout << \"Derived2\" << endl; }\n};\n\nint main()\n{\n    Derived2 d;\n    d.show();\n    d.show1();\n    d.show2();\n    return 0;\n}"
          },
          {
            "name": "Hierarchical inheritance",
            "input": "(none)",
            "output": "Car drives, Bike rides",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Vehicle\n{\npublic:\n    void info() { cout << \"Vehicle\" << endl; }\n};\n\nclass Car : public Vehicle\n{\npublic:\n    void drive() { cout << \"Car drives\" << endl; }\n};\n\nclass Bike : public Vehicle\n{\npublic:\n    void ride() { cout << \"Bike rides\" << endl; }\n};\n\nint main()\n{\n    Car c;\n    Bike b;\n    c.drive();\n    b.ride();\n    return 0;\n}"
          },
          {
            "name": "Hybrid inheritance and the diamond problem",
            "input": "(none)",
            "output": "Compiler error/ambiguity without virtual inheritance (demonstrated in comments)",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Base\n{\npublic:\n    int value = 1;\n};\n\nclass Derived1 : public Base\n{\n};\n\nclass Derived2 : public Base\n{\n};\n\n/* Combined : public Derived1, public Derived2 would create TWO copies of Base,\n * so \"combined.value\" becomes ambiguous without virtual inheritance. */\nclass Combined : public Derived1, public Derived2\n{\n};\n\nint main()\n{\n    Combined c;\n    cout << \"Derived1::value = \" << c.Derived1::value << endl;\n    cout << \"Derived2::value = \" << c.Derived2::value << endl;\n    return 0;\n}"
          },
          {
            "name": "Virtual base class to resolve the diamond problem",
            "input": "(none)",
            "output": "Single shared value: 1",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Base\n{\npublic:\n    int value = 1;\n};\n\nclass Derived1 : virtual public Base\n{\n};\n\nclass Derived2 : virtual public Base\n{\n};\n\nclass Combined : public Derived1, public Derived2\n{\n};\n\nint main()\n{\n    Combined c;\n    cout << \"Single shared value: \" << c.value << endl; /* no ambiguity now */\n    return 0;\n}"
          },
          {
            "name": "Function overriding",
            "input": "(none)",
            "output": "Derived version called",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Base\n{\npublic:\n    void show() { cout << \"Base version called\" << endl; }\n};\n\nclass Derived : public Base\n{\npublic:\n    void show() { cout << \"Derived version called\" << endl; }\n};\n\nint main()\n{\n    Derived d;\n    d.show();\n    return 0;\n}"
          },
          {
            "name": "Virtual functions and runtime polymorphism",
            "input": "Base pointer pointing to a Derived object",
            "output": "Derived::speak() called through a base pointer",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Animal\n{\npublic:\n    virtual void speak() { cout << \"Animal::speak()\" << endl; }\n};\n\nclass Dog : public Animal\n{\npublic:\n    void speak() override { cout << \"Derived::speak() called through a base pointer\" << endl; }\n};\n\nint main()\n{\n    Animal *a = new Dog();\n    a->speak(); /* resolved at runtime via the vtable */\n    delete a;\n    return 0;\n}"
          },
          {
            "name": "Pure virtual functions and abstract classes",
            "input": "(none)",
            "output": "Circle area: 78.5",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Shape\n{\npublic:\n    virtual double area() const = 0; /* pure virtual: makes Shape abstract */\n};\n\nclass Circle : public Shape\n{\n    double radius;\n\npublic:\n    Circle(double r) : radius(r) {}\n    double area() const override { return 3.14 * radius * radius; }\n};\n\nint main()\n{\n    Shape *s = new Circle(5);\n    cout << \"Circle area: \" << s->area() << endl;\n    delete s;\n    return 0;\n}"
          },
          {
            "name": "Function overloading (compile-time polymorphism)",
            "input": "add(2, 3), add(2.5, 3.5)",
            "output": "5, 6",
            "code": "#include <iostream>\nusing namespace std;\n\nint add(int a, int b) { return a + b; }\ndouble add(double a, double b) { return a + b; }\n\nint main()\n{\n    cout << add(2, 3) << endl;\n    cout << add(2.5, 3.5) << endl;\n    return 0;\n}"
          },
          {
            "name": "Constructor overloading",
            "input": "Box(), Box(5)",
            "output": "Side: 1, Side: 5",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Box\n{\n    int side;\n\npublic:\n    Box() : side(1) {}\n    Box(int s) : side(s) {}\n    void show() { cout << \"Side: \" << side << endl; }\n};\n\nint main()\n{\n    Box a, b(5);\n    a.show();\n    b.show();\n    return 0;\n}"
          },
          {
            "name": "Access specifiers (public/private/protected)",
            "input": "(none)",
            "output": "Protected member accessible from derived class: 5",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Base\n{\nprotected:\n    int protectedValue = 5;\n\nprivate:\n    int privateValue = 10; /* not accessible from Derived */\n};\n\nclass Derived : public Base\n{\npublic:\n    void show() { cout << \"Protected member accessible from derived class: \" << protectedValue << endl; }\n};\n\nint main()\n{\n    Derived d;\n    d.show();\n    return 0;\n}"
          },
          {
            "name": "Encapsulation using getters/setters",
            "input": "setBalance(100)",
            "output": "Balance: 100",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Account\n{\n    double balance = 0;\n\npublic:\n    void setBalance(double b) { balance = (b >= 0) ? b : 0; } /* validation kept internal */\n    double getBalance() const { return balance; }\n};\n\nint main()\n{\n    Account acc;\n    acc.setBalance(100);\n    cout << \"Balance: \" << acc.getBalance() << endl;\n    return 0;\n}"
          },
          {
            "name": "Abstraction using an abstract class as an interface",
            "input": "(none)",
            "output": "Printing via an abstract Printer interface",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Printer\n{\npublic:\n    virtual void print() = 0;\n    virtual ~Printer() {}\n};\n\nclass ConsolePrinter : public Printer\n{\npublic:\n    void print() override { cout << \"Printing via an abstract Printer interface\" << endl; }\n};\n\nint main()\n{\n    Printer *p = new ConsolePrinter();\n    p->print();\n    delete p;\n    return 0;\n}"
          },
          {
            "name": "Object composition (has-a relationship)",
            "input": "Car has-a Engine",
            "output": "Engine started, Car driving",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Engine\n{\npublic:\n    void start() { cout << \"Engine started\" << endl; }\n};\n\nclass Car\n{\n    Engine engine; /* composition: Car \"has-a\" Engine */\n\npublic:\n    void drive()\n    {\n        engine.start();\n        cout << \"Car driving\" << endl;\n    }\n};\n\nint main()\n{\n    Car car;\n    car.drive();\n    return 0;\n}"
          },
          {
            "name": "Object slicing problem",
            "input": "assigning a Derived object to a Base object (by value)",
            "output": "Base::show() called (derived part is \"sliced off\")",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Base\n{\npublic:\n    virtual void show() { cout << \"Base::show() called (derived part is \\\"sliced off\\\")\" << endl; }\n};\n\nclass Derived : public Base\n{\npublic:\n    void show() override { cout << \"Derived::show() called\" << endl; }\n};\n\nint main()\n{\n    Derived d;\n    Base b = d; /* slicing: only the Base part is copied */\n    b.show();   /* calls Base::show(), NOT Derived::show() */\n    return 0;\n}"
          },
          {
            "name": "Importance of a virtual destructor in polymorphic base classes",
            "input": "deleting a Derived object through a Base pointer",
            "output": "Derived destructor called, Base destructor called (both run correctly)",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Base\n{\npublic:\n    virtual ~Base() { cout << \"Base destructor called\" << endl; }\n};\n\nclass Derived : public Base\n{\npublic:\n    ~Derived() override { cout << \"Derived destructor called\" << endl; }\n};\n\nint main()\n{\n    Base *b = new Derived();\n    delete b; /* with a virtual destructor, both destructors run in the right order */\n    return 0;\n}"
          }
        ],
        "path": "CPP/oop_fundamentals.cpp"
      },
      {
        "chapter": "OPERATOR OVERLOADING AND TEMPLATES",
        "folder": "CPP",
        "programs": [
          {
            "name": "Overload the + operator for a Complex number class",
            "input": "(2+3i) + (4+5i)",
            "output": "6 + 8i",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Complex\n{\npublic:\n    double real, imag;\n    Complex(double r, double i) : real(r), imag(i) {}\n    Complex operator+(const Complex &other)\n    {\n        return Complex(real + other.real, imag + other.imag);\n    }\n    void show() { cout << real << \" + \" << imag << \"i\" << endl; }\n};\n\nint main()\n{\n    Complex a(2, 3), b(4, 5);\n    Complex c = a + b;\n    c.show();\n    return 0;\n}"
          },
          {
            "name": "Overload the - operator",
            "input": "(5+7i) - (2+3i)",
            "output": "3 + 4i",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Complex\n{\npublic:\n    double real, imag;\n    Complex(double r, double i) : real(r), imag(i) {}\n    Complex operator-(const Complex &other)\n    {\n        return Complex(real - other.real, imag - other.imag);\n    }\n    void show() { cout << real << \" + \" << imag << \"i\" << endl; }\n};\n\nint main()\n{\n    Complex a(5, 7), b(2, 3);\n    Complex c = a - b;\n    c.show();\n    return 0;\n}"
          },
          {
            "name": "Overload the == operator (comparison)",
            "input": "Point(1,2) == Point(1,2)",
            "output": "Points are equal",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Point\n{\n    int x, y;\n\npublic:\n    Point(int a, int b) : x(a), y(b) {}\n    bool operator==(const Point &other) { return x == other.x && y == other.y; }\n};\n\nint main()\n{\n    Point p1(1, 2), p2(1, 2);\n    cout << ((p1 == p2) ? \"Points are equal\" : \"Points differ\") << endl;\n    return 0;\n}"
          },
          {
            "name": "Overload the << operator for printing (as a friend function)",
            "input": "Point(3, 4)",
            "output": "(3, 4)",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Point\n{\n    int x, y;\n\npublic:\n    Point(int a, int b) : x(a), y(b) {}\n    friend ostream &operator<<(ostream &os, const Point &p);\n};\n\nostream &operator<<(ostream &os, const Point &p)\n{\n    os << \"(\" << p.x << \", \" << p.y << \")\";\n    return os;\n}\n\nint main()\n{\n    Point p(3, 4);\n    cout << p << endl;\n    return 0;\n}"
          },
          {
            "name": "Overload the >> operator for input",
            "input": "\"10 20\" typed by the user",
            "output": "Read point: (10, 20)",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Point\n{\npublic:\n    int x, y;\n    friend istream &operator>>(istream &is, Point &p);\n};\n\nistream &operator>>(istream &is, Point &p)\n{\n    is >> p.x >> p.y;\n    return is;\n}\n\nint main()\n{\n    Point p;\n    cin >> p;\n    cout << \"Read point: (\" << p.x << \", \" << p.y << \")\" << endl;\n    return 0;\n}"
          },
          {
            "name": "Overload the [] (subscript) operator for a custom array class",
            "input": "myArray[2] = 99",
            "output": "99",
            "code": "#include <iostream>\nusing namespace std;\n\nclass MyArray\n{\n    int data[10] = {0};\n\npublic:\n    int &operator[](int index) { return data[index]; }\n};\n\nint main()\n{\n    MyArray arr;\n    arr[2] = 99;\n    cout << arr[2] << endl;\n    return 0;\n}"
          },
          {
            "name": "Overload the () operator (functor)",
            "input": "Multiplier(3)(5)",
            "output": "15",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Multiplier\n{\n    int factor;\n\npublic:\n    Multiplier(int f) : factor(f) {}\n    int operator()(int value) { return value * factor; }\n};\n\nint main()\n{\n    Multiplier triple(3);\n    cout << triple(5) << endl;\n    return 0;\n}"
          },
          {
            "name": "Overload the prefix ++ operator",
            "input": "++counter starting at 5",
            "output": "6",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Counter\n{\n    int value;\n\npublic:\n    Counter(int v) : value(v) {}\n    Counter &operator++()\n    {\n        value++;\n        return *this;\n    }\n    int get() { return value; }\n};\n\nint main()\n{\n    Counter c(5);\n    ++c;\n    cout << c.get() << endl;\n    return 0;\n}"
          },
          {
            "name": "Overload the postfix ++ operator",
            "input": "counter++ starting at 5",
            "output": "Before: 5, After: 6",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Counter\n{\n    int value;\n\npublic:\n    Counter(int v) : value(v) {}\n    Counter operator++(int) /* dummy int marks it as postfix */\n    {\n        Counter old = *this;\n        value++;\n        return old;\n    }\n    int get() { return value; }\n};\n\nint main()\n{\n    Counter c(5);\n    Counter before = c++;\n    cout << \"Before: \" << before.get() << \", After: \" << c.get() << endl;\n    return 0;\n}"
          },
          {
            "name": "Overload the assignment (=) operator for a deep copy",
            "input": "assign one Buffer object to another",
            "output": "Deep copy successful, both buffers hold independent data",
            "code": "#include <iostream>\n#include <cstring>\nusing namespace std;\n\nclass Buffer\n{\n    char *data;\n\npublic:\n    Buffer(const char *text) { data = strdup(text); }\n    Buffer &operator=(const Buffer &other)\n    {\n        if (this != &other)\n        {\n            free(data);\n            data = strdup(other.data);\n        }\n        return *this;\n    }\n    ~Buffer() { free(data); }\n    const char *get() { return data; }\n};\n\nint main()\n{\n    Buffer a(\"original\");\n    Buffer b(\"temp\");\n    b = a; /* deep copy, not a shared pointer */\n    cout << \"Deep copy successful, both buffers hold independent data\" << endl;\n    return 0;\n}"
          },
          {
            "name": "Overload the + operator as a friend function",
            "input": "Vector2D(1,2) + Vector2D(3,4)",
            "output": "(4, 6)",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Vector2D\n{\npublic:\n    int x, y;\n    Vector2D(int a, int b) : x(a), y(b) {}\n    friend Vector2D operator+(const Vector2D &a, const Vector2D &b);\n};\n\nVector2D operator+(const Vector2D &a, const Vector2D &b)\n{\n    return Vector2D(a.x + b.x, a.y + b.y);\n}\n\nint main()\n{\n    Vector2D v1(1, 2), v2(3, 4);\n    Vector2D result = v1 + v2;\n    cout << \"(\" << result.x << \", \" << result.y << \")\" << endl;\n    return 0;\n}"
          },
          {
            "name": "Overload the -> operator (smart-pointer style)",
            "input": "wrapping a raw pointer",
            "output": "Accessing member through overloaded -> operator: 42",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Data\n{\npublic:\n    int value = 42;\n};\n\nclass Wrapper\n{\n    Data *ptr;\n\npublic:\n    Wrapper(Data *p) : ptr(p) {}\n    Data *operator->() { return ptr; }\n};\n\nint main()\n{\n    Data d;\n    Wrapper w(&d);\n    cout << \"Accessing member through overloaded -> operator: \" << w->value << endl;\n    return 0;\n}"
          },
          {
            "name": "Overload the * (dereference) operator",
            "input": "wrapping an int value",
            "output": "Dereferenced value: 100",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Box\n{\n    int value;\n\npublic:\n    Box(int v) : value(v) {}\n    int operator*() { return value; }\n};\n\nint main()\n{\n    Box b(100);\n    cout << \"Dereferenced value: \" << *b << endl;\n    return 0;\n}"
          },
          {
            "name": "Overload the < operator to sort custom objects",
            "input": "sort a list of Student objects by marks",
            "output": "Students sorted by marks ascending",
            "code": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nclass Student\n{\npublic:\n    string name;\n    int marks;\n    bool operator<(const Student &other) const { return marks < other.marks; }\n};\n\nint main()\n{\n    vector<Student> students = {{\"A\", 80}, {\"B\", 60}, {\"C\", 90}};\n    sort(students.begin(), students.end());\n\n    for (auto &s : students)\n        cout << s.name << \": \" << s.marks << endl;\n    return 0;\n}"
          },
          {
            "name": "Function template - generic max()",
            "input": "max(3, 7), max(2.5, 1.5)",
            "output": "7, 2.5",
            "code": "#include <iostream>\nusing namespace std;\n\ntemplate <typename T>\nT myMax(T a, T b)\n{\n    return (a > b) ? a : b;\n}\n\nint main()\n{\n    cout << myMax(3, 7) << endl;\n    cout << myMax(2.5, 1.5) << endl;\n    return 0;\n}"
          },
          {
            "name": "Function template - generic swap()",
            "input": "swap(5, 10)",
            "output": "a=10, b=5",
            "code": "#include <iostream>\nusing namespace std;\n\ntemplate <typename T>\nvoid mySwap(T &a, T &b)\n{\n    T temp = a;\n    a = b;\n    b = temp;\n}\n\nint main()\n{\n    int a = 5, b = 10;\n    mySwap(a, b);\n    cout << \"a=\" << a << \", b=\" << b << endl;\n    return 0;\n}"
          },
          {
            "name": "Class template - generic Stack<T>",
            "input": "push 1, 2, 3 then pop",
            "output": "Popped: 3",
            "code": "#include <iostream>\n#include <vector>\nusing namespace std;\n\ntemplate <typename T>\nclass Stack\n{\n    vector<T> data;\n\npublic:\n    void push(T value) { data.push_back(value); }\n    T pop()\n    {\n        T top = data.back();\n        data.pop_back();\n        return top;\n    }\n};\n\nint main()\n{\n    Stack<int> s;\n    s.push(1);\n    s.push(2);\n    s.push(3);\n    cout << \"Popped: \" << s.pop() << endl;\n    return 0;\n}"
          },
          {
            "name": "Class template - generic Pair<T1, T2>",
            "input": "Pair<string, int>(\"age\", 30)",
            "output": "age: 30",
            "code": "#include <iostream>\nusing namespace std;\n\ntemplate <typename T1, typename T2>\nclass Pair\n{\npublic:\n    T1 first;\n    T2 second;\n    Pair(T1 a, T2 b) : first(a), second(b) {}\n};\n\nint main()\n{\n    Pair<string, int> p(\"age\", 30);\n    cout << p.first << \": \" << p.second << endl;\n    return 0;\n}"
          },
          {
            "name": "Template with multiple type parameters and a return type",
            "input": "add<int, double>(3, 2.5)",
            "output": "5.5",
            "code": "#include <iostream>\nusing namespace std;\n\ntemplate <typename T1, typename T2>\nauto add(T1 a, T2 b) -> decltype(a + b)\n{\n    return a + b;\n}\n\nint main()\n{\n    cout << add(3, 2.5) << endl;\n    return 0;\n}"
          },
          {
            "name": "Template specialization",
            "input": "describe<int>(5), describe<const char*>(\"hi\")",
            "output": "Generic type, Specialized for strings: hi",
            "code": "#include <iostream>\nusing namespace std;\n\ntemplate <typename T>\nvoid describe(T value)\n{\n    cout << \"Generic type\" << endl;\n}\n\ntemplate <>\nvoid describe(const char *value)\n{\n    cout << \"Specialized for strings: \" << value << endl;\n}\n\nint main()\n{\n    describe(5);\n    describe(\"hi\");\n    return 0;\n}"
          },
          {
            "name": "Variadic templates (sum of N arguments)",
            "input": "sum(1, 2, 3, 4)",
            "output": "10",
            "code": "#include <iostream>\nusing namespace std;\n\ntemplate <typename T>\nT sum(T value)\n{\n    return value;\n}\n\ntemplate <typename T, typename... Args>\nT sum(T first, Args... rest)\n{\n    return first + sum(rest...);\n}\n\nint main()\n{\n    cout << sum(1, 2, 3, 4) << endl;\n    return 0;\n}"
          },
          {
            "name": "Template with a default template argument",
            "input": "Container<int> and Container<>",
            "output": "Uses default type when none is specified",
            "code": "#include <iostream>\nusing namespace std;\n\ntemplate <typename T = int>\nclass Container\n{\npublic:\n    T value;\n    Container(T v) : value(v) {}\n};\n\nint main()\n{\n    Container<> c(5); /* uses default template argument T = int */\n    cout << \"Uses default type when none is specified: \" << c.value << endl;\n    return 0;\n}"
          },
          {
            "name": "Template function overloading vs full specialization",
            "input": "process(5) matches the overload for int explicitly",
            "output": "Overload for int called: 5",
            "code": "#include <iostream>\nusing namespace std;\n\ntemplate <typename T>\nvoid process(T value)\n{\n    cout << \"Generic template called\" << endl;\n}\n\nvoid process(int value)\n{\n    cout << \"Overload for int called: \" << value << endl;\n}\n\nint main()\n{\n    process(5);   /* non-template overload preferred over template */\n    process(2.5); /* falls back to the template version */\n    return 0;\n}"
          },
          {
            "name": "Generic singly linked list using templates",
            "input": "push 1, 2, 3",
            "output": "3 2 1",
            "code": "#include <iostream>\nusing namespace std;\n\ntemplate <typename T>\nstruct Node\n{\n    T data;\n    Node *next;\n};\n\ntemplate <typename T>\nclass LinkedList\n{\n    Node<T> *head = nullptr;\n\npublic:\n    void pushFront(T value)\n    {\n        Node<T> *node = new Node<T>{value, head};\n        head = node;\n    }\n    void print()\n    {\n        for (Node<T> *cur = head; cur != nullptr; cur = cur->next)\n            cout << cur->data << \" \";\n        cout << endl;\n    }\n};\n\nint main()\n{\n    LinkedList<int> list;\n    list.pushFront(1);\n    list.pushFront(2);\n    list.pushFront(3);\n    list.print();\n    return 0;\n}"
          },
          {
            "name": "constexpr function template evaluated at compile time",
            "input": "square(5)",
            "output": "25",
            "code": "#include <iostream>\nusing namespace std;\n\ntemplate <typename T>\nconstexpr T square(T value)\n{\n    return value * value;\n}\n\nint main()\n{\n    constexpr int result = square(5); /* computed at compile time */\n    cout << result << endl;\n    return 0;\n}"
          },
          {
            "name": "SFINAE / std::enable_if simple demo",
            "input": "process(5) for integral types only",
            "output": "Processing an integral type: 5",
            "code": "#include <iostream>\n#include <type_traits>\nusing namespace std;\n\ntemplate <typename T>\ntypename enable_if<is_integral<T>::value, void>::type\nprocess(T value)\n{\n    cout << \"Processing an integral type: \" << value << endl;\n}\n\nint main()\n{\n    process(5); /* only compiles for integral types thanks to enable_if */\n    return 0;\n}"
          },
          {
            "name": "Template metaprogramming - factorial computed at compile time",
            "input": "Factorial<5>::value",
            "output": "120",
            "code": "#include <iostream>\nusing namespace std;\n\ntemplate <int N>\nstruct Factorial\n{\n    static const int value = N * Factorial<N - 1>::value;\n};\n\ntemplate <>\nstruct Factorial<0>\n{\n    static const int value = 1;\n};\n\nint main()\n{\n    cout << Factorial<5>::value << endl; /* computed entirely at compile time */\n    return 0;\n}"
          },
          {
            "name": "Overload the += (compound assignment) operator",
            "input": "Money(100) += Money(50)",
            "output": "150",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Money\n{\n    int amount;\n\npublic:\n    Money(int a) : amount(a) {}\n    Money &operator+=(const Money &other)\n    {\n        amount += other.amount;\n        return *this;\n    }\n    int get() { return amount; }\n};\n\nint main()\n{\n    Money wallet(100);\n    Money bonus(50);\n    wallet += bonus;\n    cout << wallet.get() << endl;\n    return 0;\n}"
          },
          {
            "name": "Overload the unary - operator (negation)",
            "input": "-Point(3, 4)",
            "output": "(-3, -4)",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Point\n{\npublic:\n    int x, y;\n    Point(int a, int b) : x(a), y(b) {}\n    Point operator-() const { return Point(-x, -y); }\n};\n\nint main()\n{\n    Point p(3, 4);\n    Point negated = -p;\n    cout << \"(\" << negated.x << \", \" << negated.y << \")\" << endl;\n    return 0;\n}"
          },
          {
            "name": "Overload new/delete operators for custom memory tracking",
            "input": "allocate and free one MyClass object",
            "output": "Custom new called, Custom delete called",
            "code": "#include <iostream>\nusing namespace std;\n\nclass MyClass\n{\npublic:\n    void *operator new(size_t size)\n    {\n        cout << \"Custom new called\" << endl;\n        return malloc(size);\n    }\n    void operator delete(void *ptr)\n    {\n        cout << \"Custom delete called\" << endl;\n        free(ptr);\n    }\n};\n\nint main()\n{\n    MyClass *obj = new MyClass();\n    delete obj;\n    return 0;\n}"
          }
        ],
        "path": "CPP/operator_templates.cpp"
      },
      {
        "chapter": "SMART POINTERS AND MEMORY MANAGEMENT",
        "folder": "CPP",
        "programs": [
          {
            "name": "unique_ptr basics",
            "input": "(none)",
            "output": "Value: 42",
            "code": "#include <iostream>\n#include <memory>\nusing namespace std;\n\nint main()\n{\n    unique_ptr<int> ptr(new int(42));\n    cout << \"Value: \" << *ptr << endl;\n    return 0;\n}"
          },
          {
            "name": "unique_ptr with a custom deleter",
            "input": "(none)",
            "output": "Custom deleter called",
            "code": "#include <iostream>\n#include <memory>\nusing namespace std;\n\nint main()\n{\n    auto deleter = [](int *p)\n    {\n        cout << \"Custom deleter called\" << endl;\n        delete p;\n    };\n\n    unique_ptr<int, decltype(deleter)> ptr(new int(10), deleter);\n    return 0;\n}"
          },
          {
            "name": "Moving a unique_ptr (transfer ownership)",
            "input": "(none)",
            "output": "ptr1 is now empty, ptr2 owns the value: 5",
            "code": "#include <iostream>\n#include <memory>\nusing namespace std;\n\nint main()\n{\n    unique_ptr<int> ptr1(new int(5));\n    unique_ptr<int> ptr2 = move(ptr1); /* ownership transferred */\n\n    cout << \"ptr1 is now \" << (ptr1 == nullptr ? \"empty\" : \"not empty\") << endl;\n    cout << \"ptr2 owns the value: \" << *ptr2 << endl;\n    return 0;\n}"
          },
          {
            "name": "shared_ptr basics",
            "input": "(none)",
            "output": "Value: 100",
            "code": "#include <iostream>\n#include <memory>\nusing namespace std;\n\nint main()\n{\n    shared_ptr<int> ptr(new int(100));\n    cout << \"Value: \" << *ptr << endl;\n    return 0;\n}"
          },
          {
            "name": "shared_ptr use_count() demo",
            "input": "two shared_ptr instances pointing to the same object",
            "output": "Use count: 2",
            "code": "#include <iostream>\n#include <memory>\nusing namespace std;\n\nint main()\n{\n    shared_ptr<int> a(new int(5));\n    shared_ptr<int> b = a;\n\n    cout << \"Use count: \" << a.use_count() << endl;\n    return 0;\n}"
          },
          {
            "name": "weak_ptr to break a circular reference",
            "input": "two objects referencing each other",
            "output": "Both objects destroyed correctly (no memory leak)",
            "code": "#include <iostream>\n#include <memory>\nusing namespace std;\n\nstruct B;\n\nstruct A\n{\n    shared_ptr<B> b;\n    ~A() { cout << \"A destroyed\" << endl; }\n};\n\nstruct B\n{\n    weak_ptr<A> a; /* weak_ptr avoids the reference cycle */\n    ~B() { cout << \"B destroyed\" << endl; }\n};\n\nint main()\n{\n    auto a = make_shared<A>();\n    auto b = make_shared<B>();\n    a->b = b;\n    b->a = a;\n\n    cout << \"Both objects destroyed correctly (no memory leak)\" << endl;\n    return 0;\n}"
          },
          {
            "name": "make_unique usage",
            "input": "(none)",
            "output": "25",
            "code": "#include <iostream>\n#include <memory>\nusing namespace std;\n\nint main()\n{\n    auto ptr = make_unique<int>(25); /* safer than \"new\" + unique_ptr constructor */\n    cout << *ptr << endl;\n    return 0;\n}"
          },
          {
            "name": "make_shared usage",
            "input": "(none)",
            "output": "50",
            "code": "#include <iostream>\n#include <memory>\nusing namespace std;\n\nint main()\n{\n    auto ptr = make_shared<int>(50); /* single allocation for object + control block */\n    cout << *ptr << endl;\n    return 0;\n}"
          },
          {
            "name": "shared_ptr with a custom deleter",
            "input": "(none)",
            "output": "Custom deleter for shared_ptr called",
            "code": "#include <iostream>\n#include <memory>\nusing namespace std;\n\nint main()\n{\n    shared_ptr<int> ptr(new int(1), [](int *p)\n                        {\n\t\tcout << \"Custom deleter for shared_ptr called\" << endl;\n\t\tdelete p; });\n    return 0;\n}"
          },
          {
            "name": "Smart pointer managing a dynamically allocated array",
            "input": "array of 5 ints",
            "output": "0 1 2 3 4",
            "code": "#include <iostream>\n#include <memory>\nusing namespace std;\n\nint main()\n{\n    unique_ptr<int[]> arr(new int[5]);\n\n    for (int i = 0; i < 5; i++)\n        arr[i] = i;\n\n    for (int i = 0; i < 5; i++)\n        cout << arr[i] << \" \";\n    cout << endl;\n    return 0;\n}"
          },
          {
            "name": "Raw pointer vs smart pointer comparison",
            "input": "(none)",
            "output": "Raw pointer requires manual delete; smart pointer cleans up automatically",
            "code": "#include <iostream>\n#include <memory>\nusing namespace std;\n\nint main()\n{\n    int *raw = new int(1);\n    delete raw; /* must remember to do this manually */\n\n    unique_ptr<int> smart(new int(1)); /* cleaned up automatically at scope end */\n\n    cout << \"Raw pointer requires manual delete; smart pointer cleans up automatically\" << endl;\n    return 0;\n}"
          },
          {
            "name": "new/delete basics",
            "input": "(none)",
            "output": "Value: 7",
            "code": "#include <iostream>\nusing namespace std;\n\nint main()\n{\n    int *ptr = new int(7);\n    cout << \"Value: \" << *ptr << endl;\n    delete ptr;\n    return 0;\n}"
          },
          {
            "name": "new[]/delete[] for dynamic arrays",
            "input": "array of 3 ints",
            "output": "10 20 30",
            "code": "#include <iostream>\nusing namespace std;\n\nint main()\n{\n    int *arr = new int[3]{10, 20, 30};\n\n    for (int i = 0; i < 3; i++)\n        cout << arr[i] << \" \";\n    cout << endl;\n\n    delete[] arr; /* must use delete[] for arrays, not delete */\n    return 0;\n}"
          },
          {
            "name": "Memory leak demonstration (missing delete)",
            "input": "allocate memory in a loop without freeing it",
            "output": "Leaked 1000 integers (no delete called - demonstration only)",
            "code": "#include <iostream>\nusing namespace std;\n\nint main()\n{\n    for (int i = 0; i < 1000; i++)\n        new int(i); /* leaked: no matching delete, avoid this in real code */\n\n    cout << \"Leaked 1000 integers (no delete called - demonstration only)\" << endl;\n    return 0;\n}"
          },
          {
            "name": "Dangling pointer demonstration",
            "input": "use a pointer after the memory it points to is freed",
            "output": "Pointer set to nullptr immediately after delete to avoid dangling use",
            "code": "#include <iostream>\nusing namespace std;\n\nint main()\n{\n    int *ptr = new int(5);\n    delete ptr;\n    ptr = nullptr; /* best practice: avoid a dangling pointer */\n\n    cout << \"Pointer set to nullptr immediately after delete to avoid dangling use\" << endl;\n    return 0;\n}"
          },
          {
            "name": "RAII pattern with a custom resource-managing class",
            "input": "(none)",
            "output": "File-like resource opened, File-like resource closed automatically",
            "code": "#include <iostream>\nusing namespace std;\n\nclass FileHandle\n{\npublic:\n    FileHandle() { cout << \"File-like resource opened\" << endl; }\n    ~FileHandle() { cout << \"File-like resource closed automatically\" << endl; }\n};\n\nint main()\n{\n    FileHandle f; /* resource released deterministically when f goes out of scope */\n    return 0;\n}"
          },
          {
            "name": "Rule of Three - copy constructor, copy assignment, destructor",
            "input": "class managing a raw resource",
            "output": "Deep copy created independently of the original",
            "code": "#include <iostream>\n#include <cstring>\nusing namespace std;\n\nclass Buffer\n{\n    char *data;\n\npublic:\n    Buffer(const char *text) { data = strdup(text); }\n    Buffer(const Buffer &other) { data = strdup(other.data); } /* copy constructor */\n    Buffer &operator=(const Buffer &other)                     /* copy assignment */\n    {\n        if (this != &other)\n        {\n            free(data);\n            data = strdup(other.data);\n        }\n        return *this;\n    }\n    ~Buffer() { free(data); } /* destructor */\n};\n\nint main()\n{\n    Buffer a(\"hello\");\n    Buffer b = a; /* uses copy constructor */\n    cout << \"Deep copy created independently of the original\" << endl;\n    return 0;\n}"
          },
          {
            "name": "Rule of Five - adds move constructor and move assignment",
            "input": "class managing a raw resource, moved instead of copied",
            "output": "Resource moved without an extra deep copy",
            "code": "#include <iostream>\n#include <cstring>\nusing namespace std;\n\nclass Buffer\n{\n    char *data;\n\npublic:\n    Buffer(const char *text) { data = strdup(text); }\n    Buffer(const Buffer &other) { data = strdup(other.data); }\n    Buffer(Buffer &&other) noexcept : data(other.data) { other.data = nullptr; } /* move ctor */\n    Buffer &operator=(Buffer &&other) noexcept                                   /* move assignment */\n    {\n        if (this != &other)\n        {\n            free(data);\n            data = other.data;\n            other.data = nullptr;\n        }\n        return *this;\n    }\n    ~Buffer() { free(data); }\n};\n\nint main()\n{\n    Buffer a(\"hello\");\n    Buffer b = move(a); /* uses move constructor, no deep copy */\n    cout << \"Resource moved without an extra deep copy\" << endl;\n    return 0;\n}"
          },
          {
            "name": "Move semantics using std::move",
            "input": "move a std::string instead of copying it",
            "output": "source is now empty, destination holds: Hello World",
            "code": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main()\n{\n    string source = \"Hello World\";\n    string destination = move(source); /* avoids copying the string's buffer */\n\n    cout << \"source is now \" << (source.empty() ? \"empty\" : \"not empty\") << endl;\n    cout << \"destination holds: \" << destination << endl;\n    return 0;\n}"
          },
          {
            "name": "std::swap combined with move semantics",
            "input": "swap two vectors",
            "output": "Vectors swapped without copying their elements",
            "code": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main()\n{\n    vector<int> a = {1, 2, 3};\n    vector<int> b = {4, 5, 6};\n\n    swap(a, b); /* internally uses move semantics, no element-by-element copy */\n    cout << \"Vectors swapped without copying their elements\" << endl;\n    return 0;\n}"
          },
          {
            "name": "Simplified custom unique_ptr implementation",
            "input": "(none)",
            "output": "Value: 15, then automatically deleted at scope end",
            "code": "#include <iostream>\nusing namespace std;\n\ntemplate <typename T>\nclass SimpleUniquePtr\n{\n    T *ptr;\n\npublic:\n    explicit SimpleUniquePtr(T *p) : ptr(p) {}\n    ~SimpleUniquePtr() { delete ptr; }\n    T &operator*() { return *ptr; }\n    SimpleUniquePtr(const SimpleUniquePtr &) = delete; /* non-copyable, like std::unique_ptr */\n};\n\nint main()\n{\n    SimpleUniquePtr<int> ptr(new int(15));\n    cout << \"Value: \" << *ptr << \", then automatically deleted at scope end\" << endl;\n    return 0;\n}"
          },
          {
            "name": "shared_ptr circular reference problem (memory leak without weak_ptr)",
            "input": "two shared_ptrs referencing each other",
            "output": "Circular shared_ptr reference would leak memory (fixed by using weak_ptr)",
            "code": "#include <iostream>\n#include <memory>\nusing namespace std;\n\nstruct Node\n{\n    shared_ptr<Node> next; /* if both nodes point to each other, neither's count reaches 0 */\n    ~Node() { cout << \"Node destroyed\" << endl; }\n};\n\nint main()\n{\n    cout << \"Circular shared_ptr reference would leak memory (fixed by using weak_ptr)\" << endl;\n    return 0;\n}"
          },
          {
            "name": "weak_ptr::lock() usage",
            "input": "check if the managed object still exists",
            "output": "Object still alive: 7, Object has been destroyed",
            "code": "#include <iostream>\n#include <memory>\nusing namespace std;\n\nint main()\n{\n    weak_ptr<int> weak;\n    {\n        shared_ptr<int> shared = make_shared<int>(7);\n        weak = shared;\n\n        if (auto locked = weak.lock())\n            cout << \"Object still alive: \" << *locked << endl;\n    }\n\n    if (weak.expired())\n        cout << \"Object has been destroyed\" << endl;\n\n    return 0;\n}"
          },
          {
            "name": "Smart pointers stored in a container (vector of unique_ptr)",
            "input": "3 dynamically allocated ints",
            "output": "1 2 3",
            "code": "#include <iostream>\n#include <vector>\n#include <memory>\nusing namespace std;\n\nint main()\n{\n    vector<unique_ptr<int>> values;\n    values.push_back(make_unique<int>(1));\n    values.push_back(make_unique<int>(2));\n    values.push_back(make_unique<int>(3));\n\n    for (auto &v : values)\n        cout << *v << \" \";\n    cout << endl;\n    return 0;\n}"
          },
          {
            "name": "Passing a unique_ptr to a function (by value = move)",
            "input": "transfer ownership into a function",
            "output": "Function now owns the value: 99",
            "code": "#include <iostream>\n#include <memory>\nusing namespace std;\n\nvoid takeOwnership(unique_ptr<int> ptr)\n{\n    cout << \"Function now owns the value: \" << *ptr << endl;\n}\n\nint main()\n{\n    unique_ptr<int> ptr = make_unique<int>(99);\n    takeOwnership(move(ptr)); /* must explicitly move; unique_ptr can't be copied */\n    return 0;\n}"
          },
          {
            "name": "Returning a unique_ptr from a function",
            "input": "factory function creating a new object",
            "output": "Created value: 33",
            "code": "#include <iostream>\n#include <memory>\nusing namespace std;\n\nunique_ptr<int> createValue()\n{\n    return make_unique<int>(33); /* implicitly moved out via NRVO/move semantics */\n}\n\nint main()\n{\n    unique_ptr<int> ptr = createValue();\n    cout << \"Created value: \" << *ptr << endl;\n    return 0;\n}"
          },
          {
            "name": "enable_shared_from_this usage",
            "input": "an object that needs to hand out a shared_ptr to itself",
            "output": "Retrieved a valid shared_ptr to self",
            "code": "#include <iostream>\n#include <memory>\nusing namespace std;\n\nclass Widget : public enable_shared_from_this<Widget>\n{\npublic:\n    shared_ptr<Widget> getSelf() { return shared_from_this(); }\n};\n\nint main()\n{\n    auto widget = make_shared<Widget>();\n    auto self = widget->getSelf();\n\n    cout << (self != nullptr ? \"Retrieved a valid shared_ptr to self\" : \"Failed\") << endl;\n    return 0;\n}"
          },
          {
            "name": "Placement new",
            "input": "constructing an object in pre-allocated memory",
            "output": "Object constructed in place with value: 21",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Point\n{\npublic:\n    int x;\n    Point(int v) : x(v) {}\n};\n\nint main()\n{\n    alignas(Point) char buffer[sizeof(Point)];\n    Point *p = new (buffer) Point(21); /* construct directly into \"buffer\" */\n\n    cout << \"Object constructed in place with value: \" << p->x << endl;\n    p->~Point(); /* must manually call the destructor for placement new */\n    return 0;\n}"
          },
          {
            "name": "Custom allocator concept demo",
            "input": "a minimal allocator that logs allocations",
            "output": "Allocating 4 bytes, Custom allocator used successfully",
            "code": "#include <iostream>\n#include <vector>\nusing namespace std;\n\ntemplate <typename T>\nstruct LoggingAllocator\n{\n    using value_type = T;\n    LoggingAllocator() = default;\n\n    T *allocate(size_t n)\n    {\n        cout << \"Allocating \" << n * sizeof(T) << \" bytes\" << endl;\n        return static_cast<T *>(::operator new(n * sizeof(T)));\n    }\n    void deallocate(T *p, size_t) { ::operator delete(p); }\n};\n\nint main()\n{\n    vector<int, LoggingAllocator<int>> v;\n    v.push_back(1);\n    cout << \"Custom allocator used successfully\" << endl;\n    return 0;\n}"
          },
          {
            "name": "Comparing manual memory management vs smart pointers",
            "input": "same task done with new/delete, then with unique_ptr",
            "output": "Manual: value=1 (must remember delete); Smart: value=1 (auto-cleaned)",
            "code": "#include <iostream>\n#include <memory>\nusing namespace std;\n\nint main()\n{\n    int *manual = new int(1);\n    cout << \"Manual: value=\" << *manual << \" (must remember delete)\" << endl;\n    delete manual;\n\n    unique_ptr<int> smart = make_unique<int>(1);\n    cout << \"Smart: value=\" << *smart << \" (auto-cleaned)\" << endl;\n    return 0;\n}"
          }
        ],
        "path": "CPP/smart_pointers_memory.cpp"
      },
      {
        "chapter": "STL CONTAINERS",
        "folder": "CPP",
        "programs": [
          {
            "name": "std::vector basics - push_back and iterate",
            "input": "10, 20, 30",
            "output": "10 20 30",
            "code": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main()\n{\n    vector<int> v;\n    v.push_back(10);\n    v.push_back(20);\n    v.push_back(30);\n\n    for (int x : v)\n        cout << x << \" \";\n    cout << endl;\n    return 0;\n}"
          },
          {
            "name": "std::vector - insert and erase",
            "input": "{10, 20, 30}, insert 15 at index 1, erase index 2",
            "output": "10 15 30",
            "code": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main()\n{\n    vector<int> v = {10, 20, 30};\n    v.insert(v.begin() + 1, 15);\n    v.erase(v.begin() + 2);\n\n    for (int x : v)\n        cout << x << \" \";\n    cout << endl;\n    return 0;\n}"
          },
          {
            "name": "std::vector - sort using std::sort",
            "input": "{5, 2, 8, 1}",
            "output": "1 2 5 8",
            "code": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main()\n{\n    vector<int> v = {5, 2, 8, 1};\n    sort(v.begin(), v.end());\n\n    for (int x : v)\n        cout << x << \" \";\n    cout << endl;\n    return 0;\n}"
          },
          {
            "name": "std::list basics (doubly linked list container)",
            "input": "push_back 1, 2, push_front 0",
            "output": "0 1 2",
            "code": "#include <iostream>\n#include <list>\nusing namespace std;\n\nint main()\n{\n    list<int> l;\n    l.push_back(1);\n    l.push_back(2);\n    l.push_front(0);\n\n    for (int x : l)\n        cout << x << \" \";\n    cout << endl;\n    return 0;\n}"
          },
          {
            "name": "std::deque basics (double-ended queue)",
            "input": "push_back 2, push_front 1",
            "output": "1 2",
            "code": "#include <iostream>\n#include <deque>\nusing namespace std;\n\nint main()\n{\n    deque<int> dq;\n    dq.push_back(2);\n    dq.push_front(1);\n\n    for (int x : dq)\n        cout << x << \" \";\n    cout << endl;\n    return 0;\n}"
          },
          {
            "name": "std::set basics (unique sorted elements)",
            "input": "insert 5, 3, 5, 1",
            "output": "1 3 5",
            "code": "#include <iostream>\n#include <set>\nusing namespace std;\n\nint main()\n{\n    set<int> s = {5, 3, 5, 1};\n\n    for (int x : s)\n        cout << x << \" \";\n    cout << endl;\n    return 0;\n}"
          },
          {
            "name": "std::multiset basics (allows duplicate elements, kept sorted)",
            "input": "insert 5, 3, 5, 1",
            "output": "1 3 5 5",
            "code": "#include <iostream>\n#include <set>\nusing namespace std;\n\nint main()\n{\n    multiset<int> ms = {5, 3, 5, 1};\n\n    for (int x : ms)\n        cout << x << \" \";\n    cout << endl;\n    return 0;\n}"
          },
          {
            "name": "std::map basics (sorted key-value pairs)",
            "input": "{\"b\":2, \"a\":1}",
            "output": "a: 1, b: 2",
            "code": "#include <iostream>\n#include <map>\nusing namespace std;\n\nint main()\n{\n    map<string, int> m;\n    m[\"b\"] = 2;\n    m[\"a\"] = 1;\n\n    for (auto &[key, value] : m) /* iterates in sorted key order */\n        cout << key << \": \" << value << endl;\n    return 0;\n}"
          },
          {
            "name": "std::multimap basics (multiple values per key)",
            "input": "insert two values under key \"fruit\"",
            "output": "fruit: apple, fruit: banana",
            "code": "#include <iostream>\n#include <map>\nusing namespace std;\n\nint main()\n{\n    multimap<string, string> mm;\n    mm.insert({\"fruit\", \"apple\"});\n    mm.insert({\"fruit\", \"banana\"});\n\n    for (auto &[key, value] : mm)\n        cout << key << \": \" << value << endl;\n    return 0;\n}"
          },
          {
            "name": "std::unordered_map basics (hash map, no ordering guarantee)",
            "input": "{\"x\":1, \"y\":2}",
            "output": "Lookup \"x\": 1",
            "code": "#include <iostream>\n#include <unordered_map>\nusing namespace std;\n\nint main()\n{\n    unordered_map<string, int> um = {{\"x\", 1}, {\"y\", 2}};\n    cout << \"Lookup \\\"x\\\": \" << um[\"x\"] << endl;\n    return 0;\n}"
          },
          {
            "name": "std::unordered_set basics (hash set, no ordering guarantee)",
            "input": "insert 1, 2, 2, 3",
            "output": "Set contains 3 unique elements",
            "code": "#include <iostream>\n#include <unordered_set>\nusing namespace std;\n\nint main()\n{\n    unordered_set<int> us = {1, 2, 2, 3};\n    cout << \"Set contains \" << us.size() << \" unique elements\" << endl;\n    return 0;\n}"
          },
          {
            "name": "std::stack basics (LIFO)",
            "input": "push 1, 2, 3",
            "output": "3 2 1",
            "code": "#include <iostream>\n#include <stack>\nusing namespace std;\n\nint main()\n{\n    stack<int> st;\n    st.push(1);\n    st.push(2);\n    st.push(3);\n\n    while (!st.empty())\n    {\n        cout << st.top() << \" \";\n        st.pop();\n    }\n    cout << endl;\n    return 0;\n}"
          },
          {
            "name": "std::queue basics (FIFO)",
            "input": "push 1, 2, 3",
            "output": "1 2 3",
            "code": "#include <iostream>\n#include <queue>\nusing namespace std;\n\nint main()\n{\n    queue<int> q;\n    q.push(1);\n    q.push(2);\n    q.push(3);\n\n    while (!q.empty())\n    {\n        cout << q.front() << \" \";\n        q.pop();\n    }\n    cout << endl;\n    return 0;\n}"
          },
          {
            "name": "std::priority_queue basics (max-heap by default)",
            "input": "push 3, 1, 4, 1, 5",
            "output": "5 4 3 1 1",
            "code": "#include <iostream>\n#include <queue>\nusing namespace std;\n\nint main()\n{\n    priority_queue<int> pq;\n    for (int x : {3, 1, 4, 1, 5})\n        pq.push(x);\n\n    while (!pq.empty())\n    {\n        cout << pq.top() << \" \";\n        pq.pop();\n    }\n    cout << endl;\n    return 0;\n}"
          },
          {
            "name": "std::pair basics",
            "input": "make_pair(\"age\", 30)",
            "output": "age: 30",
            "code": "#include <iostream>\nusing namespace std;\n\nint main()\n{\n    pair<string, int> p = make_pair(\"age\", 30);\n    cout << p.first << \": \" << p.second << endl;\n    return 0;\n}"
          },
          {
            "name": "std::tuple basics",
            "input": "make_tuple(\"Alice\", 30, 5.6)",
            "output": "Alice, 30, 5.6",
            "code": "#include <iostream>\n#include <tuple>\nusing namespace std;\n\nint main()\n{\n    auto person = make_tuple(\"Alice\", 30, 5.6);\n    cout << get<0>(person) << \", \" << get<1>(person) << \", \" << get<2>(person) << endl;\n    return 0;\n}"
          },
          {
            "name": "Iterators - begin/end traversal",
            "input": "{1, 2, 3}",
            "output": "1 2 3",
            "code": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main()\n{\n    vector<int> v = {1, 2, 3};\n\n    for (auto it = v.begin(); it != v.end(); ++it)\n        cout << *it << \" \";\n    cout << endl;\n    return 0;\n}"
          },
          {
            "name": "std::find algorithm",
            "input": "search for 30 in {10, 20, 30, 40}",
            "output": "Found 30 in the vector",
            "code": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main()\n{\n    vector<int> v = {10, 20, 30, 40};\n    auto it = find(v.begin(), v.end(), 30);\n\n    if (it != v.end())\n        cout << \"Found \" << *it << \" in the vector\" << endl;\n    return 0;\n}"
          },
          {
            "name": "std::accumulate algorithm",
            "input": "{1, 2, 3, 4, 5}",
            "output": "Sum: 15",
            "code": "#include <iostream>\n#include <vector>\n#include <numeric>\nusing namespace std;\n\nint main()\n{\n    vector<int> v = {1, 2, 3, 4, 5};\n    int sum = accumulate(v.begin(), v.end(), 0);\n    cout << \"Sum: \" << sum << endl;\n    return 0;\n}"
          },
          {
            "name": "std::transform algorithm",
            "input": "{1, 2, 3} doubled",
            "output": "2 4 6",
            "code": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main()\n{\n    vector<int> v = {1, 2, 3};\n    vector<int> result(v.size());\n\n    transform(v.begin(), v.end(), result.begin(), [](int x)\n              { return x * 2; });\n\n    for (int x : result)\n        cout << x << \" \";\n    cout << endl;\n    return 0;\n}"
          },
          {
            "name": "std::for_each algorithm with a lambda",
            "input": "{1, 2, 3}",
            "output": "1 2 3",
            "code": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main()\n{\n    vector<int> v = {1, 2, 3};\n    for_each(v.begin(), v.end(), [](int x)\n             { cout << x << \" \"; });\n    cout << endl;\n    return 0;\n}"
          },
          {
            "name": "std::count_if with a lambda predicate",
            "input": "count even numbers in {1, 2, 3, 4, 5, 6}",
            "output": "Even count: 3",
            "code": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main()\n{\n    vector<int> v = {1, 2, 3, 4, 5, 6};\n    int evenCount = count_if(v.begin(), v.end(), [](int x)\n                             { return x % 2 == 0; });\n    cout << \"Even count: \" << evenCount << endl;\n    return 0;\n}"
          },
          {
            "name": "std::sort with a custom comparator (descending order)",
            "input": "{5, 2, 8, 1}",
            "output": "8 5 2 1",
            "code": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main()\n{\n    vector<int> v = {5, 2, 8, 1};\n    sort(v.begin(), v.end(), greater<int>());\n\n    for (int x : v)\n        cout << x << \" \";\n    cout << endl;\n    return 0;\n}"
          },
          {
            "name": "Sort a vector of custom objects by a field",
            "input": "Employees sorted by salary",
            "output": "Employees printed in ascending salary order",
            "code": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nstruct Employee\n{\n    string name;\n    int salary;\n};\n\nint main()\n{\n    vector<Employee> employees = {{\"A\", 5000}, {\"B\", 3000}, {\"C\", 7000}};\n\n    sort(employees.begin(), employees.end(), [](const Employee &a, const Employee &b)\n         { return a.salary < b.salary; });\n\n    for (auto &e : employees)\n        cout << e.name << \": \" << e.salary << endl;\n    return 0;\n}"
          },
          {
            "name": "std::map iteration and modification",
            "input": "increment every value in a map by 10",
            "output": "a: 11, b: 22",
            "code": "#include <iostream>\n#include <map>\nusing namespace std;\n\nint main()\n{\n    map<string, int> m = {{\"a\", 1}, {\"b\", 12}};\n\n    for (auto &[key, value] : m)\n        value += 10;\n\n    for (auto &[key, value] : m)\n        cout << key << \": \" << value << endl;\n    return 0;\n}"
          },
          {
            "name": "std::array (fixed-size container)",
            "input": "{1, 2, 3}",
            "output": "Size: 3, Sum: 6",
            "code": "#include <iostream>\n#include <array>\n#include <numeric>\nusing namespace std;\n\nint main()\n{\n    array<int, 3> arr = {1, 2, 3};\n    cout << \"Size: \" << arr.size() << \", Sum: \" << accumulate(arr.begin(), arr.end(), 0) << endl;\n    return 0;\n}"
          },
          {
            "name": "Range-based for loop over containers",
            "input": "{10, 20, 30}",
            "output": "10 20 30",
            "code": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main()\n{\n    vector<int> v = {10, 20, 30};\n\n    for (const auto &x : v)\n        cout << x << \" \";\n    cout << endl;\n    return 0;\n}"
          },
          {
            "name": "std::string as a container (common operations)",
            "input": "\"Hello\"",
            "output": "Length: 5, Uppercase: HELLO",
            "code": "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main()\n{\n    string s = \"Hello\";\n    cout << \"Length: \" << s.length() << endl;\n\n    transform(s.begin(), s.end(), s.begin(), ::toupper);\n    cout << \"Uppercase: \" << s << endl;\n    return 0;\n}"
          },
          {
            "name": "std::bitset basics",
            "input": "bitset<8> representing the number 5",
            "output": "00000101",
            "code": "#include <iostream>\n#include <bitset>\nusing namespace std;\n\nint main()\n{\n    bitset<8> bits(5);\n    cout << bits << endl;\n    return 0;\n}"
          },
          {
            "name": "Combining STL algorithms - remove_if + erase idiom",
            "input": "{1, 2, 3, 4, 5, 6}, remove even numbers",
            "output": "1 3 5",
            "code": "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main()\n{\n    vector<int> v = {1, 2, 3, 4, 5, 6};\n\n    v.erase(remove_if(v.begin(), v.end(), [](int x)\n                      { return x % 2 == 0; }),\n            v.end());\n\n    for (int x : v)\n        cout << x << \" \";\n    cout << endl;\n    return 0;\n}"
          }
        ],
        "path": "CPP/stl_containers.cpp"
      },
      {
        "chapter": "TYPE CASTING AND RTTI",
        "folder": "CPP",
        "programs": [
          {
            "name": "C-style cast basics",
            "input": "(int)3.9",
            "output": "3",
            "code": "#include <iostream>\nusing namespace std;\n\nint main()\n{\n    double value = 3.9;\n    int result = (int)value; /* old-style cast: works but hides intent/safety */\n    cout << result << endl;\n    return 0;\n}"
          },
          {
            "name": "static_cast for numeric conversion",
            "input": "static_cast<int>(3.9)",
            "output": "3",
            "code": "#include <iostream>\nusing namespace std;\n\nint main()\n{\n    double value = 3.9;\n    int result = static_cast<int>(value); /* checked at compile time, clearer intent */\n    cout << result << endl;\n    return 0;\n}"
          },
          {
            "name": "static_cast for pointer upcast (derived to base)",
            "input": "Dog* upcast to Animal*",
            "output": "Upcast succeeded, calling through base pointer",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Animal\n{\npublic:\n    virtual ~Animal() {}\n};\n\nclass Dog : public Animal\n{\n};\n\nint main()\n{\n    Dog dog;\n    Animal *animal = static_cast<Animal *>(&dog); /* always safe: derived -> base */\n    cout << \"Upcast succeeded, calling through base pointer\" << endl;\n    return 0;\n}"
          },
          {
            "name": "static_cast for pointer downcast (base to derived, unchecked)",
            "input": "Animal* known to actually point to a Dog",
            "output": "Downcast performed (no runtime check - programmer must be certain)",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Animal\n{\npublic:\n    virtual ~Animal() {}\n};\n\nclass Dog : public Animal\n{\npublic:\n    void bark() { cout << \"Downcast performed (no runtime check - programmer must be certain)\" << endl; }\n};\n\nint main()\n{\n    Animal *animal = new Dog();\n    Dog *dog = static_cast<Dog *>(animal); /* no runtime type check, unlike dynamic_cast */\n    dog->bark();\n    delete animal;\n    return 0;\n}"
          },
          {
            "name": "dynamic_cast for safe downcasting with polymorphic classes",
            "input": "Animal* actually pointing to a Dog",
            "output": "Downcast succeeded: Woof!",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Animal\n{\npublic:\n    virtual ~Animal() {}\n};\n\nclass Dog : public Animal\n{\npublic:\n    void bark() { cout << \"Downcast succeeded: Woof!\" << endl; }\n};\n\nint main()\n{\n    Animal *animal = new Dog();\n    Dog *dog = dynamic_cast<Dog *>(animal); /* checked at runtime via RTTI */\n\n    if (dog != nullptr)\n        dog->bark();\n\n    delete animal;\n    return 0;\n}"
          },
          {
            "name": "dynamic_cast returning nullptr on a failed pointer cast",
            "input": "Animal* actually pointing to a Cat, cast attempted to Dog*",
            "output": "Cast failed: pointer is not actually a Dog",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Animal\n{\npublic:\n    virtual ~Animal() {}\n};\n\nclass Dog : public Animal\n{\n};\n\nclass Cat : public Animal\n{\n};\n\nint main()\n{\n    Animal *animal = new Cat();\n    Dog *dog = dynamic_cast<Dog *>(animal);\n\n    if (dog == nullptr)\n        cout << \"Cast failed: pointer is not actually a Dog\" << endl;\n\n    delete animal;\n    return 0;\n}"
          },
          {
            "name": "dynamic_cast with references throwing std::bad_cast on failure",
            "input": "Animal& actually referring to a Cat, cast attempted to Dog&",
            "output": "Caught std::bad_cast: reference cast failed",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Animal\n{\npublic:\n    virtual ~Animal() {}\n};\n\nclass Dog : public Animal\n{\n};\n\nclass Cat : public Animal\n{\n};\n\nint main()\n{\n    Cat cat;\n    Animal &animalRef = cat;\n\n    try\n    {\n        Dog &dogRef = dynamic_cast<Dog &>(animalRef); /* throws bad_cast, unlike the pointer form */\n        (void)dogRef;\n    }\n    catch (const bad_cast &)\n    {\n        cout << \"Caught std::bad_cast: reference cast failed\" << endl;\n    }\n    return 0;\n}"
          },
          {
            "name": "const_cast to remove constness",
            "input": "a const int reference passed to a legacy non-const function",
            "output": "Value after modification through const_cast: 20",
            "code": "#include <iostream>\nusing namespace std;\n\nvoid legacyModify(int &value) { value = 20; }\n\nint main()\n{\n    const int value = 10;\n    legacyModify(const_cast<int &>(value)); /* removes const so legacy API compiles */\n    cout << \"Value after modification through const_cast: \" << value << endl;\n    return 0;\n}"
          },
          {
            "name": "const_cast to add constness",
            "input": "a non-const pointer treated as const",
            "output": "Value seen through const pointer: 5",
            "code": "#include <iostream>\nusing namespace std;\n\nint main()\n{\n    int value = 5;\n    int *ptr = &value;\n    const int *constPtr = const_cast<const int *>(ptr); /* adding const is always safe */\n\n    cout << \"Value seen through const pointer: \" << *constPtr << endl;\n    return 0;\n}"
          },
          {
            "name": "reinterpret_cast between unrelated pointer types",
            "input": "int* reinterpreted as char*",
            "output": "First byte of the int, viewed as a raw char",
            "code": "#include <iostream>\nusing namespace std;\n\nint main()\n{\n    int value = 65; /* 'A' in ASCII, on a little-endian system */\n    char *bytePtr = reinterpret_cast<char *>(&value);\n\n    cout << \"First byte of the int, viewed as a raw char: \" << bytePtr[0] << endl;\n    return 0;\n}"
          },
          {
            "name": "reinterpret_cast between a pointer and an integer",
            "input": "convert a pointer to its numeric address and back",
            "output": "Round-tripped pointer matches the original",
            "code": "#include <iostream>\nusing namespace std;\n\nint main()\n{\n    int value = 42;\n    int *ptr = &value;\n\n    uintptr_t address = reinterpret_cast<uintptr_t>(ptr);\n    int *restoredPtr = reinterpret_cast<int *>(address);\n\n    cout << ((restoredPtr == ptr) ? \"Round-tripped pointer matches the original\" : \"Mismatch\") << endl;\n    return 0;\n}"
          },
          {
            "name": "typeid operator basics",
            "input": "typeid(int), typeid of a class instance",
            "output": "Type name printed for both a primitive and a class instance",
            "code": "#include <iostream>\n#include <typeinfo>\nusing namespace std;\n\nclass Widget\n{\n};\n\nint main()\n{\n    int number = 5;\n    Widget widget;\n\n    cout << \"int type: \" << typeid(number).name() << endl;\n    cout << \"Widget type: \" << typeid(widget).name() << endl;\n    return 0;\n}"
          },
          {
            "name": "Comparing types using typeid",
            "input": "compare typeid of two different objects",
            "output": "Types are different",
            "code": "#include <iostream>\n#include <typeinfo>\nusing namespace std;\n\nclass Dog\n{\n};\nclass Cat\n{\n};\n\nint main()\n{\n    Dog dog;\n    Cat cat;\n\n    cout << ((typeid(dog) == typeid(cat)) ? \"Types are the same\" : \"Types are different\") << endl;\n    return 0;\n}"
          },
          {
            "name": "RTTI: combining dynamic_cast and typeid to identify runtime type",
            "input": "Animal* pointing to a Dog",
            "output": "Runtime type identified as a Dog via typeid, confirmed by dynamic_cast",
            "code": "#include <iostream>\n#include <typeinfo>\nusing namespace std;\n\nclass Animal\n{\npublic:\n    virtual ~Animal() {}\n};\n\nclass Dog : public Animal\n{\n};\n\nint main()\n{\n    Animal *animal = new Dog();\n\n    if (typeid(*animal) == typeid(Dog))\n        cout << \"Runtime type identified as a Dog via typeid, confirmed by dynamic_cast\" << endl;\n\n    delete animal;\n    return 0;\n}"
          },
          {
            "name": "static_cast vs dynamic_cast - safety and cost comparison",
            "input": "(none)",
            "output": "static_cast has zero runtime cost but no safety check; dynamic_cast checks at runtime",
            "code": "#include <iostream>\nusing namespace std;\n\nint main()\n{\n    /* static_cast: resolved entirely at compile time, no RTTI lookup, but\n     * an incorrect downcast is undefined behavior if the assumption is wrong.\n     * dynamic_cast: performs a runtime check using RTTI, safely returning\n     * nullptr (or throwing for references) on failure, at some runtime cost. */\n    cout << \"static_cast has zero runtime cost but no safety check; dynamic_cast checks at runtime\" << endl;\n    return 0;\n}"
          },
          {
            "name": "static_cast between an enum and an int",
            "input": "Color::Green cast to int and back",
            "output": "1, Green",
            "code": "#include <iostream>\nusing namespace std;\n\nenum class Color\n{\n    Red,\n    Green,\n    Blue\n};\n\nint main()\n{\n    Color c = Color::Green;\n    int value = static_cast<int>(c);\n    cout << value << endl;\n\n    Color restored = static_cast<Color>(value);\n    cout << (restored == Color::Green ? \"Green\" : \"Other\") << endl;\n    return 0;\n}"
          },
          {
            "name": "static_cast from void* back to a typed pointer",
            "input": "int* stored as void*",
            "output": "99",
            "code": "#include <iostream>\nusing namespace std;\n\nint main()\n{\n    int value = 99;\n    void *generic = &value;\n\n    int *typed = static_cast<int *>(generic); /* void* -> T* requires an explicit cast */\n    cout << *typed << endl;\n    return 0;\n}"
          },
          {
            "name": "Explicit conversion operator overloading",
            "input": "static_cast<int>(Meters(5))",
            "output": "5",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Meters\n{\n    int value;\n\npublic:\n    Meters(int v) : value(v) {}\n    explicit operator int() const { return value; } /* requires an explicit cast to use */\n};\n\nint main()\n{\n    Meters m(5);\n    int value = static_cast<int>(m);\n    cout << value << endl;\n    return 0;\n}"
          },
          {
            "name": "Implicit conversion via a converting constructor",
            "input": "Fraction f = 5; (int implicitly converted to Fraction)",
            "output": "5/1",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Fraction\n{\n    int numerator, denominator;\n\npublic:\n    Fraction(int n, int d = 1) : numerator(n), denominator(d) {} /* not explicit: allows implicit conversion */\n    void show() { cout << numerator << \"/\" << denominator << endl; }\n};\n\nint main()\n{\n    Fraction f = 5; /* implicitly calls Fraction(5, 1) */\n    f.show();\n    return 0;\n}"
          },
          {
            "name": "The explicit keyword preventing implicit conversion",
            "input": "Fraction(5) requires an explicit constructor call",
            "output": "Explicit constructor used, implicit conversion is not allowed",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Fraction\n{\n    int numerator;\n\npublic:\n    explicit Fraction(int n) : numerator(n) {} /* blocks \"Fraction f = 5;\" from compiling */\n    void show() { cout << \"Explicit constructor used, implicit conversion is not allowed\" << endl; }\n};\n\nint main()\n{\n    Fraction f(5); /* must be called explicitly */\n    f.show();\n    return 0;\n}"
          },
          {
            "name": "Casting away const with const_cast to call a legacy non-const API",
            "input": "a const char* passed to an old C-style function expecting char*",
            "output": "Legacy function received: hello",
            "code": "#include <iostream>\n#include <cstring>\nusing namespace std;\n\nvoid legacyPrint(char *text) { cout << \"Legacy function received: \" << text << endl; }\n\nint main()\n{\n    const char *text = \"hello\";\n    legacyPrint(const_cast<char *>(text)); /* safe here only because legacyPrint doesn't modify it */\n    return 0;\n}"
          },
          {
            "name": "dynamic_cast in a class hierarchy with multiple derived classes",
            "input": "Shape* pointing to a Circle, Square, or Triangle",
            "output": "Identified shape type: Circle",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Shape\n{\npublic:\n    virtual ~Shape() {}\n};\n\nclass Circle : public Shape\n{\n};\nclass Square : public Shape\n{\n};\nclass Triangle : public Shape\n{\n};\n\nint main()\n{\n    Shape *shape = new Circle();\n\n    if (dynamic_cast<Circle *>(shape))\n        cout << \"Identified shape type: Circle\" << endl;\n    else if (dynamic_cast<Square *>(shape))\n        cout << \"Identified shape type: Square\" << endl;\n    else if (dynamic_cast<Triangle *>(shape))\n        cout << \"Identified shape type: Triangle\" << endl;\n\n    delete shape;\n    return 0;\n}"
          },
          {
            "name": "Using dynamic_cast to check an object's type before performing an operation",
            "input": "process a list of Animal* only if they are actually Dog*",
            "output": "Processed a Dog, Skipped a non-Dog animal",
            "code": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Animal\n{\npublic:\n    virtual ~Animal() {}\n};\n\nclass Dog : public Animal\n{\n};\nclass Cat : public Animal\n{\n};\n\nint main()\n{\n    vector<Animal *> animals = {new Dog(), new Cat()};\n\n    for (Animal *animal : animals)\n    {\n        if (dynamic_cast<Dog *>(animal))\n            cout << \"Processed a Dog\" << endl;\n        else\n            cout << \"Skipped a non-Dog animal\" << endl;\n    }\n\n    for (Animal *animal : animals)\n        delete animal;\n    return 0;\n}"
          },
          {
            "name": "static_cast with a user-defined conversion between custom types",
            "input": "static_cast<Fahrenheit>(Celsius(100))",
            "output": "212",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Fahrenheit\n{\npublic:\n    double value;\n    Fahrenheit(double v) : value(v) {}\n};\n\nclass Celsius\n{\n    double value;\n\npublic:\n    Celsius(double v) : value(v) {}\n    operator Fahrenheit() const { return Fahrenheit(value * 9.0 / 5.0 + 32); }\n};\n\nint main()\n{\n    Celsius c(100);\n    Fahrenheit f = static_cast<Fahrenheit>(c); /* invokes the user-defined conversion operator */\n    cout << f.value << endl;\n    return 0;\n}"
          },
          {
            "name": "reinterpret_cast for type punning (use with caution)",
            "input": "view the bytes of a float as an unsigned int",
            "output": "Raw bit pattern of the float printed as an unsigned integer",
            "code": "#include <iostream>\nusing namespace std;\n\nint main()\n{\n    float value = 1.5f;\n    unsigned int *bits = reinterpret_cast<unsigned int *>(&value); /* technically UB per strict aliasing, illustrative only */\n\n    cout << \"Raw bit pattern of the float printed as an unsigned integer: \" << *bits << endl;\n    return 0;\n}"
          },
          {
            "name": "Cast from int to a scoped enum using static_cast",
            "input": "static_cast<Direction>(2)",
            "output": "East",
            "code": "#include <iostream>\nusing namespace std;\n\nenum class Direction\n{\n    North,\n    South,\n    East,\n    West\n};\n\nint main()\n{\n    int value = 2;\n    Direction dir = static_cast<Direction>(value); /* required explicitly for enum class */\n\n    cout << (dir == Direction::East ? \"East\" : \"Other\") << endl;\n    return 0;\n}"
          },
          {
            "name": "Difference between static_cast and a C-style cast in safety",
            "input": "attempting an invalid cast at compile time",
            "output": "static_cast fails to compile for unrelated types, C-style cast may silently misbehave",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Unrelated\n{\n};\n\nint main()\n{\n    /* static_cast<Unrelated*>(somePointerOfADifferentType) would fail to compile\n     * if the types are truly unrelated, catching mistakes early. A C-style cast\n     * \"(Unrelated*)somePointer\" would often compile anyway, silently misbehaving. */\n    cout << \"static_cast fails to compile for unrelated types, C-style cast may silently misbehave\" << endl;\n    return 0;\n}"
          },
          {
            "name": "Cross-cast between sibling classes using dynamic_cast and a common virtual base",
            "input": "cast from one interface pointer to a sibling interface implemented by the same object",
            "output": "Cross-cast succeeded between sibling interfaces",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Printable\n{\npublic:\n    virtual ~Printable() {}\n};\n\nclass Serializable\n{\npublic:\n    virtual ~Serializable() {}\n};\n\nclass Document : public Printable, public Serializable\n{\n};\n\nint main()\n{\n    Document doc;\n    Printable *printable = &doc;\n\n    Serializable *serializable = dynamic_cast<Serializable *>(printable); /* cross-cast via RTTI */\n\n    cout << (serializable != nullptr ? \"Cross-cast succeeded between sibling interfaces\" : \"Failed\") << endl;\n    return 0;\n}"
          },
          {
            "name": "dynamic_cast requires a polymorphic base class (at least one virtual function)",
            "input": "a base class with a virtual destructor enabling dynamic_cast",
            "output": "dynamic_cast works because Base has a virtual function (the destructor)",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Base\n{\npublic:\n    virtual ~Base() {} /* required: without any virtual function, dynamic_cast won't compile */\n};\n\nclass Derived : public Base\n{\n};\n\nint main()\n{\n    Base *base = new Derived();\n    Derived *derived = dynamic_cast<Derived *>(base);\n\n    cout << (derived != nullptr ? \"dynamic_cast works because Base has a virtual function (the destructor)\" : \"Failed\") << endl;\n\n    delete base;\n    return 0;\n}"
          },
          {
            "name": "Printing the actual runtime type name using typeid(*ptr).name()",
            "input": "Base* actually pointing to a Derived object",
            "output": "Runtime type name printed (compiler-mangled, but distinct from \"Base\")",
            "code": "#include <iostream>\n#include <typeinfo>\nusing namespace std;\n\nclass Base\n{\npublic:\n    virtual ~Base() {}\n};\n\nclass Derived : public Base\n{\n};\n\nint main()\n{\n    Base *base = new Derived();\n    cout << \"Runtime type name: \" << typeid(*base).name() << endl; /* resolves to Derived, not Base */\n\n    delete base;\n    return 0;\n}"
          },
          {
            "name": "Narrowing conversion made explicit using static_cast",
            "input": "static_cast<short>(70000)",
            "output": "Explicit narrowing cast performed (value may overflow, done intentionally)",
            "code": "#include <iostream>\nusing namespace std;\n\nint main()\n{\n    int large = 70000;\n    short narrowed = static_cast<short>(large); /* explicit: signals the overflow is intentional */\n\n    cout << \"Explicit narrowing cast performed (value may overflow, done intentionally): \" << narrowed << endl;\n    return 0;\n}"
          },
          {
            "name": "Using const_cast together with static_cast in a safe accessor pattern",
            "input": "a const member function reusing a non-const helper via const_cast",
            "output": "Reused non-const logic safely from a const context",
            "code": "#include <iostream>\nusing namespace std;\n\nclass Data\n{\n    mutable int cachedValue = -1;\n\npublic:\n    int computeExpensiveValue() { return 42; }\n\n    int getValue() const\n    {\n        if (cachedValue == -1)\n            cachedValue = const_cast<Data *>(this)->computeExpensiveValue();\n        return cachedValue;\n    }\n};\n\nint main()\n{\n    const Data d;\n    cout << \"Reused non-const logic safely from a const context: \" << d.getValue() << endl;\n    return 0;\n}"
          },
          {
            "name": "Choosing the right cast - a quick summary program",
            "input": "(none)",
            "output": "static_cast: related types; dynamic_cast: polymorphic downcast; const_cast: constness; reinterpret_cast: unrelated types",
            "code": "#include <iostream>\nusing namespace std;\n\nint main()\n{\n    cout << \"static_cast: related types; \"\n         << \"dynamic_cast: polymorphic downcast; \"\n         << \"const_cast: constness; \"\n         << \"reinterpret_cast: unrelated types\" << endl;\n    return 0;\n}"
          }
        ],
        "path": "CPP/typecasting.cpp"
      }
    ]
  },
  {
    "section": "Linux",
    "chapters": [
      {
        "chapter": "BOOTING CONCEPTS",
        "folder": "Linux",
        "programs": [
          {
            "name": "Read and print the kernel version from /proc/version",
            "input": "(none)",
            "output": "Linux version 6.8.0-generic (gcc ...) ...",
            "code": "#include <stdio.h>\n\nint main(void)\n{\n\tFILE *fp = fopen(\"/proc/version\", \"r\");\n\tchar line[256];\n\n\tif (fp == NULL)\n\t{\n\t\tperror(\"fopen\");\n\t\treturn 1;\n\t}\n\n\tif (fgets(line, sizeof(line), fp) != NULL)\n\t\tprintf(\"%s\", line);\n\n\tfclose(fp);\n\treturn 0;\n}"
          },
          {
            "name": "Read system uptime from /proc/uptime",
            "input": "(none)",
            "output": "System has been up for 12345.67 seconds",
            "code": "#include <stdio.h>\n\nint main(void)\n{\n\tFILE *fp = fopen(\"/proc/uptime\", \"r\");\n\tdouble uptimeSeconds;\n\n\tif (fp == NULL)\n\t{\n\t\tperror(\"fopen\");\n\t\treturn 1;\n\t}\n\n\tfscanf(fp, \"%lf\", &uptimeSeconds);\n\tprintf(\"System has been up for %.2f seconds\\n\", uptimeSeconds);\n\n\tfclose(fp);\n\treturn 0;\n}"
          },
          {
            "name": "Parse /proc/cmdline to show kernel boot parameters",
            "input": "(none)",
            "output": "BOOT_IMAGE=/vmlinuz root=UUID=... ro quiet splash",
            "code": "#include <stdio.h>\n\nint main(void)\n{\n\tFILE *fp = fopen(\"/proc/cmdline\", \"r\");\n\tchar line[512];\n\n\tif (fp == NULL)\n\t{\n\t\tperror(\"fopen\");\n\t\treturn 1;\n\t}\n\n\tif (fgets(line, sizeof(line), fp) != NULL)\n\t\tprintf(\"Boot parameters: %s\", line);\n\n\tfclose(fp);\n\treturn 0;\n}"
          },
          {
            "name": "List currently running processes from /proc (simple ps-like demo)",
            "input": "(none)",
            "output": "PID 1: systemd, PID 842: sshd, ...",
            "code": "#include <stdio.h>\n#include <ctype.h>\n#include <dirent.h>\n#include <stdlib.h>\n\nint main(void)\n{\n\tDIR *proc = opendir(\"/proc\");\n\tstruct dirent *entry;\n\n\tif (proc == NULL)\n\t{\n\t\tperror(\"opendir\");\n\t\treturn 1;\n\t}\n\n\twhile ((entry = readdir(proc)) != NULL)\n\t{\n\t\tif (!isdigit((unsigned char)entry->d_name[0]))\n\t\t\tcontinue;\n\n\t\tchar path[64], name[128] = \"\";\n\t\tsnprintf(path, sizeof(path), \"/proc/%s/comm\", entry->d_name);\n\n\t\tFILE *fp = fopen(path, \"r\");\n\t\tif (fp != NULL)\n\t\t{\n\t\t\tfgets(name, sizeof(name), fp);\n\t\t\tfclose(fp);\n\t\t}\n\t\tprintf(\"PID %s: %s\", entry->d_name, name);\n\t}\n\n\tclosedir(proc);\n\treturn 0;\n}"
          },
          {
            "name": "Read /etc/os-release to display distribution info",
            "input": "(none)",
            "output": "NAME=\"Ubuntu\", VERSION=\"22.04 LTS ...\"",
            "code": "#include <stdio.h>\n#include <string.h>\n\nint main(void)\n{\n\tFILE *fp = fopen(\"/etc/os-release\", \"r\");\n\tchar line[256];\n\n\tif (fp == NULL)\n\t{\n\t\tperror(\"fopen\");\n\t\treturn 1;\n\t}\n\n\twhile (fgets(line, sizeof(line), fp) != NULL)\n\t{\n\t\tif (strncmp(line, \"NAME=\", 5) == 0 || strncmp(line, \"VERSION=\", 8) == 0)\n\t\t\tprintf(\"%s\", line);\n\t}\n\n\tfclose(fp);\n\treturn 0;\n}"
          },
          {
            "name": "Check the current systemd target (runlevel equivalent) via popen",
            "input": "(none)",
            "output": "Current target: graphical.target",
            "code": "#include <stdio.h>\n\nint main(void)\n{\n\tchar buffer[128];\n\tFILE *pipe = popen(\"systemctl get-default\", \"r\");\n\n\tif (pipe == NULL)\n\t{\n\t\tperror(\"popen\");\n\t\treturn 1;\n\t}\n\n\tif (fgets(buffer, sizeof(buffer), pipe) != NULL)\n\t\tprintf(\"Current target: %s\", buffer);\n\n\tpclose(pipe);\n\treturn 0;\n}"
          },
          {
            "name": "Measure system boot time using \"uptime -s\" via popen",
            "input": "(none)",
            "output": "System booted at: 2026-08-25 09:15:03",
            "code": "#include <stdio.h>\n\nint main(void)\n{\n\tchar buffer[64];\n\tFILE *pipe = popen(\"uptime -s\", \"r\");\n\n\tif (pipe == NULL)\n\t{\n\t\tperror(\"popen\");\n\t\treturn 1;\n\t}\n\n\tif (fgets(buffer, sizeof(buffer), pipe) != NULL)\n\t\tprintf(\"System booted at: %s\", buffer);\n\n\tpclose(pipe);\n\treturn 0;\n}"
          },
          {
            "name": "Read /proc/meminfo to display a memory summary",
            "input": "(none)",
            "output": "MemTotal: 16384000 kB, MemFree: 5230000 kB, MemAvailable: 9800000 kB",
            "code": "#include <stdio.h>\n#include <string.h>\n\nint main(void)\n{\n\tFILE *fp = fopen(\"/proc/meminfo\", \"r\");\n\tchar line[256];\n\n\tif (fp == NULL)\n\t{\n\t\tperror(\"fopen\");\n\t\treturn 1;\n\t}\n\n\twhile (fgets(line, sizeof(line), fp) != NULL)\n\t{\n\t\tif (strncmp(line, \"MemTotal\", 8) == 0 ||\n\t\t\tstrncmp(line, \"MemFree\", 7) == 0 ||\n\t\t\tstrncmp(line, \"MemAvailable\", 12) == 0)\n\t\t\tprintf(\"%s\", line);\n\t}\n\n\tfclose(fp);\n\treturn 0;\n}"
          },
          {
            "name": "List loaded kernel modules from /proc/modules",
            "input": "(none)",
            "output": "nf_tables 172032 1 - Live 0x0000000000000000, ...",
            "code": "#include <stdio.h>\n\nint main(void)\n{\n\tFILE *fp = fopen(\"/proc/modules\", \"r\");\n\tchar line[256];\n\n\tif (fp == NULL)\n\t{\n\t\tperror(\"fopen\");\n\t\treturn 1;\n\t}\n\n\twhile (fgets(line, sizeof(line), fp) != NULL)\n\t\tprintf(\"%s\", line);\n\n\tfclose(fp);\n\treturn 0;\n}"
          },
          {
            "name": "Read recent boot log lines using dmesg via popen",
            "input": "(none)",
            "output": "[    0.000000] Linux version 6.8.0 ..., [    0.123456] ACPI: ...",
            "code": "#include <stdio.h>\n\nint main(void)\n{\n\tchar buffer[256];\n\tFILE *pipe = popen(\"dmesg | head -n 20\", \"r\");\n\n\tif (pipe == NULL)\n\t{\n\t\tperror(\"popen\");\n\t\treturn 1;\n\t}\n\n\twhile (fgets(buffer, sizeof(buffer), pipe) != NULL)\n\t\tprintf(\"%s\", buffer);\n\n\tpclose(pipe);\n\treturn 0;\n}"
          },
          {
            "name": "What are the stages of the Linux boot process?",
            "input": "",
            "output": "",
            "code": "At a high level: (1) firmware (BIOS/UEFI) performs power-on self-test and locates a boot device, (2) the bootloader (typically GRUB) loads and runs, (3) the bootloader loads the Linux kernel and an initial RAM filesystem (initramfs) into memory and hands control to the kernel, (4) the kernel initializes hardware/drivers and mounts the real root filesystem, then (5) the kernel starts the init process (PID 1, usually systemd), which brings up all other services in the correct order."
          },
          {
            "name": "What is the role of BIOS/UEFI at boot?",
            "input": "",
            "output": "",
            "code": "BIOS (legacy) or UEFI (modern) firmware is the first code that runs when a machine powers on; it performs hardware initialization (POST - power-on self-test), then locates a bootable device according to configured boot order and hands off execution to the bootloader found there (via the MBR for BIOS, or the EFI System Partition for UEFI). UEFI additionally supports Secure Boot, larger disks (GPT), and a richer pre-OS environment than legacy BIOS."
          },
          {
            "name": "What is a bootloader (e.g. GRUB) and what does it do?",
            "input": "",
            "output": "",
            "code": "A bootloader is a small program that runs after firmware and before the OS kernel; its job is to locate, load, and start the kernel (and initramfs) into memory with the correct boot parameters. GRUB (GRand Unified Bootloader) additionally provides a menu to choose between multiple kernels/OS installations, lets you edit boot parameters at boot time, and supports chain-loading other bootloaders for multi-boot setups."
          },
          {
            "name": "What is the kernel's role during boot regarding initramfs and the root filesystem?",
            "input": "",
            "output": "",
            "code": "Once loaded, the kernel initializes core subsystems (memory management, scheduler) and essential drivers, then mounts a temporary root filesystem from initramfs, which contains just enough tools/drivers to locate and mount the real root filesystem (e.g. drivers for a RAID/LVM/encrypted disk). After the real root filesystem is mounted, the kernel switches root (pivot_root/switch_root) from the initramfs to it and finally executes the init program from there."
          },
          {
            "name": "What is initramfs/initrd and why is it needed?",
            "input": "",
            "output": "",
            "code": "initramfs (or the older initrd) is a small, temporary root filesystem image loaded into RAM by the bootloader alongside the kernel, containing modules and utilities needed to mount the real root filesystem. It's needed because the kernel may require drivers (e.g. for RAID, LVM, encrypted volumes, or unusual storage controllers) that can't be built into the kernel image itself or need to be loaded dynamically before the actual root device is accessible."
          },
          {
            "name": "What is init (PID 1) and how does systemd differ from SysV init?",
            "input": "",
            "output": "",
            "code": "Init is the first user-space process the kernel starts (always PID 1), responsible for starting and supervising all other processes/services and reaping orphaned processes. SysV init ran shell scripts sequentially in numbered runlevel directories (rc0.d, rc1.d, etc.) largely one at a time, while systemd uses declarative \"unit\" files with explicit dependency graphs, allowing services to start in parallel where possible and providing built-in service supervision, socket activation, and logging (journald)."
          },
          {
            "name": "What are runlevels (SysV) versus targets (systemd)?",
            "input": "",
            "output": "",
            "code": "SysV runlevels are numbered states (0=halt, 1=single-user, 3=multi-user text mode, 5=multi-user with GUI, 6=reboot) that determine which set of services run. systemd replaces this with named \"targets\" (e.g. multi-user.target, graphical.target, rescue.target) that are more flexible unit files themselves, can depend on and pull in other targets/units, and map roughly onto the old runlevel numbers for backward compatibility (e.g. runlevel 5 ~ graphical.target)."
          },
          {
            "name": "How does the boot sequence order work for services under systemd?",
            "input": "",
            "output": "",
            "code": "Each systemd unit file declares its dependencies and ordering relative to other units (After=, Before=, Requires=, Wants=), and systemd builds a dependency graph from all enabled units, starting independent units in parallel and only serializing where an explicit ordering dependency exists. This is fundamentally different from SysV's fixed numeric script ordering, and generally results in significantly faster boot times."
          },
          {
            "name": "What is dual-booting and how does GRUB handle multiple OS entries?",
            "input": "",
            "output": "",
            "code": "Dual-booting means having two or more operating systems installed on the same machine (often on separate partitions), letting the user choose which to start at boot time. GRUB detects other installed operating systems (via os-prober or manual configuration), adds a menu entry for each, and either loads that OS's kernel directly (for another Linux) or chain-loads that partition's own bootloader (e.g. for Windows), based on the user's selection at the boot menu."
          },
          {
            "name": "How would you diagnose a slow boot on a Linux system with systemd?",
            "input": "",
            "output": "",
            "code": "\"systemd-analyze\" shows total boot time split between firmware, bootloader, kernel, and userspace (initrd + userspace startup); \"systemd-analyze blame\" lists units sorted by how long each took to initialize; and \"systemd-analyze critical-chain\" shows the chain of units that determined the critical path/longest dependency sequence delaying boot completion - together these pinpoint exactly which service(s) are slowing things down."
          }
        ],
        "path": "Linux/booting.c, Linux/booting_theory.txt"
      },
      {
        "chapter": "FILE SYSTEMS",
        "folder": "Linux",
        "programs": [
          {
            "name": "Get file information using stat()",
            "input": "./test.txt",
            "output": "Size, permissions, inode number and last modified time of the file",
            "code": "#include <stdio.h>\n#include <sys/stat.h>\n\nint main(void)\n{\n\tstruct stat info;\n\n\tif (stat(\"test.txt\", &info) == -1)\n\t{\n\t\tperror(\"stat\");\n\t\treturn 1;\n\t}\n\n\tprintf(\"Size: %lld bytes\\n\", (long long)info.st_size);\n\tprintf(\"Inode: %lu\\n\", (unsigned long)info.st_ino);\n\tprintf(\"Permissions: %o\\n\", info.st_mode & 0777);\n\tprintf(\"Last modified: %ld\\n\", (long)info.st_mtime);\n\n\treturn 0;\n}"
          },
          {
            "name": "Check file type using stat (regular, directory, symlink, etc.)",
            "input": "/etc, ./test.txt",
            "output": "/etc is a directory, test.txt is a regular file",
            "code": "#include <stdio.h>\n#include <sys/stat.h>\n\nint main(int argc, char *argv[])\n{\n\tstruct stat info;\n\n\tif (argc < 2 || stat(argv[1], &info) == -1)\n\t{\n\t\tprintf(\"Usage: %s <path>\\n\", argv[0]);\n\t\treturn 1;\n\t}\n\n\tif (S_ISREG(info.st_mode))\n\t\tprintf(\"%s is a regular file\\n\", argv[1]);\n\telse if (S_ISDIR(info.st_mode))\n\t\tprintf(\"%s is a directory\\n\", argv[1]);\n\telse if (S_ISLNK(info.st_mode))\n\t\tprintf(\"%s is a symbolic link\\n\", argv[1]);\n\telse\n\t\tprintf(\"%s is some other file type\\n\", argv[1]);\n\n\treturn 0;\n}"
          },
          {
            "name": "List directory contents using opendir/readdir",
            "input": ".",
            "output": "Each entry name in the current directory, one per line",
            "code": "#include <stdio.h>\n#include <dirent.h>\n\nint main(void)\n{\n\tDIR *dir = opendir(\".\");\n\tstruct dirent *entry;\n\n\tif (dir == NULL)\n\t{\n\t\tperror(\"opendir\");\n\t\treturn 1;\n\t}\n\n\twhile ((entry = readdir(dir)) != NULL)\n\t\tprintf(\"%s\\n\", entry->d_name);\n\n\tclosedir(dir);\n\treturn 0;\n}"
          },
          {
            "name": "Create and remove a directory (mkdir/rmdir)",
            "input": "mydir",
            "output": "Directory created, then removed successfully",
            "code": "#include <stdio.h>\n#include <sys/stat.h>\n#include <unistd.h>\n\nint main(void)\n{\n\tif (mkdir(\"mydir\", 0755) == -1)\n\t{\n\t\tperror(\"mkdir\");\n\t\treturn 1;\n\t}\n\tprintf(\"Directory created\\n\");\n\n\tif (rmdir(\"mydir\") == -1)\n\t{\n\t\tperror(\"rmdir\");\n\t\treturn 1;\n\t}\n\tprintf(\"Directory removed\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Copy a file using low-level read/write system calls",
            "input": "source.txt -> destination.txt",
            "output": "File copied successfully",
            "code": "#include <stdio.h>\n#include <fcntl.h>\n#include <unistd.h>\n\nint main(void)\n{\n\tchar buffer[4096];\n\tssize_t bytesRead;\n\tint src = open(\"source.txt\", O_RDONLY);\n\tint dst = open(\"destination.txt\", O_WRONLY | O_CREAT | O_TRUNC, 0644);\n\n\tif (src == -1 || dst == -1)\n\t{\n\t\tperror(\"open\");\n\t\treturn 1;\n\t}\n\n\twhile ((bytesRead = read(src, buffer, sizeof(buffer))) > 0)\n\t\twrite(dst, buffer, (size_t)bytesRead);\n\n\tclose(src);\n\tclose(dst);\n\tprintf(\"File copied successfully\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Get and set file permissions using chmod",
            "input": "test.txt, mode 0644",
            "output": "Permissions changed to rw-r--r--",
            "code": "#include <stdio.h>\n#include <sys/stat.h>\n\nint main(void)\n{\n\tif (chmod(\"test.txt\", 0644) == -1)\n\t{\n\t\tperror(\"chmod\");\n\t\treturn 1;\n\t}\n\tprintf(\"Permissions changed to rw-r--r--\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Create a symbolic link and read it (symlink/readlink)",
            "input": "target.txt -> link.txt",
            "output": "link.txt -> target.txt",
            "code": "#include <stdio.h>\n#include <unistd.h>\n\nint main(void)\n{\n\tchar buffer[256];\n\tssize_t len;\n\n\tif (symlink(\"target.txt\", \"link.txt\") == -1)\n\t{\n\t\tperror(\"symlink\");\n\t\treturn 1;\n\t}\n\n\tlen = readlink(\"link.txt\", buffer, sizeof(buffer) - 1);\n\tif (len == -1)\n\t{\n\t\tperror(\"readlink\");\n\t\treturn 1;\n\t}\n\tbuffer[len] = '\\0';\n\n\tprintf(\"link.txt -> %s\\n\", buffer);\n\treturn 0;\n}"
          },
          {
            "name": "Get filesystem statistics using statvfs",
            "input": "/",
            "output": "Total blocks, free blocks and block size of the filesystem",
            "code": "#include <stdio.h>\n#include <sys/statvfs.h>\n\nint main(void)\n{\n\tstruct statvfs info;\n\n\tif (statvfs(\"/\", &info) == -1)\n\t{\n\t\tperror(\"statvfs\");\n\t\treturn 1;\n\t}\n\n\tprintf(\"Block size: %lu\\n\", info.f_bsize);\n\tprintf(\"Total blocks: %lu\\n\", info.f_blocks);\n\tprintf(\"Free blocks: %lu\\n\", info.f_bfree);\n\n\treturn 0;\n}"
          },
          {
            "name": "Rename and delete a file (rename/unlink)",
            "input": "old.txt -> new.txt, then delete new.txt",
            "output": "File renamed, then deleted",
            "code": "#include <stdio.h>\n#include <unistd.h>\n\nint main(void)\n{\n\tif (rename(\"old.txt\", \"new.txt\") == -1)\n\t{\n\t\tperror(\"rename\");\n\t\treturn 1;\n\t}\n\tprintf(\"File renamed to new.txt\\n\");\n\n\tif (unlink(\"new.txt\") == -1)\n\t{\n\t\tperror(\"unlink\");\n\t\treturn 1;\n\t}\n\tprintf(\"File deleted\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Recursively list a directory tree",
            "input": ".",
            "output": "Every file and sub-directory printed with indentation showing depth",
            "code": "#include <stdio.h>\n#include <string.h>\n#include <dirent.h>\n#include <sys/stat.h>\n\nstatic void listTree(const char *path, int depth)\n{\n\tDIR *dir = opendir(path);\n\tstruct dirent *entry;\n\n\tif (dir == NULL)\n\t\treturn;\n\n\twhile ((entry = readdir(dir)) != NULL)\n\t{\n\t\tchar childPath[1024];\n\t\tstruct stat info;\n\n\t\tif (strcmp(entry->d_name, \".\") == 0 || strcmp(entry->d_name, \"..\") == 0)\n\t\t\tcontinue;\n\n\t\tprintf(\"%*s%s\\n\", depth * 2, \"\", entry->d_name);\n\t\tsnprintf(childPath, sizeof(childPath), \"%s/%s\", path, entry->d_name);\n\n\t\tif (stat(childPath, &info) == 0 && S_ISDIR(info.st_mode))\n\t\t\tlistTree(childPath, depth + 1);\n\t}\n\n\tclosedir(dir);\n}\n\nint main(void)\n{\n\tlistTree(\".\", 0);\n\treturn 0;\n}"
          },
          {
            "name": "What is an inode and what does it store?",
            "input": "",
            "output": "",
            "code": "An inode (index node) is a kernel data structure that stores all metadata about a file except its name and actual data content - including file size, permissions, owner (UID/GID), timestamps, link count, and pointers to the data blocks on disk. Every file and directory has exactly one inode, identified by a unique inode number within a filesystem."
          },
          {
            "name": "What is the difference between a hard link and a soft (symbolic) link?",
            "input": "",
            "output": "",
            "code": "A hard link is a second directory entry pointing to the same inode as the original file, so both names are indistinguishable and the data isn't removed until every hard link is deleted; hard links cannot span filesystems or point to directories. A symbolic link is a separate small file that stores the path to another file; it can cross filesystems and point to directories, but breaks (becomes a \"dangling link\") if the target is removed."
          },
          {
            "name": "What is a superblock in a filesystem?",
            "input": "",
            "output": "",
            "code": "The superblock is a data structure stored near the start of a filesystem that describes the filesystem as a whole - its type, size, block size, number of free/used blocks and inodes, and mount status. The kernel reads the superblock when mounting a filesystem to understand its layout; losing/corrupting it typically makes the filesystem unmountable."
          },
          {
            "name": "Explain the Linux Virtual File System (VFS) layer.",
            "input": "",
            "output": "",
            "code": "The VFS is an abstraction layer in the kernel that provides a uniform interface (open, read, write, close, etc.) to user space regardless of the underlying filesystem type (ext4, xfs, NFS, etc.). Each concrete filesystem implements the VFS's function pointers, so applications can use the same system calls without knowing implementation details of the actual filesystem."
          },
          {
            "name": "What is the difference between ext4, XFS, and Btrfs at a high level?",
            "input": "",
            "output": "",
            "code": "ext4 is a mature, journaling filesystem that is the long-standing Linux default, good general-purpose reliability and performance. XFS is a high-performance journaling filesystem optimized for large files and high parallel I/O throughput, common in enterprise/server storage. Btrfs is a copy-on-write filesystem offering built-in snapshots, checksums, and multi-device pooling, at the cost of more complexity and historically less mature RAID5/6 support."
          },
          {
            "name": "What happens when you delete a file that another process still has open?",
            "input": "",
            "output": "",
            "code": "On Linux, unlink() removes the directory entry (the name) and decrements the link count, but the inode and its data blocks are only freed once the link count reaches zero AND no process has the file open. Any process that already had the file open (via its file descriptor) can continue reading/writing it normally until it closes the descriptor - this is why some tools show \"deleted but still holding space\" for open log files."
          },
          {
            "name": "What is a mount point and how does mounting work?",
            "input": "",
            "output": "",
            "code": "A mount point is a directory in the existing filesystem tree where another filesystem (a disk partition, USB drive, network share, etc.) is attached, making its contents accessible under that directory. The mount() system call associates a device/filesystem with the mount point; before mounting, the directory usually appears empty (or shows whatever was there before, now hidden underneath the mount)."
          },
          {
            "name": "What is the difference between an absolute path and a relative path, and how does the kernel resolve them?",
            "input": "",
            "output": "",
            "code": "An absolute path starts from the root directory \"/\" and fully specifies a file's location regardless of the current working directory (e.g. /home/user/file.txt). A relative path is resolved starting from the process's current working directory (e.g. file.txt or ../file.txt). The kernel walks the path component by component, using the appropriate starting directory (root or cwd) and following each directory's entries to the next inode."
          },
          {
            "name": "What are file descriptors and how do they relate to inodes?",
            "input": "",
            "output": "",
            "code": "A file descriptor is a small non-negative integer that a process uses to refer to an open file, socket, or pipe; the kernel maintains a per-process file descriptor table that points to system-wide open file table entries, which in turn point to the underlying inode. Multiple file descriptors (even in different processes) can point to the same open file table entry or the same inode, which is why file offset sharing behaves differently depending on how the descriptor was obtained (e.g. via dup() vs a fresh open())."
          },
          {
            "name": "What is journaling in a filesystem and why is it used?",
            "input": "",
            "output": "",
            "code": "Journaling means the filesystem writes a record of intended changes (metadata, and optionally data) to a dedicated journal/log area before actually committing them to their final location. If the system crashes or loses power mid-write, the filesystem can replay or discard incomplete journal entries on the next mount to quickly restore a consistent state, avoiding a full, slow filesystem check (fsck) of the entire disk."
          }
        ],
        "path": "Linux/filesystems.c, Linux/filesystems_theory.txt"
      },
      {
        "chapter": "FORK AND CHILD PROCESSES",
        "folder": "Linux",
        "programs": [
          {
            "name": "Basic fork() creating a child process",
            "input": "(none)",
            "output": "Child process running, Parent process running",
            "code": "#include <stdio.h>\n#include <unistd.h>\n\nint main(void)\n{\n\tpid_t pid = fork();\n\n\tif (pid == 0)\n\t\tprintf(\"Child process running\\n\");\n\telse if (pid > 0)\n\t\tprintf(\"Parent process running\\n\");\n\telse\n\t\tperror(\"fork\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Get parent and child process IDs (getpid/getppid)",
            "input": "(none)",
            "output": "Child PID=1234 PPID=1000, Parent PID=1000",
            "code": "#include <stdio.h>\n#include <unistd.h>\n\nint main(void)\n{\n\tpid_t pid = fork();\n\n\tif (pid == 0)\n\t\tprintf(\"Child PID=%d PPID=%d\\n\", getpid(), getppid());\n\telse if (pid > 0)\n\t\tprintf(\"Parent PID=%d\\n\", getpid());\n\n\treturn 0;\n}"
          },
          {
            "name": "Wait for a child process to finish (wait)",
            "input": "(none)",
            "output": "Child finished, Parent: child has exited",
            "code": "#include <stdio.h>\n#include <unistd.h>\n#include <sys/wait.h>\n\nint main(void)\n{\n\tpid_t pid = fork();\n\n\tif (pid == 0)\n\t{\n\t\tprintf(\"Child finished\\n\");\n\t\treturn 0;\n\t}\n\n\twait(NULL);\n\tprintf(\"Parent: child has exited\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Wait for a specific child with status using waitpid",
            "input": "(none)",
            "output": "Child exited with status 5",
            "code": "#include <stdio.h>\n#include <unistd.h>\n#include <sys/wait.h>\n\nint main(void)\n{\n\tpid_t pid = fork();\n\n\tif (pid == 0)\n\t\t_exit(5);\n\n\tint status;\n\twaitpid(pid, &status, 0);\n\n\tif (WIFEXITED(status))\n\t\tprintf(\"Child exited with status %d\\n\", WEXITSTATUS(status));\n\n\treturn 0;\n}"
          },
          {
            "name": "Zombie process demonstration",
            "input": "(none)",
            "output": "Child exits immediately; until the parent calls wait(), it shows as <defunct>",
            "code": "#include <stdio.h>\n#include <unistd.h>\n\nint main(void)\n{\n\tpid_t pid = fork();\n\n\tif (pid == 0)\n\t{\n\t\tprintf(\"Child exiting now\\n\");\n\t\t_exit(0);\n\t}\n\n\tprintf(\"Parent sleeping without calling wait() - child becomes a zombie\\n\");\n\tsleep(10); /* during this window, \"ps\" shows the child as <defunct> */\n\n\treturn 0;\n}"
          },
          {
            "name": "Orphan process demonstration",
            "input": "(none)",
            "output": "Child's new parent PID becomes 1 (or the nearest subreaper) after the parent exits",
            "code": "#include <stdio.h>\n#include <unistd.h>\n\nint main(void)\n{\n\tpid_t pid = fork();\n\n\tif (pid == 0)\n\t{\n\t\tsleep(2); /* parent exits first, this child is reparented */\n\t\tprintf(\"Orphaned child's new parent PID: %d\\n\", getppid());\n\t\treturn 0;\n\t}\n\n\tprintf(\"Parent exiting immediately\\n\");\n\treturn 0;\n}"
          },
          {
            "name": "fork() + exec() to run another program",
            "input": "(none)",
            "output": "Output of the \"ls -l\" command executed in the child process",
            "code": "#include <stdio.h>\n#include <unistd.h>\n#include <sys/wait.h>\n\nint main(void)\n{\n\tpid_t pid = fork();\n\n\tif (pid == 0)\n\t{\n\t\texeclp(\"ls\", \"ls\", \"-l\", NULL);\n\t\tperror(\"execlp\"); /* only reached if execlp fails */\n\t\t_exit(1);\n\t}\n\n\twait(NULL);\n\treturn 0;\n}"
          },
          {
            "name": "Create multiple child processes in a loop",
            "input": "3 children",
            "output": "Child 0 running, Child 1 running, Child 2 running",
            "code": "#include <stdio.h>\n#include <unistd.h>\n#include <sys/wait.h>\n\nint main(void)\n{\n\tfor (int i = 0; i < 3; i++)\n\t{\n\t\tpid_t pid = fork();\n\n\t\tif (pid == 0)\n\t\t{\n\t\t\tprintf(\"Child %d running\\n\", i);\n\t\t\t_exit(0);\n\t\t}\n\t}\n\n\tfor (int i = 0; i < 3; i++)\n\t\twait(NULL);\n\n\treturn 0;\n}"
          },
          {
            "name": "Exit status propagation from child to parent (WIFEXITED/WEXITSTATUS)",
            "input": "(none)",
            "output": "Child exited normally with code 42",
            "code": "#include <stdio.h>\n#include <unistd.h>\n#include <sys/wait.h>\n\nint main(void)\n{\n\tpid_t pid = fork();\n\n\tif (pid == 0)\n\t\t_exit(42);\n\n\tint status;\n\twaitpid(pid, &status, 0);\n\n\tif (WIFEXITED(status))\n\t\tprintf(\"Child exited normally with code %d\\n\", WEXITSTATUS(status));\n\telse if (WIFSIGNALED(status))\n\t\tprintf(\"Child was killed by signal %d\\n\", WTERMSIG(status));\n\n\treturn 0;\n}"
          },
          {
            "name": "Bounded fork tree (safe, depth-limited alternative to a fork bomb)",
            "input": "max depth = 2",
            "output": "Prints one line per process created, then all processes exit cleanly",
            "code": "#include <stdio.h>\n#include <unistd.h>\n#include <sys/wait.h>\n\nstatic void spawn(int depth, int maxDepth)\n{\n\tif (depth >= maxDepth)\n\t\treturn;\n\n\tpid_t pid = fork();\n\n\tif (pid == 0)\n\t{\n\t\tprintf(\"Process at depth %d, PID=%d\\n\", depth + 1, getpid());\n\t\tspawn(depth + 1, maxDepth);\n\t\t_exit(0);\n\t}\n\n\twaitpid(pid, NULL, 0); /* bounded: parent waits, no runaway process growth */\n}\n\nint main(void)\n{\n\tspawn(0, 2);\n\treturn 0;\n}"
          },
          {
            "name": "What is a process and what is a Process Control Block (PCB)?",
            "input": "",
            "output": "",
            "code": "A process is an instance of a running program, with its own address space, file descriptors, and execution state. The kernel tracks each process using a Process Control Block (on Linux, task_struct) that stores its PID, state, CPU register context, memory maps, open file table, scheduling info, and parent/child relationships."
          },
          {
            "name": "Explain fork() and copy-on-write.",
            "input": "",
            "output": "",
            "code": "fork() creates a new process (the child) that is an almost exact duplicate of the calling process (the parent), duplicating its memory, file descriptors, and execution point (fork returns twice - 0 in the child, child PID in the parent). Rather than physically copying all memory pages immediately, Linux uses copy-on-write: parent and child share the same physical pages marked read-only, and a page is only duplicated when either process actually writes to it, making fork() fast even for large processes."
          },
          {
            "name": "What is the difference between a process and a thread?",
            "input": "",
            "output": "",
            "code": "A process has its own independent address space, file descriptors, and resources, and is created with fork()/exec(); communication between processes requires IPC. A thread shares the same address space, open files, and most resources with other threads in the same process, only having its own stack and register set, so switching between threads and sharing data between them is much cheaper than between processes."
          },
          {
            "name": "Explain zombie vs orphan processes.",
            "input": "",
            "output": "",
            "code": "A zombie is a process that has terminated but whose exit status has not yet been collected by its parent via wait()/waitpid(); it stays in the process table (shown as <defunct>) until reaped. An orphan is a process whose parent terminated before it did; it gets reparented (typically to init/PID 1 or the nearest \"subreaper\"), which will eventually reap it when it exits, so orphans do not become permanent zombies."
          },
          {
            "name": "What are the typical process states (Running, Ready, Waiting, Zombie, etc.)?",
            "input": "",
            "output": "",
            "code": "Common Linux process states: Running (R, executing or ready to run on a CPU), Sleeping/Waiting (S/D, blocked waiting for an event or I/O, interruptible or uninterruptible), Stopped (T, suspended by a signal like SIGSTOP), and Zombie (Z, terminated but not yet reaped by its parent). The scheduler moves processes between Running and Waiting/Ready based on CPU availability and blocking calls."
          },
          {
            "name": "Explain the exec() family of functions and how fork()+exec() work together.",
            "input": "",
            "output": "",
            "code": "The exec() family (execl, execv, execlp, execvp, execve, etc.) replaces the current process's memory image with a new program, keeping the same PID but resetting the code, data, and stack to the new program's; it does not create a new process. The common pattern fork()+exec() first duplicates the calling process (fork), then the child overlays itself with a different program (exec), which is exactly how shells launch external commands while the shell process itself continues running."
          },
          {
            "name": "What is the difference between vfork() and fork()?",
            "input": "",
            "output": "",
            "code": "vfork() also creates a new process but, unlike fork(), does not copy the parent's address space at all - the child temporarily shares the parent's memory and the parent is suspended until the child calls exec() or _exit(). It's a legacy optimization for the common \"fork immediately followed by exec\" pattern, largely superseded today by copy-on-write fork() and posix_spawn(), and misusing it (e.g. modifying variables before exec) can corrupt the parent's state."
          },
          {
            "name": "What is process context switching?",
            "input": "",
            "output": "",
            "code": "A context switch is when the CPU scheduler suspends one process/thread and resumes another, saving the current process's CPU register state, program counter, and other context into its PCB, then loading the next process's saved context. It enables multitasking on a single CPU core but has overhead (cache/TLB flushes), so excessive context switching can hurt performance."
          },
          {
            "name": "What exactly does a child share with its parent immediately after fork()?",
            "input": "",
            "output": "",
            "code": "Immediately after fork(), the child gets a copy of the parent's memory (via copy-on-write), a duplicate of the parent's open file descriptor table (the descriptors refer to the same underlying open file descriptions, so file offsets are shared), the same environment variables, and the same working directory - but it gets its own PID, its own copy of memory that diverges once either process writes to a page, and its own signal-pending mask."
          },
          {
            "name": "What is a PID, PPID, and process group/session?",
            "input": "",
            "output": "",
            "code": "A PID (Process ID) uniquely identifies a running process; PPID (Parent Process ID) identifies the process that created it via fork(). A process group is a collection of related processes (e.g. all processes in a pipeline) that can be signaled together, and a session is a collection of process groups, typically associated with a single controlling terminal, used by shells to manage job control (foreground/background jobs)."
          }
        ],
        "path": "Linux/fork_process.c, Linux/fork_process_theory.txt"
      },
      {
        "chapter": "MESSAGE QUEUES",
        "folder": "Linux",
        "programs": [
          {
            "name": "Create/get a System V message queue (msgget)",
            "input": "key = ftok(\".\", 'A')",
            "output": "Message queue created with id: 12345",
            "code": "#include <stdio.h>\n#include <sys/ipc.h>\n#include <sys/msg.h>\n\nint main(void)\n{\n\tkey_t key = ftok(\".\", 'A');\n\tint msgid = msgget(key, IPC_CREAT | 0666);\n\n\tif (msgid == -1)\n\t{\n\t\tperror(\"msgget\");\n\t\treturn 1;\n\t}\n\tprintf(\"Message queue created with id: %d\\n\", msgid);\n\n\treturn 0;\n}"
          },
          {
            "name": "Send a message to a System V queue (msgsnd)",
            "input": "\"Hello Queue!\"",
            "output": "Message sent",
            "code": "#include <stdio.h>\n#include <string.h>\n#include <sys/ipc.h>\n#include <sys/msg.h>\n\nstruct Message\n{\n\tlong type;\n\tchar text[128];\n};\n\nint main(void)\n{\n\tkey_t key = ftok(\".\", 'A');\n\tint msgid = msgget(key, IPC_CREAT | 0666);\n\tstruct Message msg;\n\n\tmsg.type = 1;\n\tstrcpy(msg.text, \"Hello Queue!\");\n\n\tif (msgsnd(msgid, &msg, sizeof(msg.text), 0) == -1)\n\t{\n\t\tperror(\"msgsnd\");\n\t\treturn 1;\n\t}\n\tprintf(\"Message sent\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Receive a message from a System V queue (msgrcv)",
            "input": "(waits for a message of type 1)",
            "output": "Received: Hello Queue!",
            "code": "#include <stdio.h>\n#include <sys/ipc.h>\n#include <sys/msg.h>\n\nstruct Message\n{\n\tlong type;\n\tchar text[128];\n};\n\nint main(void)\n{\n\tkey_t key = ftok(\".\", 'A');\n\tint msgid = msgget(key, IPC_CREAT | 0666);\n\tstruct Message msg;\n\n\tif (msgrcv(msgid, &msg, sizeof(msg.text), 1, 0) == -1)\n\t{\n\t\tperror(\"msgrcv\");\n\t\treturn 1;\n\t}\n\tprintf(\"Received: %s\\n\", msg.text);\n\n\treturn 0;\n}"
          },
          {
            "name": "Remove/destroy a message queue (msgctl IPC_RMID)",
            "input": "(none)",
            "output": "Message queue removed",
            "code": "#include <stdio.h>\n#include <sys/ipc.h>\n#include <sys/msg.h>\n\nint main(void)\n{\n\tkey_t key = ftok(\".\", 'A');\n\tint msgid = msgget(key, IPC_CREAT | 0666);\n\n\tif (msgctl(msgid, IPC_RMID, NULL) == -1)\n\t{\n\t\tperror(\"msgctl\");\n\t\treturn 1;\n\t}\n\tprintf(\"Message queue removed\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Use the message type field to filter messages by category",
            "input": "Sends type=1 \"low priority\" and type=2 \"high priority\"",
            "output": "Received high-priority message: high priority",
            "code": "#include <stdio.h>\n#include <string.h>\n#include <sys/ipc.h>\n#include <sys/msg.h>\n\nstruct Message\n{\n\tlong type;\n\tchar text[64];\n};\n\nint main(void)\n{\n\tkey_t key = ftok(\".\", 'A');\n\tint msgid = msgget(key, IPC_CREAT | 0666);\n\tstruct Message out1 = {1, \"low priority\"};\n\tstruct Message out2 = {2, \"high priority\"};\n\tstruct Message in;\n\n\tmsgsnd(msgid, &out1, sizeof(out1.text), 0);\n\tmsgsnd(msgid, &out2, sizeof(out2.text), 0);\n\n\t/* requesting type 2 skips the type-1 message and fetches type-2 directly */\n\tmsgrcv(msgid, &in, sizeof(in.text), 2, 0);\n\tprintf(\"Received high-priority message: %s\\n\", in.text);\n\n\treturn 0;\n}"
          },
          {
            "name": "Non-blocking message receive with IPC_NOWAIT",
            "input": "(queue is empty)",
            "output": "No message available right now",
            "code": "#include <stdio.h>\n#include <errno.h>\n#include <sys/ipc.h>\n#include <sys/msg.h>\n\nstruct Message\n{\n\tlong type;\n\tchar text[64];\n};\n\nint main(void)\n{\n\tkey_t key = ftok(\".\", 'A');\n\tint msgid = msgget(key, IPC_CREAT | 0666);\n\tstruct Message in;\n\n\tif (msgrcv(msgid, &in, sizeof(in.text), 0, IPC_NOWAIT) == -1)\n\t{\n\t\tif (errno == ENOMSG)\n\t\t\tprintf(\"No message available right now\\n\");\n\t\telse\n\t\t\tperror(\"msgrcv\");\n\t}\n\n\treturn 0;\n}"
          },
          {
            "name": "POSIX message queue creation (mq_open)",
            "input": "/my_queue",
            "output": "POSIX message queue opened",
            "code": "#include <stdio.h>\n#include <fcntl.h>\n#include <mqueue.h>\n\nint main(void)\n{\n\tmqd_t mq = mq_open(\"/my_queue\", O_CREAT | O_RDWR, 0644, NULL);\n\n\tif (mq == (mqd_t)-1)\n\t{\n\t\tperror(\"mq_open\");\n\t\treturn 1;\n\t}\n\tprintf(\"POSIX message queue opened\\n\");\n\tmq_close(mq);\n\n\treturn 0;\n}"
          },
          {
            "name": "POSIX message queue send/receive (mq_send/mq_receive)",
            "input": "\"Hello via POSIX MQ\"",
            "output": "Received: Hello via POSIX MQ",
            "code": "#include <stdio.h>\n#include <string.h>\n#include <fcntl.h>\n#include <mqueue.h>\n\nint main(void)\n{\n\tmqd_t mq = mq_open(\"/my_queue\", O_CREAT | O_RDWR, 0644, NULL);\n\tchar buffer[128];\n\n\tmq_send(mq, \"Hello via POSIX MQ\", 19, 0);\n\n\tssize_t n = mq_receive(mq, buffer, sizeof(buffer), NULL);\n\tbuffer[n] = '\\0';\n\tprintf(\"Received: %s\\n\", buffer);\n\n\tmq_close(mq);\n\treturn 0;\n}"
          },
          {
            "name": "Query message queue attributes (mq_getattr)",
            "input": "(none)",
            "output": "Max messages: 10, Message size: 8192, Current messages: 0",
            "code": "#include <stdio.h>\n#include <fcntl.h>\n#include <mqueue.h>\n\nint main(void)\n{\n\tmqd_t mq = mq_open(\"/my_queue\", O_CREAT | O_RDWR, 0644, NULL);\n\tstruct mq_attr attr;\n\n\tmq_getattr(mq, &attr);\n\tprintf(\"Max messages: %ld\\n\", attr.mq_maxmsg);\n\tprintf(\"Message size: %ld\\n\", attr.mq_msgsize);\n\tprintf(\"Current messages: %ld\\n\", attr.mq_curmsgs);\n\n\tmq_close(mq);\n\treturn 0;\n}"
          },
          {
            "name": "List and remove a POSIX message queue (mq_unlink, conceptually like \"ipcrm\")",
            "input": "/my_queue",
            "output": "Message queue /my_queue removed",
            "code": "#include <stdio.h>\n#include <mqueue.h>\n\nint main(void)\n{\n\tif (mq_unlink(\"/my_queue\") == -1)\n\t{\n\t\tperror(\"mq_unlink\");\n\t\treturn 1;\n\t}\n\tprintf(\"Message queue /my_queue removed\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "What is a message queue and how does it differ from a pipe?",
            "input": "",
            "output": "",
            "code": "A message queue is a kernel-managed list of discrete, typed messages that processes can send to and receive from, preserving message boundaries (unlike a pipe's raw byte stream). Message queues also allow selective/priority-based reads (e.g. filtering by message type) and, unlike pipes, are addressed by a system-wide key or name rather than requiring a parent-child relationship or an open file descriptor to share."
          },
          {
            "name": "What is the difference between System V message queues and POSIX message queues?",
            "input": "",
            "output": "",
            "code": "System V message queues (msgget/msgsnd/msgrcv) are identified by an integer key (often generated with ftok()) and managed with ipcs/ipcrm; they use a \"message type\" long field for filtering. POSIX message queues (mq_open/mq_send/mq_receive) are identified by a name string (e.g. \"/myqueue\"), behave more like file descriptors (support poll/select and O_NONBLOCK naturally), and support real message priorities rather than just a type field."
          },
          {
            "name": "What is an IPC key and how is it generated (ftok)?",
            "input": "",
            "output": "",
            "code": "An IPC key is an identifier used by System V IPC calls (msgget, shmget, semget) so unrelated processes can agree on the same IPC object without directly sharing a numeric ID. ftok(path, id) generates a key by combining the inode number of an existing file (path) with a project id (id), so any process using the same file path and id gets the same key."
          },
          {
            "name": "How does message queue persistence work?",
            "input": "",
            "output": "",
            "code": "Both System V and POSIX message queues are kernel-persistent: once created, a queue and any messages in it remain in the kernel even after the creating process exits, until it is explicitly removed (msgctl with IPC_RMID, or mq_unlink) or the system reboots. This differs from anonymous pipes, which disappear as soon as all their file descriptors are closed."
          },
          {
            "name": "What is message type filtering used for in msgrcv?",
            "input": "",
            "output": "",
            "code": "The \"type\" field on a System V message lets a receiver selectively read messages: requesting type 0 gets the oldest message regardless of type, a positive type gets the first message of exactly that type, and a negative type gets the first message with the lowest type less than or equal to its absolute value - useful for implementing priority queues or separate logical channels within one queue."
          },
          {
            "name": "What are the size limits of a message queue?",
            "input": "",
            "output": "",
            "code": "Both mechanisms are bounded by kernel-configurable limits: System V queues are limited by msgmnb (max bytes per queue) and msgmax (max bytes per message), tunable via /proc/sys/kernel/msgmnb and msgmax. POSIX queues have a default max message count and max message size (mq_maxmsg, mq_msgsize) set at creation and capped by /proc/sys/fs/mqueue limits; sends beyond capacity block or fail depending on blocking mode."
          },
          {
            "name": "How do you list and remove IPC message queues from the command line?",
            "input": "",
            "output": "",
            "code": "\"ipcs -q\" lists active System V message queues with their key, id, owner, and current size; \"ipcrm -q <msqid>\" removes a specific one by id. For POSIX message queues, they typically appear as files under /dev/mqueue/ and can be removed with \"rm /dev/mqueue/<name>\" or programmatically with mq_unlink()."
          },
          {
            "name": "What is the difference between blocking and non-blocking message queue operations?",
            "input": "",
            "output": "",
            "code": "By default, msgsnd()/msgrcv() and mq_send()/mq_receive() block: send blocks if the queue is full, receive blocks if no matching message exists. Passing IPC_NOWAIT (System V) or opening with O_NONBLOCK (POSIX) makes these calls return immediately with an error (EAGAIN/ENOMSG) instead of waiting, letting the caller poll or do other work."
          },
          {
            "name": "When would you prefer message queues over shared memory?",
            "input": "",
            "output": "",
            "code": "Message queues are preferable when you want the kernel to handle synchronization and message boundaries for you (no need for manual locking), when messages are relatively small and discrete (commands, notifications, structured requests), or when you want built-in prioritization/filtering. Shared memory is better for large or frequently-updated data where copying overhead from message passing would be too costly, but it requires you to implement your own synchronization."
          },
          {
            "name": "What are common pitfalls with message queues?",
            "input": "",
            "output": "",
            "code": "Common mistakes include forgetting to remove a queue (IPC_RMID / mq_unlink), leaving it to leak system resources across reboots-free systems or fill up kernel limits; not checking/handling a full queue causing indefinite blocking; using incorrect permissions so other processes can't access the queue; and assuming FIFO ordering across different message types when only same-type messages are strictly ordered."
          }
        ],
        "path": "Linux/message_queues.c, Linux/message_queues_theory.txt"
      },
      {
        "chapter": "MULTITHREADING",
        "folder": "Linux/multithread",
        "programs": [
          {
            "name": "Create a basic thread using pthread_create",
            "input": "(none)",
            "output": "Hello from the new thread!",
            "code": "#include <stdio.h>\n#include <pthread.h>\n\nstatic void *run(void *arg)\n{\n\t(void)arg;\n\tprintf(\"Hello from the new thread!\\n\");\n\treturn NULL;\n}\n\nint main(void)\n{\n\tpthread_t t;\n\n\tpthread_create(&t, NULL, run, NULL);\n\tpthread_join(t, NULL);\n\n\treturn 0;\n}"
          },
          {
            "name": "Pass a single argument to a thread",
            "input": "42",
            "output": "Thread received value: 42",
            "code": "#include <stdio.h>\n#include <pthread.h>\n\nstatic void *run(void *arg)\n{\n\tint value = *(int *)arg;\n\tprintf(\"Thread received value: %d\\n\", value);\n\treturn NULL;\n}\n\nint main(void)\n{\n\tpthread_t t;\n\tint value = 42;\n\n\tpthread_create(&t, NULL, run, &value);\n\tpthread_join(t, NULL);\n\n\treturn 0;\n}"
          },
          {
            "name": "Pass multiple values to a thread using a struct",
            "input": "name=\"Worker\", id=7",
            "output": "Worker #7 started",
            "code": "#include <stdio.h>\n#include <pthread.h>\n\nstruct ThreadArgs\n{\n\tconst char *name;\n\tint id;\n};\n\nstatic void *run(void *arg)\n{\n\tstruct ThreadArgs *args = (struct ThreadArgs *)arg;\n\tprintf(\"%s #%d started\\n\", args->name, args->id);\n\treturn NULL;\n}\n\nint main(void)\n{\n\tpthread_t t;\n\tstruct ThreadArgs args = {\"Worker\", 7};\n\n\tpthread_create(&t, NULL, run, &args);\n\tpthread_join(t, NULL);\n\n\treturn 0;\n}"
          },
          {
            "name": "Return a value from a thread via pthread_exit",
            "input": "(none)",
            "output": "Thread returned: 99",
            "code": "#include <stdio.h>\n#include <stdlib.h>\n#include <pthread.h>\n\nstatic void *run(void *arg)\n{\n\t(void)arg;\n\tint *result = malloc(sizeof(int));\n\t*result = 99;\n\tpthread_exit(result);\n}\n\nint main(void)\n{\n\tpthread_t t;\n\tvoid *returnValue;\n\n\tpthread_create(&t, NULL, run, NULL);\n\tpthread_join(t, &returnValue);\n\n\tprintf(\"Thread returned: %d\\n\", *(int *)returnValue);\n\tfree(returnValue);\n\n\treturn 0;\n}"
          },
          {
            "name": "Join a thread and retrieve its return value with pthread_join",
            "input": "(none)",
            "output": "Joined thread, result = 15",
            "code": "#include <stdio.h>\n#include <pthread.h>\n\nstatic void *run(void *arg)\n{\n\t(void)arg;\n\treturn (void *)(long)15;\n}\n\nint main(void)\n{\n\tpthread_t t;\n\tvoid *result;\n\n\tpthread_create(&t, NULL, run, NULL);\n\tpthread_join(t, &result);\n\n\tprintf(\"Joined thread, result = %ld\\n\", (long)result);\n\treturn 0;\n}"
          },
          {
            "name": "Detach a thread using pthread_detach",
            "input": "(none)",
            "output": "Detached thread running independently",
            "code": "#include <stdio.h>\n#include <unistd.h>\n#include <pthread.h>\n\nstatic void *run(void *arg)\n{\n\t(void)arg;\n\tprintf(\"Detached thread running independently\\n\");\n\treturn NULL;\n}\n\nint main(void)\n{\n\tpthread_t t;\n\n\tpthread_create(&t, NULL, run, NULL);\n\tpthread_detach(t); /* no need to join; resources auto-reclaimed on exit */\n\tsleep(1);\t\t\t/* give the detached thread time to finish for this demo */\n\n\treturn 0;\n}"
          },
          {
            "name": "Create multiple threads in a loop",
            "input": "5 threads",
            "output": "Thread 0 running, Thread 1 running, ... Thread 4 running",
            "code": "#include <stdio.h>\n#include <pthread.h>\n\nstatic void *run(void *arg)\n{\n\tint id = *(int *)arg;\n\tprintf(\"Thread %d running\\n\", id);\n\treturn NULL;\n}\n\nint main(void)\n{\n\tpthread_t threads[5];\n\tint ids[5];\n\n\tfor (int i = 0; i < 5; i++)\n\t{\n\t\tids[i] = i;\n\t\tpthread_create(&threads[i], NULL, run, &ids[i]);\n\t}\n\tfor (int i = 0; i < 5; i++)\n\t\tpthread_join(threads[i], NULL);\n\n\treturn 0;\n}"
          },
          {
            "name": "Get the current thread ID using pthread_self",
            "input": "(none)",
            "output": "Running inside thread ID: 140234...",
            "code": "#include <stdio.h>\n#include <pthread.h>\n\nstatic void *run(void *arg)\n{\n\t(void)arg;\n\tprintf(\"Running inside thread ID: %lu\\n\", (unsigned long)pthread_self());\n\treturn NULL;\n}\n\nint main(void)\n{\n\tpthread_t t;\n\n\tpthread_create(&t, NULL, run, NULL);\n\tpthread_join(t, NULL);\n\n\treturn 0;\n}"
          },
          {
            "name": "Compare thread IDs using pthread_equal",
            "input": "(none)",
            "output": "Main thread and worker thread have different IDs",
            "code": "#include <stdio.h>\n#include <pthread.h>\n\npthread_t mainThreadId;\n\nstatic void *run(void *arg)\n{\n\t(void)arg;\n\tif (!pthread_equal(pthread_self(), mainThreadId))\n\t\tprintf(\"Main thread and worker thread have different IDs\\n\");\n\treturn NULL;\n}\n\nint main(void)\n{\n\tpthread_t t;\n\n\tmainThreadId = pthread_self();\n\tpthread_create(&t, NULL, run, NULL);\n\tpthread_join(t, NULL);\n\n\treturn 0;\n}"
          },
          {
            "name": "Cancel a thread using pthread_cancel",
            "input": "(none)",
            "output": "Worker thread was cancelled before completing its loop",
            "code": "#include <stdio.h>\n#include <unistd.h>\n#include <pthread.h>\n\nstatic void *run(void *arg)\n{\n\t(void)arg;\n\tfor (int i = 0; i < 10; i++)\n\t{\n\t\tprintf(\"Working... %d\\n\", i);\n\t\tsleep(1); /* sleep is a cancellation point */\n\t}\n\treturn NULL;\n}\n\nint main(void)\n{\n\tpthread_t t;\n\n\tpthread_create(&t, NULL, run, NULL);\n\tsleep(2);\n\tpthread_cancel(t);\n\tpthread_join(t, NULL);\n\tprintf(\"Worker thread was cancelled before completing its loop\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Check cancellation points explicitly using pthread_testcancel",
            "input": "(none)",
            "output": "Thread exits at its own checkpoint after being cancelled",
            "code": "#include <stdio.h>\n#include <pthread.h>\n\nstatic void *run(void *arg)\n{\n\t(void)arg;\n\tfor (int i = 0; i < 1000000; i++)\n\t{\n\t\tif (i % 100000 == 0)\n\t\t\tpthread_testcancel(); /* explicit cancellation checkpoint */\n\t}\n\treturn NULL;\n}\n\nint main(void)\n{\n\tpthread_t t;\n\n\tpthread_create(&t, NULL, run, NULL);\n\tpthread_cancel(t);\n\tpthread_join(t, NULL);\n\tprintf(\"Thread exits at its own checkpoint after being cancelled\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Thread-local storage using pthread_key_create",
            "input": "(none)",
            "output": "Thread 0 local value: 100, Thread 1 local value: 200",
            "code": "#include <stdio.h>\n#include <pthread.h>\n\npthread_key_t key;\n\nstatic void *run(void *arg)\n{\n\tint *value = arg;\n\tpthread_setspecific(key, value);\n\n\tint *stored = pthread_getspecific(key);\n\tprintf(\"Thread local value: %d\\n\", *stored);\n\treturn NULL;\n}\n\nint main(void)\n{\n\tpthread_t t1, t2;\n\tint a = 100, b = 200;\n\n\tpthread_key_create(&key, NULL);\n\tpthread_create(&t1, NULL, run, &a);\n\tpthread_create(&t2, NULL, run, &b);\n\tpthread_join(t1, NULL);\n\tpthread_join(t2, NULL);\n\tpthread_key_delete(key);\n\n\treturn 0;\n}"
          },
          {
            "name": "Set a custom stack size using pthread_attr_t",
            "input": "1 MB stack",
            "output": "Thread created with a 1 MB stack size",
            "code": "#include <stdio.h>\n#include <pthread.h>\n\nstatic void *run(void *arg)\n{\n\t(void)arg;\n\tprintf(\"Thread created with a 1 MB stack size\\n\");\n\treturn NULL;\n}\n\nint main(void)\n{\n\tpthread_t t;\n\tpthread_attr_t attr;\n\n\tpthread_attr_init(&attr);\n\tpthread_attr_setstacksize(&attr, 1024 * 1024);\n\n\tpthread_create(&t, &attr, run, NULL);\n\tpthread_join(t, NULL);\n\n\tpthread_attr_destroy(&attr);\n\treturn 0;\n}"
          },
          {
            "name": "Create a detached thread from the start via pthread_attr_setdetachstate",
            "input": "(none)",
            "output": "Thread created already detached, no join needed",
            "code": "#include <stdio.h>\n#include <unistd.h>\n#include <pthread.h>\n\nstatic void *run(void *arg)\n{\n\t(void)arg;\n\tprintf(\"Thread created already detached, no join needed\\n\");\n\treturn NULL;\n}\n\nint main(void)\n{\n\tpthread_t t;\n\tpthread_attr_t attr;\n\n\tpthread_attr_init(&attr);\n\tpthread_attr_setdetachstate(&attr, PTHREAD_CREATE_DETACHED);\n\n\tpthread_create(&t, &attr, run, NULL);\n\tpthread_attr_destroy(&attr);\n\tsleep(1); /* let the detached thread finish for this demo */\n\n\treturn 0;\n}"
          },
          {
            "name": "Implement a simple fixed-size thread pool processing a task queue",
            "input": "4 worker threads, 8 queued tasks",
            "output": "Each task printed as \"Task N processed by worker\" from one of the 4 workers",
            "code": "#include <stdio.h>\n#include <pthread.h>\n\n#define NUM_WORKERS 4\n#define NUM_TASKS 8\n\nint nextTask = 0;\npthread_mutex_t queueLock = PTHREAD_MUTEX_INITIALIZER;\n\nstatic void *worker(void *arg)\n{\n\tint workerId = *(int *)arg;\n\n\twhile (1)\n\t{\n\t\tint task;\n\n\t\tpthread_mutex_lock(&queueLock);\n\t\tif (nextTask >= NUM_TASKS)\n\t\t{\n\t\t\tpthread_mutex_unlock(&queueLock);\n\t\t\tbreak;\n\t\t}\n\t\ttask = nextTask++;\n\t\tpthread_mutex_unlock(&queueLock);\n\n\t\tprintf(\"Task %d processed by worker %d\\n\", task, workerId);\n\t}\n\treturn NULL;\n}\n\nint main(void)\n{\n\tpthread_t workers[NUM_WORKERS];\n\tint ids[NUM_WORKERS];\n\n\tfor (int i = 0; i < NUM_WORKERS; i++)\n\t{\n\t\tids[i] = i;\n\t\tpthread_create(&workers[i], NULL, worker, &ids[i]);\n\t}\n\tfor (int i = 0; i < NUM_WORKERS; i++)\n\t\tpthread_join(workers[i], NULL);\n\n\treturn 0;\n}"
          },
          {
            "name": "Run initialization code exactly once using pthread_once",
            "input": "3 threads all trying to initialize",
            "output": "Initialized exactly once (printed only one time despite 3 threads)",
            "code": "#include <stdio.h>\n#include <pthread.h>\n\npthread_once_t initFlag = PTHREAD_ONCE_INIT;\n\nstatic void initialize(void)\n{\n\tprintf(\"Initialized exactly once\\n\");\n}\n\nstatic void *run(void *arg)\n{\n\t(void)arg;\n\tpthread_once(&initFlag, initialize);\n\treturn NULL;\n}\n\nint main(void)\n{\n\tpthread_t threads[3];\n\n\tfor (int i = 0; i < 3; i++)\n\t\tpthread_create(&threads[i], NULL, run, NULL);\n\tfor (int i = 0; i < 3; i++)\n\t\tpthread_join(threads[i], NULL);\n\n\treturn 0;\n}"
          },
          {
            "name": "Barrier synchronization using pthread_barrier_t",
            "input": "3 threads that must all reach a checkpoint before continuing",
            "output": "All 3 threads pass the barrier together, then continue",
            "code": "#include <stdio.h>\n#include <pthread.h>\n\npthread_barrier_t barrier;\n\nstatic void *run(void *arg)\n{\n\tint id = *(int *)arg;\n\n\tprintf(\"Thread %d waiting at barrier\\n\", id);\n\tpthread_barrier_wait(&barrier);\n\tprintf(\"Thread %d passed the barrier\\n\", id);\n\treturn NULL;\n}\n\nint main(void)\n{\n\tpthread_t threads[3];\n\tint ids[3] = {0, 1, 2};\n\n\tpthread_barrier_init(&barrier, NULL, 3);\n\tfor (int i = 0; i < 3; i++)\n\t\tpthread_create(&threads[i], NULL, run, &ids[i]);\n\tfor (int i = 0; i < 3; i++)\n\t\tpthread_join(threads[i], NULL);\n\tpthread_barrier_destroy(&barrier);\n\n\treturn 0;\n}"
          },
          {
            "name": "Read-write lock allowing multiple readers or one writer (pthread_rwlock_t)",
            "input": "3 reader threads, 1 writer thread",
            "output": "Readers run concurrently; the writer gets exclusive access",
            "code": "#include <stdio.h>\n#include <pthread.h>\n\npthread_rwlock_t lock = PTHREAD_RWLOCK_INITIALIZER;\nint sharedValue = 0;\n\nstatic void *reader(void *arg)\n{\n\t(void)arg;\n\tpthread_rwlock_rdlock(&lock);\n\tprintf(\"Reader sees value: %d\\n\", sharedValue);\n\tpthread_rwlock_unlock(&lock);\n\treturn NULL;\n}\n\nstatic void *writer(void *arg)\n{\n\t(void)arg;\n\tpthread_rwlock_wrlock(&lock);\n\tsharedValue = 42;\n\tprintf(\"Writer updated value to %d\\n\", sharedValue);\n\tpthread_rwlock_unlock(&lock);\n\treturn NULL;\n}\n\nint main(void)\n{\n\tpthread_t readers[3], w;\n\n\tpthread_create(&w, NULL, writer, NULL);\n\tfor (int i = 0; i < 3; i++)\n\t\tpthread_create(&readers[i], NULL, reader, NULL);\n\n\tpthread_join(w, NULL);\n\tfor (int i = 0; i < 3; i++)\n\t\tpthread_join(readers[i], NULL);\n\n\treturn 0;\n}"
          },
          {
            "name": "Spinlock using pthread_spinlock_t",
            "input": "2 threads incrementing a shared counter",
            "output": "Final counter value: 200000",
            "code": "#include <stdio.h>\n#include <pthread.h>\n\npthread_spinlock_t spinlock;\nint counter = 0;\n\nstatic void *increment(void *arg)\n{\n\t(void)arg;\n\tfor (int i = 0; i < 100000; i++)\n\t{\n\t\tpthread_spin_lock(&spinlock);\n\t\tcounter++;\n\t\tpthread_spin_unlock(&spinlock);\n\t}\n\treturn NULL;\n}\n\nint main(void)\n{\n\tpthread_t t1, t2;\n\n\tpthread_spin_init(&spinlock, PTHREAD_PROCESS_PRIVATE);\n\tpthread_create(&t1, NULL, increment, NULL);\n\tpthread_create(&t2, NULL, increment, NULL);\n\tpthread_join(t1, NULL);\n\tpthread_join(t2, NULL);\n\n\tprintf(\"Final counter value: %d\\n\", counter);\n\tpthread_spin_destroy(&spinlock);\n\treturn 0;\n}"
          },
          {
            "name": "Thread-safe singleton pattern using pthread_once",
            "input": "5 threads requesting the singleton instance",
            "output": "Singleton created once (printed only one time despite 5 threads)",
            "code": "#include <stdio.h>\n#include <stdlib.h>\n#include <pthread.h>\n\nstatic int *instance = NULL;\nstatic pthread_once_t once = PTHREAD_ONCE_INIT;\n\nstatic void createInstance(void)\n{\n\tinstance = malloc(sizeof(int));\n\t*instance = 1;\n\tprintf(\"Singleton created once\\n\");\n}\n\nstatic int *getInstance(void)\n{\n\tpthread_once(&once, createInstance);\n\treturn instance;\n}\n\nstatic void *run(void *arg)\n{\n\t(void)arg;\n\tgetInstance();\n\treturn NULL;\n}\n\nint main(void)\n{\n\tpthread_t threads[5];\n\n\tfor (int i = 0; i < 5; i++)\n\t\tpthread_create(&threads[i], NULL, run, NULL);\n\tfor (int i = 0; i < 5; i++)\n\t\tpthread_join(threads[i], NULL);\n\n\tfree(instance);\n\treturn 0;\n}"
          },
          {
            "name": "Parallel array sum split across multiple threads",
            "input": "array of 1,000,000 ints split across 4 threads",
            "output": "Total sum computed by combining each thread's partial sum",
            "code": "#include <stdio.h>\n#include <pthread.h>\n\n#define SIZE 1000000\n#define NUM_THREADS 4\n\nint data[SIZE];\nlong partialSums[NUM_THREADS];\n\nstruct Range\n{\n\tint start, end, threadIndex;\n};\n\nstatic void *sumRange(void *arg)\n{\n\tstruct Range *range = arg;\n\tlong sum = 0;\n\n\tfor (int i = range->start; i < range->end; i++)\n\t\tsum += data[i];\n\n\tpartialSums[range->threadIndex] = sum;\n\treturn NULL;\n}\n\nint main(void)\n{\n\tpthread_t threads[NUM_THREADS];\n\tstruct Range ranges[NUM_THREADS];\n\tint chunk = SIZE / NUM_THREADS;\n\tlong total = 0;\n\n\tfor (int i = 0; i < SIZE; i++)\n\t\tdata[i] = 1;\n\n\tfor (int i = 0; i < NUM_THREADS; i++)\n\t{\n\t\tranges[i].start = i * chunk;\n\t\tranges[i].end = (i == NUM_THREADS - 1) ? SIZE : (i + 1) * chunk;\n\t\tranges[i].threadIndex = i;\n\t\tpthread_create(&threads[i], NULL, sumRange, &ranges[i]);\n\t}\n\n\tfor (int i = 0; i < NUM_THREADS; i++)\n\t{\n\t\tpthread_join(threads[i], NULL);\n\t\ttotal += partialSums[i];\n\t}\n\n\tprintf(\"Total sum: %ld\\n\", total);\n\treturn 0;\n}"
          },
          {
            "name": "Producer-consumer with multiple producer and consumer threads",
            "input": "2 producers, 2 consumers, shared bounded buffer",
            "output": "All produced items are eventually consumed exactly once",
            "code": "#include <stdio.h>\n#include <pthread.h>\n#include <semaphore.h>\n\n#define BUFFER_SIZE 10\nint buffer[BUFFER_SIZE];\nint in = 0, out = 0;\nsem_t emptySlots, fullSlots;\npthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;\n\nstatic void *producer(void *arg)\n{\n\tint id = *(int *)arg;\n\n\tfor (int i = 0; i < 5; i++)\n\t{\n\t\tsem_wait(&emptySlots);\n\t\tpthread_mutex_lock(&mutex);\n\t\tbuffer[in] = id * 100 + i;\n\t\tin = (in + 1) % BUFFER_SIZE;\n\t\tpthread_mutex_unlock(&mutex);\n\t\tsem_post(&fullSlots);\n\t}\n\treturn NULL;\n}\n\nstatic void *consumer(void *arg)\n{\n\t(void)arg;\n\tfor (int i = 0; i < 5; i++)\n\t{\n\t\tsem_wait(&fullSlots);\n\t\tpthread_mutex_lock(&mutex);\n\t\tint value = buffer[out];\n\t\tout = (out + 1) % BUFFER_SIZE;\n\t\tpthread_mutex_unlock(&mutex);\n\t\tsem_post(&emptySlots);\n\t\tprintf(\"Consumed: %d\\n\", value);\n\t}\n\treturn NULL;\n}\n\nint main(void)\n{\n\tpthread_t producers[2], consumers[2];\n\tint ids[2] = {1, 2};\n\n\tsem_init(&emptySlots, 0, BUFFER_SIZE);\n\tsem_init(&fullSlots, 0, 0);\n\n\tfor (int i = 0; i < 2; i++)\n\t\tpthread_create(&producers[i], NULL, producer, &ids[i]);\n\tfor (int i = 0; i < 2; i++)\n\t\tpthread_create(&consumers[i], NULL, consumer, NULL);\n\n\tfor (int i = 0; i < 2; i++)\n\t\tpthread_join(producers[i], NULL);\n\tfor (int i = 0; i < 2; i++)\n\t\tpthread_join(consumers[i], NULL);\n\n\tsem_destroy(&emptySlots);\n\tsem_destroy(&fullSlots);\n\treturn 0;\n}"
          },
          {
            "name": "Set a thread's scheduling policy and priority (pthread_attr_setschedpolicy)",
            "input": "SCHED_FIFO, priority 10 (requires elevated privileges to take effect)",
            "output": "Thread attributes configured for real-time scheduling",
            "code": "#include <stdio.h>\n#include <pthread.h>\n\nstatic void *run(void *arg)\n{\n\t(void)arg;\n\tprintf(\"Thread running with requested real-time scheduling attributes\\n\");\n\treturn NULL;\n}\n\nint main(void)\n{\n\tpthread_t t;\n\tpthread_attr_t attr;\n\tstruct sched_param param;\n\n\tpthread_attr_init(&attr);\n\tpthread_attr_setschedpolicy(&attr, SCHED_FIFO);\n\tparam.sched_priority = 10;\n\tpthread_attr_setschedparam(&attr, &param);\n\tpthread_attr_setinheritsched(&attr, PTHREAD_EXPLICIT_SCHED);\n\n\tif (pthread_create(&t, &attr, run, NULL) != 0)\n\t\tprintf(\"Requires elevated privileges; falling back to default scheduling\\n\");\n\telse\n\t\tpthread_join(t, NULL);\n\n\tpthread_attr_destroy(&attr);\n\treturn 0;\n}"
          },
          {
            "name": "Block signals in worker threads, handle them only in a dedicated thread",
            "input": "SIGUSR1 sent to the process",
            "output": "Signal handling thread received signal 10 (SIGUSR1)",
            "code": "#include <stdio.h>\n#include <signal.h>\n#include <pthread.h>\n\nstatic void *signalHandlerThread(void *arg)\n{\n\tsigset_t *set = arg;\n\tint signalNumber;\n\n\tsigwait(set, &signalNumber);\n\tprintf(\"Signal handling thread received signal %d\\n\", signalNumber);\n\treturn NULL;\n}\n\nint main(void)\n{\n\tsigset_t set;\n\tpthread_t t;\n\n\tsigemptyset(&set);\n\tsigaddset(&set, SIGUSR1);\n\tpthread_sigmask(SIG_BLOCK, &set, NULL); /* block in all threads created after this */\n\n\tpthread_create(&t, NULL, signalHandlerThread, &set);\n\traise(SIGUSR1); /* simulate an external signal for this demo */\n\tpthread_join(t, NULL);\n\n\treturn 0;\n}"
          },
          {
            "name": "Use atomic operations (C11 stdatomic) instead of a mutex for a counter",
            "input": "2 threads each incrementing 100000 times",
            "output": "Final counter value: 200000 (correct without any mutex)",
            "code": "#include <stdio.h>\n#include <stdatomic.h>\n#include <pthread.h>\n\natomic_int counter = 0;\n\nstatic void *increment(void *arg)\n{\n\t(void)arg;\n\tfor (int i = 0; i < 100000; i++)\n\t\tatomic_fetch_add(&counter, 1);\n\treturn NULL;\n}\n\nint main(void)\n{\n\tpthread_t t1, t2;\n\n\tpthread_create(&t1, NULL, increment, NULL);\n\tpthread_create(&t2, NULL, increment, NULL);\n\tpthread_join(t1, NULL);\n\tpthread_join(t2, NULL);\n\n\tprintf(\"Final counter value: %d\\n\", atomic_load(&counter));\n\treturn 0;\n}"
          },
          {
            "name": "Pin a thread to a specific CPU core using pthread_setaffinity_np",
            "input": "pin to CPU core 0",
            "output": "Thread affinity set to CPU core 0",
            "code": "#define _GNU_SOURCE\n#include <stdio.h>\n#include <pthread.h>\n\nstatic void *run(void *arg)\n{\n\t(void)arg;\n\tprintf(\"Thread affinity set to CPU core 0\\n\");\n\treturn NULL;\n}\n\nint main(void)\n{\n\tpthread_t t;\n\tcpu_set_t cpuset;\n\n\tpthread_create(&t, NULL, run, NULL);\n\n\tCPU_ZERO(&cpuset);\n\tCPU_SET(0, &cpuset);\n\tpthread_setaffinity_np(t, sizeof(cpu_set_t), &cpuset);\n\n\tpthread_join(t, NULL);\n\treturn 0;\n}"
          },
          {
            "name": "Timed join using pthread_timedjoin_np (GNU extension)",
            "input": "wait at most 2 seconds for a slow thread",
            "output": "Timed out waiting for the thread to finish",
            "code": "#define _GNU_SOURCE\n#include <stdio.h>\n#include <time.h>\n#include <unistd.h>\n#include <pthread.h>\n\nstatic void *slowWork(void *arg)\n{\n\t(void)arg;\n\tsleep(5);\n\treturn NULL;\n}\n\nint main(void)\n{\n\tpthread_t t;\n\tstruct timespec timeout;\n\n\tpthread_create(&t, NULL, slowWork, NULL);\n\n\tclock_gettime(CLOCK_REALTIME, &timeout);\n\ttimeout.tv_sec += 2;\n\n\tif (pthread_timedjoin_np(t, NULL, &timeout) != 0)\n\t\tprintf(\"Timed out waiting for the thread to finish\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Register cleanup handlers with pthread_cleanup_push/pop",
            "input": "thread cancelled mid-execution",
            "output": "Cleanup handler ran: releasing resources",
            "code": "#include <stdio.h>\n#include <pthread.h>\n\nstatic void cleanup(void *arg)\n{\n\t(void)arg;\n\tprintf(\"Cleanup handler ran: releasing resources\\n\");\n}\n\nstatic void *run(void *arg)\n{\n\t(void)arg;\n\tpthread_cleanup_push(cleanup, NULL);\n\n\tfor (;;)\n\t\tpthread_testcancel(); /* cancellation point; cleanup runs when cancelled */\n\n\tpthread_cleanup_pop(0); /* unreachable in this demo, kept for correct pairing */\n\treturn NULL;\n}\n\nint main(void)\n{\n\tpthread_t t;\n\n\tpthread_create(&t, NULL, run, NULL);\n\tpthread_cancel(t);\n\tpthread_join(t, NULL);\n\n\treturn 0;\n}"
          },
          {
            "name": "Graceful thread shutdown using a shared \"stop\" flag",
            "input": "worker checks the flag every iteration instead of being forcibly cancelled",
            "output": "Worker exiting gracefully after stop flag was set",
            "code": "#include <stdio.h>\n#include <unistd.h>\n#include <pthread.h>\n#include <stdatomic.h>\n\natomic_int stopRequested = 0;\n\nstatic void *run(void *arg)\n{\n\t(void)arg;\n\twhile (!atomic_load(&stopRequested))\n\t\tusleep(100000); /* poll the flag periodically instead of hard-cancelling */\n\n\tprintf(\"Worker exiting gracefully after stop flag was set\\n\");\n\treturn NULL;\n}\n\nint main(void)\n{\n\tpthread_t t;\n\n\tpthread_create(&t, NULL, run, NULL);\n\tsleep(1);\n\tatomic_store(&stopRequested, 1);\n\tpthread_join(t, NULL);\n\n\treturn 0;\n}"
          },
          {
            "name": "Measure and compare execution time of single-threaded vs multi-threaded work",
            "input": "sum of 40,000,000 numbers, single thread vs 4 threads",
            "output": "Single-threaded time: 0.12s, Multi-threaded time: 0.04s",
            "code": "#include <stdio.h>\n#include <time.h>\n#include <pthread.h>\n\n#define TOTAL 40000000\n#define THREAD_COUNT 4\n\nlong partial[THREAD_COUNT];\n\nstruct Range\n{\n\tlong start, end, index;\n};\n\nstatic void *sumRange(void *arg)\n{\n\tstruct Range *range = arg;\n\tlong sum = 0;\n\n\tfor (long i = range->start; i < range->end; i++)\n\t\tsum += i;\n\n\tpartial[range->index] = sum;\n\treturn NULL;\n}\n\nstatic double elapsedSeconds(struct timespec start, struct timespec end)\n{\n\treturn (end.tv_sec - start.tv_sec) + (end.tv_nsec - start.tv_nsec) / 1e9;\n}\n\nint main(void)\n{\n\tstruct timespec start, end;\n\tlong singleSum = 0;\n\n\tclock_gettime(CLOCK_MONOTONIC, &start);\n\tfor (long i = 0; i < TOTAL; i++)\n\t\tsingleSum += i;\n\tclock_gettime(CLOCK_MONOTONIC, &end);\n\tprintf(\"Single-threaded time: %.4fs\\n\", elapsedSeconds(start, end));\n\n\tpthread_t threads[THREAD_COUNT];\n\tstruct Range ranges[THREAD_COUNT];\n\tlong chunk = TOTAL / THREAD_COUNT;\n\n\tclock_gettime(CLOCK_MONOTONIC, &start);\n\tfor (int i = 0; i < THREAD_COUNT; i++)\n\t{\n\t\tranges[i].start = i * chunk;\n\t\tranges[i].end = (i == THREAD_COUNT - 1) ? TOTAL : (i + 1) * chunk;\n\t\tranges[i].index = i;\n\t\tpthread_create(&threads[i], NULL, sumRange, &ranges[i]);\n\t}\n\tfor (int i = 0; i < THREAD_COUNT; i++)\n\t\tpthread_join(threads[i], NULL);\n\tclock_gettime(CLOCK_MONOTONIC, &end);\n\tprintf(\"Multi-threaded time: %.4fs\\n\", elapsedSeconds(start, end));\n\n\treturn 0;\n}"
          }
        ],
        "path": "Linux/multithread/multithreading.c"
      },
      {
        "chapter": "SYNCHRONIZATION USING MUTEX",
        "folder": "Linux",
        "programs": [
          {
            "name": "Basic pthread mutex lock/unlock around a shared counter",
            "input": "2 threads each incrementing 100000 times",
            "output": "Final counter value: 200000",
            "code": "#include <stdio.h>\n#include <pthread.h>\n\nint counter = 0;\npthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;\n\nstatic void *increment(void *arg)\n{\n\t(void)arg;\n\tfor (int i = 0; i < 100000; i++)\n\t{\n\t\tpthread_mutex_lock(&lock);\n\t\tcounter++;\n\t\tpthread_mutex_unlock(&lock);\n\t}\n\treturn NULL;\n}\n\nint main(void)\n{\n\tpthread_t t1, t2;\n\n\tpthread_create(&t1, NULL, increment, NULL);\n\tpthread_create(&t2, NULL, increment, NULL);\n\tpthread_join(t1, NULL);\n\tpthread_join(t2, NULL);\n\n\tprintf(\"Final counter value: %d\\n\", counter);\n\treturn 0;\n}"
          },
          {
            "name": "Demonstrate a race condition without a mutex",
            "input": "2 threads each incrementing 100000 times, no locking",
            "output": "Final counter value is usually less than 200000 (lost updates)",
            "code": "#include <stdio.h>\n#include <pthread.h>\n\nint counter = 0;\n\nstatic void *increment(void *arg)\n{\n\t(void)arg;\n\tfor (int i = 0; i < 100000; i++)\n\t\tcounter++; /* not atomic: read-modify-write race between threads */\n\treturn NULL;\n}\n\nint main(void)\n{\n\tpthread_t t1, t2;\n\n\tpthread_create(&t1, NULL, increment, NULL);\n\tpthread_create(&t2, NULL, increment, NULL);\n\tpthread_join(t1, NULL);\n\tpthread_join(t2, NULL);\n\n\tprintf(\"Final counter value (expected 200000, likely less): %d\\n\", counter);\n\treturn 0;\n}"
          },
          {
            "name": "pthread_mutex_trylock for a non-blocking lock attempt",
            "input": "mutex already locked by main thread",
            "output": "Could not acquire the lock right now, doing other work instead",
            "code": "#include <stdio.h>\n#include <pthread.h>\n\nint main(void)\n{\n\tpthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;\n\n\tpthread_mutex_lock(&lock); /* held by \"main thread\" for this demo */\n\n\tif (pthread_mutex_trylock(&lock) != 0)\n\t\tprintf(\"Could not acquire the lock right now, doing other work instead\\n\");\n\n\tpthread_mutex_unlock(&lock);\n\treturn 0;\n}"
          },
          {
            "name": "Recursive mutex (PTHREAD_MUTEX_RECURSIVE)",
            "input": "same thread locks the mutex twice (nested calls)",
            "output": "Locked twice by the same thread without deadlocking",
            "code": "#include <stdio.h>\n#include <pthread.h>\n\npthread_mutex_t lock;\n\nstatic void inner(void)\n{\n\tpthread_mutex_lock(&lock);\n\tprintf(\"Inner lock acquired (second, nested, lock)\\n\");\n\tpthread_mutex_unlock(&lock);\n}\n\nint main(void)\n{\n\tpthread_mutexattr_t attr;\n\n\tpthread_mutexattr_init(&attr);\n\tpthread_mutexattr_settype(&attr, PTHREAD_MUTEX_RECURSIVE);\n\tpthread_mutex_init(&lock, &attr);\n\n\tpthread_mutex_lock(&lock);\n\tprintf(\"Outer lock acquired\\n\");\n\tinner(); /* would deadlock with a normal mutex; fine with recursive */\n\tpthread_mutex_unlock(&lock);\n\n\tpthread_mutex_destroy(&lock);\n\tpthread_mutexattr_destroy(&attr);\n\treturn 0;\n}"
          },
          {
            "name": "Multiple threads safely incrementing a shared counter with a mutex",
            "input": "4 threads each incrementing 50000 times",
            "output": "Final counter value: 200000",
            "code": "#include <stdio.h>\n#include <pthread.h>\n\n#define NUM_THREADS 4\nint counter = 0;\npthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;\n\nstatic void *increment(void *arg)\n{\n\t(void)arg;\n\tfor (int i = 0; i < 50000; i++)\n\t{\n\t\tpthread_mutex_lock(&lock);\n\t\tcounter++;\n\t\tpthread_mutex_unlock(&lock);\n\t}\n\treturn NULL;\n}\n\nint main(void)\n{\n\tpthread_t threads[NUM_THREADS];\n\n\tfor (int i = 0; i < NUM_THREADS; i++)\n\t\tpthread_create(&threads[i], NULL, increment, NULL);\n\tfor (int i = 0; i < NUM_THREADS; i++)\n\t\tpthread_join(threads[i], NULL);\n\n\tprintf(\"Final counter value: %d\\n\", counter);\n\treturn 0;\n}"
          },
          {
            "name": "Using a mutex to protect a shared linked-list style queue",
            "input": "push 1, 2, 3 from one thread; pop them from another",
            "output": "Popped: 1, Popped: 2, Popped: 3",
            "code": "#include <stdio.h>\n#include <stdlib.h>\n#include <pthread.h>\n\nstruct Node\n{\n\tint value;\n\tstruct Node *next;\n};\n\nstruct Node *head = NULL;\npthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;\n\nstatic void push(int value)\n{\n\tstruct Node *node = malloc(sizeof(struct Node));\n\n\tnode->value = value;\n\n\tpthread_mutex_lock(&lock);\n\tnode->next = head;\n\thead = node;\n\tpthread_mutex_unlock(&lock);\n}\n\nstatic int pop(int *value)\n{\n\tpthread_mutex_lock(&lock);\n\tif (head == NULL)\n\t{\n\t\tpthread_mutex_unlock(&lock);\n\t\treturn 0;\n\t}\n\tstruct Node *node = head;\n\t*value = node->value;\n\thead = head->next;\n\tpthread_mutex_unlock(&lock);\n\tfree(node);\n\treturn 1;\n}\n\nint main(void)\n{\n\tint value;\n\n\tpush(3);\n\tpush(2);\n\tpush(1);\n\n\twhile (pop(&value))\n\t\tprintf(\"Popped: %d\\n\", value);\n\n\treturn 0;\n}"
          },
          {
            "name": "Deadlock demonstration with two mutexes locked in different order",
            "input": "thread A locks m1 then m2; thread B locks m2 then m1",
            "output": "Both threads block forever waiting on each other (deadlock)",
            "code": "#include <stdio.h>\n#include <pthread.h>\n#include <unistd.h>\n\npthread_mutex_t m1 = PTHREAD_MUTEX_INITIALIZER;\npthread_mutex_t m2 = PTHREAD_MUTEX_INITIALIZER;\n\nstatic void *threadA(void *arg)\n{\n\t(void)arg;\n\tpthread_mutex_lock(&m1);\n\tsleep(1); /* gives threadB time to lock m2 first, forcing the deadlock */\n\tpthread_mutex_lock(&m2); /* blocks: threadB holds m2 and wants m1 */\n\tpthread_mutex_unlock(&m2);\n\tpthread_mutex_unlock(&m1);\n\treturn NULL;\n}\n\nstatic void *threadB(void *arg)\n{\n\t(void)arg;\n\tpthread_mutex_lock(&m2);\n\tsleep(1);\n\tpthread_mutex_lock(&m1); /* blocks: threadA holds m1 and wants m2 */\n\tpthread_mutex_unlock(&m1);\n\tpthread_mutex_unlock(&m2);\n\treturn NULL;\n}\n\nint main(void)\n{\n\tpthread_t a, b;\n\n\tpthread_create(&a, NULL, threadA, NULL);\n\tpthread_create(&b, NULL, threadB, NULL);\n\n\tpthread_join(a, NULL); /* this demo intentionally hangs, illustrating deadlock */\n\tpthread_join(b, NULL);\n\n\treturn 0;\n}"
          },
          {
            "name": "Deadlock avoidance using consistent lock ordering",
            "input": "both threads always lock m1 before m2",
            "output": "Both threads complete without deadlocking",
            "code": "#include <stdio.h>\n#include <pthread.h>\n\npthread_mutex_t m1 = PTHREAD_MUTEX_INITIALIZER;\npthread_mutex_t m2 = PTHREAD_MUTEX_INITIALIZER;\n\nstatic void *threadA(void *arg)\n{\n\t(void)arg;\n\tpthread_mutex_lock(&m1);\n\tpthread_mutex_lock(&m2); /* same order as threadB: m1 then m2 */\n\tprintf(\"Thread A completed safely\\n\");\n\tpthread_mutex_unlock(&m2);\n\tpthread_mutex_unlock(&m1);\n\treturn NULL;\n}\n\nstatic void *threadB(void *arg)\n{\n\t(void)arg;\n\tpthread_mutex_lock(&m1);\n\tpthread_mutex_lock(&m2);\n\tprintf(\"Thread B completed safely\\n\");\n\tpthread_mutex_unlock(&m2);\n\tpthread_mutex_unlock(&m1);\n\treturn NULL;\n}\n\nint main(void)\n{\n\tpthread_t a, b;\n\n\tpthread_create(&a, NULL, threadA, NULL);\n\tpthread_create(&b, NULL, threadB, NULL);\n\tpthread_join(a, NULL);\n\tpthread_join(b, NULL);\n\n\treturn 0;\n}"
          },
          {
            "name": "Mutex and condition variable used to signal between threads",
            "input": "worker waits for a \"ready\" flag set by main",
            "output": "Worker was signaled and started processing",
            "code": "#include <stdio.h>\n#include <pthread.h>\n\npthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;\npthread_cond_t cond = PTHREAD_COND_INITIALIZER;\nint ready = 0;\n\nstatic void *worker(void *arg)\n{\n\t(void)arg;\n\tpthread_mutex_lock(&lock);\n\twhile (!ready)\n\t\tpthread_cond_wait(&cond, &lock); /* atomically unlocks and sleeps */\n\tpthread_mutex_unlock(&lock);\n\n\tprintf(\"Worker was signaled and started processing\\n\");\n\treturn NULL;\n}\n\nint main(void)\n{\n\tpthread_t t;\n\n\tpthread_create(&t, NULL, worker, NULL);\n\n\tpthread_mutex_lock(&lock);\n\tready = 1;\n\tpthread_cond_signal(&cond);\n\tpthread_mutex_unlock(&lock);\n\n\tpthread_join(t, NULL);\n\treturn 0;\n}"
          },
          {
            "name": "Timed mutex lock using pthread_mutex_timedlock",
            "input": "wait at most 2 seconds for a lock held by another thread",
            "output": "Timed out waiting for the lock after 2 seconds",
            "code": "#include <stdio.h>\n#include <time.h>\n#include <pthread.h>\n\nint main(void)\n{\n\tpthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;\n\tstruct timespec timeout;\n\n\tpthread_mutex_lock(&lock); /* held already, simulating contention */\n\n\tclock_gettime(CLOCK_REALTIME, &timeout);\n\ttimeout.tv_sec += 2;\n\n\tif (pthread_mutex_timedlock(&lock, &timeout) != 0)\n\t\tprintf(\"Timed out waiting for the lock after 2 seconds\\n\");\n\n\tpthread_mutex_unlock(&lock);\n\treturn 0;\n}"
          },
          {
            "name": "What is a mutex and how does it differ from a semaphore?",
            "input": "",
            "output": "",
            "code": "A mutex (mutual exclusion lock) allows only one thread to hold it at a time and is specifically meant for protecting a critical section, with the concept of \"ownership\" - typically only the thread that locked it may unlock it, which enables optimizations like priority inheritance. A semaphore is a more general counting primitive with no ownership concept - any thread can signal it, and it can allow more than one holder (a counting semaphore), making it suited for both resource counting and cross-thread signaling, not just mutual exclusion."
          },
          {
            "name": "What is a critical section and why must it be protected?",
            "input": "",
            "output": "",
            "code": "A critical section is a piece of code that accesses shared data/resources that must not be concurrently modified by more than one thread/process at a time, or the data could end up in an inconsistent or corrupted state. It must be protected (typically with a mutex) so that only one thread executes it at a time, ensuring operations like read-modify-write are effectively atomic from the perspective of other threads."
          },
          {
            "name": "What is a race condition? Give a simple example.",
            "input": "",
            "output": "",
            "code": "A race condition occurs when the correctness of a program depends on the relative timing of two or more threads/processes accessing shared data without proper synchronization. A classic example is two threads both executing \"counter++\" (read counter, add 1, write counter back) - if both read the same old value before either writes back, one increment is lost, so the final value ends up less than expected."
          },
          {
            "name": "What is deadlock and what are the four necessary conditions for it?",
            "input": "",
            "output": "",
            "code": "Deadlock is a state where two or more threads/processes are blocked forever, each waiting for a resource held by another. The four necessary (Coffman) conditions are: mutual exclusion (resources can't be shared), hold and wait (a thread holds one resource while waiting for another), no preemption (resources can't be forcibly taken away), and circular wait (a cycle of threads each waiting on the next). Breaking any one of these conditions prevents deadlock."
          },
          {
            "name": "What is a recursive mutex and when is it needed?",
            "input": "",
            "output": "",
            "code": "A recursive mutex allows the same thread to lock it multiple times without deadlocking itself, as long as it unlocks it the same number of times before another thread can acquire it. It's needed when a function that locks a mutex might call itself recursively, or when multiple functions that each lock the same mutex might call each other, and refactoring to avoid nested locking isn't practical."
          },
          {
            "name": "What is priority inversion and how does a priority-inheritance mutex help?",
            "input": "",
            "output": "",
            "code": "Priority inversion happens when a low-priority thread holds a lock needed by a high-priority thread, and a medium-priority thread preempts the low-priority holder, effectively letting medium-priority work delay high-priority work indefinitely. A priority-inheritance mutex temporarily boosts the lock holder's priority to match the highest-priority waiter, so it can finish and release the lock quickly, preventing medium-priority threads from starving the high-priority one."
          },
          {
            "name": "What is the difference between spinlocks and mutexes?",
            "input": "",
            "output": "",
            "code": "A spinlock makes a waiting thread busy-loop (spin), continuously checking if the lock is free, consuming CPU the whole time but avoiding the overhead of a context switch/sleep - useful for very short critical sections, especially in kernel code or multi-core systems where the wait is expected to be brief. A mutex instead puts the waiting thread to sleep (blocking it) so the CPU can be used by other work, which is more efficient when the lock might be held for longer periods."
          },
          {
            "name": "What is a condition variable and how does it work with a mutex?",
            "input": "",
            "output": "",
            "code": "A condition variable lets a thread sleep until notified that some condition may have changed, without busy-waiting. It's always used together with a mutex: a thread locks the mutex, checks the condition in a loop, and calls pthread_cond_wait() (which atomically unlocks the mutex and sleeps) if the condition is false; another thread that changes the condition calls pthread_cond_signal()/broadcast() after locking the same mutex to wake waiters, which then re-acquire the mutex before re-checking the condition."
          },
          {
            "name": "What is the difference between a user-space mutex (pthread) and kernel-level locking (futex)?",
            "input": "",
            "output": "",
            "code": "A pthread mutex is implemented in user space using a \"fast userspace mutex\" (futex) under the hood on Linux: in the uncontended case, locking/unlocking is done entirely in user space with a single atomic CPU instruction, with no system call at all. Only when there's actual contention (a thread must wait) does the implementation fall back to a futex() system call to let the kernel put the thread to sleep and later wake it - this hybrid design makes pthread mutexes very fast in the common, uncontended case."
          },
          {
            "name": "What is starvation and how can it occur with mutexes?",
            "input": "",
            "output": "",
            "code": "Starvation is when a thread is perpetually denied access to a resource it needs, even though the system as a whole is making progress, because other threads keep getting scheduled ahead of it. With mutexes, this can happen if the underlying implementation isn't fair (e.g. always grants the lock to the most recently queued waiter, or to whichever thread happens to retry fastest), so a particular thread can be repeatedly passed over indefinitely even without a full deadlock."
          }
        ],
        "path": "Linux/mutex_sync.c, Linux/mutex_sync_theory.txt"
      },
      {
        "chapter": "PIPES AND FIFOS",
        "folder": "Linux",
        "programs": [
          {
            "name": "Anonymous pipe between parent and child (pipe())",
            "input": "(none)",
            "output": "Message from child: Hello from child!",
            "code": "#include <stdio.h>\n#include <string.h>\n#include <unistd.h>\n\nint main(void)\n{\n\tint fd[2];\n\tchar buffer[64];\n\n\tpipe(fd);\n\n\tif (fork() == 0)\n\t{\n\t\tclose(fd[0]);\n\t\twrite(fd[1], \"Hello from child!\", 18);\n\t\tclose(fd[1]);\n\t\treturn 0;\n\t}\n\n\tclose(fd[1]);\n\tread(fd[0], buffer, sizeof(buffer));\n\tclose(fd[0]);\n\tprintf(\"Message from child: %s\\n\", buffer);\n\n\treturn 0;\n}"
          },
          {
            "name": "Bidirectional communication using two pipes",
            "input": "(none)",
            "output": "Parent got: pong, Child got: ping",
            "code": "#include <stdio.h>\n#include <string.h>\n#include <unistd.h>\n\nint main(void)\n{\n\tint parentToChild[2], childToParent[2];\n\tchar buffer[64];\n\n\tpipe(parentToChild);\n\tpipe(childToParent);\n\n\tif (fork() == 0)\n\t{\n\t\tclose(parentToChild[1]);\n\t\tclose(childToParent[0]);\n\t\tread(parentToChild[0], buffer, sizeof(buffer));\n\t\tprintf(\"Child got: %s\\n\", buffer);\n\t\twrite(childToParent[1], \"pong\", 5);\n\t\treturn 0;\n\t}\n\n\tclose(parentToChild[0]);\n\tclose(childToParent[1]);\n\twrite(parentToChild[1], \"ping\", 5);\n\tread(childToParent[0], buffer, sizeof(buffer));\n\tprintf(\"Parent got: %s\\n\", buffer);\n\n\treturn 0;\n}"
          },
          {
            "name": "Redirect pipe read end to a child's stdin using dup2 (like a shell pipe)",
            "input": "writes \"hello\\nworld\\n\" then runs \"sort\" on it",
            "output": "hello\nworld  (sorted output produced by the child \"sort\" process)",
            "code": "#include <unistd.h>\n\nint main(void)\n{\n\tint fd[2];\n\n\tpipe(fd);\n\n\tif (fork() == 0)\n\t{\n\t\tdup2(fd[0], 0); /* child's stdin now reads from the pipe */\n\t\tclose(fd[0]);\n\t\tclose(fd[1]);\n\t\texeclp(\"sort\", \"sort\", NULL);\n\t\treturn 1;\n\t}\n\n\tclose(fd[0]);\n\twrite(fd[1], \"world\\nhello\\n\", 12);\n\tclose(fd[1]);\n\n\treturn 0;\n}"
          },
          {
            "name": "Named pipe (FIFO) creation using mkfifo",
            "input": "/tmp/myfifo",
            "output": "FIFO created at /tmp/myfifo",
            "code": "#include <stdio.h>\n#include <sys/stat.h>\n\nint main(void)\n{\n\tif (mkfifo(\"/tmp/myfifo\", 0666) == -1)\n\t{\n\t\tperror(\"mkfifo\");\n\t\treturn 1;\n\t}\n\tprintf(\"FIFO created at /tmp/myfifo\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Writer program for a FIFO",
            "input": "Hello through the FIFO!",
            "output": "Message sent through FIFO",
            "code": "#include <stdio.h>\n#include <fcntl.h>\n#include <unistd.h>\n\nint main(void)\n{\n\tint fd = open(\"/tmp/myfifo\", O_WRONLY);\n\n\tif (fd == -1)\n\t{\n\t\tperror(\"open\");\n\t\treturn 1;\n\t}\n\n\twrite(fd, \"Hello through the FIFO!\", 24);\n\tclose(fd);\n\tprintf(\"Message sent through FIFO\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Reader program for a FIFO",
            "input": "(reads whatever the writer sends)",
            "output": "Received: Hello through the FIFO!",
            "code": "#include <stdio.h>\n#include <fcntl.h>\n#include <unistd.h>\n\nint main(void)\n{\n\tchar buffer[128];\n\tint fd = open(\"/tmp/myfifo\", O_RDONLY);\n\n\tif (fd == -1)\n\t{\n\t\tperror(\"open\");\n\t\treturn 1;\n\t}\n\n\tssize_t n = read(fd, buffer, sizeof(buffer) - 1);\n\tbuffer[n] = '\\0';\n\tclose(fd);\n\tprintf(\"Received: %s\\n\", buffer);\n\n\treturn 0;\n}"
          },
          {
            "name": "Non-blocking read from a FIFO using O_NONBLOCK",
            "input": "(no writer connected yet)",
            "output": "No data available yet (would have blocked)",
            "code": "#include <stdio.h>\n#include <errno.h>\n#include <fcntl.h>\n#include <unistd.h>\n\nint main(void)\n{\n\tchar buffer[128];\n\tint fd = open(\"/tmp/myfifo\", O_RDONLY | O_NONBLOCK);\n\n\tif (fd == -1)\n\t{\n\t\tperror(\"open\");\n\t\treturn 1;\n\t}\n\n\tssize_t n = read(fd, buffer, sizeof(buffer) - 1);\n\tif (n == -1 && errno == EAGAIN)\n\t\tprintf(\"No data available yet (would have blocked)\\n\");\n\telse if (n > 0)\n\t\tprintf(\"Received %zd bytes\\n\", n);\n\n\tclose(fd);\n\treturn 0;\n}"
          },
          {
            "name": "Simple producer-consumer using an anonymous pipe",
            "input": "produce numbers 1..5",
            "output": "Consumed: 1, Consumed: 2, Consumed: 3, Consumed: 4, Consumed: 5",
            "code": "#include <stdio.h>\n#include <unistd.h>\n\nint main(void)\n{\n\tint fd[2];\n\n\tpipe(fd);\n\n\tif (fork() == 0) /* consumer */\n\t{\n\t\tint value;\n\t\tclose(fd[1]);\n\t\twhile (read(fd[0], &value, sizeof(value)) > 0)\n\t\t\tprintf(\"Consumed: %d\\n\", value);\n\t\treturn 0;\n\t}\n\n\tclose(fd[0]); /* producer */\n\tfor (int i = 1; i <= 5; i++)\n\t\twrite(fd[1], &i, sizeof(i));\n\tclose(fd[1]);\n\n\treturn 0;\n}"
          },
          {
            "name": "Chain two commands manually using a pipe (equivalent of \"ls | wc -l\")",
            "input": "(none)",
            "output": "The line count of the current directory's listing",
            "code": "#include <unistd.h>\n\nint main(void)\n{\n\tint fd[2];\n\n\tpipe(fd);\n\n\tif (fork() == 0) /* \"ls\" writes into the pipe */\n\t{\n\t\tdup2(fd[1], 1);\n\t\tclose(fd[0]);\n\t\tclose(fd[1]);\n\t\texeclp(\"ls\", \"ls\", NULL);\n\t\treturn 1;\n\t}\n\n\tif (fork() == 0) /* \"wc -l\" reads from the pipe */\n\t{\n\t\tdup2(fd[0], 0);\n\t\tclose(fd[0]);\n\t\tclose(fd[1]);\n\t\texeclp(\"wc\", \"wc\", \"-l\", NULL);\n\t\treturn 1;\n\t}\n\n\tclose(fd[0]);\n\tclose(fd[1]);\n\n\treturn 0;\n}"
          },
          {
            "name": "Demonstrate pipe buffer capacity by writing until it would block",
            "input": "repeated 1KB writes",
            "output": "Wrote N KB before the pipe buffer filled up (no reader draining it)",
            "code": "#include <stdio.h>\n#include <errno.h>\n#include <fcntl.h>\n#include <string.h>\n#include <unistd.h>\n\nint main(void)\n{\n\tint fd[2];\n\tchar chunk[1024];\n\tint kbWritten = 0;\n\n\tmemset(chunk, 'A', sizeof(chunk));\n\tpipe(fd);\n\tfcntl(fd[1], F_SETFL, O_NONBLOCK); /* avoid actually blocking in this demo */\n\n\twhile (write(fd[1], chunk, sizeof(chunk)) > 0)\n\t\tkbWritten++;\n\n\tprintf(\"Wrote %d KB before the pipe buffer filled up\\n\", kbWritten);\n\n\tclose(fd[0]);\n\tclose(fd[1]);\n\treturn 0;\n}"
          },
          {
            "name": "What is a pipe and how does the kernel implement it?",
            "input": "",
            "output": "",
            "code": "A pipe is a unidirectional, in-kernel byte stream connecting two file descriptors: data written to the write end can be read from the read end, in FIFO (first-in-first-out) order. The kernel implements it as a fixed-size circular buffer held entirely in kernel memory (not backed by a file on disk), with the read/write system calls simply manipulating that buffer."
          },
          {
            "name": "What is the difference between anonymous pipes and named pipes (FIFOs)?",
            "input": "",
            "output": "",
            "code": "An anonymous pipe is created with pipe() and only exists as file descriptors in memory, usable only by the creating process and its descendants (since descriptors are inherited via fork()). A named pipe (FIFO), created with mkfifo(), has a name/path in the filesystem, so any two unrelated processes that know the path can open and use it for communication, even though the data itself still just flows through a kernel buffer, not actual disk storage."
          },
          {
            "name": "Can two unrelated processes communicate via an anonymous pipe? Why or why not?",
            "input": "",
            "output": "",
            "code": "No - an anonymous pipe's file descriptors only exist in the process that created it and any children that inherit them via fork(); there's no name or path by which an unrelated process can open it. To let unrelated processes communicate, you need a named pipe (FIFO) or another IPC mechanism (message queue, shared memory, socket) that can be referenced by name/key."
          },
          {
            "name": "What happens if you write to a pipe whose read end is closed?",
            "input": "",
            "output": "",
            "code": "The writing process receives the SIGPIPE signal, and if that signal isn't caught or ignored, the process is terminated by default; the write() call itself, if SIGPIPE is ignored, returns -1 with errno set to EPIPE. This is the standard way pipelines detect that a downstream reader has stopped consuming."
          },
          {
            "name": "What is the default pipe buffer size and what happens when it's full?",
            "input": "",
            "output": "",
            "code": "On Linux the default pipe capacity is typically 64 KB (65536 bytes), tunable per-pipe via fcntl(F_SETPIPE_SZ). When the buffer is full, a blocking write() call simply blocks (sleeps) until the reader drains enough data to make room; with O_NONBLOCK set, the call instead returns immediately with -1/EAGAIN."
          },
          {
            "name": "Explain the half-duplex nature of pipes and why two pipes are needed for bidirectional communication.",
            "input": "",
            "output": "",
            "code": "A single pipe only carries data in one direction: one end is only ever meant to write, the other only to read. To let two processes exchange data in both directions (like a real conversation), you create two separate pipes, each dedicated to one direction, giving each process a \"send\" pipe and a \"receive\" pipe."
          },
          {
            "name": "How does dup2 enable command piping like the shell's \"cmd1 | cmd2\"?",
            "input": "",
            "output": "",
            "code": "dup2(oldfd, newfd) makes newfd become a duplicate of oldfd, closing newfd first if it was already open. A shell implements \"cmd1 | cmd2\" by creating a pipe, then in cmd1's child process calling dup2(pipeWriteEnd, STDOUT_FILENO) so its output goes into the pipe, and in cmd2's child process calling dup2(pipeReadEnd, STDIN_FILENO) so its input comes from the pipe - effectively rewiring standard streams through the pipe."
          },
          {
            "name": "What is the difference between blocking and non-blocking I/O in the context of pipes/FIFOs?",
            "input": "",
            "output": "",
            "code": "In blocking mode (the default), a read() call waits until at least some data is available (or the write end is closed), and a write() call waits if the buffer is full. In non-blocking mode (set via O_NONBLOCK), these calls return immediately with -1/EAGAIN instead of waiting, which lets a program poll or handle other work rather than stalling indefinitely."
          },
          {
            "name": "How does a FIFO persist compared to an anonymous pipe?",
            "input": "",
            "output": "",
            "code": "A FIFO's name persists in the filesystem (as a special file type) until explicitly removed with unlink()/rm, even though its data buffer, like any pipe, still only lives in kernel memory and vanishes once both ends are closed and no data remains. An anonymous pipe has no filesystem presence at all - it disappears entirely once every process holding its descriptors exits or closes them."
          },
          {
            "name": "What are the limitations of pipes as an IPC mechanism?",
            "input": "",
            "output": "",
            "code": "Pipes only support byte-stream communication between related (or, for FIFOs, filesystem-visible) processes on the same host - they don't preserve message boundaries by default, have limited buffering capacity (risking blocking under backpressure), aren't suited for random access or many-to-many communication patterns, and can't be used across a network like sockets can."
          }
        ],
        "path": "Linux/pipes_fifos.c, Linux/pipes_fifos_theory.txt"
      },
      {
        "chapter": "SEMAPHORES",
        "folder": "Linux",
        "programs": [
          {
            "name": "Create a System V semaphore set (semget)",
            "input": "1 semaphore",
            "output": "Semaphore set created with id: 55555",
            "code": "#include <stdio.h>\n#include <sys/ipc.h>\n#include <sys/sem.h>\n\nint main(void)\n{\n\tkey_t key = ftok(\".\", 'D');\n\tint semid = semget(key, 1, IPC_CREAT | 0666);\n\n\tif (semid == -1)\n\t{\n\t\tperror(\"semget\");\n\t\treturn 1;\n\t}\n\tprintf(\"Semaphore set created with id: %d\\n\", semid);\n\n\treturn 0;\n}"
          },
          {
            "name": "Initialize a semaphore value (semctl SETVAL)",
            "input": "initial value = 1",
            "output": "Semaphore initialized to 1",
            "code": "#include <stdio.h>\n#include <sys/ipc.h>\n#include <sys/sem.h>\n\nunion semun\n{\n\tint val;\n};\n\nint main(void)\n{\n\tkey_t key = ftok(\".\", 'D');\n\tint semid = semget(key, 1, IPC_CREAT | 0666);\n\tunion semun arg;\n\n\targ.val = 1;\n\tif (semctl(semid, 0, SETVAL, arg) == -1)\n\t{\n\t\tperror(\"semctl\");\n\t\treturn 1;\n\t}\n\tprintf(\"Semaphore initialized to 1\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Perform wait (P) and signal (V) operations (semop)",
            "input": "(none)",
            "output": "Entered critical section, Left critical section",
            "code": "#include <stdio.h>\n#include <sys/ipc.h>\n#include <sys/sem.h>\n\nint main(void)\n{\n\tkey_t key = ftok(\".\", 'D');\n\tint semid = semget(key, 1, IPC_CREAT | 0666);\n\tstruct sembuf wait_op = {0, -1, 0};\n\tstruct sembuf signal_op = {0, 1, 0};\n\n\tsemop(semid, &wait_op, 1); /* P: decrement, blocks if already 0 */\n\tprintf(\"Entered critical section\\n\");\n\n\tsemop(semid, &signal_op, 1); /* V: increment, wakes a waiter if any */\n\tprintf(\"Left critical section\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Binary semaphore used as a mutex between processes",
            "input": "two processes incrementing a shared counter safely",
            "output": "Final counter value: 200000 (correct, protected by the semaphore)",
            "code": "#include <stdio.h>\n#include <unistd.h>\n#include <sys/wait.h>\n#include <sys/ipc.h>\n#include <sys/sem.h>\n#include <sys/shm.h>\n\nint main(void)\n{\n\tkey_t semKey = ftok(\".\", 'E');\n\tkey_t shmKey = ftok(\".\", 'F');\n\tint semid = semget(semKey, 1, IPC_CREAT | 0666);\n\tint shmid = shmget(shmKey, sizeof(int), IPC_CREAT | 0666);\n\tint *counter = shmat(shmid, NULL, 0);\n\tstruct sembuf wait_op = {0, -1, 0};\n\tstruct sembuf signal_op = {0, 1, 0};\n\n\tsemctl(semid, 0, SETVAL, 1);\n\t*counter = 0;\n\n\tif (fork() == 0)\n\t{\n\t\tfor (int i = 0; i < 100000; i++)\n\t\t{\n\t\t\tsemop(semid, &wait_op, 1);\n\t\t\t(*counter)++;\n\t\t\tsemop(semid, &signal_op, 1);\n\t\t}\n\t\treturn 0;\n\t}\n\n\tfor (int i = 0; i < 100000; i++)\n\t{\n\t\tsemop(semid, &wait_op, 1);\n\t\t(*counter)++;\n\t\tsemop(semid, &signal_op, 1);\n\t}\n\n\twait(NULL);\n\tprintf(\"Final counter value: %d\\n\", *counter);\n\n\tshmdt(counter);\n\tshmctl(shmid, IPC_RMID, NULL);\n\tsemctl(semid, 0, IPC_RMID);\n\treturn 0;\n}"
          },
          {
            "name": "Counting semaphore limiting concurrent access to a resource pool",
            "input": "pool size = 3, 5 processes wanting access",
            "output": "At most 3 processes hold the resource at any moment",
            "code": "#include <stdio.h>\n#include <unistd.h>\n#include <sys/wait.h>\n#include <sys/ipc.h>\n#include <sys/sem.h>\n\nint main(void)\n{\n\tkey_t key = ftok(\".\", 'G');\n\tint semid = semget(key, 1, IPC_CREAT | 0666);\n\tstruct sembuf wait_op = {0, -1, 0};\n\tstruct sembuf signal_op = {0, 1, 0};\n\n\tsemctl(semid, 0, SETVAL, 3); /* pool of 3 available slots */\n\n\tfor (int i = 0; i < 5; i++)\n\t{\n\t\tif (fork() == 0)\n\t\t{\n\t\t\tsemop(semid, &wait_op, 1);\n\t\t\tprintf(\"Process %d acquired a slot\\n\", i);\n\t\t\tsleep(1);\n\t\t\tsemop(semid, &signal_op, 1);\n\t\t\treturn 0;\n\t\t}\n\t}\n\n\tfor (int i = 0; i < 5; i++)\n\t\twait(NULL);\n\n\treturn 0;\n}"
          },
          {
            "name": "POSIX unnamed semaphore (sem_init) between threads",
            "input": "(none)",
            "output": "Thread acquired the semaphore, Thread released the semaphore",
            "code": "#include <stdio.h>\n#include <pthread.h>\n#include <semaphore.h>\n\nsem_t sem;\n\nstatic void *worker(void *arg)\n{\n\t(void)arg;\n\tsem_wait(&sem);\n\tprintf(\"Thread acquired the semaphore\\n\");\n\tsem_post(&sem);\n\tprintf(\"Thread released the semaphore\\n\");\n\treturn NULL;\n}\n\nint main(void)\n{\n\tpthread_t t;\n\n\tsem_init(&sem, 0, 1); /* shared between threads, initial value 1 */\n\tpthread_create(&t, NULL, worker, NULL);\n\tpthread_join(t, NULL);\n\tsem_destroy(&sem);\n\n\treturn 0;\n}"
          },
          {
            "name": "POSIX named semaphore (sem_open) between processes",
            "input": "/my_sem",
            "output": "Named semaphore created and used across processes",
            "code": "#include <stdio.h>\n#include <fcntl.h>\n#include <unistd.h>\n#include <sys/wait.h>\n#include <semaphore.h>\n\nint main(void)\n{\n\tsem_t *sem = sem_open(\"/my_sem\", O_CREAT, 0666, 1);\n\n\tif (fork() == 0)\n\t{\n\t\tsem_wait(sem);\n\t\tprintf(\"Child using the named semaphore\\n\");\n\t\tsem_post(sem);\n\t\tsem_close(sem);\n\t\treturn 0;\n\t}\n\n\twait(NULL);\n\tsem_wait(sem);\n\tprintf(\"Parent using the named semaphore\\n\");\n\tsem_post(sem);\n\n\tsem_close(sem);\n\tsem_unlink(\"/my_sem\");\n\treturn 0;\n}"
          },
          {
            "name": "sem_wait/sem_post with POSIX semaphores (basic mutual exclusion)",
            "input": "(none)",
            "output": "Critical section entered and exited safely",
            "code": "#include <stdio.h>\n#include <semaphore.h>\n\nint main(void)\n{\n\tsem_t sem;\n\n\tsem_init(&sem, 0, 1);\n\n\tsem_wait(&sem); /* acquire */\n\tprintf(\"Critical section entered\\n\");\n\tsem_post(&sem); /* release */\n\tprintf(\"Critical section exited\\n\");\n\n\tsem_destroy(&sem);\n\treturn 0;\n}"
          },
          {
            "name": "sem_trywait for non-blocking semaphore acquisition",
            "input": "semaphore already at 0 (held by someone else)",
            "output": "Could not acquire semaphore right now, doing other work instead",
            "code": "#include <stdio.h>\n#include <errno.h>\n#include <semaphore.h>\n\nint main(void)\n{\n\tsem_t sem;\n\n\tsem_init(&sem, 0, 0); /* starts unavailable */\n\n\tif (sem_trywait(&sem) == -1 && errno == EAGAIN)\n\t\tprintf(\"Could not acquire semaphore right now, doing other work instead\\n\");\n\n\tsem_destroy(&sem);\n\treturn 0;\n}"
          },
          {
            "name": "Producer-consumer problem using two semaphores (empty/full) and a mutex",
            "input": "producer adds 5 items, consumer removes 5 items",
            "output": "Produced: 0..4, Consumed: 0..4 (in safe, synchronized order)",
            "code": "#include <stdio.h>\n#include <pthread.h>\n#include <semaphore.h>\n\n#define BUFFER_SIZE 5\n\nint buffer[BUFFER_SIZE];\nint in = 0, out = 0;\nsem_t emptySlots, fullSlots;\npthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;\n\nstatic void *producer(void *arg)\n{\n\t(void)arg;\n\tfor (int i = 0; i < 5; i++)\n\t{\n\t\tsem_wait(&emptySlots);\n\t\tpthread_mutex_lock(&mutex);\n\t\tbuffer[in] = i;\n\t\tprintf(\"Produced: %d\\n\", i);\n\t\tin = (in + 1) % BUFFER_SIZE;\n\t\tpthread_mutex_unlock(&mutex);\n\t\tsem_post(&fullSlots);\n\t}\n\treturn NULL;\n}\n\nstatic void *consumer(void *arg)\n{\n\t(void)arg;\n\tfor (int i = 0; i < 5; i++)\n\t{\n\t\tsem_wait(&fullSlots);\n\t\tpthread_mutex_lock(&mutex);\n\t\tint value = buffer[out];\n\t\tprintf(\"Consumed: %d\\n\", value);\n\t\tout = (out + 1) % BUFFER_SIZE;\n\t\tpthread_mutex_unlock(&mutex);\n\t\tsem_post(&emptySlots);\n\t}\n\treturn NULL;\n}\n\nint main(void)\n{\n\tpthread_t p, c;\n\n\tsem_init(&emptySlots, 0, BUFFER_SIZE);\n\tsem_init(&fullSlots, 0, 0);\n\n\tpthread_create(&p, NULL, producer, NULL);\n\tpthread_create(&c, NULL, consumer, NULL);\n\n\tpthread_join(p, NULL);\n\tpthread_join(c, NULL);\n\n\tsem_destroy(&emptySlots);\n\tsem_destroy(&fullSlots);\n\treturn 0;\n}"
          },
          {
            "name": "What is a semaphore and who introduced the concept?",
            "input": "",
            "output": "",
            "code": "A semaphore is a synchronization primitive holding an integer count, accessed only through two atomic operations - wait/P (decrement, blocking if the result would go below zero) and signal/V (increment, waking a waiter if any) - used to control access to a limited number of shared resources. The concept was introduced by Edsger Dijkstra in 1965 as part of his work on process synchronization (P and V stand for the Dutch \"Proberen\"/try and \"Verhogen\"/increment)."
          },
          {
            "name": "What is the difference between a binary semaphore and a mutex?",
            "input": "",
            "output": "",
            "code": "A binary semaphore has only two states (0 or 1) like a mutex and can be used for mutual exclusion, but conceptually it is a signaling mechanism with no concept of \"ownership\" - any thread/process can post (unlock) it, even one that never waited on it, making it suitable for signaling between threads. A mutex is specifically designed for mutual exclusion, is typically owned by the thread that locked it, and many implementations only allow that same thread to unlock it, which enables features like priority inheritance and recursive locking."
          },
          {
            "name": "What is the difference between a counting semaphore and a binary semaphore?",
            "input": "",
            "output": "",
            "code": "A counting semaphore can hold any non-negative integer value and is used to manage a pool of N interchangeable resources (e.g. N available connections), allowing up to N holders concurrently. A binary semaphore is restricted to 0 or 1 and is used purely for mutual exclusion or simple signaling between exactly two states (available/unavailable)."
          },
          {
            "name": "What is the difference between System V and POSIX semaphores?",
            "input": "",
            "output": "",
            "code": "System V semaphores (semget/semop/semctl) are created in sets (a single semget can allocate an array of semaphores), identified by an integer key, and managed with ipcs/ipcrm; their API is more complex (semop takes an array of operations). POSIX semaphores (sem_init for unnamed/thread-shared, sem_open for named/process-shared) have a simpler, more intuitive sem_wait/sem_post API and integrate more naturally with pthreads."
          },
          {
            "name": "Explain the P (wait) and V (signal) operations.",
            "input": "",
            "output": "",
            "code": "P (wait, sometimes called \"down\" or \"acquire\") atomically decrements the semaphore's value; if the result would be negative, the calling thread/process blocks until another releases it. V (signal, \"up\" or \"release\") atomically increments the value and, if any thread was blocked waiting, wakes one of them up - together these two operations are the only way a semaphore's value can change, guaranteeing safe coordination."
          },
          {
            "name": "What is priority inversion and how do semaphores relate to it?",
            "input": "",
            "output": "",
            "code": "Priority inversion occurs when a low-priority task holds a lock (semaphore/mutex) that a high-priority task needs, and a medium-priority task preempts the low-priority holder, indirectly delaying the high-priority task far longer than expected. Plain semaphores don't inherently solve this (they have no notion of the waiter's priority), which is why real-time systems often use priority-inheritance mutexes instead, where the lock holder temporarily inherits the waiter's higher priority."
          },
          {
            "name": "What is a deadlock and how can improper semaphore use cause it?",
            "input": "",
            "output": "",
            "code": "A deadlock is a state where two or more processes/threads are each waiting for a resource held by another, so none can proceed. With semaphores, this commonly happens when multiple semaphores are acquired in inconsistent order across different threads (thread A waits on sem1 then sem2, thread B waits on sem2 then sem1), or when a semaphore is never released due to an error path being missed."
          },
          {
            "name": "Explain the classic producer-consumer problem and how semaphores solve it.",
            "input": "",
            "output": "",
            "code": "The producer-consumer problem involves a producer adding items to a shared, fixed-size buffer and a consumer removing them, with the constraints that the producer must not write to a full buffer and the consumer must not read from an empty one. The classic solution uses two counting semaphores - \"empty\" (initialized to buffer size, tracking free slots) and \"full\" (initialized to 0, tracking filled slots) - plus a mutex to protect the buffer indices, so producers wait on \"empty\"/signal \"full\" and consumers do the reverse."
          },
          {
            "name": "What happens if a process crashes while holding a semaphore?",
            "input": "",
            "output": "",
            "code": "With System V semaphores, an optional SEM_UNDO flag can be set so the kernel automatically reverses the semaphore adjustment if the process exits without releasing it, preventing a permanently \"stuck\" semaphore. Plain POSIX semaphores have no such automatic recovery - if a process dies mid-critical-section without calling sem_post(), other waiters can block forever, which is why robust mutexes (pthread robust mutexes) exist specifically to detect and recover from this scenario."
          },
          {
            "name": "What is the difference between a semaphore and a condition variable?",
            "input": "",
            "output": "",
            "code": "A semaphore maintains its own internal counter and can be signaled even before anyone is waiting (the signal is \"remembered\" as an increment), making it useful for resource counting. A condition variable has no memory of its own - it must always be used together with a mutex, and a signal sent when no thread is waiting is simply lost - so it's used to wait for a specific condition/predicate to become true rather than to count available resources."
          }
        ],
        "path": "Linux/semaphores.c, Linux/semaphores_theory.txt"
      },
      {
        "chapter": "SHARED MEMORY",
        "folder": "Linux",
        "programs": [
          {
            "name": "Create a System V shared memory segment (shmget)",
            "input": "size = 1024 bytes",
            "output": "Shared memory segment created with id: 98765",
            "code": "#include <stdio.h>\n#include <sys/ipc.h>\n#include <sys/shm.h>\n\nint main(void)\n{\n\tkey_t key = ftok(\".\", 'B');\n\tint shmid = shmget(key, 1024, IPC_CREAT | 0666);\n\n\tif (shmid == -1)\n\t{\n\t\tperror(\"shmget\");\n\t\treturn 1;\n\t}\n\tprintf(\"Shared memory segment created with id: %d\\n\", shmid);\n\n\treturn 0;\n}"
          },
          {
            "name": "Attach a shared memory segment (shmat)",
            "input": "(none)",
            "output": "Shared memory attached at address <ptr>",
            "code": "#include <stdio.h>\n#include <sys/ipc.h>\n#include <sys/shm.h>\n\nint main(void)\n{\n\tkey_t key = ftok(\".\", 'B');\n\tint shmid = shmget(key, 1024, IPC_CREAT | 0666);\n\tchar *data = shmat(shmid, NULL, 0);\n\n\tif (data == (char *)-1)\n\t{\n\t\tperror(\"shmat\");\n\t\treturn 1;\n\t}\n\tprintf(\"Shared memory attached at address %p\\n\", (void *)data);\n\n\treturn 0;\n}"
          },
          {
            "name": "Write and read data via shared memory between parent and child",
            "input": "\"Shared hello!\"",
            "output": "Child read: Shared hello!",
            "code": "#include <stdio.h>\n#include <string.h>\n#include <unistd.h>\n#include <sys/wait.h>\n#include <sys/ipc.h>\n#include <sys/shm.h>\n\nint main(void)\n{\n\tkey_t key = ftok(\".\", 'B');\n\tint shmid = shmget(key, 1024, IPC_CREAT | 0666);\n\n\tif (fork() == 0)\n\t{\n\t\tchar *data = shmat(shmid, NULL, 0);\n\t\tstrcpy(data, \"Shared hello!\");\n\t\tshmdt(data);\n\t\treturn 0;\n\t}\n\n\twait(NULL);\n\tchar *data = shmat(shmid, NULL, 0);\n\tprintf(\"Child read: %s\\n\", data);\n\tshmdt(data);\n\n\treturn 0;\n}"
          },
          {
            "name": "Detach shared memory (shmdt)",
            "input": "(none)",
            "output": "Shared memory detached",
            "code": "#include <stdio.h>\n#include <sys/ipc.h>\n#include <sys/shm.h>\n\nint main(void)\n{\n\tkey_t key = ftok(\".\", 'B');\n\tint shmid = shmget(key, 1024, IPC_CREAT | 0666);\n\tchar *data = shmat(shmid, NULL, 0);\n\n\tif (shmdt(data) == -1)\n\t{\n\t\tperror(\"shmdt\");\n\t\treturn 1;\n\t}\n\tprintf(\"Shared memory detached\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Remove a shared memory segment (shmctl IPC_RMID)",
            "input": "(none)",
            "output": "Shared memory segment removed",
            "code": "#include <stdio.h>\n#include <sys/ipc.h>\n#include <sys/shm.h>\n\nint main(void)\n{\n\tkey_t key = ftok(\".\", 'B');\n\tint shmid = shmget(key, 1024, IPC_CREAT | 0666);\n\n\tif (shmctl(shmid, IPC_RMID, NULL) == -1)\n\t{\n\t\tperror(\"shmctl\");\n\t\treturn 1;\n\t}\n\tprintf(\"Shared memory segment removed\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "POSIX shared memory using shm_open + mmap",
            "input": "/my_shm, size 4096",
            "output": "POSIX shared memory mapped successfully",
            "code": "#include <stdio.h>\n#include <fcntl.h>\n#include <sys/mman.h>\n#include <unistd.h>\n\nint main(void)\n{\n\tint fd = shm_open(\"/my_shm\", O_CREAT | O_RDWR, 0666);\n\n\tftruncate(fd, 4096);\n\tvoid *addr = mmap(NULL, 4096, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);\n\n\tif (addr == MAP_FAILED)\n\t{\n\t\tperror(\"mmap\");\n\t\treturn 1;\n\t}\n\tprintf(\"POSIX shared memory mapped successfully\\n\");\n\n\tmunmap(addr, 4096);\n\tclose(fd);\n\treturn 0;\n}"
          },
          {
            "name": "Synchronize shared memory access with a named semaphore",
            "input": "(none)",
            "output": "Counter safely incremented to 1 using semaphore-protected shared memory",
            "code": "#include <stdio.h>\n#include <fcntl.h>\n#include <semaphore.h>\n#include <sys/mman.h>\n#include <unistd.h>\n\nint main(void)\n{\n\tint fd = shm_open(\"/counter_shm\", O_CREAT | O_RDWR, 0666);\n\tftruncate(fd, sizeof(int));\n\tint *counter = mmap(NULL, sizeof(int), PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);\n\tsem_t *sem = sem_open(\"/counter_sem\", O_CREAT, 0666, 1);\n\n\t*counter = 0;\n\n\tsem_wait(sem);\n\t(*counter)++;\n\tprintf(\"Counter safely incremented to %d using semaphore-protected shared memory\\n\", *counter);\n\tsem_post(sem);\n\n\tsem_close(sem);\n\tmunmap(counter, sizeof(int));\n\tclose(fd);\n\treturn 0;\n}"
          },
          {
            "name": "Resize POSIX shared memory with ftruncate",
            "input": "grow from 0 to 8192 bytes",
            "output": "Shared memory resized to 8192 bytes",
            "code": "#include <stdio.h>\n#include <fcntl.h>\n#include <unistd.h>\n\nint main(void)\n{\n\tint fd = shm_open(\"/my_shm\", O_CREAT | O_RDWR, 0666);\n\n\tif (ftruncate(fd, 8192) == -1)\n\t{\n\t\tperror(\"ftruncate\");\n\t\treturn 1;\n\t}\n\tprintf(\"Shared memory resized to 8192 bytes\\n\");\n\n\tclose(fd);\n\treturn 0;\n}"
          },
          {
            "name": "Unlink POSIX shared memory (shm_unlink)",
            "input": "/my_shm",
            "output": "Shared memory object /my_shm removed",
            "code": "#include <stdio.h>\n#include <fcntl.h>\n#include <sys/mman.h>\n\nint main(void)\n{\n\tif (shm_unlink(\"/my_shm\") == -1)\n\t{\n\t\tperror(\"shm_unlink\");\n\t\treturn 1;\n\t}\n\tprintf(\"Shared memory object /my_shm removed\\n\");\n\n\treturn 0;\n}"
          },
          {
            "name": "Demonstrate a race condition on shared memory without synchronization",
            "input": "two processes each incrementing a shared counter 100000 times",
            "output": "Final counter value is less than 200000 (lost updates due to no locking)",
            "code": "#include <stdio.h>\n#include <unistd.h>\n#include <sys/wait.h>\n#include <sys/ipc.h>\n#include <sys/shm.h>\n\nint main(void)\n{\n\tkey_t key = ftok(\".\", 'C');\n\tint shmid = shmget(key, sizeof(int), IPC_CREAT | 0666);\n\tint *counter = shmat(shmid, NULL, 0);\n\n\t*counter = 0;\n\n\tif (fork() == 0)\n\t{\n\t\tfor (int i = 0; i < 100000; i++)\n\t\t\t(*counter)++; /* not atomic: read-modify-write race with the parent */\n\t\treturn 0;\n\t}\n\n\tfor (int i = 0; i < 100000; i++)\n\t\t(*counter)++;\n\n\twait(NULL);\n\tprintf(\"Final counter value (expected 200000, likely less): %d\\n\", *counter);\n\n\tshmdt(counter);\n\tshmctl(shmid, IPC_RMID, NULL);\n\treturn 0;\n}"
          },
          {
            "name": "What is shared memory and why is it the fastest IPC mechanism?",
            "input": "",
            "output": "",
            "code": "Shared memory maps the same physical memory region into the address space of multiple processes, so they can read and write it directly like normal memory - no data copying through the kernel, no system calls needed for each access after the initial setup. This makes it the fastest IPC mechanism, since pipes, message queues, and sockets all require the kernel to copy data between user and kernel buffers on every send/receive."
          },
          {
            "name": "What is the difference between System V shared memory and POSIX shared memory (mmap-based)?",
            "input": "",
            "output": "",
            "code": "System V shared memory (shmget/shmat/shmdt/shmctl) uses an integer key and shmid, managed via ipcs/ipcrm, and segments persist until explicitly removed. POSIX shared memory (shm_open + mmap) is named like a file under /dev/shm, uses standard file descriptor semantics (ftruncate to size it, close to release the descriptor), and integrates more naturally with other POSIX APIs like mmap-based memory-mapped files."
          },
          {
            "name": "Why does shared memory need explicit synchronization (semaphores/mutexes)?",
            "input": "",
            "output": "",
            "code": "Because the kernel provides no built-in coordination for shared memory access - any process can read or write the region at any time, so concurrent read-modify-write operations (like incrementing a counter) can race and produce incorrect results (lost updates). Unlike message queues or pipes, where the kernel serializes messages, shared memory requires the application to add its own locking (semaphores, mutexes in shared memory, or file locks) to protect critical sections."
          },
          {
            "name": "What happens to a shared memory segment if all processes detach but don't remove it?",
            "input": "",
            "output": "",
            "code": "The segment remains allocated in the kernel (visible in \"ipcs -m\" with nattch=0) and continues consuming system resources until a process explicitly calls shmctl with IPC_RMID (System V) or shm_unlink (POSIX), or the system reboots. This is a common source of resource leaks in long-running systems if cleanup code doesn't run (e.g. on a crash)."
          },
          {
            "name": "What is the role of shmid and key in System V shared memory?",
            "input": "",
            "output": "",
            "code": "The key (often produced by ftok()) is how independent processes agree in advance on which shared memory segment to use, similar to a rendezvous point. shmget() takes that key and returns a shmid, the actual per-boot identifier the kernel uses internally to track the segment and which subsequent calls (shmat, shmctl) operate on."
          },
          {
            "name": "Explain memory-mapped files (mmap) and how they relate to shared memory.",
            "input": "",
            "output": "",
            "code": "mmap() maps a file (or an anonymous memory region) directly into a process's virtual address space, so file I/O becomes simple memory reads/writes handled by the kernel's page cache. POSIX shared memory is built on this: shm_open() creates/opens a special file-like object in a tmpfs-backed area, and mmap() with MAP_SHARED on its descriptor gives multiple processes a common view of the same physical pages."
          },
          {
            "name": "What are the security/permission considerations with shared memory segments?",
            "input": "",
            "output": "",
            "code": "Shared memory segments have Unix-style permission bits (like files) set at creation (e.g. 0666), so any process satisfying those permissions can attach and read/write the data - including unrelated or malicious processes if permissions are too permissive. Best practice is to use the most restrictive permissions possible, avoid predictable keys/names for sensitive data, and validate/sanitize any data read from shared memory since it could have been modified by another process."
          },
          {
            "name": "How does shared memory performance compare to message passing for large data transfers?",
            "input": "",
            "output": "",
            "code": "For large or frequently updated data, shared memory is significantly faster because the data is written and read in place with no copying through the kernel, whereas message queues and pipes require copying the entire payload into a kernel buffer on send and back out on receive. The tradeoff is that shared memory requires manual synchronization, while message passing gives you copy semantics and ordering \"for free\" at the cost of throughput for large payloads."
          },
          {
            "name": "What happens when two processes attach shared memory at different virtual addresses?",
            "input": "",
            "output": "",
            "code": "Each process's shmat() (or mmap()) call can return a different virtual address, since the mapping is only guaranteed to point to the same physical memory, not the same address in every process's address space. This means pointer values stored inside the shared memory (as opposed to offsets from the segment's base) are not valid across processes - data structures shared this way should use relative offsets, not raw pointers, if pointers might be embedded in the data."
          },
          {
            "name": "How would you check active shared memory segments on a Linux system?",
            "input": "",
            "output": "",
            "code": "\"ipcs -m\" lists active System V shared memory segments with their key, shmid, owner, permissions, size, and number of attached processes (nattch); \"ipcrm -m <shmid>\" removes one. For POSIX shared memory, \"ls /dev/shm\" shows named objects created via shm_open(), which can be removed directly with \"rm /dev/shm/<name>\" or via shm_unlink()."
          }
        ],
        "path": "Linux/shared_memory.c, Linux/shared_memory_theory.txt"
      }
    ]
  },
  {
    "section": "Networking",
    "chapters": [
      {
        "chapter": "LINUX NETWORKING COMMANDS",
        "folder": "Networking",
        "programs": [
          {
            "name": "ip addr (ip a) - show and manage IP addresses",
            "input": "",
            "output": "",
            "code": "Displays IP addresses assigned to every network interface. Common forms: \"ip addr show\" or \"ip a\" to list all, \"ip addr show eth0\" for one interface, \"ip addr add 192.168.1.10/24 dev eth0\" to add an address, \"ip addr del 192.168.1.10/24 dev eth0\" to remove one. It is the modern replacement for \"ifconfig\"."
          },
          {
            "name": "ip link - show and manage network interfaces",
            "input": "",
            "output": "",
            "code": "Shows interface state (UP/DOWN), MAC address, and MTU. \"ip link show\" lists all interfaces, \"ip link set eth0 up\" / \"down\" brings an interface up or down, \"ip link set eth0 mtu 1400\" changes MTU, and \"ip link show type vlan\" lists only VLAN sub-interfaces."
          },
          {
            "name": "ifconfig - legacy interface configuration tool",
            "input": "",
            "output": "",
            "code": "The older (often deprecated, from net-tools) command to view/configure interfaces: \"ifconfig\" alone lists all interfaces with IP, netmask, and traffic counters; \"ifconfig eth0 up/down\" enables/disables an interface. Most modern distros favor \"ip\" but ifconfig is still common in scripts and older systems."
          },
          {
            "name": "ip route - show and manage the routing table",
            "input": "",
            "output": "",
            "code": "\"ip route show\" (or \"ip r\") displays the kernel routing table including the default gateway. \"ip route add 10.0.0.0/24 via 192.168.1.1\" adds a static route, \"ip route del 10.0.0.0/24\" removes one, and \"ip route get 8.8.8.8\" shows which route/interface would be used to reach a destination."
          },
          {
            "name": "route -n - legacy routing table view",
            "input": "",
            "output": "",
            "code": "Shows the routing table in numeric form (no DNS lookups) using the older net-tools suite. Useful for a quick view of the default gateway and destination networks on systems where \"ip route\" is unavailable, though \"ip route\" is the modern preferred equivalent."
          },
          {
            "name": "netstat -tulnp - show listening ports and connections",
            "input": "",
            "output": "",
            "code": "Lists (t)CP and (u)DP sockets that are (l)istening, in (n)umeric form, with the owning (p)rocess. Widely used to check which service is bound to a port, e.g. confirming a web server is listening on port 80/443, though it's deprecated in favor of \"ss\" on modern Linux."
          },
          {
            "name": "ss -tulnp - modern socket statistics tool",
            "input": "",
            "output": "",
            "code": "The modern, faster replacement for netstat, showing listening/established sockets with process info. \"ss -tulnp\" lists listening TCP/UDP sockets, \"ss -t -a\" shows all TCP connections, and \"ss -s\" prints summary statistics of socket usage."
          },
          {
            "name": "ping - test basic reachability and latency",
            "input": "",
            "output": "",
            "code": "Sends ICMP echo requests to a host to verify connectivity and measure round-trip time. \"ping -c 4 8.8.8.8\" sends 4 packets and stops. It confirms Layer 3 reachability but does not by itself prove that a specific service/port is reachable."
          },
          {
            "name": "traceroute / tracepath - trace the network path to a destination",
            "input": "",
            "output": "",
            "code": "Shows every router hop between the local host and a destination, along with the round-trip time at each hop, helping identify where in the path packets are being delayed or dropped. \"tracepath\" is a similar tool that does not require root privileges."
          },
          {
            "name": "mtr - combined ping and traceroute in real time",
            "input": "",
            "output": "",
            "code": "\"mtr <host>\" continuously pings every hop along the route and displays live loss percentage and latency per hop, making it much better than a single traceroute snapshot for diagnosing intermittent packet loss along a path."
          },
          {
            "name": "tcpdump - capture and inspect network packets",
            "input": "",
            "output": "",
            "code": "A command-line packet capture tool. \"tcpdump -i eth0\" captures all traffic on eth0, \"tcpdump -i eth0 port 80\" filters by port, \"tcpdump -i eth0 host 10.0.0.5\" filters by host, and \"tcpdump -w capture.pcap\" writes to a file for later analysis in Wireshark."
          },
          {
            "name": "nslookup / dig - DNS lookup tools",
            "input": "",
            "output": "",
            "code": "Both resolve hostnames to IP addresses and query specific DNS record types. \"dig example.com\" (or \"dig example.com MX\") gives detailed, script-friendly DNS resolver output including TTL and authoritative servers; \"nslookup example.com\" gives a simpler interactive-style lookup."
          },
          {
            "name": "arp -a / ip neigh - view the ARP / neighbor table",
            "input": "",
            "output": "",
            "code": "Shows the mapping of IP addresses to MAC addresses that the kernel has learned on the local network. \"arp -a\" (legacy) or \"ip neigh show\" (modern) lists these entries; useful for detecting duplicate IPs or confirming a device is reachable at Layer 2."
          },
          {
            "name": "ethtool - inspect and configure NIC hardware/driver settings",
            "input": "",
            "output": "",
            "code": "\"ethtool eth0\" shows link speed, duplex mode, and whether the link is up; \"ethtool -S eth0\" shows detailed driver statistics (errors, drops); useful for diagnosing physical-layer issues like a NIC negotiated at the wrong speed/duplex."
          },
          {
            "name": "nmcli - NetworkManager command-line interface",
            "input": "",
            "output": "",
            "code": "Used on systems managed by NetworkManager to view and configure connections. \"nmcli device status\" shows interface state, \"nmcli connection show\" lists configured connections, and \"nmcli connection up <name>\" activates a connection."
          },
          {
            "name": "iftop / nload - real-time bandwidth monitoring",
            "input": "",
            "output": "",
            "code": "\"iftop -i eth0\" shows live bandwidth usage per connection/host on an interface in a top-like view; \"nload eth0\" shows a simpler live graph of incoming/outgoing throughput. Both are useful for spotting which host or connection is consuming bandwidth right now."
          },
          {
            "name": "hostname -I / hostname -i - quickly show the host's IP addresses",
            "input": "",
            "output": "",
            "code": "\"hostname -I\" prints all IP addresses assigned to the host (a quick way to get the primary IP without parsing \"ip addr\" output); \"hostname -i\" resolves the hostname to an address via DNS/hosts file."
          },
          {
            "name": "ip -d link show eth0.10 - show VLAN sub-interface details",
            "input": "",
            "output": "",
            "code": "For a VLAN interface created with \"ip link add\", this shows the 802.1Q VLAN ID and the parent interface it is bound to, confirming the sub-interface's VLAN tagging configuration (e.g. \"vlan protocol 802.1Q id 10\")."
          },
          {
            "name": "ip link add link eth0 name eth0.10 type vlan id 10 - create a VLAN sub-interface",
            "input": "",
            "output": "",
            "code": "Creates a tagged VLAN sub-interface named eth0.10 on top of physical interface eth0 for VLAN ID 10. Follow with \"ip link set eth0.10 up\" and \"ip addr add 192.168.10.1/24 dev eth0.10\" to bring it up and assign an IP for that VLAN."
          },
          {
            "name": "cat /proc/net/vlan/config - list all configured VLAN interfaces",
            "input": "",
            "output": "",
            "code": "Reading this pseudo-file shows every 802.1Q VLAN interface currently configured on the host, its VLAN ID, and its parent (real) device - a quick way to audit VLAN interfaces without needing \"ip link show type vlan\"."
          },
          {
            "name": "vconfig add eth0 10 - legacy VLAN interface creation tool",
            "input": "",
            "output": "",
            "code": "The older 8021q utility used to create VLAN sub-interfaces before \"ip link ... type vlan\" became standard: \"vconfig add eth0 10\" creates eth0.10, and \"vconfig rem eth0.10\" removes it. Still seen in older scripts/distros, though \"ip link\" is now preferred."
          },
          {
            "name": "bridge vlan show - show VLAN membership on bridge ports",
            "input": "",
            "output": "",
            "code": "On a Linux bridge with VLAN filtering enabled, this lists which VLAN IDs are allowed on each bridge port and whether a VLAN is tagged (T) or the PVID/untagged (Untagged, PVID) for that port - the Linux equivalent of \"show vlan brief\" on a physical switch."
          },
          {
            "name": "bridge vlan add vid 10 dev eth0 - add a VLAN to a bridge port",
            "input": "",
            "output": "",
            "code": "Adds VLAN ID 10 to the allowed list on bridge port eth0 (used with Linux bridge VLAN filtering, \"bridge vlan\" subsystem). Add \"pvid untagged\" flags to also mark it as the port's native/untagged VLAN, mirroring switchport trunk/access configuration on a physical switch."
          },
          {
            "name": "tcpdump -e -i eth0 vlan 10 - capture only tagged traffic for a specific VLAN",
            "input": "",
            "output": "",
            "code": "The \"-e\" flag prints the link-layer (Ethernet) header including the 802.1Q tag, and the \"vlan 10\" filter captures only frames tagged for VLAN 10 on a trunk interface - useful for confirming that expected VLAN tags are actually arriving on a trunk port."
          },
          {
            "name": "ip link show type vlan - list every VLAN-type interface on the host",
            "input": "",
            "output": "",
            "code": "Filters \"ip link show\" output to only the sub-interfaces created as 802.1Q VLAN devices, quickly showing all VLANs configured on the host along with their parent interfaces (e.g. eth0.10@eth0, eth0.20@eth0)."
          }
        ],
        "path": "Networking/linux_commands.txt"
      },
      {
        "chapter": "VLAN",
        "folder": "Networking",
        "programs": [
          {
            "name": "What is a VLAN and why is it used?",
            "input": "",
            "output": "",
            "code": "A VLAN (Virtual LAN) is a logical grouping of switch ports/devices that behaves like a single broadcast domain, independent of physical location or cabling. It is used to segment broadcast traffic, isolate groups of users or departments for security, and reorganize the network logically without rewiring, since a device's VLAN membership is configured in software on the switch."
          },
          {
            "name": "What is the difference between a VLAN and a physical LAN segment?",
            "input": "",
            "output": "",
            "code": "A physical LAN segment is bound by the actual cabling and switch hardware, so all devices connected to it share one broadcast domain. A VLAN decouples logical grouping from physical topology: devices on different switches, in different rooms or buildings, can belong to the same VLAN, while devices plugged into the same physical switch can belong to different VLANs."
          },
          {
            "name": "What is VLAN tagging and how does IEEE 802.1Q work?",
            "input": "",
            "output": "",
            "code": "802.1Q tagging inserts a 4-byte tag into the Ethernet frame header (after the source MAC) containing a 12-bit VLAN ID (and a 3-bit priority field for QoS). When a frame leaves a trunk port, the switch adds this tag so the receiving switch knows which VLAN the frame belongs to; the tag is stripped before the frame reaches an access-port end device, which is unaware tagging ever happened."
          },
          {
            "name": "What is the difference between a trunk port and an access port?",
            "input": "",
            "output": "",
            "code": "An access port belongs to exactly one VLAN and carries untagged frames to/from an end device such as a PC or printer. A trunk port carries traffic for multiple VLANs between switches (or to a router/firewall) using 802.1Q tags so the receiving device can distinguish which VLAN each frame belongs to."
          },
          {
            "name": "What is the native VLAN and why can it be a security risk?",
            "input": "",
            "output": "",
            "code": "The native VLAN is the one VLAN on a trunk whose frames are sent untagged (by default VLAN 1 on most vendors). It exists for backward compatibility with devices that do not understand tagging. It is risky because an attacker can craft a double-tagged frame that rides the native VLAN untagged on the first hop and gets forwarded to a different VLAN on the next switch (VLAN hopping), so best practice is to change the native VLAN to an unused ID and never use it for real traffic."
          },
          {
            "name": "Explain the VLAN hopping attack and how to prevent it.",
            "input": "",
            "output": "",
            "code": "VLAN hopping lets an attacker on one VLAN send traffic into another VLAN without going through a router. Two common methods: (1) Switch spoofing - the attacker's host negotiates a trunk via DTP, gaining access to all VLANs on that trunk. (2) Double tagging - the attacker sends a frame with two 802.1Q tags; the first switch strips the outer (native VLAN) tag and forwards the frame with the inner tag intact, causing it to land on a different VLAN. Prevention: disable DTP/auto-trunking on access ports (switchport nonegotiate), explicitly set access ports with switchport mode access, and never use the native VLAN as a working VLAN."
          },
          {
            "name": "What is Inter-VLAN routing and how is it achieved?",
            "input": "",
            "output": "",
            "code": "Inter-VLAN routing allows devices in different VLANs (different broadcast/subnet domains) to communicate, since a Layer 2 switch alone cannot route between VLANs. It's achieved either via \"router-on-a-stick\" - a single trunk link from the switch to a router with sub-interfaces per VLAN, each acting as that VLAN's default gateway - or via a Layer 3 switch using Switched Virtual Interfaces (SVIs), which is more scalable and lower-latency than router-on-a-stick."
          },
          {
            "name": "What is VTP (VLAN Trunking Protocol) and what are its modes?",
            "input": "",
            "output": "",
            "code": "VTP synchronizes VLAN database information (VLAN IDs and names) across switches in the same VTP domain, so you configure VLANs once on a server and they propagate automatically. Modes: Server (can create/modify/delete VLANs, advertises changes), Client (accepts and forwards updates, cannot modify VLANs locally), and Transparent (does not participate in the VTP domain, only forwards VTP advertisements and keeps its own local VLAN database)."
          },
          {
            "name": "What are the risks of using VTP in production?",
            "input": "",
            "output": "",
            "code": "The classic risk is a \"VTP bomb\": a new switch added to the network with a higher VTP revision number (even with an empty VLAN database) can overwrite the VLAN database on every switch in the domain, wiping out all configured VLANs and causing a network-wide outage. Mitigations include using VTP passwords, preferring VTP transparent mode or VTPv3 (which supports authentication and a primary server concept), and always resetting the revision number on any switch before adding it to the domain."
          },
          {
            "name": "What is the difference between normal-range and extended-range VLAN IDs?",
            "input": "",
            "output": "",
            "code": "Normal-range VLANs are IDs 1-1005, stored in vlan.dat and synchronized by VTP versions 1 and 2. Extended-range VLANs are IDs 1006-4094, which are not stored in vlan.dat, are not advertised by VTPv1/v2 (only VTPv3 supports them), and are typically used in larger, more complex networks such as service-provider or data-center environments."
          },
          {
            "name": "Why should you avoid using the default VLAN (VLAN 1) for user traffic?",
            "input": "",
            "output": "",
            "code": "VLAN 1 is the factory-default VLAN for all switch ports, cannot be renamed or deleted, and by default carries control-plane traffic like CDP, VTP, DTP and STP BPDUs. Because every device \"trusts\" VLAN 1 by default and it is also frequently the native VLAN, leaving user or management traffic on it increases exposure to VLAN-hopping and makes the network harder to secure; best practice is to move all real traffic off VLAN 1 and let it carry only control-plane protocol traffic."
          },
          {
            "name": "How does a switch handle a frame tagged with a VLAN ID it doesn't recognize?",
            "input": "",
            "output": "",
            "code": "If a trunk port receives a frame tagged with a VLAN that is not defined (or not allowed) in the switch's VLAN database / trunk allowed-list, the switch drops the frame. This is why \"switchport trunk allowed vlan\" lists must be kept consistent across trunk links, and why pruning (manual or via VTP) is used to limit unnecessary VLAN traffic across trunks."
          },
          {
            "name": "What is a Private VLAN (PVLAN) and what are its port types?",
            "input": "",
            "output": "",
            "code": "A Private VLAN subdivides a single VLAN/subnet into isolated sub-domains while sharing one gateway, commonly used in shared hosting or DMZ environments. Port types: Promiscuous (can talk to all ports in the PVLAN, typically the router/gateway), Isolated (can only talk to promiscuous ports, not to other isolated or community ports), and Community (can talk to other ports in the same community and to promiscuous ports, but not to isolated ports or other communities)."
          },
          {
            "name": "What is the difference between a VLAN and a subnet?",
            "input": "",
            "output": "",
            "code": "A VLAN is a Layer 2 construct that defines a broadcast domain at the switching level, while a subnet is a Layer 3 construct that defines an IP address range and routing boundary. Best practice is a strict one-to-one mapping (one VLAN = one IP subnet) so that Layer 2 segmentation and Layer 3 addressing stay aligned, simplifying troubleshooting, ACLs, and routing."
          },
          {
            "name": "How do you troubleshoot VLAN connectivity issues?",
            "input": "",
            "output": "",
            "code": "Typical steps: verify the port's VLAN assignment with \"show interface switchport\" or \"show vlan brief\"; confirm the VLAN exists in the local VLAN database; check trunk configuration and allowed VLAN list with \"show interface trunk\"; verify native VLAN mismatches between trunk ends (a common cause of connectivity and CDP native VLAN mismatch warnings); check for STP blocking the port; and confirm the device's IP configuration matches the VLAN's subnet and default gateway."
          },
          {
            "name": "What is 802.1Q double tagging and how is it exploited?",
            "input": "",
            "output": "",
            "code": "Double tagging is when an attacker crafts a frame with two stacked 802.1Q tags - an outer tag matching the trunk's native VLAN and an inner tag for the target VLAN. The first switch strips the outer tag (since native VLAN traffic is untagged) and forwards the frame still carrying the inner tag, so the next switch treats it as belonging to the target VLAN - allowing the attacker to send traffic into a VLAN it shouldn't have access to. It is a one-way attack (no return traffic) and is prevented by not using the native VLAN for user traffic and disabling it on unused trunk ports."
          },
          {
            "name": "What is the difference between static and dynamic VLAN assignment?",
            "input": "",
            "output": "",
            "code": "Static VLAN assignment configures a specific VLAN directly on a switch port (\"switchport access vlan X\"), which is simple but requires manual reconfiguration if a device moves. Dynamic VLAN assignment uses a policy server, most commonly a RADIUS server with 802.1X, to assign a VLAN to a port based on the authenticated user or device identity, allowing consistent policy regardless of which physical port a device connects to."
          },
          {
            "name": "What is a VLAN Access Control List (VACL)?",
            "input": "",
            "output": "",
            "code": "A VACL applies access control directly to traffic within or between VLANs at Layer 2/3 on the switch, regardless of whether the traffic is routed. Unlike a router ACL, which only inspects traffic that is being routed between subnets, a VACL can filter traffic even between two hosts in the same VLAN, making it useful for intra-VLAN security policies."
          },
          {
            "name": "How does Spanning Tree Protocol interact with VLANs (PVST+ vs MST)?",
            "input": "",
            "output": "",
            "code": "Per-VLAN Spanning Tree Plus (PVST+) runs a separate STP instance per VLAN, allowing independent root bridge selection and load balancing across VLANs but consuming more CPU/BPDU overhead as VLAN count grows. Multiple Spanning Tree (MST) maps groups of VLANs to a smaller number of spanning-tree instances, reducing overhead while still allowing some load-balancing flexibility - a better fit for networks with a large number of VLANs."
          },
          {
            "name": "What is a voice VLAN and why is it used?",
            "input": "",
            "output": "",
            "code": "A voice VLAN is a dedicated VLAN configured on an access port to separate IP phone traffic from data traffic coming from a PC connected behind the phone. It allows the switch to apply QoS trust and prioritization to voice traffic, keep phone and PC traffic in separate broadcast/subnet domains, and simplifies configuration since the phone can be auto-configured via CDP/LLDP-MED to use the voice VLAN while the PC uses the port's regular access VLAN."
          },
          {
            "name": "What happens to a switch port's VLAN membership if the assigned VLAN is deleted?",
            "input": "",
            "output": "",
            "code": "If the VLAN assigned to an access port is deleted from the VLAN database, the port becomes \"inactive\" (shown as such in show vlan / show interface status) and stops forwarding traffic, even though its configuration still shows that VLAN number. Connectivity is only restored once the VLAN is recreated or the port is reassigned to an existing VLAN."
          },
          {
            "name": "What are common real-world use cases for VLANs in enterprise network design?",
            "input": "",
            "output": "",
            "code": "Typical use cases: (1) Departmental segmentation - separating HR, Finance, Engineering traffic for security and broadcast control. (2) Guest/BYOD networks - isolating untrusted wireless or visitor traffic from the corporate LAN. (3) Voice/Video VLANs - keeping VoIP and video-conferencing traffic on a QoS-prioritized VLAN separate from data. (4) Server/DMZ segmentation - placing public-facing servers in their own VLAN with tighter firewall rules. (5) IoT/OT isolation - putting cameras, badge readers, and industrial devices on a restricted VLAN that cannot reach the corporate network directly. (6) Multi-tenant hosting - using PVLANs so tenants on the same subnet cannot see each other's traffic."
          },
          {
            "name": "What design considerations should you follow when planning a VLAN scheme?",
            "input": "",
            "output": "",
            "code": "Key design practices: keep a strict one VLAN-to-one subnet mapping to simplify routing and troubleshooting; document a consistent VLAN numbering convention across sites (e.g., VLAN 10 = data, 20 = voice, 30 = guest at every branch); avoid using VLAN 1 or the native VLAN for real traffic; limit trunk \"allowed VLAN\" lists to only what's needed on each link (VLAN pruning) to reduce unnecessary broadcast propagation; plan for scalability using extended-range VLANs if you expect to exceed 1005 VLANs; align VLAN boundaries with security zones so ACLs/firewalls sit at natural VLAN-to-VLAN routing points; and keep the number of VLANs per switch/broadcast domain small enough that STP convergence and broadcast traffic remain manageable."
          },
          {
            "name": "How do you decide how many VLANs a network needs and where the boundaries should be?",
            "input": "",
            "output": "",
            "code": "VLAN boundaries are usually driven by three factors: security/compliance requirements (data that must be isolated, e.g., PCI card-holder data or OT networks), functional grouping (voice, data, guest, management, IoT), and broadcast-domain size (keeping each VLAN's host count small enough to limit broadcast traffic, commonly a few hundred hosts). A good rule of thumb is to start from the security and traffic-type requirements first, then further subdivide by physical site or department only if it improves manageability, rather than creating VLANs purely along org-chart lines."
          },
          {
            "name": "What is a management VLAN and why should it be separated from user VLANs?",
            "input": "",
            "output": "",
            "code": "The management VLAN carries traffic used to administer network devices themselves - SSH/HTTPS to switch/router management interfaces, SNMP, syslog. It should be a dedicated VLAN, not accessible from general user VLANs, and reachable only through a restricted path (jump host, ACL, or out-of-band network) so that a compromised user endpoint cannot directly reach switch/router management interfaces, which is a critical part of defense-in-depth network design."
          }
        ],
        "path": "Networking/vlan.txt"
      }
    ]
  }
];
