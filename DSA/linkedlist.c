/* @SECTION: C Programming */
/* @CHAPTER: LINKED LIST (DSA) */
/*
 * Each block below is a small, independent, self-contained example
 * demonstrating one linked-list operation. Compile individually:
 * gcc file.c -o out
 */

/*
 * @PROGRAM: Create a node and a simple singly linked list
 * @INPUT: 10 -> 20 -> 30
 * @OUTPUT: 10 -> 20 -> 30 -> NULL
 */
#include <stdio.h>
#include <stdlib.h>

struct Node
{
	int data;
	struct Node *next;
};

static struct Node *createNode(int data)
{
	struct Node *node = malloc(sizeof(struct Node));
	node->data = data;
	node->next = NULL;
	return node;
}

int main(void)
{
	struct Node *head = createNode(10);
	head->next = createNode(20);
	head->next->next = createNode(30);

	for (struct Node *cur = head; cur != NULL; cur = cur->next)
		printf("%d -> ", cur->data);
	printf("NULL\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Insert a node at the beginning of a linked list
 * @INPUT: list = 20 -> 30, insert 10
 * @OUTPUT: 10 -> 20 -> 30 -> NULL
 */
#include <stdio.h>
#include <stdlib.h>

struct Node
{
	int data;
	struct Node *next;
};

static struct Node *insertAtBeginning(struct Node *head, int data)
{
	struct Node *node = malloc(sizeof(struct Node));
	node->data = data;
	node->next = head;
	return node;
}

int main(void)
{
	struct Node *head = malloc(sizeof(struct Node));
	head->data = 20;
	head->next = malloc(sizeof(struct Node));
	head->next->data = 30;
	head->next->next = NULL;

	head = insertAtBeginning(head, 10);

	for (struct Node *cur = head; cur != NULL; cur = cur->next)
		printf("%d -> ", cur->data);
	printf("NULL\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Insert a node at the end of a linked list
 * @INPUT: list = 10 -> 20, insert 30
 * @OUTPUT: 10 -> 20 -> 30 -> NULL
 */
#include <stdio.h>
#include <stdlib.h>

struct Node
{
	int data;
	struct Node *next;
};

static struct Node *insertAtEnd(struct Node *head, int data)
{
	struct Node *node = malloc(sizeof(struct Node));
	node->data = data;
	node->next = NULL;

	if (head == NULL)
		return node;

	struct Node *cur = head;
	while (cur->next != NULL)
		cur = cur->next;
	cur->next = node;

	return head;
}

int main(void)
{
	struct Node *head = malloc(sizeof(struct Node));
	head->data = 10;
	head->next = malloc(sizeof(struct Node));
	head->next->data = 20;
	head->next->next = NULL;

	head = insertAtEnd(head, 30);

	for (struct Node *cur = head; cur != NULL; cur = cur->next)
		printf("%d -> ", cur->data);
	printf("NULL\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Insert a node at a given position
 * @INPUT: list = 10 -> 20 -> 40, insert 30 at position 2 (0-indexed)
 * @OUTPUT: 10 -> 20 -> 30 -> 40 -> NULL
 */
#include <stdio.h>
#include <stdlib.h>

struct Node
{
	int data;
	struct Node *next;
};

static struct Node *insertAtPosition(struct Node *head, int data, int position)
{
	struct Node *node = malloc(sizeof(struct Node));
	node->data = data;

	if (position == 0)
	{
		node->next = head;
		return node;
	}

	struct Node *cur = head;
	for (int i = 0; i < position - 1 && cur != NULL; i++)
		cur = cur->next;

	node->next = cur->next;
	cur->next = node;
	return head;
}

int main(void)
{
	struct Node *head = malloc(sizeof(struct Node));
	head->data = 10;
	head->next = malloc(sizeof(struct Node));
	head->next->data = 20;
	head->next->next = malloc(sizeof(struct Node));
	head->next->next->data = 40;
	head->next->next->next = NULL;

	head = insertAtPosition(head, 30, 2);

	for (struct Node *cur = head; cur != NULL; cur = cur->next)
		printf("%d -> ", cur->data);
	printf("NULL\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Delete the first node of a linked list
 * @INPUT: list = 10 -> 20 -> 30
 * @OUTPUT: 20 -> 30 -> NULL
 */
#include <stdio.h>
#include <stdlib.h>

struct Node
{
	int data;
	struct Node *next;
};

static struct Node *deleteFromBeginning(struct Node *head)
{
	if (head == NULL)
		return NULL;

	struct Node *newHead = head->next;
	free(head);
	return newHead;
}

int main(void)
{
	struct Node *head = malloc(sizeof(struct Node));
	head->data = 10;
	head->next = malloc(sizeof(struct Node));
	head->next->data = 20;
	head->next->next = malloc(sizeof(struct Node));
	head->next->next->data = 30;
	head->next->next->next = NULL;

	head = deleteFromBeginning(head);

	for (struct Node *cur = head; cur != NULL; cur = cur->next)
		printf("%d -> ", cur->data);
	printf("NULL\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Delete the last node of a linked list
 * @INPUT: list = 10 -> 20 -> 30
 * @OUTPUT: 10 -> 20 -> NULL
 */
#include <stdio.h>
#include <stdlib.h>

struct Node
{
	int data;
	struct Node *next;
};

static struct Node *deleteFromEnd(struct Node *head)
{
	if (head == NULL || head->next == NULL)
	{
		free(head);
		return NULL;
	}

	struct Node *cur = head;
	while (cur->next->next != NULL)
		cur = cur->next;

	free(cur->next);
	cur->next = NULL;
	return head;
}

int main(void)
{
	struct Node *head = malloc(sizeof(struct Node));
	head->data = 10;
	head->next = malloc(sizeof(struct Node));
	head->next->data = 20;
	head->next->next = malloc(sizeof(struct Node));
	head->next->next->data = 30;
	head->next->next->next = NULL;

	head = deleteFromEnd(head);

	for (struct Node *cur = head; cur != NULL; cur = cur->next)
		printf("%d -> ", cur->data);
	printf("NULL\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Delete a node by value
 * @INPUT: list = 10 -> 20 -> 30, delete 20
 * @OUTPUT: 10 -> 30 -> NULL
 */
#include <stdio.h>
#include <stdlib.h>

struct Node
{
	int data;
	struct Node *next;
};

static struct Node *deleteByValue(struct Node *head, int value)
{
	if (head == NULL)
		return NULL;

	if (head->data == value)
	{
		struct Node *newHead = head->next;
		free(head);
		return newHead;
	}

	struct Node *cur = head;
	while (cur->next != NULL && cur->next->data != value)
		cur = cur->next;

	if (cur->next != NULL)
	{
		struct Node *toDelete = cur->next;
		cur->next = toDelete->next;
		free(toDelete);
	}

	return head;
}

int main(void)
{
	struct Node *head = malloc(sizeof(struct Node));
	head->data = 10;
	head->next = malloc(sizeof(struct Node));
	head->next->data = 20;
	head->next->next = malloc(sizeof(struct Node));
	head->next->next->data = 30;
	head->next->next->next = NULL;

	head = deleteByValue(head, 20);

	for (struct Node *cur = head; cur != NULL; cur = cur->next)
		printf("%d -> ", cur->data);
	printf("NULL\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Search for a value in a linked list
 * @INPUT: list = 10 -> 20 -> 30, search 20
 * @OUTPUT: Found 20 in the list
 */
#include <stdio.h>
#include <stdlib.h>

struct Node
{
	int data;
	struct Node *next;
};

static int search(struct Node *head, int value)
{
	for (struct Node *cur = head; cur != NULL; cur = cur->next)
		if (cur->data == value)
			return 1;
	return 0;
}

int main(void)
{
	struct Node *head = malloc(sizeof(struct Node));
	head->data = 10;
	head->next = malloc(sizeof(struct Node));
	head->next->data = 20;
	head->next->next = malloc(sizeof(struct Node));
	head->next->next->data = 30;
	head->next->next->next = NULL;

	if (search(head, 20))
		printf("Found 20 in the list\n");
	else
		printf("20 not found\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Find the length of a linked list
 * @INPUT: list = 10 -> 20 -> 30
 * @OUTPUT: Length: 3
 */
#include <stdio.h>
#include <stdlib.h>

struct Node
{
	int data;
	struct Node *next;
};

static int length(struct Node *head)
{
	int count = 0;
	for (struct Node *cur = head; cur != NULL; cur = cur->next)
		count++;
	return count;
}

int main(void)
{
	struct Node *head = malloc(sizeof(struct Node));
	head->data = 10;
	head->next = malloc(sizeof(struct Node));
	head->next->data = 20;
	head->next->next = malloc(sizeof(struct Node));
	head->next->next->data = 30;
	head->next->next->next = NULL;

	printf("Length: %d\n", length(head));
	return 0;
}
/* @END */

/*
 * @PROGRAM: Reverse a linked list (iterative)
 * @INPUT: list = 10 -> 20 -> 30
 * @OUTPUT: 30 -> 20 -> 10 -> NULL
 */
#include <stdio.h>
#include <stdlib.h>

struct Node
{
	int data;
	struct Node *next;
};

static struct Node *reverseIterative(struct Node *head)
{
	struct Node *prev = NULL;
	struct Node *cur = head;

	while (cur != NULL)
	{
		struct Node *next = cur->next;
		cur->next = prev;
		prev = cur;
		cur = next;
	}

	return prev;
}

int main(void)
{
	struct Node *head = malloc(sizeof(struct Node));
	head->data = 10;
	head->next = malloc(sizeof(struct Node));
	head->next->data = 20;
	head->next->next = malloc(sizeof(struct Node));
	head->next->next->data = 30;
	head->next->next->next = NULL;

	head = reverseIterative(head);

	for (struct Node *cur = head; cur != NULL; cur = cur->next)
		printf("%d -> ", cur->data);
	printf("NULL\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Reverse a linked list (recursive)
 * @INPUT: list = 10 -> 20 -> 30
 * @OUTPUT: 30 -> 20 -> 10 -> NULL
 */
#include <stdio.h>
#include <stdlib.h>

struct Node
{
	int data;
	struct Node *next;
};

static struct Node *reverseRecursive(struct Node *head)
{
	if (head == NULL || head->next == NULL)
		return head;

	struct Node *newHead = reverseRecursive(head->next);
	head->next->next = head;
	head->next = NULL;

	return newHead;
}

int main(void)
{
	struct Node *head = malloc(sizeof(struct Node));
	head->data = 10;
	head->next = malloc(sizeof(struct Node));
	head->next->data = 20;
	head->next->next = malloc(sizeof(struct Node));
	head->next->next->data = 30;
	head->next->next->next = NULL;

	head = reverseRecursive(head);

	for (struct Node *cur = head; cur != NULL; cur = cur->next)
		printf("%d -> ", cur->data);
	printf("NULL\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Detect a cycle in a linked list (Floyd's cycle detection)
 * @INPUT: list with the last node pointing back into the middle
 * @OUTPUT: Cycle detected
 */
#include <stdio.h>
#include <stdlib.h>

struct Node
{
	int data;
	struct Node *next;
};

static int hasCycle(struct Node *head)
{
	struct Node *slow = head, *fast = head;

	while (fast != NULL && fast->next != NULL)
	{
		slow = slow->next;
		fast = fast->next->next;
		if (slow == fast)
			return 1;
	}
	return 0;
}

int main(void)
{
	struct Node *head = malloc(sizeof(struct Node));
	head->data = 10;
	head->next = malloc(sizeof(struct Node));
	head->next->data = 20;
	head->next->next = malloc(sizeof(struct Node));
	head->next->next->data = 30;
	head->next->next->next = head->next; /* create a cycle back into the list */

	printf("%s\n", hasCycle(head) ? "Cycle detected" : "No cycle");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Find the middle of a linked list (slow/fast pointer)
 * @INPUT: list = 10 -> 20 -> 30 -> 40 -> 50
 * @OUTPUT: Middle element: 30
 */
#include <stdio.h>
#include <stdlib.h>

struct Node
{
	int data;
	struct Node *next;
};

static struct Node *findMiddle(struct Node *head)
{
	struct Node *slow = head, *fast = head;

	while (fast != NULL && fast->next != NULL)
	{
		slow = slow->next;
		fast = fast->next->next;
	}
	return slow;
}

int main(void)
{
	struct Node *head = NULL, *tail = NULL;

	for (int i = 1; i <= 5; i++)
	{
		struct Node *node = malloc(sizeof(struct Node));
		node->data = i * 10;
		node->next = NULL;
		if (head == NULL)
			head = tail = node;
		else
		{
			tail->next = node;
			tail = node;
		}
	}

	printf("Middle element: %d\n", findMiddle(head)->data);
	return 0;
}
/* @END */

/*
 * @PROGRAM: Remove duplicates from a sorted linked list
 * @INPUT: list = 10 -> 10 -> 20 -> 30 -> 30
 * @OUTPUT: 10 -> 20 -> 30 -> NULL
 */
#include <stdio.h>
#include <stdlib.h>

struct Node
{
	int data;
	struct Node *next;
};

static void removeDuplicatesSorted(struct Node *head)
{
	struct Node *cur = head;

	while (cur != NULL && cur->next != NULL)
	{
		if (cur->data == cur->next->data)
		{
			struct Node *duplicate = cur->next;
			cur->next = cur->next->next;
			free(duplicate);
		}
		else
			cur = cur->next;
	}
}

int main(void)
{
	int values[] = {10, 10, 20, 30, 30};
	struct Node *head = NULL, *tail = NULL;

	for (int i = 0; i < 5; i++)
	{
		struct Node *node = malloc(sizeof(struct Node));
		node->data = values[i];
		node->next = NULL;
		if (head == NULL)
			head = tail = node;
		else
		{
			tail->next = node;
			tail = node;
		}
	}

	removeDuplicatesSorted(head);

	for (struct Node *cur = head; cur != NULL; cur = cur->next)
		printf("%d -> ", cur->data);
	printf("NULL\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Remove duplicates from an unsorted linked list
 * @INPUT: list = 10 -> 20 -> 10 -> 30 -> 20
 * @OUTPUT: 10 -> 20 -> 30 -> NULL
 */
#include <stdio.h>
#include <stdlib.h>

struct Node
{
	int data;
	struct Node *next;
};

static void removeDuplicatesUnsorted(struct Node *head)
{
	int seen[1000] = {0};
	struct Node *cur = head;

	seen[cur->data] = 1;

	while (cur->next != NULL)
	{
		if (seen[cur->next->data])
		{
			struct Node *duplicate = cur->next;
			cur->next = cur->next->next;
			free(duplicate);
		}
		else
		{
			seen[cur->next->data] = 1;
			cur = cur->next;
		}
	}
}

int main(void)
{
	int values[] = {10, 20, 10, 30, 20};
	struct Node *head = NULL, *tail = NULL;

	for (int i = 0; i < 5; i++)
	{
		struct Node *node = malloc(sizeof(struct Node));
		node->data = values[i];
		node->next = NULL;
		if (head == NULL)
			head = tail = node;
		else
		{
			tail->next = node;
			tail = node;
		}
	}

	removeDuplicatesUnsorted(head);

	for (struct Node *cur = head; cur != NULL; cur = cur->next)
		printf("%d -> ", cur->data);
	printf("NULL\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Merge two sorted linked lists
 * @INPUT: list1 = 10 -> 30 -> 50, list2 = 20 -> 40 -> 60
 * @OUTPUT: 10 -> 20 -> 30 -> 40 -> 50 -> 60 -> NULL
 */
#include <stdio.h>
#include <stdlib.h>

struct Node
{
	int data;
	struct Node *next;
};

static struct Node *mergeSorted(struct Node *a, struct Node *b)
{
	struct Node dummy;
	struct Node *tail = &dummy;
	dummy.next = NULL;

	while (a != NULL && b != NULL)
	{
		if (a->data <= b->data)
		{
			tail->next = a;
			a = a->next;
		}
		else
		{
			tail->next = b;
			b = b->next;
		}
		tail = tail->next;
	}

	tail->next = (a != NULL) ? a : b;
	return dummy.next;
}

static struct Node *buildList(int values[], int n)
{
	struct Node *head = NULL, *tail = NULL;
	for (int i = 0; i < n; i++)
	{
		struct Node *node = malloc(sizeof(struct Node));
		node->data = values[i];
		node->next = NULL;
		if (head == NULL)
			head = tail = node;
		else
		{
			tail->next = node;
			tail = node;
		}
	}
	return head;
}

int main(void)
{
	int values1[] = {10, 30, 50};
	int values2[] = {20, 40, 60};

	struct Node *list1 = buildList(values1, 3);
	struct Node *list2 = buildList(values2, 3);
	struct Node *merged = mergeSorted(list1, list2);

	for (struct Node *cur = merged; cur != NULL; cur = cur->next)
		printf("%d -> ", cur->data);
	printf("NULL\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Find the Nth node from the end of a linked list
 * @INPUT: list = 10 -> 20 -> 30 -> 40 -> 50, N = 2
 * @OUTPUT: 2nd node from end: 40
 */
#include <stdio.h>
#include <stdlib.h>

struct Node
{
	int data;
	struct Node *next;
};

static struct Node *nthFromEnd(struct Node *head, int n)
{
	struct Node *first = head, *second = head;

	for (int i = 0; i < n; i++)
		first = first->next;

	while (first != NULL)
	{
		first = first->next;
		second = second->next;
	}

	return second;
}

int main(void)
{
	struct Node *head = NULL, *tail = NULL;

	for (int i = 1; i <= 5; i++)
	{
		struct Node *node = malloc(sizeof(struct Node));
		node->data = i * 10;
		node->next = NULL;
		if (head == NULL)
			head = tail = node;
		else
		{
			tail->next = node;
			tail = node;
		}
	}

	printf("2nd node from end: %d\n", nthFromEnd(head, 2)->data);
	return 0;
}
/* @END */

/*
 * @PROGRAM: Check if a linked list is a palindrome
 * @INPUT: list = 1 -> 2 -> 3 -> 2 -> 1
 * @OUTPUT: The list is a palindrome
 */
#include <stdio.h>
#include <stdlib.h>

struct Node
{
	int data;
	struct Node *next;
};

static int isPalindrome(struct Node *head)
{
	int values[1000], count = 0;

	for (struct Node *cur = head; cur != NULL; cur = cur->next)
		values[count++] = cur->data;

	for (int i = 0, j = count - 1; i < j; i++, j--)
		if (values[i] != values[j])
			return 0;

	return 1;
}

int main(void)
{
	int data[] = {1, 2, 3, 2, 1};
	struct Node *head = NULL, *tail = NULL;

	for (int i = 0; i < 5; i++)
	{
		struct Node *node = malloc(sizeof(struct Node));
		node->data = data[i];
		node->next = NULL;
		if (head == NULL)
			head = tail = node;
		else
		{
			tail->next = node;
			tail = node;
		}
	}

	printf("%s\n", isPalindrome(head) ? "The list is a palindrome" : "Not a palindrome");
	return 0;
}
/* @END */

/*
 * @PROGRAM: Sort a linked list using merge sort
 * @INPUT: list = 40 -> 10 -> 30 -> 20
 * @OUTPUT: 10 -> 20 -> 30 -> 40 -> NULL
 */
#include <stdio.h>
#include <stdlib.h>

struct Node
{
	int data;
	struct Node *next;
};

static struct Node *merge(struct Node *a, struct Node *b)
{
	if (a == NULL)
		return b;
	if (b == NULL)
		return a;

	if (a->data <= b->data)
	{
		a->next = merge(a->next, b);
		return a;
	}
	b->next = merge(a, b->next);
	return b;
}

static struct Node *split(struct Node *head)
{
	struct Node *slow = head, *fast = head->next;

	while (fast != NULL && fast->next != NULL)
	{
		slow = slow->next;
		fast = fast->next->next;
	}

	struct Node *second = slow->next;
	slow->next = NULL;
	return second;
}

static struct Node *mergeSort(struct Node *head)
{
	if (head == NULL || head->next == NULL)
		return head;

	struct Node *second = split(head);
	head = mergeSort(head);
	second = mergeSort(second);

	return merge(head, second);
}

int main(void)
{
	int values[] = {40, 10, 30, 20};
	struct Node *head = NULL, *tail = NULL;

	for (int i = 0; i < 4; i++)
	{
		struct Node *node = malloc(sizeof(struct Node));
		node->data = values[i];
		node->next = NULL;
		if (head == NULL)
			head = tail = node;
		else
		{
			tail->next = node;
			tail = node;
		}
	}

	head = mergeSort(head);

	for (struct Node *cur = head; cur != NULL; cur = cur->next)
		printf("%d -> ", cur->data);
	printf("NULL\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Swap nodes in pairs
 * @INPUT: list = 10 -> 20 -> 30 -> 40
 * @OUTPUT: 20 -> 10 -> 40 -> 30 -> NULL
 */
#include <stdio.h>
#include <stdlib.h>

struct Node
{
	int data;
	struct Node *next;
};

static struct Node *swapPairs(struct Node *head)
{
	if (head == NULL || head->next == NULL)
		return head;

	struct Node *newHead = head->next;
	head->next = swapPairs(newHead->next);
	newHead->next = head;

	return newHead;
}

int main(void)
{
	struct Node *head = NULL, *tail = NULL;

	for (int i = 1; i <= 4; i++)
	{
		struct Node *node = malloc(sizeof(struct Node));
		node->data = i * 10;
		node->next = NULL;
		if (head == NULL)
			head = tail = node;
		else
		{
			tail->next = node;
			tail = node;
		}
	}

	head = swapPairs(head);

	for (struct Node *cur = head; cur != NULL; cur = cur->next)
		printf("%d -> ", cur->data);
	printf("NULL\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Rotate a linked list by k places
 * @INPUT: list = 10 -> 20 -> 30 -> 40 -> 50, k = 2
 * @OUTPUT: 30 -> 40 -> 50 -> 10 -> 20 -> NULL
 */
#include <stdio.h>
#include <stdlib.h>

struct Node
{
	int data;
	struct Node *next;
};

static struct Node *rotate(struct Node *head, int k)
{
	if (head == NULL)
		return NULL;

	int length = 1;
	struct Node *tail = head;
	while (tail->next != NULL)
	{
		tail = tail->next;
		length++;
	}

	k = k % length;
	if (k == 0)
		return head;

	struct Node *newTail = head;
	for (int i = 0; i < length - k - 1; i++)
		newTail = newTail->next;

	struct Node *newHead = newTail->next;
	newTail->next = NULL;
	tail->next = head;

	return newHead;
}

int main(void)
{
	struct Node *head = NULL, *tail = NULL;

	for (int i = 1; i <= 5; i++)
	{
		struct Node *node = malloc(sizeof(struct Node));
		node->data = i * 10;
		node->next = NULL;
		if (head == NULL)
			head = tail = node;
		else
		{
			tail->next = node;
			tail = node;
		}
	}

	head = rotate(head, 2);

	for (struct Node *cur = head; cur != NULL; cur = cur->next)
		printf("%d -> ", cur->data);
	printf("NULL\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Find the intersection point of two linked lists
 * @INPUT: two lists that merge into a shared tail
 * @OUTPUT: Intersection at node with value: 30
 */
#include <stdio.h>
#include <stdlib.h>

struct Node
{
	int data;
	struct Node *next;
};

static int listLength(struct Node *head)
{
	int len = 0;
	for (struct Node *cur = head; cur != NULL; cur = cur->next)
		len++;
	return len;
}

static struct Node *findIntersection(struct Node *a, struct Node *b)
{
	int lenA = listLength(a), lenB = listLength(b);

	while (lenA > lenB)
	{
		a = a->next;
		lenA--;
	}
	while (lenB > lenA)
	{
		b = b->next;
		lenB--;
	}

	while (a != b)
	{
		a = a->next;
		b = b->next;
	}

	return a;
}

int main(void)
{
	struct Node *shared = malloc(sizeof(struct Node));
	shared->data = 30;
	shared->next = malloc(sizeof(struct Node));
	shared->next->data = 40;
	shared->next->next = NULL;

	struct Node *listA = malloc(sizeof(struct Node));
	listA->data = 10;
	listA->next = shared;

	struct Node *listB = malloc(sizeof(struct Node));
	listB->data = 20;
	listB->next = malloc(sizeof(struct Node));
	listB->next->data = 25;
	listB->next->next = shared;

	struct Node *intersection = findIntersection(listA, listB);
	printf("Intersection at node with value: %d\n", intersection->data);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Delete a linked list completely (free all memory)
 * @INPUT: list = 10 -> 20 -> 30
 * @OUTPUT: List fully freed, head is now NULL
 */
#include <stdio.h>
#include <stdlib.h>

struct Node
{
	int data;
	struct Node *next;
};

static struct Node *deleteList(struct Node *head)
{
	while (head != NULL)
	{
		struct Node *next = head->next;
		free(head);
		head = next;
	}
	return NULL;
}

int main(void)
{
	struct Node *head = malloc(sizeof(struct Node));
	head->data = 10;
	head->next = malloc(sizeof(struct Node));
	head->next->data = 20;
	head->next->next = malloc(sizeof(struct Node));
	head->next->next->data = 30;
	head->next->next->next = NULL;

	head = deleteList(head);
	printf("List fully freed, head is now %s\n", head == NULL ? "NULL" : "not NULL");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Copy/clone a linked list
 * @INPUT: list = 10 -> 20 -> 30
 * @OUTPUT: Cloned list: 10 -> 20 -> 30 -> NULL
 */
#include <stdio.h>
#include <stdlib.h>

struct Node
{
	int data;
	struct Node *next;
};

static struct Node *cloneList(struct Node *head)
{
	if (head == NULL)
		return NULL;

	struct Node *newHead = malloc(sizeof(struct Node));
	newHead->data = head->data;
	newHead->next = cloneList(head->next);

	return newHead;
}

int main(void)
{
	struct Node *head = malloc(sizeof(struct Node));
	head->data = 10;
	head->next = malloc(sizeof(struct Node));
	head->next->data = 20;
	head->next->next = malloc(sizeof(struct Node));
	head->next->next->data = 30;
	head->next->next->next = NULL;

	struct Node *clone = cloneList(head);

	printf("Cloned list: ");
	for (struct Node *cur = clone; cur != NULL; cur = cur->next)
		printf("%d -> ", cur->data);
	printf("NULL\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Convert a linked list to an array
 * @INPUT: list = 10 -> 20 -> 30
 * @OUTPUT: Array: [10, 20, 30]
 */
#include <stdio.h>
#include <stdlib.h>

struct Node
{
	int data;
	struct Node *next;
};

static int listToArray(struct Node *head, int arr[])
{
	int count = 0;
	for (struct Node *cur = head; cur != NULL; cur = cur->next)
		arr[count++] = cur->data;
	return count;
}

int main(void)
{
	struct Node *head = malloc(sizeof(struct Node));
	head->data = 10;
	head->next = malloc(sizeof(struct Node));
	head->next->data = 20;
	head->next->next = malloc(sizeof(struct Node));
	head->next->next->data = 30;
	head->next->next->next = NULL;

	int arr[10];
	int count = listToArray(head, arr);

	printf("Array: [");
	for (int i = 0; i < count; i++)
		printf("%d%s", arr[i], (i < count - 1) ? ", " : "");
	printf("]\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Add two numbers represented as linked lists (digits in reverse order)
 * @INPUT: 342 (2->4->3) + 465 (5->6->4)
 * @OUTPUT: 807 (7->0->8)
 */
#include <stdio.h>
#include <stdlib.h>

struct Node
{
	int data;
	struct Node *next;
};

static struct Node *addLists(struct Node *a, struct Node *b)
{
	struct Node dummy;
	struct Node *tail = &dummy;
	int carry = 0;
	dummy.next = NULL;

	while (a != NULL || b != NULL || carry != 0)
	{
		int sum = carry;
		if (a != NULL)
		{
			sum += a->data;
			a = a->next;
		}
		if (b != NULL)
		{
			sum += b->data;
			b = b->next;
		}

		carry = sum / 10;
		tail->next = malloc(sizeof(struct Node));
		tail->next->data = sum % 10;
		tail->next->next = NULL;
		tail = tail->next;
	}

	return dummy.next;
}

static struct Node *buildList(int values[], int n)
{
	struct Node *head = NULL, *tail = NULL;
	for (int i = 0; i < n; i++)
	{
		struct Node *node = malloc(sizeof(struct Node));
		node->data = values[i];
		node->next = NULL;
		if (head == NULL)
			head = tail = node;
		else
		{
			tail->next = node;
			tail = node;
		}
	}
	return head;
}

int main(void)
{
	int digitsA[] = {2, 4, 3}; /* represents 342 */
	int digitsB[] = {5, 6, 4}; /* represents 465 */

	struct Node *a = buildList(digitsA, 3);
	struct Node *b = buildList(digitsB, 3);
	struct Node *result = addLists(a, b);

	printf("Result (reversed digits): ");
	for (struct Node *cur = result; cur != NULL; cur = cur->next)
		printf("%d ", cur->data); /* prints 7 0 8, representing 807 */
	printf("\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Doubly linked list - insert and traverse
 * @INPUT: insert 10, 20, 30 at the end
 * @OUTPUT: Forward: 10 20 30, Backward: 30 20 10
 */
#include <stdio.h>
#include <stdlib.h>

struct DNode
{
	int data;
	struct DNode *prev;
	struct DNode *next;
};

static struct DNode *insertEnd(struct DNode *head, int data)
{
	struct DNode *node = malloc(sizeof(struct DNode));
	node->data = data;
	node->next = NULL;

	if (head == NULL)
	{
		node->prev = NULL;
		return node;
	}

	struct DNode *cur = head;
	while (cur->next != NULL)
		cur = cur->next;

	cur->next = node;
	node->prev = cur;
	return head;
}

int main(void)
{
	struct DNode *head = NULL;

	head = insertEnd(head, 10);
	head = insertEnd(head, 20);
	head = insertEnd(head, 30);

	printf("Forward: ");
	struct DNode *tail = head;
	for (struct DNode *cur = head; cur != NULL; cur = cur->next)
	{
		printf("%d ", cur->data);
		tail = cur;
	}

	printf("\nBackward: ");
	for (struct DNode *cur = tail; cur != NULL; cur = cur->prev)
		printf("%d ", cur->data);
	printf("\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Doubly linked list - delete a node
 * @INPUT: list = 10 <-> 20 <-> 30, delete 20
 * @OUTPUT: 10 <-> 30
 */
#include <stdio.h>
#include <stdlib.h>

struct DNode
{
	int data;
	struct DNode *prev;
	struct DNode *next;
};

static struct DNode *deleteNode(struct DNode *head, int value)
{
	struct DNode *cur = head;

	while (cur != NULL && cur->data != value)
		cur = cur->next;

	if (cur == NULL)
		return head;

	if (cur->prev != NULL)
		cur->prev->next = cur->next;
	else
		head = cur->next;

	if (cur->next != NULL)
		cur->next->prev = cur->prev;

	free(cur);
	return head;
}

int main(void)
{
	struct DNode *head = malloc(sizeof(struct DNode));
	head->data = 10;
	head->prev = NULL;
	head->next = malloc(sizeof(struct DNode));
	head->next->data = 20;
	head->next->prev = head;
	head->next->next = malloc(sizeof(struct DNode));
	head->next->next->data = 30;
	head->next->next->prev = head->next;
	head->next->next->next = NULL;

	head = deleteNode(head, 20);

	for (struct DNode *cur = head; cur != NULL; cur = cur->next)
		printf("%d ", cur->data);
	printf("\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Circular linked list - insert and traverse
 * @INPUT: insert 10, 20, 30
 * @OUTPUT: 10 -> 20 -> 30 -> (back to 10)
 */
#include <stdio.h>
#include <stdlib.h>

struct Node
{
	int data;
	struct Node *next;
};

static struct Node *insertCircular(struct Node *last, int data)
{
	struct Node *node = malloc(sizeof(struct Node));
	node->data = data;

	if (last == NULL)
	{
		node->next = node;
		return node;
	}

	node->next = last->next;
	last->next = node;
	return node;
}

int main(void)
{
	struct Node *last = NULL;

	last = insertCircular(last, 10);
	last = insertCircular(last, 20);
	last = insertCircular(last, 30);

	struct Node *head = last->next;
	struct Node *cur = head;

	do
	{
		printf("%d -> ", cur->data);
		cur = cur->next;
	} while (cur != head);
	printf("(back to %d)\n", head->data);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Circular linked list - detect the cycle and break it back to a simple list
 * @INPUT: circular list 10 -> 20 -> 30 -> (back to 10)
 * @OUTPUT: Cycle broken: 10 -> 20 -> 30 -> NULL
 */
#include <stdio.h>
#include <stdlib.h>

struct Node
{
	int data;
	struct Node *next;
};

static void breakCycle(struct Node *head)
{
	struct Node *slow = head, *fast = head;

	while (fast != NULL && fast->next != NULL)
	{
		slow = slow->next;
		fast = fast->next->next;
		if (slow == fast)
			break;
	}

	if (fast == NULL || fast->next == NULL)
		return; /* no cycle found */

	slow = head;
	if (slow == fast)
	{
		while (fast->next != slow)
			fast = fast->next;
	}
	else
	{
		while (slow->next != fast->next)
		{
			slow = slow->next;
			fast = fast->next;
		}
	}

	fast->next = NULL; /* cut the link that closed the loop */
}

int main(void)
{
	struct Node *n1 = malloc(sizeof(struct Node));
	struct Node *n2 = malloc(sizeof(struct Node));
	struct Node *n3 = malloc(sizeof(struct Node));

	n1->data = 10;
	n2->data = 20;
	n3->data = 30;
	n1->next = n2;
	n2->next = n3;
	n3->next = n1; /* circular */

	breakCycle(n1);

	printf("Cycle broken: ");
	for (struct Node *cur = n1; cur != NULL; cur = cur->next)
		printf("%d -> ", cur->data);
	printf("NULL\n");

	return 0;
}
/* @END */