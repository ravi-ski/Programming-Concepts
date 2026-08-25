#include <ctype.h>
#include <stdio.h>
#include <string.h>

/* @SECTION: C Programming */
/* @CHAPTER: STRING PROGRAMS */

/*
 * @PROGRAM: Reverse a character array string
 * @INPUT: hello
 * @OUTPUT: olleh
 */
void reverseString(char str[])
{
	int left = 0;
	int right = (int)strlen(str) - 1;

	while (left < right)
	{
		char temp = str[left];
		str[left] = str[right];
		str[right] = temp;
		left++;
		right--;
	}
}
/* @END */

/*
 * @PROGRAM: Check if a string is a palindrome
 * @INPUT: madam
 * @OUTPUT: madam is a palindrome
 */
int isPalindrome(const char *str)
{
	int left = 0;
	int right = (int)strlen(str) - 1;

	while (left < right)
	{
		if (str[left] != str[right])
			return 0;
		left++;
		right--;
	}
	return 1;
}
/* @END */

/*
 * @PROGRAM: Count vowels and consonants in a string
 * @INPUT: hello world
 * @OUTPUT: Vowels: 3, Consonants: 7
 */
void countVowelsConsonants(const char *str, int *vowels, int *consonants)
{
	*vowels = 0;
	*consonants = 0;
	for (int i = 0; str[i] != '\0'; i++)
	{
		char c = (char)tolower((unsigned char)str[i]);

		if (!isalpha((unsigned char)c))
			continue;
		if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u')
			(*vowels)++;
		else
			(*consonants)++;
	}
}
/* @END */

/*
 * @PROGRAM: Find the length of a string without strlen
 * @INPUT: hello
 * @OUTPUT: Length: 5
 */
int stringLength(const char *str)
{
	int length = 0;

	while (str[length] != '\0')
		length++;
	return length;
}
/* @END */

/*
 * @PROGRAM: Check if two strings are anagrams
 * @INPUT: listen, silent
 * @OUTPUT: Anagrams
 */
int areAnagrams(const char *a, const char *b)
{
	int counts[256] = {0};

	if (strlen(a) != strlen(b))
		return 0;

	for (int i = 0; a[i] != '\0'; i++)
		counts[(unsigned char)a[i]]++;
	for (int i = 0; b[i] != '\0'; i++)
		counts[(unsigned char)b[i]]--;

	for (int i = 0; i < 256; i++)
		if (counts[i] != 0)
			return 0;
	return 1;
}
/* @END */

/*
 * @PROGRAM: Remove duplicate characters from a string
 * @INPUT: programming
 * @OUTPUT: progamin
 */
void removeDuplicates(char str[])
{
	int seen[256] = {0};
	int writeIndex = 0;

	for (int i = 0; str[i] != '\0'; i++)
	{
		unsigned char c = (unsigned char)str[i];

		if (!seen[c])
		{
			seen[c] = 1;
			str[writeIndex++] = (char)c;
		}
	}
	str[writeIndex] = '\0';
}
/* @END */

/*
 * @PROGRAM: Find the first non-repeating character
 * @INPUT: swiss
 * @OUTPUT: w
 */
char firstNonRepeatingChar(const char *str)
{
	int counts[256] = {0};

	for (int i = 0; str[i] != '\0'; i++)
		counts[(unsigned char)str[i]]++;

	for (int i = 0; str[i] != '\0'; i++)
		if (counts[(unsigned char)str[i]] == 1)
			return str[i];

	return '\0';
}
/* @END */

/*
 * @PROGRAM: Count the frequency of each character
 * @INPUT: aabbc
 * @OUTPUT: a:2 b:2 c:1
 */
void charFrequency(const char *str)
{
	int counts[256] = {0};

	for (int i = 0; str[i] != '\0'; i++)
		counts[(unsigned char)str[i]]++;

	for (int c = 0; c < 256; c++)
		if (counts[c] > 0)
			printf("%c:%d ", c, counts[c]);
	printf("\n");
}
/* @END */

