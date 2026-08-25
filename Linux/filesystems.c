/* @SECTION: Linux */
/* @CHAPTER: FILE SYSTEMS */
/*
 * Each block below is a small, independent, self-contained example.
 * They are written to compile individually on Linux (gcc file.c -o out),
 * not as a single combined program.
 */

/*
 * @PROGRAM: Get file information using stat()
 * @INPUT: ./test.txt
 * @OUTPUT: Size, permissions, inode number and last modified time of the file
 */
#include <stdio.h>
#include <sys/stat.h>

int main(void)
{
	struct stat info;

	if (stat("test.txt", &info) == -1)
	{
		perror("stat");
		return 1;
	}

	printf("Size: %lld bytes\n", (long long)info.st_size);
	printf("Inode: %lu\n", (unsigned long)info.st_ino);
	printf("Permissions: %o\n", info.st_mode & 0777);
	printf("Last modified: %ld\n", (long)info.st_mtime);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Check file type using stat (regular, directory, symlink, etc.)
 * @INPUT: /etc, ./test.txt
 * @OUTPUT: /etc is a directory, test.txt is a regular file
 */
#include <stdio.h>
#include <sys/stat.h>

int main(int argc, char *argv[])
{
	struct stat info;

	if (argc < 2 || stat(argv[1], &info) == -1)
	{
		printf("Usage: %s <path>\n", argv[0]);
		return 1;
	}

	if (S_ISREG(info.st_mode))
		printf("%s is a regular file\n", argv[1]);
	else if (S_ISDIR(info.st_mode))
		printf("%s is a directory\n", argv[1]);
	else if (S_ISLNK(info.st_mode))
		printf("%s is a symbolic link\n", argv[1]);
	else
		printf("%s is some other file type\n", argv[1]);

	return 0;
}
/* @END */

/*
 * @PROGRAM: List directory contents using opendir/readdir
 * @INPUT: .
 * @OUTPUT: Each entry name in the current directory, one per line
 */
#include <stdio.h>
#include <dirent.h>

int main(void)
{
	DIR *dir = opendir(".");
	struct dirent *entry;

	if (dir == NULL)
	{
		perror("opendir");
		return 1;
	}

	while ((entry = readdir(dir)) != NULL)
		printf("%s\n", entry->d_name);

	closedir(dir);
	return 0;
}
/* @END */

/*
 * @PROGRAM: Create and remove a directory (mkdir/rmdir)
 * @INPUT: mydir
 * @OUTPUT: Directory created, then removed successfully
 */
#include <stdio.h>
#include <sys/stat.h>
#include <unistd.h>

int main(void)
{
	if (mkdir("mydir", 0755) == -1)
	{
		perror("mkdir");
		return 1;
	}
	printf("Directory created\n");

	if (rmdir("mydir") == -1)
	{
		perror("rmdir");
		return 1;
	}
	printf("Directory removed\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Copy a file using low-level read/write system calls
 * @INPUT: source.txt -> destination.txt
 * @OUTPUT: File copied successfully
 */
#include <stdio.h>
#include <fcntl.h>
#include <unistd.h>

int main(void)
{
	char buffer[4096];
	ssize_t bytesRead;
	int src = open("source.txt", O_RDONLY);
	int dst = open("destination.txt", O_WRONLY | O_CREAT | O_TRUNC, 0644);

	if (src == -1 || dst == -1)
	{
		perror("open");
		return 1;
	}

	while ((bytesRead = read(src, buffer, sizeof(buffer))) > 0)
		write(dst, buffer, (size_t)bytesRead);

	close(src);
	close(dst);
	printf("File copied successfully\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Get and set file permissions using chmod
 * @INPUT: test.txt, mode 0644
 * @OUTPUT: Permissions changed to rw-r--r--
 */
#include <stdio.h>
#include <sys/stat.h>

int main(void)
{
	if (chmod("test.txt", 0644) == -1)
	{
		perror("chmod");
		return 1;
	}
	printf("Permissions changed to rw-r--r--\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Create a symbolic link and read it (symlink/readlink)
 * @INPUT: target.txt -> link.txt
 * @OUTPUT: link.txt -> target.txt
 */
#include <stdio.h>
#include <unistd.h>

int main(void)
{
	char buffer[256];
	ssize_t len;

	if (symlink("target.txt", "link.txt") == -1)
	{
		perror("symlink");
		return 1;
	}

	len = readlink("link.txt", buffer, sizeof(buffer) - 1);
	if (len == -1)
	{
		perror("readlink");
		return 1;
	}
	buffer[len] = '\0';

	printf("link.txt -> %s\n", buffer);
	return 0;
}
/* @END */

/*
 * @PROGRAM: Get filesystem statistics using statvfs
 * @INPUT: /
 * @OUTPUT: Total blocks, free blocks and block size of the filesystem
 */
#include <stdio.h>
#include <sys/statvfs.h>

int main(void)
{
	struct statvfs info;

	if (statvfs("/", &info) == -1)
	{
		perror("statvfs");
		return 1;
	}

	printf("Block size: %lu\n", info.f_bsize);
	printf("Total blocks: %lu\n", info.f_blocks);
	printf("Free blocks: %lu\n", info.f_bfree);

	return 0;
}
/* @END */

/*
 * @PROGRAM: Rename and delete a file (rename/unlink)
 * @INPUT: old.txt -> new.txt, then delete new.txt
 * @OUTPUT: File renamed, then deleted
 */
#include <stdio.h>
#include <unistd.h>

int main(void)
{
	if (rename("old.txt", "new.txt") == -1)
	{
		perror("rename");
		return 1;
	}
	printf("File renamed to new.txt\n");

	if (unlink("new.txt") == -1)
	{
		perror("unlink");
		return 1;
	}
	printf("File deleted\n");

	return 0;
}
/* @END */

/*
 * @PROGRAM: Recursively list a directory tree
 * @INPUT: .
 * @OUTPUT: Every file and sub-directory printed with indentation showing depth
 */
#include <stdio.h>
#include <string.h>
#include <dirent.h>
#include <sys/stat.h>

static void listTree(const char *path, int depth)
{
	DIR *dir = opendir(path);
	struct dirent *entry;

	if (dir == NULL)
		return;

	while ((entry = readdir(dir)) != NULL)
	{
		char childPath[1024];
		struct stat info;

		if (strcmp(entry->d_name, ".") == 0 || strcmp(entry->d_name, "..") == 0)
			continue;

		printf("%*s%s\n", depth * 2, "", entry->d_name);
		snprintf(childPath, sizeof(childPath), "%s/%s", path, entry->d_name);

		if (stat(childPath, &info) == 0 && S_ISDIR(info.st_mode))
			listTree(childPath, depth + 1);
	}

	closedir(dir);
}

int main(void)
{
	listTree(".", 0);
	return 0;
}
/* @END */
