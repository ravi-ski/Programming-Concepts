/* @SECTION: Linux */
/* @CHAPTER: SHARED MEMORY */
/*
 * Each block below is a small, independent, self-contained example.
 * They are written to compile individually on Linux (gcc file.c -o out).
 */

/*
 * @PROGRAM: Create a System V shared memory segment (shmget)
 * @INPUT: size = 1024 bytes
 * @OUTPUT: Shared memory segment created with id: 98765
 */
#include <stdio.h>
#include <sys/ipc.h>
#include <sys/shm.h>

int main(void)
{
	key_t key = ftok(".", 'B');
	int shmid = shmget(key, 1024, IPC_CREAT | 0666);

	if (shmid == -1)
	{
		perror("shmget");
		return 1;
	}
	printf("Shared memory segment created with id: %d\n", shmid);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Attach a shared memory segment (shmat)
 * @INPUT: (none)
 * @OUTPUT: Shared memory attached at address <ptr>
 */
#include <stdio.h>
#include <sys/ipc.h>
#include <sys/shm.h>

int main(void)
{
	key_t key = ftok(".", 'B');
	int shmid = shmget(key, 1024, IPC_CREAT | 0666);
	char *data = shmat(shmid, NULL, 0);

	if (data == (char *)-1)
	{
		perror("shmat");
		return 1;
	}
	printf("Shared memory attached at address %p\n", (void *)data);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Write and read data via shared memory between parent and child
 * @INPUT: "Shared hello!"
 * @OUTPUT: Child read: Shared hello!
 */
#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>
#include <sys/ipc.h>
#include <sys/shm.h>

int main(void)
{
	key_t key = ftok(".", 'B');
	int shmid = shmget(key, 1024, IPC_CREAT | 0666);

	if (fork() == 0)
	{
		char *data = shmat(shmid, NULL, 0);
		strcpy(data, "Shared hello!");
		shmdt(data);
		return 0;
	}

	wait(NULL);
	char *data = shmat(shmid, NULL, 0);
	printf("Child read: %s\n", data);
	shmdt(data);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Detach shared memory (shmdt)
 * @INPUT: (none)
 * @OUTPUT: Shared memory detached
 */
#include <stdio.h>
#include <sys/ipc.h>
#include <sys/shm.h>

int main(void)
{
	key_t key = ftok(".", 'B');
	int shmid = shmget(key, 1024, IPC_CREAT | 0666);
	char *data = shmat(shmid, NULL, 0);

	if (shmdt(data) == -1)
	{
		perror("shmdt");
		return 1;
	}
	printf("Shared memory detached\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Remove a shared memory segment (shmctl IPC_RMID)
 * @INPUT: (none)
 * @OUTPUT: Shared memory segment removed
 */
#include <stdio.h>
#include <sys/ipc.h>
#include <sys/shm.h>

int main(void)
{
	key_t key = ftok(".", 'B');
	int shmid = shmget(key, 1024, IPC_CREAT | 0666);

	if (shmctl(shmid, IPC_RMID, NULL) == -1)
	{
		perror("shmctl");
		return 1;
	}
	printf("Shared memory segment removed\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: POSIX shared memory using shm_open + mmap
 * @INPUT: /my_shm, size 4096
 * @OUTPUT: POSIX shared memory mapped successfully
 */
#include <stdio.h>
#include <fcntl.h>
#include <sys/mman.h>
#include <unistd.h>

int main(void)
{
	int fd = shm_open("/my_shm", O_CREAT | O_RDWR, 0666);

	ftruncate(fd, 4096);
	void *addr = mmap(NULL, 4096, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);

	if (addr == MAP_FAILED)
	{
		perror("mmap");
		return 1;
	}
	printf("POSIX shared memory mapped successfully\n");

	munmap(addr, 4096);
	close(fd);
	return 0;
}
/* @END */

/*
 * @PROGRAM: Synchronize shared memory access with a named semaphore
 * @INPUT: (none)
 * @OUTPUT: Counter safely incremented to 1 using semaphore-protected shared memory
 */
#include <stdio.h>
#include <fcntl.h>
#include <semaphore.h>
#include <sys/mman.h>
#include <unistd.h>

int main(void)
{
	int fd = shm_open("/counter_shm", O_CREAT | O_RDWR, 0666);
	ftruncate(fd, sizeof(int));
	int *counter = mmap(NULL, sizeof(int), PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);
	sem_t *sem = sem_open("/counter_sem", O_CREAT, 0666, 1);

	*counter = 0;

	sem_wait(sem);
	(*counter)++;
	printf("Counter safely incremented to %d using semaphore-protected shared memory\n", *counter);
	sem_post(sem);

	sem_close(sem);
	munmap(counter, sizeof(int));
	close(fd);
	return 0;
}
/* @END */

/*
 * @PROGRAM: Resize POSIX shared memory with ftruncate
 * @INPUT: grow from 0 to 8192 bytes
 * @OUTPUT: Shared memory resized to 8192 bytes
 */
#include <stdio.h>
#include <fcntl.h>
#include <unistd.h>

int main(void)
{
	int fd = shm_open("/my_shm", O_CREAT | O_RDWR, 0666);

	if (ftruncate(fd, 8192) == -1)
	{
		perror("ftruncate");
		return 1;
	}
	printf("Shared memory resized to 8192 bytes\n");

	close(fd);
	return 0;
}
/* @END */

/*
 * @PROGRAM: Unlink POSIX shared memory (shm_unlink)
 * @INPUT: /my_shm
 * @OUTPUT: Shared memory object /my_shm removed
 */
#include <stdio.h>
#include <fcntl.h>
#include <sys/mman.h>

int main(void)
{
	if (shm_unlink("/my_shm") == -1)
	{
		perror("shm_unlink");
		return 1;
	}
	printf("Shared memory object /my_shm removed\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Demonstrate a race condition on shared memory without synchronization
 * @INPUT: two processes each incrementing a shared counter 100000 times
 * @OUTPUT: Final counter value is less than 200000 (lost updates due to no locking)
 */
#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>
#include <sys/ipc.h>
#include <sys/shm.h>

int main(void)
{
	key_t key = ftok(".", 'C');
	int shmid = shmget(key, sizeof(int), IPC_CREAT | 0666);
	int *counter = shmat(shmid, NULL, 0);

	*counter = 0;

	if (fork() == 0)
	{
		for (int i = 0; i < 100000; i++)
			(*counter)++; /* not atomic: read-modify-write race with the parent */
		return 0;
	}

	for (int i = 0; i < 100000; i++)
		(*counter)++;

	wait(NULL);
	printf("Final counter value (expected 200000, likely less): %d\n", *counter);

	shmdt(counter);
	shmctl(shmid, IPC_RMID, NULL);
	return 0;
}
/* @END */