/*
 * @PROGRAM: Convert a string to uppercase
 * @INPUT: Hello World
 * @OUTPUT: HELLO WORLD
 */
void toUpperCase(char str[])
{
	for (int i = 0; str[i] != '\0'; i++)
		str[i] = (char)toupper((unsigned char)str[i]);
}
/* @END */

/*
 * @PROGRAM: Convert a string to lowercase
 * @INPUT: Hello World
 * @OUTPUT: hello world
 */
void toLowerCase(char str[])
{
	for (int i = 0; str[i] != '\0'; i++)
		str[i] = (char)tolower((unsigned char)str[i]);
}
/* @END */

/*
 * @PROGRAM: Check if a string contains only digits
 * @INPUT: 12345
 * @OUTPUT: Numeric
 */
int isNumeric(const char *str)
{
	if (*str == '\0')
		return 0;

	for (int i = 0; str[i] != '\0'; i++)
		if (!isdigit((unsigned char)str[i]))
			return 0;
	return 1;
}
/* @END */

/*
 * @PROGRAM: Reverse the words in a sentence
 * @INPUT: Hello World From C
 * @OUTPUT: C From World Hello
 */
void reverseWords(char str[])
{
	reverseString(str);

	int start = 0;
	int length = (int)strlen(str);

	for (int i = 0; i <= length; i++)
	{
		if (str[i] == ' ' || str[i] == '\0')
		{
			int left = start;
			int right = i - 1;

			while (left < right)
			{
				char temp = str[left];
				str[left] = str[right];
				str[right] = temp;
				left++;
				right--;
			}
			start = i + 1;
		}
	}
}
/* @END */

/*
 * @PROGRAM: Count the number of words in a sentence
 * @INPUT: Hello World From C
 * @OUTPUT: Word count: 4
 */
int countWords(const char *str)
{
	int count = 0;
	int inWord = 0;

	for (int i = 0; str[i] != '\0'; i++)
	{
		if (str[i] != ' ' && !inWord)
		{
			inWord = 1;
			count++;
		}
		else if (str[i] == ' ')
		{
			inWord = 0;
		}
	}
	return count;
}
/* @END */

/*
 * @PROGRAM: Find a substring within a string (strstr implementation)
 * @INPUT: hello world, world
 * @OUTPUT: Found at index 6
 */
int myStrStr(const char *haystack, const char *needle)
{
	int haystackLen = (int)strlen(haystack);
	int needleLen = (int)strlen(needle);

	if (needleLen == 0)
		return 0;

	for (int i = 0; i <= haystackLen - needleLen; i++)
	{
		int j = 0;

		while (j < needleLen && haystack[i + j] == needle[j])
			j++;
		if (j == needleLen)
			return i;
	}
	return -1;
}
/* @END */

/*
 * @PROGRAM: Remove all whitespaces from a string
 * @INPUT: H e l l o
 * @OUTPUT: Hello
 */
void removeSpaces(char str[])
{
	int writeIndex = 0;

	for (int i = 0; str[i] != '\0'; i++)
		if (str[i] != ' ')
			str[writeIndex++] = str[i];
	str[writeIndex] = '\0';
}
/* @END */

/*
 * @PROGRAM: Find the maximum occurring character
 * @INPUT: programming
 * @OUTPUT: r
 */
char maxOccurringChar(const char *str)
{
	int counts[256] = {0};
	int maxCount = 0;

	for (int i = 0; str[i] != '\0'; i++)
		counts[(unsigned char)str[i]]++;

	for (int c = 0; c < 256; c++)
		if (counts[c] > maxCount)
			maxCount = counts[c];

	for (int i = 0; str[i] != '\0'; i++)
		if (counts[(unsigned char)str[i]] == maxCount)
			return str[i];

	return '\0';
}
/* @END */

/*
 * @PROGRAM: Toggle the case of each character
 * @INPUT: Hello World
 * @OUTPUT: hELLO wORLD
 */
