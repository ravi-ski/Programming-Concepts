# Programming Concepts

A personal collection of programming exercises, interview-prep programs, and
networking/concept notes, browsable through a small offline GUI.

## Opening the Program Library GUI

The GUI is a static, no-build web page — no server required.

1. Open [`gui/index.html`](gui/index.html) directly in any browser:
   - Double-click the file in File Explorer, **or**
   - Open a browser and navigate to:
     `file:///C:/Users/ravi/Desktop/Programs/gui/index.html`
2. The page shows top-level **Sections** (e.g. "C Programming", "Networking").
   Click a section to expand its **Chapters** (source files), then click a
   program/question name to expand its code (or answer text) along with
   sample input/output.
3. Use the search box at the top to filter chapters/programs by name.

## Regenerating the catalog

The GUI reads from [`gui/data.js`](gui/data.js), which is generated from the
source files by a Python script. Whenever you add or edit a `@PROGRAM` block
in any source file, regenerate the catalog:

```powershell
python tools\generate_catalog.py
```

## Adding a new program to the library

Wrap any function/answer in a comment block using this convention (works
inside `//`, `/* */`, `#`, `--` comments, or plain text files):

```c
/* @SECTION: C Programming */   // optional, top-level heading (defaults to "General")
/* @CHAPTER: STRING PROGRAMS */ // optional, chapter heading (defaults to the filename)

/*
 * @PROGRAM: Reverse a character array string
 * @INPUT: hello
 * @OUTPUT: olleh
 */
void reverseString(char str[]) { ... }
/* @END */
```

- `@SECTION` / `@CHAPTER` can be placed once near the top of a file.
- `@PROGRAM` / `@INPUT` / `@OUTPUT` / `@END` wrap each individual program or
  question; `@INPUT` and `@OUTPUT` are optional.
- After editing, rerun `python tools\generate_catalog.py` to refresh the GUI.

## Project structure

```
Algorithms/   Sorting/searching algorithm implementations
C/            Core C programs (pointers, strings, bitwise, structures, etc.)
CPP/          C++ language feature examples
DSA/          Data structures and algorithms
Go/           Go programs
Linux/        Linux/shell notes and scripts
Networking/   Networking concept notes (e.g. VLAN interview Q&A)
Python/       Python programs
SQL/          SQL scripts
gui/          Static GUI (index.html, app.js, style.css, generated data.js)
tools/        generate_catalog.py — builds gui/data.js from source files
```
