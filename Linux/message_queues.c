/* @SECTION: Linux */
/* @CHAPTER: MESSAGE QUEUES */
/*
 * Each block below is a small, independent, self-contained example.
 * They are written to compile individually on Linux (gcc file.c -o out).
 */

/*
 * @PROGRAM: Create/get a System V message queue (msgget)
 * @INPUT: key = ftok(".", 'A')
 * @OUTPUT: Message queue created with id: 12345
 */
#include <stdio.h>
#include <sys/ipc.h>
#include <sys/msg.h>

int main(void)
{
	key_t key = ftok(".", 'A');
	int msgid = msgget(key, IPC_CREAT | 0666);

	if (msgid == -1)
	{
		perror("msgget");
		return 1;
	}
	printf("Message queue created with id: %d\n", msgid);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Send a message to a System V queue (msgsnd)
 * @INPUT: "Hello Queue!"
 * @OUTPUT: Message sent
 */
#include <stdio.h>
#include <string.h>
#include <sys/ipc.h>
#include <sys/msg.h>

struct Message
{
	long type;
	char text[128];
};

int main(void)
{
	key_t key = ftok(".", 'A');
	int msgid = msgget(key, IPC_CREAT | 0666);
	struct Message msg;

	msg.type = 1;
	strcpy(msg.text, "Hello Queue!");

	if (msgsnd(msgid, &msg, sizeof(msg.text), 0) == -1)
	{
		perror("msgsnd");
		return 1;
	}
	printf("Message sent\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Receive a message from a System V queue (msgrcv)
 * @INPUT: (waits for a message of type 1)
 * @OUTPUT: Received: Hello Queue!
 */
#include <stdio.h>
#include <sys/ipc.h>
#include <sys/msg.h>

struct Message
{
	long type;
	char text[128];
};

int main(void)
{
	key_t key = ftok(".", 'A');
	int msgid = msgget(key, IPC_CREAT | 0666);
	struct Message msg;

	if (msgrcv(msgid, &msg, sizeof(msg.text), 1, 0) == -1)
	{
		perror("msgrcv");
		return 1;
	}
	printf("Received: %s\n", msg.text);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Remove/destroy a message queue (msgctl IPC_RMID)
 * @INPUT: (none)
 * @OUTPUT: Message queue removed
 */
#include <stdio.h>
#include <sys/ipc.h>
#include <sys/msg.h>

int main(void)
{
	key_t key = ftok(".", 'A');
	int msgid = msgget(key, IPC_CREAT | 0666);

	if (msgctl(msgid, IPC_RMID, NULL) == -1)
	{
		perror("msgctl");
		return 1;
	}
	printf("Message queue removed\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Use the message type field to filter messages by category
 * @INPUT: Sends type=1 "low priority" and type=2 "high priority"
 * @OUTPUT: Received high-priority message: high priority
 */
#include <stdio.h>
#include <string.h>
#include <sys/ipc.h>
#include <sys/msg.h>

struct Message
{
	long type;
	char text[64];
};

int main(void)
{
	key_t key = ftok(".", 'A');
	int msgid = msgget(key, IPC_CREAT | 0666);
	struct Message out1 = {1, "low priority"};
	struct Message out2 = {2, "high priority"};
	struct Message in;

	msgsnd(msgid, &out1, sizeof(out1.text), 0);
	msgsnd(msgid, &out2, sizeof(out2.text), 0);

	/* requesting type 2 skips the type-1 message and fetches type-2 directly */
	msgrcv(msgid, &in, sizeof(in.text), 2, 0);
	printf("Received high-priority message: %s\n", in.text);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Non-blocking message receive with IPC_NOWAIT
 * @INPUT: (queue is empty)
 * @OUTPUT: No message available right now
 */
#include <stdio.h>
#include <errno.h>
#include <sys/ipc.h>
#include <sys/msg.h>

struct Message
{
	long type;
	char text[64];
};

int main(void)
{
	key_t key = ftok(".", 'A');
	int msgid = msgget(key, IPC_CREAT | 0666);
	struct Message in;

	if (msgrcv(msgid, &in, sizeof(in.text), 0, IPC_NOWAIT) == -1)
	{
		if (errno == ENOMSG)
			printf("No message available right now\n");
		else
			perror("msgrcv");
	}

	return 0;
}
/* @END */

/*
 * @PROGRAM: POSIX message queue creation (mq_open)
 * @INPUT: /my_queue
 * @OUTPUT: POSIX message queue opened
 */
#include <stdio.h>
#include <fcntl.h>
#include <mqueue.h>

int main(void)
{
	mqd_t mq = mq_open("/my_queue", O_CREAT | O_RDWR, 0644, NULL);

	if (mq == (mqd_t)-1)
	{
		perror("mq_open");
		return 1;
	}
	printf("POSIX message queue opened\n");
	mq_close(mq);

	return 0;
}
/* @END */

/*
 * @PROGRAM: POSIX message queue send/receive (mq_send/mq_receive)
 * @INPUT: "Hello via POSIX MQ"
 * @OUTPUT: Received: Hello via POSIX MQ
 */
#include <stdio.h>
#include <string.h>
#include <fcntl.h>
#include <mqueue.h>

int main(void)
{
	mqd_t mq = mq_open("/my_queue", O_CREAT | O_RDWR, 0644, NULL);
	char buffer[128];

	mq_send(mq, "Hello via POSIX MQ", 19, 0);

	ssize_t n = mq_receive(mq, buffer, sizeof(buffer), NULL);
	buffer[n] = '\0';
	printf("Received: %s\n", buffer);

	mq_close(mq);
	return 0;
}
/* @END */

/*
 * @PROGRAM: Query message queue attributes (mq_getattr)
 * @INPUT: (none)
 * @OUTPUT: Max messages: 10, Message size: 8192, Current messages: 0
 */
#include <stdio.h>
#include <fcntl.h>
#include <mqueue.h>

int main(void)
{
	mqd_t mq = mq_open("/my_queue", O_CREAT | O_RDWR, 0644, NULL);
	struct mq_attr attr;

	mq_getattr(mq, &attr);
	printf("Max messages: %ld\n", attr.mq_maxmsg);
	printf("Message size: %ld\n", attr.mq_msgsize);
	printf("Current messages: %ld\n", attr.mq_curmsgs);

	mq_close(mq);
	return 0;
}
/* @END */

/*
 * @PROGRAM: List and remove a POSIX message queue (mq_unlink, conceptually like "ipcrm")
 * @INPUT: /my_queue
 * @OUTPUT: Message queue /my_queue removed
 */
#include <stdio.h>
#include <mqueue.h>

int main(void)
{
	if (mq_unlink("/my_queue") == -1)
	{
		perror("mq_unlink");
		return 1;
	}
	printf("Message queue /my_queue removed\n");

	return 0;
}
/* @END */
