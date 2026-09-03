# Programming Concepts

A personal collection of programming exercises, interview-prep programs, and
networking/concept notes, browsable through a small offline GUI.

## Opening the Program Library GUI

The GUI is available as a static page, and it can also run as a dynamic
SQLite-backed website. Use the dynamic server when you want to create and edit
content from the webpage itself.

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

### Running the dynamic local website

From the repository root, run:

```powershell
python tools\library_server.py
```

Then open `http://localhost:8000`. Questions, answer edits, read counters,
levels, and deletions are stored in `data/library.sqlite3`. The database is
ignored by Git so local runtime data is not accidentally committed.

Use this localhost URL for all create and edit operations. The page waits for
the database response before refreshing, so a successful save is not lost.

GitHub Pages can serve the static catalog, but it cannot run this Python API or
write to SQLite. For a public dynamic website, deploy this server to a host
that runs Python and use a persistent database. GitHub can still host the
source code, while the dynamic website runs on that server.

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

For the static GitHub Pages version, any push to `main` after regenerating the
catalog updates the live site within a minute or two. Dynamic data requires the
Python server and database deployment described above.

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
docs/         GUI (index.html, app.js, style.css, generated data.js) —
              also the GitHub Pages source folder
tools/        generate_catalog.py — builds docs/data.js from source files
              library_server.py — saves local progress and answer edits to docs/*.json
```
