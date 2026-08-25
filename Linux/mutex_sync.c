/* @SECTION: Linux */
/* @CHAPTER: SYNCHRONIZATION USING MUTEX */
/*
 * Each block below is a small, independent, self-contained example.
 * They are written to compile individually on Linux (gcc file.c -o out -lpthread).
 */

/*
 * @PROGRAM: Basic pthread mutex lock/unlock around a shared counter
 * @INPUT: 2 threads each incrementing 100000 times
 * @OUTPUT: Final counter value: 200000
 */
#include <stdio.h>
#include <pthread.h>

int counter = 0;
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;

static void *increment(void *arg)
{
	(void)arg;
	for (int i = 0; i < 100000; i++)
	{
		pthread_mutex_lock(&lock);
		counter++;
		pthread_mutex_unlock(&lock);
	}
	return NULL;
}

int main(void)
{
	pthread_t t1, t2;

	pthread_create(&t1, NULL, increment, NULL);
	pthread_create(&t2, NULL, increment, NULL);
	pthread_join(t1, NULL);
	pthread_join(t2, NULL);

	printf("Final counter value: %d\n", counter);
	return 0;
}
/* @END */

/*
 * @PROGRAM: Demonstrate a race condition without a mutex
 * @INPUT: 2 threads each incrementing 100000 times, no locking
 * @OUTPUT: Final counter value is usually less than 200000 (lost updates)
 */
#include <stdio.h>
#include <pthread.h>

int counter = 0;

static void *increment(void *arg)
{
	(void)arg;
	for (int i = 0; i < 100000; i++)
		counter++; /* not atomic: read-modify-write race between threads */
	return NULL;
}

int main(void)
{
	pthread_t t1, t2;

	pthread_create(&t1, NULL, increment, NULL);
	pthread_create(&t2, NULL, increment, NULL);
	pthread_join(t1, NULL);
	pthread_join(t2, NULL);

	printf("Final counter value (expected 200000, likely less): %d\n", counter);
	return 0;
}
/* @END */

/*
 * @PROGRAM: pthread_mutex_trylock for a non-blocking lock attempt
 * @INPUT: mutex already locked by main thread
 * @OUTPUT: Could not acquire the lock right now, doing other work instead
 */
#include <stdio.h>
#include <pthread.h>

int main(void)
{
	pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;

	pthread_mutex_lock(&lock); /* held by "main thread" for this demo */

	if (pthread_mutex_trylock(&lock) != 0)
		printf("Could not acquire the lock right now, doing other work instead\n");

	pthread_mutex_unlock(&lock);
	return 0;
}
/* @END */

/*
 * @PROGRAM: Recursive mutex (PTHREAD_MUTEX_RECURSIVE)
 * @INPUT: same thread locks the mutex twice (nested calls)
 * @OUTPUT: Locked twice by the same thread without deadlocking
 */
#include <stdio.h>
#include <pthread.h>

pthread_mutex_t lock;

static void inner(void)
{
	pthread_mutex_lock(&lock);
	printf("Inner lock acquired (second, nested, lock)\n");
	pthread_mutex_unlock(&lock);
}

int main(void)
{
	pthread_mutexattr_t attr;

	pthread_mutexattr_init(&attr);
	pthread_mutexattr_settype(&attr, PTHREAD_MUTEX_RECURSIVE);
	pthread_mutex_init(&lock, &attr);

	pthread_mutex_lock(&lock);
	printf("Outer lock acquired\n");
	inner(); /* would deadlock with a normal mutex; fine with recursive */
	pthread_mutex_unlock(&lock);

	pthread_mutex_destroy(&lock);
	pthread_mutexattr_destroy(&attr);
	return 0;
}
/* @END */

/*
 * @PROGRAM: Multiple threads safely incrementing a shared counter with a mutex
 * @INPUT: 4 threads each incrementing 50000 times
 * @OUTPUT: Final counter value: 200000
 */
#include <stdio.h>
#include <pthread.h>

#define NUM_THREADS 4
int counter = 0;
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;

static void *increment(void *arg)
{
	(void)arg;
	for (int i = 0; i < 50000; i++)
	{
		pthread_mutex_lock(&lock);
		counter++;
		pthread_mutex_unlock(&lock);
	}
	return NULL;
}

int main(void)
{
	pthread_t threads[NUM_THREADS];

	for (int i = 0; i < NUM_THREADS; i++)
		pthread_create(&threads[i], NULL, increment, NULL);
	for (int i = 0; i < NUM_THREADS; i++)
		pthread_join(threads[i], NULL);

	printf("Final counter value: %d\n", counter);
	return 0;
}
/* @END */

/*
 * @PROGRAM: Using a mutex to protect a shared linked-list style queue
 * @INPUT: push 1, 2, 3 from one thread; pop them from another
 * @OUTPUT: Popped: 1, Popped: 2, Popped: 3
 */
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

struct Node
{
	int value;
	struct Node *next;
};

struct Node *head = NULL;
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;

