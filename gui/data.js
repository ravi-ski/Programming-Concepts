const CATALOG = [
  {
    "section": "C Programming",
    "chapters": [
      {
        "chapter": "POINTERS",
        "folder": "C",
        "path": "C/pointers.c",
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
        ]
      },
      {
        "chapter": "STRING PROGRAMS",
        "folder": "C",
        "path": "C/strings.c",
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
        ]
      }
    ]
  },
  {
    "section": "Networking",
    "chapters": [
      {
        "chapter": "VLAN",
        "folder": "Networking",
        "path": "Networking/vlan.txt",
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
        ]
      }
    ]
  }
];
