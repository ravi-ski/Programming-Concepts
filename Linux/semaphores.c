/* @SECTION: Linux */
/* @CHAPTER: SEMAPHORES */
/*
 * Each block below is a small, independent, self-contained example.
 * They are written to compile individually on Linux (gcc file.c -o out,
 * add -lpthread for the pthread/POSIX-thread examples).
 */

/*
 * @PROGRAM: Create a System V semaphore set (semget)
 * @INPUT: 1 semaphore
 * @OUTPUT: Semaphore set created with id: 55555
 */
#include <stdio.h>
#include <sys/ipc.h>
#include <sys/sem.h>

int main(void)
{
	key_t key = ftok(".", 'D');
	int semid = semget(key, 1, IPC_CREAT | 0666);

	if (semid == -1)
	{
		perror("semget");
		return 1;
	}
	printf("Semaphore set created with id: %d\n", semid);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Initialize a semaphore value (semctl SETVAL)
 * @INPUT: initial value = 1
 * @OUTPUT: Semaphore initialized to 1
 */
#include <stdio.h>
#include <sys/ipc.h>
#include <sys/sem.h>

union semun
{
	int val;
};

int main(void)
{
	key_t key = ftok(".", 'D');
	int semid = semget(key, 1, IPC_CREAT | 0666);
	union semun arg;

	arg.val = 1;
	if (semctl(semid, 0, SETVAL, arg) == -1)
	{
		perror("semctl");
		return 1;
	}
	printf("Semaphore initialized to 1\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Perform wait (P) and signal (V) operations (semop)
 * @INPUT: (none)
 * @OUTPUT: Entered critical section, Left critical section
 */
#include <stdio.h>
#include <sys/ipc.h>
#include <sys/sem.h>

int main(void)
{
	key_t key = ftok(".", 'D');
	int semid = semget(key, 1, IPC_CREAT | 0666);
	struct sembuf wait_op = {0, -1, 0};
	struct sembuf signal_op = {0, 1, 0};

	semop(semid, &wait_op, 1); /* P: decrement, blocks if already 0 */
	printf("Entered critical section\n");

	semop(semid, &signal_op, 1); /* V: increment, wakes a waiter if any */
	printf("Left critical section\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Binary semaphore used as a mutex between processes
 * @INPUT: two processes incrementing a shared counter safely
 * @OUTPUT: Final counter value: 200000 (correct, protected by the semaphore)
 */
#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>
#include <sys/ipc.h>
#include <sys/sem.h>
#include <sys/shm.h>

int main(void)
{
	key_t semKey = ftok(".", 'E');
	key_t shmKey = ftok(".", 'F');
	int semid = semget(semKey, 1, IPC_CREAT | 0666);
	int shmid = shmget(shmKey, sizeof(int), IPC_CREAT | 0666);
	int *counter = shmat(shmid, NULL, 0);
	struct sembuf wait_op = {0, -1, 0};
	struct sembuf signal_op = {0, 1, 0};

	semctl(semid, 0, SETVAL, 1);
	*counter = 0;

	if (fork() == 0)
	{
		for (int i = 0; i < 100000; i++)
		{
			semop(semid, &wait_op, 1);
			(*counter)++;
			semop(semid, &signal_op, 1);
		}
		return 0;
	}

	for (int i = 0; i < 100000; i++)
	{
		semop(semid, &wait_op, 1);
		(*counter)++;
		semop(semid, &signal_op, 1);
	}

	wait(NULL);
	printf("Final counter value: %d\n", *counter);

	shmdt(counter);
	shmctl(shmid, IPC_RMID, NULL);
	semctl(semid, 0, IPC_RMID);
	return 0;
}
/* @END */

/*
 * @PROGRAM: Counting semaphore limiting concurrent access to a resource pool
 * @INPUT: pool size = 3, 5 processes wanting access
 * @OUTPUT: At most 3 processes hold the resource at any moment
 */
#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>
#include <sys/ipc.h>
#include <sys/sem.h>

int main(void)
{
	key_t key = ftok(".", 'G');
	int semid = semget(key, 1, IPC_CREAT | 0666);
	struct sembuf wait_op = {0, -1, 0};
	struct sembuf signal_op = {0, 1, 0};

	semctl(semid, 0, SETVAL, 3); /* pool of 3 available slots */

	for (int i = 0; i < 5; i++)
	{
		if (fork() == 0)
		{
			semop(semid, &wait_op, 1);
			printf("Process %d acquired a slot\n", i);
			sleep(1);
			semop(semid, &signal_op, 1);
			return 0;
		}
	}

	for (int i = 0; i < 5; i++)
		wait(NULL);

	return 0;
}
/* @END */

/*
 * @PROGRAM: POSIX unnamed semaphore (sem_init) between threads
 * @INPUT: (none)
 * @OUTPUT: Thread acquired the semaphore, Thread released the semaphore
 */
#include <stdio.h>
#include <pthread.h>
#include <semaphore.h>

sem_t sem;

static void *worker(void *arg)
{
	(void)arg;
	sem_wait(&sem);
	printf("Thread acquired the semaphore\n");
	sem_post(&sem);
	printf("Thread released the semaphore\n");
	return NULL;
}

int main(void)
{
	pthread_t t;

	sem_init(&sem, 0, 1); /* shared between threads, initial value 1 */
	pthread_create(&t, NULL, worker, NULL);
	pthread_join(t, NULL);
	sem_destroy(&sem);

	return 0;
}
/* @END */

/*
 * @PROGRAM: POSIX named semaphore (sem_open) between processes
 * @INPUT: /my_sem
 * @OUTPUT: Named semaphore created and used across processes
 */
#include <stdio.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/wait.h>
#include <semaphore.h>

int main(void)
{
	sem_t *sem = sem_open("/my_sem", O_CREAT, 0666, 1);

	if (fork() == 0)
	{
		sem_wait(sem);
		printf("Child using the named semaphore\n");
		sem_post(sem);
		sem_close(sem);
		return 0;
	}

	wait(NULL);
	sem_wait(sem);
	printf("Parent using the named semaphore\n");
	sem_post(sem);

	sem_close(sem);
	sem_unlink("/my_sem");
	return 0;
}
/* @END */

/*
 * @PROGRAM: sem_wait/sem_post with POSIX semaphores (basic mutual exclusion)
 * @INPUT: (none)
 * @OUTPUT: Critical section entered and exited safely
 */
#include <stdio.h>
#include <semaphore.h>

int main(void)
{
	sem_t sem;

	sem_init(&sem, 0, 1);

	sem_wait(&sem); /* acquire */
	printf("Critical section entered\n");
	sem_post(&sem); /* release */
	printf("Critical section exited\n");

	sem_destroy(&sem);
	return 0;
}
/* @END */

/*
 * @PROGRAM: sem_trywait for non-blocking semaphore acquisition
 * @INPUT: semaphore already at 0 (held by someone else)
 * @OUTPUT: Could not acquire semaphore right now, doing other work instead
 */
#include <stdio.h>
#include <errno.h>
#include <semaphore.h>

int main(void)
{
	sem_t sem;

	sem_init(&sem, 0, 0); /* starts unavailable */

	if (sem_trywait(&sem) == -1 && errno == EAGAIN)
		printf("Could not acquire semaphore right now, doing other work instead\n");

	sem_destroy(&sem);
	return 0;
}
/* @END */

/*
 * @PROGRAM: Producer-consumer problem using two semaphores (empty/full) and a mutex
 * @INPUT: producer adds 5 items, consumer removes 5 items
 * @OUTPUT: Produced: 0..4, Consumed: 0..4 (in safe, synchronized order)
 */
#include <stdio.h>
#include <pthread.h>
#include <semaphore.h>

#define BUFFER_SIZE 5

int buffer[BUFFER_SIZE];
int in = 0, out = 0;
sem_t emptySlots, fullSlots;
pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;

static void *producer(void *arg)
{
	(void)arg;
	for (int i = 0; i < 5; i++)
	{
		sem_wait(&emptySlots);
		pthread_mutex_lock(&mutex);
		buffer[in] = i;
		printf("Produced: %d\n", i);
		in = (in + 1) % BUFFER_SIZE;
		pthread_mutex_unlock(&mutex);
		sem_post(&fullSlots);
	}
	return NULL;
}

static void *consumer(void *arg)
{
	(void)arg;
	for (int i = 0; i < 5; i++)
	{
		sem_wait(&fullSlots);
		pthread_mutex_lock(&mutex);
		int value = buffer[out];
		printf("Consumed: %d\n", value);
		out = (out + 1) % BUFFER_SIZE;
		pthread_mutex_unlock(&mutex);
		sem_post(&emptySlots);
	}
	return NULL;
}

int main(void)
{
	pthread_t p, c;

	sem_init(&emptySlots, 0, BUFFER_SIZE);
	sem_init(&fullSlots, 0, 0);

	pthread_create(&p, NULL, producer, NULL);
	pthread_create(&c, NULL, consumer, NULL);

	pthread_join(p, NULL);
	pthread_join(c, NULL);

	sem_destroy(&emptySlots);
	sem_destroy(&fullSlots);
	return 0;
}
/* @END */