static void push(int value)
{
	struct Node *node = malloc(sizeof(struct Node));

	node->value = value;

	pthread_mutex_lock(&lock);
	node->next = head;
	head = node;
	pthread_mutex_unlock(&lock);
}

static int pop(int *value)
{
	pthread_mutex_lock(&lock);
	if (head == NULL)
	{
		pthread_mutex_unlock(&lock);
		return 0;
	}
	struct Node *node = head;
	*value = node->value;
	head = head->next;
	pthread_mutex_unlock(&lock);
	free(node);
	return 1;
}

int main(void)
{
	int value;

	push(3);
	push(2);
	push(1);

	while (pop(&value))
		printf("Popped: %d\n", value);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Deadlock demonstration with two mutexes locked in different order
 * @INPUT: thread A locks m1 then m2; thread B locks m2 then m1
 * @OUTPUT: Both threads block forever waiting on each other (deadlock)
 */
#include <stdio.h>
#include <pthread.h>
#include <unistd.h>

pthread_mutex_t m1 = PTHREAD_MUTEX_INITIALIZER;
pthread_mutex_t m2 = PTHREAD_MUTEX_INITIALIZER;

static void *threadA(void *arg)
{
	(void)arg;
	pthread_mutex_lock(&m1);
	sleep(1); /* gives threadB time to lock m2 first, forcing the deadlock */
	pthread_mutex_lock(&m2); /* blocks: threadB holds m2 and wants m1 */
	pthread_mutex_unlock(&m2);
	pthread_mutex_unlock(&m1);
	return NULL;
}

static void *threadB(void *arg)
{
	(void)arg;
	pthread_mutex_lock(&m2);
	sleep(1);
	pthread_mutex_lock(&m1); /* blocks: threadA holds m1 and wants m2 */
	pthread_mutex_unlock(&m1);
	pthread_mutex_unlock(&m2);
	return NULL;
}

int main(void)
{
	pthread_t a, b;

	pthread_create(&a, NULL, threadA, NULL);
	pthread_create(&b, NULL, threadB, NULL);

	pthread_join(a, NULL); /* this demo intentionally hangs, illustrating deadlock */
	pthread_join(b, NULL);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Deadlock avoidance using consistent lock ordering
 * @INPUT: both threads always lock m1 before m2
 * @OUTPUT: Both threads complete without deadlocking
 */
#include <stdio.h>
#include <pthread.h>

pthread_mutex_t m1 = PTHREAD_MUTEX_INITIALIZER;
pthread_mutex_t m2 = PTHREAD_MUTEX_INITIALIZER;

static void *threadA(void *arg)
{
	(void)arg;
	pthread_mutex_lock(&m1);
	pthread_mutex_lock(&m2); /* same order as threadB: m1 then m2 */
	printf("Thread A completed safely\n");
	pthread_mutex_unlock(&m2);
	pthread_mutex_unlock(&m1);
	return NULL;
}

static void *threadB(void *arg)
{
	(void)arg;
	pthread_mutex_lock(&m1);
	pthread_mutex_lock(&m2);
	printf("Thread B completed safely\n");
	pthread_mutex_unlock(&m2);
	pthread_mutex_unlock(&m1);
	return NULL;
}

int main(void)
{
	pthread_t a, b;

	pthread_create(&a, NULL, threadA, NULL);
	pthread_create(&b, NULL, threadB, NULL);
	pthread_join(a, NULL);
	pthread_join(b, NULL);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Mutex and condition variable used to signal between threads
 * @INPUT: worker waits for a "ready" flag set by main
 * @OUTPUT: Worker was signaled and started processing
 */
#include <stdio.h>
#include <pthread.h>

pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t cond = PTHREAD_COND_INITIALIZER;
int ready = 0;

static void *worker(void *arg)
{
	(void)arg;
	pthread_mutex_lock(&lock);
	while (!ready)
		pthread_cond_wait(&cond, &lock); /* atomically unlocks and sleeps */
	pthread_mutex_unlock(&lock);

	printf("Worker was signaled and started processing\n");
	return NULL;
}

int main(void)
{
	pthread_t t;

	pthread_create(&t, NULL, worker, NULL);

	pthread_mutex_lock(&lock);
	ready = 1;
	pthread_cond_signal(&cond);
	pthread_mutex_unlock(&lock);

	pthread_join(t, NULL);
	return 0;
}
/* @END */

/*
 * @PROGRAM: Timed mutex lock using pthread_mutex_timedlock
 * @INPUT: wait at most 2 seconds for a lock held by another thread
 * @OUTPUT: Timed out waiting for the lock after 2 seconds
 */
#include <stdio.h>
#include <time.h>
#include <pthread.h>

int main(void)
{
	pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
	struct timespec timeout;

	pthread_mutex_lock(&lock); /* held already, simulating contention */

	clock_gettime(CLOCK_REALTIME, &timeout);
	timeout.tv_sec += 2;

	if (pthread_mutex_timedlock(&lock, &timeout) != 0)
		printf("Timed out waiting for the lock after 2 seconds\n");

	pthread_mutex_unlock(&lock);
	return 0;
}
/* @END */
