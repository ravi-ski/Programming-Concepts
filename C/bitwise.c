/*
 * Menu-driven bitwise interview programs.
 * Build with: gcc bitwise.c -o bitwise
 */
#include <limits.h>
#include <stdio.h>
#include <stdlib.h>

#define PROGRAM_COUNT 10

typedef void (*BitwiseProgram)(unsigned int);

static void odd_or_even(unsigned int number)
{
	printf("%u is %s.\n", number, (number & 1U) ? "odd" : "even");
}

static void set_clear_toggle_test(unsigned int number)
{
	const unsigned int position = 1U;
	unsigned int mask = 1U << position;

	printf("Input: %u, bit position: %u\n", number, position);
	printf("Set bit    : %u\n", number | mask);
	printf("Clear bit  : %u\n", number & ~mask);
	printf("Toggle bit : %u\n", number ^ mask);
	printf("Test bit   : %s\n", (number & mask) ? "set" : "clear");
}

static void power_of_two(unsigned int number)
{
	int result = number != 0U && (number & (number - 1U)) == 0U;

	printf("%u is %s a power of two.\n",
		   number, result ? "" : "not ");
}

static void count_set_bits(unsigned int number)
{
	unsigned int count = 0U;

	while (number != 0U)
	{
		number &= number - 1U;
		count++;
	}

	printf("Set-bit count: %u\n", count);
}

static void reverse_bits(unsigned int number)
{
	unsigned int reversed = 0U;
	unsigned int bit_count = sizeof(number) * CHAR_BIT;

	for (unsigned int index = 0U; index < bit_count; index++)
	{
		reversed = (reversed << 1U) | (number & 1U);
		number >>= 1U;
	}

	printf("Reversed bits: %u\n", reversed);
}

static void rotate_left(unsigned int number)
{
	const unsigned int bit_count = sizeof(number) * CHAR_BIT;
	const unsigned int rotation = 8U % bit_count;
	unsigned int rotated;

	rotated = (number << rotation) | (number >> (bit_count - rotation));
	printf("Rotated left by %u bits: %u\n", rotation, rotated);
}

static void xor_swap(unsigned int number)
{
	unsigned int other = number + 1U;

	printf("Before swap: first = %u, second = %u\n", number, other);
	number ^= other;
	other ^= number;
	number ^= other;
	printf("After swap : first = %u, second = %u\n", number, other);
}

static void missing_number(unsigned int number)
{
	unsigned int missing = number;
	unsigned int omitted = number / 2U;

	for (unsigned int value = 0U; value < number; value++)
		missing ^= value;

	for (unsigned int value = 0U; value < number; value++)
	{
		if (value != omitted)
			missing ^= value;
	}

	printf("Missing number from 0 to %u: %u\n", number, missing);
}

static void unique_number(unsigned int number)
{
	unsigned int values[] = {
		number, number ^ 1U, number ^ 2U, number ^ 1U, number ^ 2U
	};
	unsigned int unique = 0U;
	size_t size = sizeof(values) / sizeof(values[0]);

	for (size_t index = 0U; index < size; index++)
		unique ^= values[index];

	printf("Unique number in the sample array: %u\n", unique);
}

static void endian_check(unsigned int number)
{
	unsigned char *first_byte = (unsigned char *)&number;

	printf("Input: %u; system is %s-endian.\n",
		   number, *first_byte == (unsigned char)(number & 0xFFU)
					   ? "little" : "big");
}

static void display_menu(const char *names[])
{
	printf("\n=== Bitwise Interview Programs ===\n");

	for (int index = 0; index < PROGRAM_COUNT; index++)
		printf("%2d. %s\n", index + 1, names[index]);

	printf(" 0. Exit\n");
}

int main(void)
{
	const char *names[PROGRAM_COUNT] = {
		"Odd or even",
		"Set, clear, toggle, test bit",
		"Power of two",
		"Count set bits",
		"Reverse bits",
		"Rotate bits left",
		"Swap using XOR",
		"Find missing number",
		"Find unique number",
		"Check system endianness"
	};

	BitwiseProgram programs[PROGRAM_COUNT] = {
		odd_or_even,
		set_clear_toggle_test,
		power_of_two,
		count_set_bits,
		reverse_bits,
		rotate_left,
		xor_swap,
		missing_number,
		unique_number,
		endian_check
	};

	while (1)
	{
		int choice;
		unsigned int number;

		display_menu(names);
		printf("Choose a program: ");

		if (scanf("%d", &choice) != 1)
		{
			printf("Invalid choice. Please enter a number.\n");
			return EXIT_FAILURE;
		}

		if (choice == 0)
		{
			printf("Exiting.\n");
			break;
		}

		if (choice < 1 || choice > PROGRAM_COUNT)
		{
			printf("Choice must be between 0 and %d.\n", PROGRAM_COUNT);
			continue;
		}

		printf("Enter an unsigned input number: ");

		if (scanf("%u", &number) != 1)
		{
			printf("Invalid input number.\n");
			return EXIT_FAILURE;
		}

		printf("\nRunning: %s\n", names[choice - 1]);
		programs[choice - 1](number);
	}

	return EXIT_SUCCESS;
}
