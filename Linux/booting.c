/* @SECTION: Linux */
/* @CHAPTER: BOOTING CONCEPTS */
/*
 * Each block below is a small, independent, self-contained example that
 * inspects boot/runtime information on a Linux system.
 */

/*
 * @PROGRAM: Read and print the kernel version from /proc/version
 * @INPUT: (none)
 * @OUTPUT: Linux version 6.8.0-generic (gcc ...) ...
 */
#include <stdio.h>

int main(void)
{
	FILE *fp = fopen("/proc/version", "r");
	char line[256];

	if (fp == NULL)
	{
		perror("fopen");
		return 1;
	}

	if (fgets(line, sizeof(line), fp) != NULL)
		printf("%s", line);

	fclose(fp);
	return 0;
}
/* @END */

/*
 * @PROGRAM: Read system uptime from /proc/uptime
 * @INPUT: (none)
 * @OUTPUT: System has been up for 12345.67 seconds
 */
#include <stdio.h>

int main(void)
{
	FILE *fp = fopen("/proc/uptime", "r");
	double uptimeSeconds;

	if (fp == NULL)
	{
		perror("fopen");
		return 1;
	}

	fscanf(fp, "%lf", &uptimeSeconds);
	printf("System has been up for %.2f seconds\n", uptimeSeconds);

	fclose(fp);
	return 0;
}
/* @END */

/*
 * @PROGRAM: Parse /proc/cmdline to show kernel boot parameters
 * @INPUT: (none)
 * @OUTPUT: BOOT_IMAGE=/vmlinuz root=UUID=... ro quiet splash
 */
#include <stdio.h>

int main(void)
{
	FILE *fp = fopen("/proc/cmdline", "r");
	char line[512];

	if (fp == NULL)
	{
		perror("fopen");
		return 1;
	}

	if (fgets(line, sizeof(line), fp) != NULL)
		printf("Boot parameters: %s", line);

	fclose(fp);
	return 0;
}
/* @END */

/*
 * @PROGRAM: List currently running processes from /proc (simple ps-like demo)
 * @INPUT: (none)
 * @OUTPUT: PID 1: systemd, PID 842: sshd, ...
 */
#include <stdio.h>
#include <ctype.h>
#include <dirent.h>
#include <stdlib.h>

int main(void)
{
	DIR *proc = opendir("/proc");
	struct dirent *entry;

	if (proc == NULL)
	{
		perror("opendir");
		return 1;
	}

	while ((entry = readdir(proc)) != NULL)
	{
		if (!isdigit((unsigned char)entry->d_name[0]))
			continue;

		char path[64], name[128] = "";
		snprintf(path, sizeof(path), "/proc/%s/comm", entry->d_name);

		FILE *fp = fopen(path, "r");
		if (fp != NULL)
		{
			fgets(name, sizeof(name), fp);
			fclose(fp);
		}
		printf("PID %s: %s", entry->d_name, name);
	}

	closedir(proc);
	return 0;
}
/* @END */

/*
 * @PROGRAM: Read /etc/os-release to display distribution info
 * @INPUT: (none)
 * @OUTPUT: NAME="Ubuntu", VERSION="22.04 LTS ..."
 */
#include <stdio.h>
#include <string.h>

int main(void)
{
	FILE *fp = fopen("/etc/os-release", "r");
	char line[256];

	if (fp == NULL)
	{
		perror("fopen");
		return 1;
	}

	while (fgets(line, sizeof(line), fp) != NULL)
	{
		if (strncmp(line, "NAME=", 5) == 0 || strncmp(line, "VERSION=", 8) == 0)
			printf("%s", line);
	}

	fclose(fp);
	return 0;
}
/* @END */

/*
 * @PROGRAM: Check the current systemd target (runlevel equivalent) via popen
 * @INPUT: (none)
 * @OUTPUT: Current target: graphical.target
 */
#include <stdio.h>

int main(void)
{
	char buffer[128];
	FILE *pipe = popen("systemctl get-default", "r");

	if (pipe == NULL)
	{
		perror("popen");
		return 1;
	}

	if (fgets(buffer, sizeof(buffer), pipe) != NULL)
		printf("Current target: %s", buffer);

	pclose(pipe);
	return 0;
}
/* @END */

/*
 * @PROGRAM: Measure system boot time using "uptime -s" via popen
 * @INPUT: (none)
 * @OUTPUT: System booted at: 2026-08-25 09:15:03
 */
#include <stdio.h>

int main(void)
{
	char buffer[64];
	FILE *pipe = popen("uptime -s", "r");

	if (pipe == NULL)
	{
		perror("popen");
		return 1;
	}

	if (fgets(buffer, sizeof(buffer), pipe) != NULL)
		printf("System booted at: %s", buffer);

	pclose(pipe);
	return 0;
}
/* @END */

/*
 * @PROGRAM: Read /proc/meminfo to display a memory summary
 * @INPUT: (none)
 * @OUTPUT: MemTotal: 16384000 kB, MemFree: 5230000 kB, MemAvailable: 9800000 kB
 */
#include <stdio.h>
#include <string.h>

int main(void)
{
	FILE *fp = fopen("/proc/meminfo", "r");
	char line[256];

	if (fp == NULL)
	{
		perror("fopen");
		return 1;
	}

	while (fgets(line, sizeof(line), fp) != NULL)
	{
		if (strncmp(line, "MemTotal", 8) == 0 ||
			strncmp(line, "MemFree", 7) == 0 ||
			strncmp(line, "MemAvailable", 12) == 0)
			printf("%s", line);
	}

	fclose(fp);
	return 0;
}
/* @END */

/*
 * @PROGRAM: List loaded kernel modules from /proc/modules
 * @INPUT: (none)
 * @OUTPUT: nf_tables 172032 1 - Live 0x0000000000000000, ...
 */
#include <stdio.h>

int main(void)
{
	FILE *fp = fopen("/proc/modules", "r");
	char line[256];

	if (fp == NULL)
	{
		perror("fopen");
		return 1;
	}

	while (fgets(line, sizeof(line), fp) != NULL)
		printf("%s", line);

	fclose(fp);
	return 0;
}
/* @END */

/*
 * @PROGRAM: Read recent boot log lines using dmesg via popen
 * @INPUT: (none)
 * @OUTPUT: [    0.000000] Linux version 6.8.0 ..., [    0.123456] ACPI: ...
 */
#include <stdio.h>

int main(void)
{
	char buffer[256];
	FILE *pipe = popen("dmesg | head -n 20", "r");

	if (pipe == NULL)
	{
		perror("popen");
		return 1;
	}

	while (fgets(buffer, sizeof(buffer), pipe) != NULL)
		printf("%s", buffer);

	pclose(pipe);
	return 0;
}
/* @END */
