#include <stdio.h>
#include <stdlib.h>

struct Node
{
    int data;
    struct Node *next;
};

struct Node *createNode(int value)
{
    struct Node *newNode = malloc(sizeof(struct Node));

    if (newNode == NULL)
    {
        printf("Memory allocation failed\n");
        exit(EXIT_FAILURE);
    }

    newNode->data = value;
    newNode->next = NULL;

    return newNode;
}

void insertAtEnd(struct Node **head, int value)
{
    struct Node *newNode = createNode(value);

    if (*head == NULL)
    {
        *head = newNode;
        return;
    }

    struct Node *current = *head;

    while (current->next != NULL)
    {
        current = current->next;
    }

    current->next = newNode;
}

struct Node *reverseList(struct Node *head)
{
    struct Node *prev = NULL;
    struct Node *current = head;
    struct Node *next = NULL;

    while (current != NULL)
    {
        next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    }

    return prev;
}

void printList(const struct Node *head)
{
    while (head != NULL)
    {
        printf("%d -> ", head->data);
        head = head->next;
    }

    printf("NULL\n");
}

void deleteList(struct Node *head)
{
    struct Node *temp;
    while (head != NULL)
    {
        temp = head;
        head = head->next;
        free(temp);
    }
}

/* Mechanism: Use two pointers moving at different speeds—a slow pointer (1 step) and a
fast pointer (2 steps). If a cycle exists, they will eventually meet. */

int hasCycle(struct Node *head)
{
    if (head == NULL || head->next == NULL)
        return 0;

    struct Node *slow = head;
    struct Node *fast = head;

    while (fast != NULL && fast->next != NULL)
    {
        slow = slow->next;       // Moves 1 step
        fast = fast->next->next; // Moves 2 steps

        if (slow == fast)
        {
            return 1; // Cycle detected
        }
    }
    return 0; // No cycle found
}

/* Mechanism: Use a fast-and-slow pointer approach. 
By the time the fast pointer reaches the end of the list,
 the slow pointer will be exactly at the midpoint.*/

 struct Node* findMiddle(struct Node* head) {
    struct Node* slow = head;
    struct Node* fast = head;

    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow; // Slow is now pointing to the middle node
}

/* Mechanism: Advance a fast pointer N steps ahead. Then, move both fast and slow pointers forward together at the same speed. 
When fast reaches the end, slow will sit exactly before the node targeted for deletion.*/

struct Node* removeNthFromEnd(struct Node* head, int n) {
    struct Node dummy; // Dummy node handles the edge case of removing the head
    dummy.next = head;
    struct Node* fast = &dummy;
    struct Node* slow = &dummy;

    // Move fast pointer n steps ahead
    for (int i = 0; i <= n; i++) {
        fast = fast->next;
    }

    // Move both pointers until fast reaches the end
    while (fast != NULL) {
        fast = fast->next;
        slow = slow->next;
    }

    // Delete the target node
    struct Node* toDelete = slow->next;
    slow->next = slow->next->next;
    free(toDelete);

    return dummy.next;
}

int main(void)
{
    struct Node *head = NULL;

    insertAtEnd(&head, 10);
    insertAtEnd(&head, 20);
    insertAtEnd(&head, 30);
    insertAtEnd(&head, 40);

    printf("Original list: ");
    printList(head);    

    head = reverseList(head);
    printf("Reversed list: ");
    printList(head);



    if (hasCycle(head))
        printf("loop is identified");
    else
        printf("loop not found");

    struct Node *tmp;
    tmp = findMiddle(head);
    printf("Middle element = %d\n", tmp->data);


    tmp = removeNthFromEnd();
    printList(tmp);

    deleteList(head);

    return 0;
}