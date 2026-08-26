/* @SECTION: Linux */
/* @CHAPTER: MULTITHREADING */
/*
 * Each block below is a small, independent, self-contained example.
 * Compile individually on Linux: gcc file.c -o out -lpthread
 */

/*
 * @PROGRAM: Create a basic thread using pthread_create
 * @INPUT: (none)
 * @OUTPUT: Hello from the new thread!
 */
#include <stdio.h>
#include <pthread.h>

static void *run(void *arg)
{
	(void)arg;
	printf("Hello from the new thread!\n");
	return NULL;
}

int main(void)
{
	pthread_t t;

	pthread_create(&t, NULL, run, NULL);
	pthread_join(t, NULL);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Pass a single argument to a thread
 * @INPUT: 42
 * @OUTPUT: Thread received value: 42
 */
#include <stdio.h>
#include <pthread.h>

static void *run(void *arg)
{
	int value = *(int *)arg;
	printf("Thread received value: %d\n", value);
	return NULL;
}

int main(void)
{
	pthread_t t;
	int value = 42;

	pthread_create(&t, NULL, run, &value);
	pthread_join(t, NULL);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Pass multiple values to a thread using a struct
 * @INPUT: name="Worker", id=7
 * @OUTPUT: Worker #7 started
 */
#include <stdio.h>
#include <pthread.h>

struct ThreadArgs
{
	const char *name;
	int id;
};

static void *run(void *arg)
{
	struct ThreadArgs *args = (struct ThreadArgs *)arg;
	printf("%s #%d started\n", args->name, args->id);
	return NULL;
}

int main(void)
{
	pthread_t t;
	struct ThreadArgs args = {"Worker", 7};

	pthread_create(&t, NULL, run, &args);
	pthread_join(t, NULL);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Return a value from a thread via pthread_exit
 * @INPUT: (none)
 * @OUTPUT: Thread returned: 99
 */
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

static void *run(void *arg)
{
	(void)arg;
	int *result = malloc(sizeof(int));
	*result = 99;
	pthread_exit(result);
}

int main(void)
{
	pthread_t t;
	void *returnValue;

	pthread_create(&t, NULL, run, NULL);
	pthread_join(t, &returnValue);

	printf("Thread returned: %d\n", *(int *)returnValue);
	free(returnValue);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Join a thread and retrieve its return value with pthread_join
 * @INPUT: (none)
 * @OUTPUT: Joined thread, result = 15
 */
#include <stdio.h>
#include <pthread.h>

static void *run(void *arg)
{
	(void)arg;
	return (void *)(long)15;
}

int main(void)
{
	pthread_t t;
	void *result;

	pthread_create(&t, NULL, run, NULL);
	pthread_join(t, &result);

	printf("Joined thread, result = %ld\n", (long)result);
	return 0;
}
/* @END */

/*
 * @PROGRAM: Detach a thread using pthread_detach
 * @INPUT: (none)
 * @OUTPUT: Detached thread running independently
 */
#include <stdio.h>
#include <unistd.h>
#include <pthread.h>

static void *run(void *arg)
{
	(void)arg;
	printf("Detached thread running independently\n");
	return NULL;
}

int main(void)
{
	pthread_t t;

	pthread_create(&t, NULL, run, NULL);
	pthread_detach(t); /* no need to join; resources auto-reclaimed on exit */
	sleep(1);			/* give the detached thread time to finish for this demo */

	return 0;
}
/* @END */

/*
 * @PROGRAM: Create multiple threads in a loop
 * @INPUT: 5 threads
 * @OUTPUT: Thread 0 running, Thread 1 running, ... Thread 4 running
 */
#include <stdio.h>
#include <pthread.h>

static void *run(void *arg)
{
	int id = *(int *)arg;
	printf("Thread %d running\n", id);
	return NULL;
}

int main(void)
{
	pthread_t threads[5];
	int ids[5];

	for (int i = 0; i < 5; i++)
	{
		ids[i] = i;
		pthread_create(&threads[i], NULL, run, &ids[i]);
	}
	for (int i = 0; i < 5; i++)
		pthread_join(threads[i], NULL);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Get the current thread ID using pthread_self
 * @INPUT: (none)
 * @OUTPUT: Running inside thread ID: 140234...
 */
#include <stdio.h>
#include <pthread.h>

static void *run(void *arg)
{
	(void)arg;
	printf("Running inside thread ID: %lu\n", (unsigned long)pthread_self());
	return NULL;
}

int main(void)
{
	pthread_t t;

	pthread_create(&t, NULL, run, NULL);
	pthread_join(t, NULL);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Compare thread IDs using pthread_equal
 * @INPUT: (none)
 * @OUTPUT: Main thread and worker thread have different IDs
 */
#include <stdio.h>
#include <pthread.h>

pthread_t mainThreadId;

static void *run(void *arg)
{
	(void)arg;
	if (!pthread_equal(pthread_self(), mainThreadId))
		printf("Main thread and worker thread have different IDs\n");
	return NULL;
}

int main(void)
{
	pthread_t t;

	mainThreadId = pthread_self();
	pthread_create(&t, NULL, run, NULL);
	pthread_join(t, NULL);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Cancel a thread using pthread_cancel
 * @INPUT: (none)
 * @OUTPUT: Worker thread was cancelled before completing its loop
 */
#include <stdio.h>
#include <unistd.h>
#include <pthread.h>

static void *run(void *arg)
{
	(void)arg;
	for (int i = 0; i < 10; i++)
	{
		printf("Working... %d\n", i);
		sleep(1); /* sleep is a cancellation point */
	}
	return NULL;
}

int main(void)
{
	pthread_t t;

	pthread_create(&t, NULL, run, NULL);
	sleep(2);
	pthread_cancel(t);
	pthread_join(t, NULL);
	printf("Worker thread was cancelled before completing its loop\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Check cancellation points explicitly using pthread_testcancel
 * @INPUT: (none)
 * @OUTPUT: Thread exits at its own checkpoint after being cancelled
 */
#include <stdio.h>
#include <pthread.h>

static void *run(void *arg)
{
	(void)arg;
	for (int i = 0; i < 1000000; i++)
	{
		if (i % 100000 == 0)
			pthread_testcancel(); /* explicit cancellation checkpoint */
	}
	return NULL;
}

int main(void)
{
	pthread_t t;

	pthread_create(&t, NULL, run, NULL);
	pthread_cancel(t);
	pthread_join(t, NULL);
	printf("Thread exits at its own checkpoint after being cancelled\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Thread-local storage using pthread_key_create
 * @INPUT: (none)
 * @OUTPUT: Thread 0 local value: 100, Thread 1 local value: 200
 */
#include <stdio.h>
#include <pthread.h>

pthread_key_t key;

static void *run(void *arg)
{
	int *value = arg;
	pthread_setspecific(key, value);

	int *stored = pthread_getspecific(key);
	printf("Thread local value: %d\n", *stored);
	return NULL;
}

int main(void)
{
	pthread_t t1, t2;
	int a = 100, b = 200;

	pthread_key_create(&key, NULL);
	pthread_create(&t1, NULL, run, &a);
	pthread_create(&t2, NULL, run, &b);
	pthread_join(t1, NULL);
	pthread_join(t2, NULL);
	pthread_key_delete(key);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Set a custom stack size using pthread_attr_t
 * @INPUT: 1 MB stack
 * @OUTPUT: Thread created with a 1 MB stack size
 */
#include <stdio.h>
#include <pthread.h>

static void *run(void *arg)
{
	(void)arg;
	printf("Thread created with a 1 MB stack size\n");
	return NULL;
}

int main(void)
{
	pthread_t t;
	pthread_attr_t attr;

	pthread_attr_init(&attr);
	pthread_attr_setstacksize(&attr, 1024 * 1024);

	pthread_create(&t, &attr, run, NULL);
	pthread_join(t, NULL);

	pthread_attr_destroy(&attr);
	return 0;
}
/* @END */

/*
 * @PROGRAM: Create a detached thread from the start via pthread_attr_setdetachstate
 * @INPUT: (none)
 * @OUTPUT: Thread created already detached, no join needed
 */
#include <stdio.h>
#include <unistd.h>
#include <pthread.h>

static void *run(void *arg)
{
	(void)arg;
	printf("Thread created already detached, no join needed\n");
	return NULL;
}

int main(void)
{
	pthread_t t;
	pthread_attr_t attr;

	pthread_attr_init(&attr);
	pthread_attr_setdetachstate(&attr, PTHREAD_CREATE_DETACHED);

	pthread_create(&t, &attr, run, NULL);
	pthread_attr_destroy(&attr);
	sleep(1); /* let the detached thread finish for this demo */

	return 0;
}
/* @END */

/*
 * @PROGRAM: Implement a simple fixed-size thread pool processing a task queue
 * @INPUT: 4 worker threads, 8 queued tasks
 * @OUTPUT: Each task printed as "Task N processed by worker" from one of the 4 workers
 */
#include <stdio.h>
#include <pthread.h>

#define NUM_WORKERS 4
#define NUM_TASKS 8

int nextTask = 0;
pthread_mutex_t queueLock = PTHREAD_MUTEX_INITIALIZER;

static void *worker(void *arg)
{
	int workerId = *(int *)arg;

	while (1)
	{
		int task;

		pthread_mutex_lock(&queueLock);
		if (nextTask >= NUM_TASKS)
		{
			pthread_mutex_unlock(&queueLock);
			break;
		}
		task = nextTask++;
		pthread_mutex_unlock(&queueLock);

		printf("Task %d processed by worker %d\n", task, workerId);
	}
	return NULL;
}

int main(void)
{
	pthread_t workers[NUM_WORKERS];
	int ids[NUM_WORKERS];

	for (int i = 0; i < NUM_WORKERS; i++)
	{
		ids[i] = i;
		pthread_create(&workers[i], NULL, worker, &ids[i]);
	}
	for (int i = 0; i < NUM_WORKERS; i++)
		pthread_join(workers[i], NULL);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Run initialization code exactly once using pthread_once
 * @INPUT: 3 threads all trying to initialize
 * @OUTPUT: Initialized exactly once (printed only one time despite 3 threads)
 */
#include <stdio.h>
#include <pthread.h>

pthread_once_t initFlag = PTHREAD_ONCE_INIT;

static void initialize(void)
{
	printf("Initialized exactly once\n");
}

static void *run(void *arg)
{
	(void)arg;
	pthread_once(&initFlag, initialize);
	return NULL;
}

int main(void)
{
	pthread_t threads[3];

	for (int i = 0; i < 3; i++)
		pthread_create(&threads[i], NULL, run, NULL);
	for (int i = 0; i < 3; i++)
		pthread_join(threads[i], NULL);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Barrier synchronization using pthread_barrier_t
 * @INPUT: 3 threads that must all reach a checkpoint before continuing
 * @OUTPUT: All 3 threads pass the barrier together, then continue
 */
#include <stdio.h>
#include <pthread.h>

pthread_barrier_t barrier;

static void *run(void *arg)
{
	int id = *(int *)arg;

	printf("Thread %d waiting at barrier\n", id);
	pthread_barrier_wait(&barrier);
	printf("Thread %d passed the barrier\n", id);
	return NULL;
}

int main(void)
{
	pthread_t threads[3];
	int ids[3] = {0, 1, 2};

	pthread_barrier_init(&barrier, NULL, 3);
	for (int i = 0; i < 3; i++)
		pthread_create(&threads[i], NULL, run, &ids[i]);
	for (int i = 0; i < 3; i++)
		pthread_join(threads[i], NULL);
	pthread_barrier_destroy(&barrier);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Read-write lock allowing multiple readers or one writer (pthread_rwlock_t)
 * @INPUT: 3 reader threads, 1 writer thread
 * @OUTPUT: Readers run concurrently; the writer gets exclusive access
 */
#include <stdio.h>
#include <pthread.h>

pthread_rwlock_t lock = PTHREAD_RWLOCK_INITIALIZER;
int sharedValue = 0;

static void *reader(void *arg)
{
	(void)arg;
	pthread_rwlock_rdlock(&lock);
	printf("Reader sees value: %d\n", sharedValue);
	pthread_rwlock_unlock(&lock);
	return NULL;
}

static void *writer(void *arg)
{
	(void)arg;
	pthread_rwlock_wrlock(&lock);
	sharedValue = 42;
	printf("Writer updated value to %d\n", sharedValue);
	pthread_rwlock_unlock(&lock);
	return NULL;
}

int main(void)
{
	pthread_t readers[3], w;

	pthread_create(&w, NULL, writer, NULL);
	for (int i = 0; i < 3; i++)
		pthread_create(&readers[i], NULL, reader, NULL);

	pthread_join(w, NULL);
	for (int i = 0; i < 3; i++)
		pthread_join(readers[i], NULL);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Spinlock using pthread_spinlock_t
 * @INPUT: 2 threads incrementing a shared counter
 * @OUTPUT: Final counter value: 200000
 */
#include <stdio.h>
#include <pthread.h>

pthread_spinlock_t spinlock;
int counter = 0;

static void *increment(void *arg)
{
	(void)arg;
	for (int i = 0; i < 100000; i++)
	{
		pthread_spin_lock(&spinlock);
		counter++;
		pthread_spin_unlock(&spinlock);
	}
	return NULL;
}

int main(void)
{
	pthread_t t1, t2;

	pthread_spin_init(&spinlock, PTHREAD_PROCESS_PRIVATE);
	pthread_create(&t1, NULL, increment, NULL);
	pthread_create(&t2, NULL, increment, NULL);
	pthread_join(t1, NULL);
	pthread_join(t2, NULL);

	printf("Final counter value: %d\n", counter);
	pthread_spin_destroy(&spinlock);
	return 0;
}
/* @END */

/*
 * @PROGRAM: Thread-safe singleton pattern using pthread_once
 * @INPUT: 5 threads requesting the singleton instance
 * @OUTPUT: Singleton created once (printed only one time despite 5 threads)
 */
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

static int *instance = NULL;
static pthread_once_t once = PTHREAD_ONCE_INIT;

static void createInstance(void)
{
	instance = malloc(sizeof(int));
	*instance = 1;
	printf("Singleton created once\n");
}

static int *getInstance(void)
{
	pthread_once(&once, createInstance);
	return instance;
}

static void *run(void *arg)
{
	(void)arg;
	getInstance();
	return NULL;
}

int main(void)
{
	pthread_t threads[5];

	for (int i = 0; i < 5; i++)
		pthread_create(&threads[i], NULL, run, NULL);
	for (int i = 0; i < 5; i++)
		pthread_join(threads[i], NULL);

	free(instance);
	return 0;
}
/* @END */

/*
 * @PROGRAM: Parallel array sum split across multiple threads
 * @INPUT: array of 1,000,000 ints split across 4 threads
 * @OUTPUT: Total sum computed by combining each thread's partial sum
 */
#include <stdio.h>
#include <pthread.h>

#define SIZE 1000000
#define NUM_THREADS 4

int data[SIZE];
long partialSums[NUM_THREADS];

struct Range
{
	int start, end, threadIndex;
};

static void *sumRange(void *arg)
{
	struct Range *range = arg;
	long sum = 0;

	for (int i = range->start; i < range->end; i++)
		sum += data[i];

	partialSums[range->threadIndex] = sum;
	return NULL;
}

int main(void)
{
	pthread_t threads[NUM_THREADS];
	struct Range ranges[NUM_THREADS];
	int chunk = SIZE / NUM_THREADS;
	long total = 0;

	for (int i = 0; i < SIZE; i++)
		data[i] = 1;

	for (int i = 0; i < NUM_THREADS; i++)
	{
		ranges[i].start = i * chunk;
		ranges[i].end = (i == NUM_THREADS - 1) ? SIZE : (i + 1) * chunk;
		ranges[i].threadIndex = i;
		pthread_create(&threads[i], NULL, sumRange, &ranges[i]);
	}

	for (int i = 0; i < NUM_THREADS; i++)
	{
		pthread_join(threads[i], NULL);
		total += partialSums[i];
	}

	printf("Total sum: %ld\n", total);
	return 0;
}
/* @END */

/*
 * @PROGRAM: Producer-consumer with multiple producer and consumer threads
 * @INPUT: 2 producers, 2 consumers, shared bounded buffer
 * @OUTPUT: All produced items are eventually consumed exactly once
 */
#include <stdio.h>
#include <pthread.h>
#include <semaphore.h>

#define BUFFER_SIZE 10
int buffer[BUFFER_SIZE];
int in = 0, out = 0;
sem_t emptySlots, fullSlots;
pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;

static void *producer(void *arg)
{
	int id = *(int *)arg;

	for (int i = 0; i < 5; i++)
	{
		sem_wait(&emptySlots);
		pthread_mutex_lock(&mutex);
		buffer[in] = id * 100 + i;
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
		out = (out + 1) % BUFFER_SIZE;
		pthread_mutex_unlock(&mutex);
		sem_post(&emptySlots);
		printf("Consumed: %d\n", value);
	}
	return NULL;
}

int main(void)
{
	pthread_t producers[2], consumers[2];
	int ids[2] = {1, 2};

	sem_init(&emptySlots, 0, BUFFER_SIZE);
	sem_init(&fullSlots, 0, 0);

	for (int i = 0; i < 2; i++)
		pthread_create(&producers[i], NULL, producer, &ids[i]);
	for (int i = 0; i < 2; i++)
		pthread_create(&consumers[i], NULL, consumer, NULL);

	for (int i = 0; i < 2; i++)
		pthread_join(producers[i], NULL);
	for (int i = 0; i < 2; i++)
		pthread_join(consumers[i], NULL);

	sem_destroy(&emptySlots);
	sem_destroy(&fullSlots);
	return 0;
}
/* @END */

/*
 * @PROGRAM: Set a thread's scheduling policy and priority (pthread_attr_setschedpolicy)
 * @INPUT: SCHED_FIFO, priority 10 (requires elevated privileges to take effect)
 * @OUTPUT: Thread attributes configured for real-time scheduling
 */
#include <stdio.h>
#include <pthread.h>

static void *run(void *arg)
{
	(void)arg;
	printf("Thread running with requested real-time scheduling attributes\n");
	return NULL;
}

int main(void)
{
	pthread_t t;
	pthread_attr_t attr;
	struct sched_param param;

	pthread_attr_init(&attr);
	pthread_attr_setschedpolicy(&attr, SCHED_FIFO);
	param.sched_priority = 10;
	pthread_attr_setschedparam(&attr, &param);
	pthread_attr_setinheritsched(&attr, PTHREAD_EXPLICIT_SCHED);

	if (pthread_create(&t, &attr, run, NULL) != 0)
		printf("Requires elevated privileges; falling back to default scheduling\n");
	else
		pthread_join(t, NULL);

	pthread_attr_destroy(&attr);
	return 0;
}
/* @END */

/*
 * @PROGRAM: Block signals in worker threads, handle them only in a dedicated thread
 * @INPUT: SIGUSR1 sent to the process
 * @OUTPUT: Signal handling thread received signal 10 (SIGUSR1)
 */
#include <stdio.h>
#include <signal.h>
#include <pthread.h>

static void *signalHandlerThread(void *arg)
{
	sigset_t *set = arg;
	int signalNumber;

	sigwait(set, &signalNumber);
	printf("Signal handling thread received signal %d\n", signalNumber);
	return NULL;
}

int main(void)
{
	sigset_t set;
	pthread_t t;

	sigemptyset(&set);
	sigaddset(&set, SIGUSR1);
	pthread_sigmask(SIG_BLOCK, &set, NULL); /* block in all threads created after this */

	pthread_create(&t, NULL, signalHandlerThread, &set);
	raise(SIGUSR1); /* simulate an external signal for this demo */
	pthread_join(t, NULL);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Use atomic operations (C11 stdatomic) instead of a mutex for a counter
 * @INPUT: 2 threads each incrementing 100000 times
 * @OUTPUT: Final counter value: 200000 (correct without any mutex)
 */
#include <stdio.h>
#include <stdatomic.h>
#include <pthread.h>

atomic_int counter = 0;

static void *increment(void *arg)
{
	(void)arg;
	for (int i = 0; i < 100000; i++)
		atomic_fetch_add(&counter, 1);
	return NULL;
}

int main(void)
{
	pthread_t t1, t2;

	pthread_create(&t1, NULL, increment, NULL);
	pthread_create(&t2, NULL, increment, NULL);
	pthread_join(t1, NULL);
	pthread_join(t2, NULL);

	printf("Final counter value: %d\n", atomic_load(&counter));
	return 0;
}
/* @END */

/*
 * @PROGRAM: Pin a thread to a specific CPU core using pthread_setaffinity_np
 * @INPUT: pin to CPU core 0
 * @OUTPUT: Thread affinity set to CPU core 0
 */
#define _GNU_SOURCE
#include <stdio.h>
#include <pthread.h>

static void *run(void *arg)
{
	(void)arg;
	printf("Thread affinity set to CPU core 0\n");
	return NULL;
}

int main(void)
{
	pthread_t t;
	cpu_set_t cpuset;

	pthread_create(&t, NULL, run, NULL);

	CPU_ZERO(&cpuset);
	CPU_SET(0, &cpuset);
	pthread_setaffinity_np(t, sizeof(cpu_set_t), &cpuset);

	pthread_join(t, NULL);
	return 0;
}
/* @END */

/*
 * @PROGRAM: Timed join using pthread_timedjoin_np (GNU extension)
 * @INPUT: wait at most 2 seconds for a slow thread
 * @OUTPUT: Timed out waiting for the thread to finish
 */
#define _GNU_SOURCE
#include <stdio.h>
#include <time.h>
#include <unistd.h>
#include <pthread.h>

static void *slowWork(void *arg)
{
	(void)arg;
	sleep(5);
	return NULL;
}

int main(void)
{
	pthread_t t;
	struct timespec timeout;

	pthread_create(&t, NULL, slowWork, NULL);

	clock_gettime(CLOCK_REALTIME, &timeout);
	timeout.tv_sec += 2;

	if (pthread_timedjoin_np(t, NULL, &timeout) != 0)
		printf("Timed out waiting for the thread to finish\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Register cleanup handlers with pthread_cleanup_push/pop
 * @INPUT: thread cancelled mid-execution
 * @OUTPUT: Cleanup handler ran: releasing resources
 */
#include <stdio.h>
#include <pthread.h>

static void cleanup(void *arg)
{
	(void)arg;
	printf("Cleanup handler ran: releasing resources\n");
}

static void *run(void *arg)
{
	(void)arg;
	pthread_cleanup_push(cleanup, NULL);

	for (;;)
		pthread_testcancel(); /* cancellation point; cleanup runs when cancelled */

	pthread_cleanup_pop(0); /* unreachable in this demo, kept for correct pairing */
	return NULL;
}

int main(void)
{
	pthread_t t;

	pthread_create(&t, NULL, run, NULL);
	pthread_cancel(t);
	pthread_join(t, NULL);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Graceful thread shutdown using a shared "stop" flag
 * @INPUT: worker checks the flag every iteration instead of being forcibly cancelled
 * @OUTPUT: Worker exiting gracefully after stop flag was set
 */
#include <stdio.h>
#include <unistd.h>
#include <pthread.h>
#include <stdatomic.h>

atomic_int stopRequested = 0;

static void *run(void *arg)
{
	(void)arg;
	while (!atomic_load(&stopRequested))
		usleep(100000); /* poll the flag periodically instead of hard-cancelling */

	printf("Worker exiting gracefully after stop flag was set\n");
	return NULL;
}

int main(void)
{
	pthread_t t;

	pthread_create(&t, NULL, run, NULL);
	sleep(1);
	atomic_store(&stopRequested, 1);
	pthread_join(t, NULL);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Measure and compare execution time of single-threaded vs multi-threaded work
 * @INPUT: sum of 40,000,000 numbers, single thread vs 4 threads
 * @OUTPUT: Single-threaded time: 0.12s, Multi-threaded time: 0.04s
 */
#include <stdio.h>
#include <time.h>
#include <pthread.h>

#define TOTAL 40000000
#define THREAD_COUNT 4

long partial[THREAD_COUNT];

struct Range
{
	long start, end, index;
};

static void *sumRange(void *arg)
{
	struct Range *range = arg;
	long sum = 0;

	for (long i = range->start; i < range->end; i++)
		sum += i;

	partial[range->index] = sum;
	return NULL;
}

static double elapsedSeconds(struct timespec start, struct timespec end)
{
	return (end.tv_sec - start.tv_sec) + (end.tv_nsec - start.tv_nsec) / 1e9;
}

int main(void)
{
	struct timespec start, end;
	long singleSum = 0;

	clock_gettime(CLOCK_MONOTONIC, &start);
	for (long i = 0; i < TOTAL; i++)
		singleSum += i;
	clock_gettime(CLOCK_MONOTONIC, &end);
	printf("Single-threaded time: %.4fs\n", elapsedSeconds(start, end));

	pthread_t threads[THREAD_COUNT];
	struct Range ranges[THREAD_COUNT];
	long chunk = TOTAL / THREAD_COUNT;

	clock_gettime(CLOCK_MONOTONIC, &start);
	for (int i = 0; i < THREAD_COUNT; i++)
	{
		ranges[i].start = i * chunk;
		ranges[i].end = (i == THREAD_COUNT - 1) ? TOTAL : (i + 1) * chunk;
		ranges[i].index = i;
		pthread_create(&threads[i], NULL, sumRange, &ranges[i]);
	}
	for (int i = 0; i < THREAD_COUNT; i++)
		pthread_join(threads[i], NULL);
	clock_gettime(CLOCK_MONOTONIC, &end);
	printf("Multi-threaded time: %.4fs\n", elapsedSeconds(start, end));

	return 0;
}
/* @END */