void toggleCase(char str[])
{
	for (int i = 0; str[i] != '\0'; i++)
	{
		if (islower((unsigned char)str[i]))
			str[i] = (char)toupper((unsigned char)str[i]);
		else if (isupper((unsigned char)str[i]))
			str[i] = (char)tolower((unsigned char)str[i]);
	}
}
/* @END */

/*
 * @PROGRAM: Check if two strings are rotations of each other
 * @INPUT: waterbottle, erbottlewat
 * @OUTPUT: Rotations
 */
int areRotations(const char *a, const char *b)
{
	char combined[256];
	size_t lenA = strlen(a);
	size_t lenB = strlen(b);

	if (lenA != lenB || lenA >= sizeof(combined) / 2)
		return 0;

	snprintf(combined, sizeof(combined), "%s%s", a, a);
	return myStrStr(combined, b) != -1;
}
/* @END */

/*
 * @PROGRAM: Implement strcpy
 * @INPUT: copytest
 * @OUTPUT: copytest
 */
char *myStrcpy(char dest[], const char src[])
{
	int i = 0;

	while ((dest[i] = src[i]) != '\0')
		i++;
	return dest;
}
/* @END */

/*
 * @PROGRAM: Implement strcat
 * @INPUT: Hello , World
 * @OUTPUT: Hello World
 */
char *myStrcat(char dest[], const char src[])
{
	int destLen = (int)strlen(dest);
	int i = 0;

	while ((dest[destLen + i] = src[i]) != '\0')
		i++;
	return dest;
}
/* @END */

/*
 * @PROGRAM: Convert a string to integer (atoi implementation)
 * @INPUT: -1234
 * @OUTPUT: -1234
 */
int myAtoi(const char *str)
{
	int result = 0;
	int sign = 1;
	int i = 0;

	if (str[0] == '-' || str[0] == '+')
	{
		sign = (str[0] == '-') ? -1 : 1;
		i++;
	}

	for (; str[i] != '\0'; i++)
	{
		if (!isdigit((unsigned char)str[i]))
			break;
		result = result * 10 + (str[i] - '0');
	}
	return result * sign;
}
/* @END */

static void readLine(char *buffer, int size)
{
	if (fgets(buffer, size, stdin) != NULL)
		buffer[strcspn(buffer, "\n")] = '\0';
}

