/* @SECTION: Linux */
/* @CHAPTER: FORK AND CHILD PROCESSES */
/*
 * Each block below is a small, independent, self-contained example.
 * They are written to compile individually on Linux (gcc file.c -o out).
 */

/*
 * @PROGRAM: Basic fork() creating a child process
 * @INPUT: (none)
 * @OUTPUT: Child process running, Parent process running
 */
#include <stdio.h>
#include <unistd.h>

int main(void)
{
	pid_t pid = fork();

	if (pid == 0)
		printf("Child process running\n");
	else if (pid > 0)
		printf("Parent process running\n");
	else
		perror("fork");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Get parent and child process IDs (getpid/getppid)
 * @INPUT: (none)
 * @OUTPUT: Child PID=1234 PPID=1000, Parent PID=1000
 */
#include <stdio.h>
#include <unistd.h>

int main(void)
{
	pid_t pid = fork();

	if (pid == 0)
		printf("Child PID=%d PPID=%d\n", getpid(), getppid());
	else if (pid > 0)
		printf("Parent PID=%d\n", getpid());

	return 0;
}
/* @END */

/*
 * @PROGRAM: Wait for a child process to finish (wait)
 * @INPUT: (none)
 * @OUTPUT: Child finished, Parent: child has exited
 */
#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void)
{
	pid_t pid = fork();

	if (pid == 0)
	{
		printf("Child finished\n");
		return 0;
	}

	wait(NULL);
	printf("Parent: child has exited\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Wait for a specific child with status using waitpid
 * @INPUT: (none)
 * @OUTPUT: Child exited with status 5
 */
#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void)
{
	pid_t pid = fork();

	if (pid == 0)
		_exit(5);

	int status;
	waitpid(pid, &status, 0);

	if (WIFEXITED(status))
		printf("Child exited with status %d\n", WEXITSTATUS(status));

	return 0;
}
/* @END */

/*
 * @PROGRAM: Zombie process demonstration
 * @INPUT: (none)
 * @OUTPUT: Child exits immediately; until the parent calls wait(), it shows as <defunct>
 */
#include <stdio.h>
#include <unistd.h>

int main(void)
{
	pid_t pid = fork();

	if (pid == 0)
	{
		printf("Child exiting now\n");
		_exit(0);
	}

	printf("Parent sleeping without calling wait() - child becomes a zombie\n");
	sleep(10); /* during this window, "ps" shows the child as <defunct> */

	return 0;
}
/* @END */

/*
 * @PROGRAM: Orphan process demonstration
 * @INPUT: (none)
 * @OUTPUT: Child's new parent PID becomes 1 (or the nearest subreaper) after the parent exits
 */
#include <stdio.h>
#include <unistd.h>

int main(void)
{
	pid_t pid = fork();

	if (pid == 0)
	{
		sleep(2); /* parent exits first, this child is reparented */
		printf("Orphaned child's new parent PID: %d\n", getppid());
		return 0;
	}

	printf("Parent exiting immediately\n");
	return 0;
}
/* @END */

/*
 * @PROGRAM: fork() + exec() to run another program
 * @INPUT: (none)
 * @OUTPUT: Output of the "ls -l" command executed in the child process
 */
#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void)
{
	pid_t pid = fork();

	if (pid == 0)
	{
		execlp("ls", "ls", "-l", NULL);
		perror("execlp"); /* only reached if execlp fails */
		_exit(1);
	}

	wait(NULL);
	return 0;
}
/* @END */

/*
 * @PROGRAM: Create multiple child processes in a loop
 * @INPUT: 3 children
 * @OUTPUT: Child 0 running, Child 1 running, Child 2 running
 */
#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void)
{
	for (int i = 0; i < 3; i++)
	{
		pid_t pid = fork();

		if (pid == 0)
		{
			printf("Child %d running\n", i);
			_exit(0);
		}
	}

	for (int i = 0; i < 3; i++)
		wait(NULL);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Exit status propagation from child to parent (WIFEXITED/WEXITSTATUS)
 * @INPUT: (none)
 * @OUTPUT: Child exited normally with code 42
 */
#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void)
{
	pid_t pid = fork();

	if (pid == 0)
		_exit(42);

	int status;
	waitpid(pid, &status, 0);

	if (WIFEXITED(status))
		printf("Child exited normally with code %d\n", WEXITSTATUS(status));
	else if (WIFSIGNALED(status))
		printf("Child was killed by signal %d\n", WTERMSIG(status));

	return 0;
}
/* @END */

/*
 * @PROGRAM: Bounded fork tree (safe, depth-limited alternative to a fork bomb)
 * @INPUT: max depth = 2
 * @OUTPUT: Prints one line per process created, then all processes exit cleanly
 */
#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

static void spawn(int depth, int maxDepth)
{
	if (depth >= maxDepth)
		return;

	pid_t pid = fork();

	if (pid == 0)
	{
		printf("Process at depth %d, PID=%d\n", depth + 1, getpid());
		spawn(depth + 1, maxDepth);
		_exit(0);
	}

	waitpid(pid, NULL, 0); /* bounded: parent waits, no runaway process growth */
}

int main(void)
{
	spawn(0, 2);
	return 0;
}
/* @END */
