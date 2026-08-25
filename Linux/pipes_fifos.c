/* @SECTION: Linux */
/* @CHAPTER: PIPES AND FIFOS */
/*
 * Each block below is a small, independent, self-contained example.
 * They are written to compile individually on Linux (gcc file.c -o out).
 */

/*
 * @PROGRAM: Anonymous pipe between parent and child (pipe())
 * @INPUT: (none)
 * @OUTPUT: Message from child: Hello from child!
 */
#include <stdio.h>
#include <string.h>
#include <unistd.h>

int main(void)
{
	int fd[2];
	char buffer[64];

	pipe(fd);

	if (fork() == 0)
	{
		close(fd[0]);
		write(fd[1], "Hello from child!", 18);
		close(fd[1]);
		return 0;
	}

	close(fd[1]);
	read(fd[0], buffer, sizeof(buffer));
	close(fd[0]);
	printf("Message from child: %s\n", buffer);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Bidirectional communication using two pipes
 * @INPUT: (none)
 * @OUTPUT: Parent got: pong, Child got: ping
 */
#include <stdio.h>
#include <string.h>
#include <unistd.h>

int main(void)
{
	int parentToChild[2], childToParent[2];
	char buffer[64];

	pipe(parentToChild);
	pipe(childToParent);

	if (fork() == 0)
	{
		close(parentToChild[1]);
		close(childToParent[0]);
		read(parentToChild[0], buffer, sizeof(buffer));
		printf("Child got: %s\n", buffer);
		write(childToParent[1], "pong", 5);
		return 0;
	}

	close(parentToChild[0]);
	close(childToParent[1]);
	write(parentToChild[1], "ping", 5);
	read(childToParent[0], buffer, sizeof(buffer));
	printf("Parent got: %s\n", buffer);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Redirect pipe read end to a child's stdin using dup2 (like a shell pipe)
 * @INPUT: writes "hello\nworld\n" then runs "sort" on it
 * @OUTPUT: hello
 * @OUTPUT: world  (sorted output produced by the child "sort" process)
 */
#include <unistd.h>

int main(void)
{
	int fd[2];

	pipe(fd);

	if (fork() == 0)
	{
		dup2(fd[0], 0); /* child's stdin now reads from the pipe */
		close(fd[0]);
		close(fd[1]);
		execlp("sort", "sort", NULL);
		return 1;
	}

	close(fd[0]);
	write(fd[1], "world\nhello\n", 12);
	close(fd[1]);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Named pipe (FIFO) creation using mkfifo
 * @INPUT: /tmp/myfifo
 * @OUTPUT: FIFO created at /tmp/myfifo
 */
#include <stdio.h>
#include <sys/stat.h>

int main(void)
{
	if (mkfifo("/tmp/myfifo", 0666) == -1)
	{
		perror("mkfifo");
		return 1;
	}
	printf("FIFO created at /tmp/myfifo\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Writer program for a FIFO
 * @INPUT: Hello through the FIFO!
 * @OUTPUT: Message sent through FIFO
 */
#include <stdio.h>
#include <fcntl.h>
#include <unistd.h>

int main(void)
{
	int fd = open("/tmp/myfifo", O_WRONLY);

	if (fd == -1)
	{
		perror("open");
		return 1;
	}

	write(fd, "Hello through the FIFO!", 24);
	close(fd);
	printf("Message sent through FIFO\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Reader program for a FIFO
 * @INPUT: (reads whatever the writer sends)
 * @OUTPUT: Received: Hello through the FIFO!
 */
#include <stdio.h>
#include <fcntl.h>
#include <unistd.h>

int main(void)
{
	char buffer[128];
	int fd = open("/tmp/myfifo", O_RDONLY);

	if (fd == -1)
	{
		perror("open");
		return 1;
	}

	ssize_t n = read(fd, buffer, sizeof(buffer) - 1);
	buffer[n] = '\0';
	close(fd);
	printf("Received: %s\n", buffer);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Non-blocking read from a FIFO using O_NONBLOCK
 * @INPUT: (no writer connected yet)
 * @OUTPUT: No data available yet (would have blocked)
 */
#include <stdio.h>
#include <errno.h>
#include <fcntl.h>
#include <unistd.h>

int main(void)
{
	char buffer[128];
	int fd = open("/tmp/myfifo", O_RDONLY | O_NONBLOCK);

	if (fd == -1)
	{
		perror("open");
		return 1;
	}

	ssize_t n = read(fd, buffer, sizeof(buffer) - 1);
	if (n == -1 && errno == EAGAIN)
		printf("No data available yet (would have blocked)\n");
	else if (n > 0)
		printf("Received %zd bytes\n", n);

	close(fd);
	return 0;
}
/* @END */

/*
 * @PROGRAM: Simple producer-consumer using an anonymous pipe
 * @INPUT: produce numbers 1..5
 * @OUTPUT: Consumed: 1, Consumed: 2, Consumed: 3, Consumed: 4, Consumed: 5
 */
#include <stdio.h>
#include <unistd.h>

int main(void)
{
	int fd[2];

	pipe(fd);

	if (fork() == 0) /* consumer */
	{
		int value;
		close(fd[1]);
		while (read(fd[0], &value, sizeof(value)) > 0)
			printf("Consumed: %d\n", value);
		return 0;
	}

	close(fd[0]); /* producer */
	for (int i = 1; i <= 5; i++)
		write(fd[1], &i, sizeof(i));
	close(fd[1]);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Chain two commands manually using a pipe (equivalent of "ls | wc -l")
 * @INPUT: (none)
 * @OUTPUT: The line count of the current directory's listing
 */
#include <unistd.h>

int main(void)
{
	int fd[2];

	pipe(fd);

	if (fork() == 0) /* "ls" writes into the pipe */
	{
		dup2(fd[1], 1);
		close(fd[0]);
		close(fd[1]);
		execlp("ls", "ls", NULL);
		return 1;
	}

	if (fork() == 0) /* "wc -l" reads from the pipe */
	{
		dup2(fd[0], 0);
		close(fd[0]);
		close(fd[1]);
		execlp("wc", "wc", "-l", NULL);
		return 1;
	}

	close(fd[0]);
	close(fd[1]);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Demonstrate pipe buffer capacity by writing until it would block
 * @INPUT: repeated 1KB writes
 * @OUTPUT: Wrote N KB before the pipe buffer filled up (no reader draining it)
 */
#include <stdio.h>
#include <errno.h>
#include <fcntl.h>
#include <string.h>
#include <unistd.h>

int main(void)
{
	int fd[2];
	char chunk[1024];
	int kbWritten = 0;

	memset(chunk, 'A', sizeof(chunk));
	pipe(fd);
	fcntl(fd[1], F_SETFL, O_NONBLOCK); /* avoid actually blocking in this demo */

	while (write(fd[1], chunk, sizeof(chunk)) > 0)
		kbWritten++;

	printf("Wrote %d KB before the pipe buffer filled up\n", kbWritten);

	close(fd[0]);
	close(fd[1]);
	return 0;
}
/* @END */
