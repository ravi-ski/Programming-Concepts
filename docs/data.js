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