static void printMenu(void)
{
	printf("\n--- String Interview Programs ---\n");
	printf(" 1. Reverse a string\n");
	printf(" 2. Check palindrome\n");
	printf(" 3. Count vowels and consonants\n");
	printf(" 4. String length (custom)\n");
	printf(" 5. Check anagrams\n");
	printf(" 6. Remove duplicate characters\n");
	printf(" 7. First non-repeating character\n");
	printf(" 8. Character frequency\n");
	printf(" 9. Convert to uppercase\n");
	printf("10. Convert to lowercase\n");
	printf("11. Check numeric string\n");
	printf("12. Reverse words in a sentence\n");
	printf("13. Count words\n");
	printf("14. Find substring (strstr)\n");
	printf("15. Remove whitespaces\n");
	printf("16. Maximum occurring character\n");
	printf("17. Toggle case\n");
	printf("18. Check string rotations\n");
	printf("19. Implement strcpy\n");
	printf("20. Implement strcat\n");
	printf("21. String to integer (atoi)\n");
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
			printf("Enter string: ");
			readLine(bufferA, sizeof(bufferA));
			reverseString(bufferA);
			printf("Reversed: %s\n", bufferA);
			break;
		case 2:
			printf("Enter string: ");
			readLine(bufferA, sizeof(bufferA));
			printf("%s a palindrome\n", isPalindrome(bufferA) ? "Is" : "Is not");
			break;
		case 3:
		{
			int vowels, consonants;

			printf("Enter string: ");
			readLine(bufferA, sizeof(bufferA));
			countVowelsConsonants(bufferA, &vowels, &consonants);
			printf("Vowels: %d, Consonants: %d\n", vowels, consonants);
			break;
		}
		case 4:
			printf("Enter string: ");
			readLine(bufferA, sizeof(bufferA));
			printf("Length: %d\n", stringLength(bufferA));
			break;
		case 5:
			printf("Enter first string: ");
			readLine(bufferA, sizeof(bufferA));
			printf("Enter second string: ");
			readLine(bufferB, sizeof(bufferB));
			printf("%s\n", areAnagrams(bufferA, bufferB) ? "Anagrams" : "Not anagrams");
			break;
		case 6:
			printf("Enter string: ");
			readLine(bufferA, sizeof(bufferA));
			removeDuplicates(bufferA);
			printf("Result: %s\n", bufferA);
			break;
		case 7:
			printf("Enter string: ");
			readLine(bufferA, sizeof(bufferA));
			printf("First non-repeating: %c\n", firstNonRepeatingChar(bufferA));
			break;
		case 8:
			printf("Enter string: ");
			readLine(bufferA, sizeof(bufferA));
			charFrequency(bufferA);
			break;
		case 9:
			printf("Enter string: ");
			readLine(bufferA, sizeof(bufferA));
			toUpperCase(bufferA);
			printf("Result: %s\n", bufferA);
			break;
		case 10:
			printf("Enter string: ");
			readLine(bufferA, sizeof(bufferA));
			toLowerCase(bufferA);
			printf("Result: %s\n", bufferA);
			break;
		case 11:
			printf("Enter string: ");
			readLine(bufferA, sizeof(bufferA));
			printf("%s\n", isNumeric(bufferA) ? "Numeric" : "Not numeric");
			break;
		case 12:
			printf("Enter sentence: ");
			readLine(bufferA, sizeof(bufferA));
			reverseWords(bufferA);
			printf("Result: %s\n", bufferA);
			break;
		case 13:
			printf("Enter sentence: ");
			readLine(bufferA, sizeof(bufferA));
			printf("Word count: %d\n", countWords(bufferA));
			break;
		case 14:
		{
			int index;

			printf("Enter main string: ");
			readLine(bufferA, sizeof(bufferA));
			printf("Enter substring: ");
			readLine(bufferB, sizeof(bufferB));
			index = myStrStr(bufferA, bufferB);
			if (index == -1)
				printf("Not found\n");
			else
				printf("Found at index %d\n", index);
			break;
		}
		case 15:
			printf("Enter string: ");
			readLine(bufferA, sizeof(bufferA));
			removeSpaces(bufferA);
			printf("Result: %s\n", bufferA);
			break;
		case 16:
			printf("Enter string: ");
			readLine(bufferA, sizeof(bufferA));
			printf("Max occurring character: %c\n", maxOccurringChar(bufferA));
			break;
		case 17:
			printf("Enter string: ");
			readLine(bufferA, sizeof(bufferA));
			toggleCase(bufferA);
			printf("Result: %s\n", bufferA);
			break;
		case 18:
			printf("Enter first string: ");
			readLine(bufferA, sizeof(bufferA));
			printf("Enter second string: ");
			readLine(bufferB, sizeof(bufferB));
			printf("%s\n", areRotations(bufferA, bufferB) ? "Rotations" : "Not rotations");
			break;
		case 19:
			printf("Enter source string: ");
			readLine(bufferB, sizeof(bufferB));
			myStrcpy(bufferA, bufferB);
			printf("Result: %s\n", bufferA);
			break;
		case 20:
			printf("Enter first part: ");
			readLine(bufferA, sizeof(bufferA));
			printf("Enter second part: ");
			readLine(bufferB, sizeof(bufferB));
			myStrcat(bufferA, bufferB);
			printf("Result: %s\n", bufferA);
			break;
		case 21:
			printf("Enter numeric string: ");
			readLine(bufferA, sizeof(bufferA));
			printf("Result: %d\n", myAtoi(bufferA));
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

