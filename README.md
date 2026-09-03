# Programming Concepts

A personal collection of programming exercises, interview-prep programs, and
networking/concept notes, browsable through a small offline GUI.

## Opening the Program Library GUI

The GUI can be opened as a static, no-build web page. Use the local server
when you want read counters to be written to the repository.

### On this laptop

1. Open [`docs/index.html`](docs/index.html) directly in any browser:
   - Double-click the file in File Explorer, **or**
   - Open a browser and navigate to:
     `file:///C:/Users/ravi/Desktop/Programs/docs/index.html`
2. The page shows top-level **Sections** (e.g. "C Programming", "Networking",
   "Linux"). Click a section to expand its **Chapters**, then click a
   program/question name to expand its code (or answer text) along with
   sample input/output.
3. Use the search box at the top to filter chapters/programs by name.

### Saving read counters from VS Code

To save `+1 Read` changes into a file that can be committed to GitHub, run:

```powershell
python tools\library_server.py
```

Then open `http://localhost:8000`. The server writes counters to
[`docs/progress.json`](docs/progress.json) and program answer edits to
[`docs/program-edits.json`](docs/program-edits.json). Commit those files and
push them to `main`; GitHub Pages will display the committed data. Opening
`docs/index.html` directly still works, but changes there stay in the browser.

### On a phone/tablet, or any device without the laptop (GitHub Pages)

The `docs/` folder is set up to be served directly by **GitHub Pages**, so you
can study from any browser tab once it's enabled:

1. On GitHub, go to the repo → **Settings → Pages**.
2. Under "Build and deployment", set **Source** to `Deploy from a branch`,
   branch `main`, folder `/docs`, then **Save**.
3. After a minute, the site goes live at:
   `https://ravi-ski.github.io/Programming-Concepts/`
4. Bookmark that URL on your phone/tablet — no laptop, clone, or install
   needed, just an internet connection and a browser tab.

Since it's a static page, any push to `main` (after running the catalog
generator below) automatically updates the live site within a minute or two.

## Regenerating the catalog

The GUI reads from [`docs/data.js`](docs/data.js), which is generated from the
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
Linux/        Linux systems programming + theory (fork, IPC, mutex, boot, etc.)
Networking/   Networking concept notes (VLAN, Linux networking commands)
Python/       Python programs
SQL/          SQL scripts
docs/         Static GUI (index.html, app.js, style.css, generated data.js) —
              also the GitHub Pages source folder
tools/        generate_catalog.py — builds docs/data.js from source files
              library_server.py — saves local progress and answer edits to docs/*.json
```
