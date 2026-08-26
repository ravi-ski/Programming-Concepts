#!/usr/bin/env python3
"""
Scans source files for @PROGRAM/@INPUT/@OUTPUT/@END blocks and generates
docs/data.js consumed by the GUI viewer.

Convention (works inside any comment style // /* */ # --, or plain text):
    @SECTION: <top-level heading, optional, defaults to "General">
    @CHAPTER: <display name for the file, optional, defaults to the filename>
    @PROGRAM: <name shown in GUI>
    @INPUT: <sample input, optional, multiple lines allowed>
    @OUTPUT: <sample output, optional, multiple lines allowed>
    ... source code / answer text ...
    @END
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CHAPTER_EXTS = {".c", ".cpp", ".h", ".hpp", ".py", ".go", ".sql", ".txt"}
SKIP_DIRS = {".git", ".vscode", ".agents", "docs", "tools"}
DEFAULT_SECTION = "General"

BLOCK_RE = re.compile(
    r"@PROGRAM:\s*(?P<name>.*?)\s*\n"
    r"(?P<meta>(?:.*?\n)*?)"
    r"(?P<body>(?:.*?\n)*?)"
    r".*?@END",
)
INPUT_RE = re.compile(r"@INPUT:\s*(.*)")
OUTPUT_RE = re.compile(r"@OUTPUT:\s*(.*)")
CHAPTER_RE = re.compile(r"@CHAPTER:\s*(.*)")
SECTION_RE = re.compile(r"@SECTION:\s*(.*)")
COMMENT_ONLY_RE = re.compile(r"^[ \t]*(/\*+|\*/|\*|//|#|--)[ \t]*$")


def clean_tag_value(raw: str) -> str:
    return re.sub(r"\*/\s*$", "", raw.strip()).strip()


def parse_file(path: Path):
    text = path.read_text(encoding="utf-8", errors="ignore")
    programs = []
    for match in BLOCK_RE.finditer(text):
        name = match.group("name").strip()
        meta_lines = match.group("meta").splitlines()
        body_lines = match.group("body").splitlines()

        sample_input, sample_output = [], []
        code_lines = []
        for line in meta_lines + body_lines:
            in_match = INPUT_RE.search(line)
            out_match = OUTPUT_RE.search(line)
            if in_match:
                sample_input.append(in_match.group(1))
                continue
            if out_match:
                sample_output.append(out_match.group(1))
                continue
            if COMMENT_ONLY_RE.match(line):
                continue
            code_lines.append(line)

        code = "\n".join(code_lines).strip("\n")
        programs.append(
            {
                "name": name,
                "input": "\n".join(sample_input).strip(),
                "output": "\n".join(sample_output).strip(),
                "code": code,
            }
        )
    return programs


def parse_tag(path: Path, pattern: re.Pattern):
    text = path.read_text(encoding="utf-8", errors="ignore")
    match = pattern.search(text)
    if not match:
        return None
    return clean_tag_value(match.group(1)) or None


def build_catalog():
    sections = {}
    order = []
    chapter_index = {}  # (section_name, chapter_title) -> chapter dict
    for path in sorted(ROOT.rglob("*")):
        if path.suffix.lower() not in CHAPTER_EXTS:
            continue
        if any(part in SKIP_DIRS for part in path.parts):
            continue
        programs = parse_file(path)
        if not programs:
            continue
        rel = path.relative_to(ROOT)
        section_name = parse_tag(path, SECTION_RE) or DEFAULT_SECTION
        chapter_title = parse_tag(path, CHAPTER_RE) or path.name

        if section_name not in sections:
            sections[section_name] = []
            order.append(section_name)

        key = (section_name, chapter_title)
        existing = chapter_index.get(key)
        if existing is not None:
            existing["programs"].extend(programs)
            existing["paths"].append(str(rel).replace("\\", "/"))
            continue

        chapter = {
            "chapter": chapter_title,
            "folder": str(rel.parent).replace("\\", "/"),
            "paths": [str(rel).replace("\\", "/")],
            "programs": programs,
        }
        chapter_index[key] = chapter
        sections[section_name].append(chapter)

    for section in sections.values():
        for chapter in section:
            chapter["path"] = ", ".join(chapter.pop("paths"))

    return [{"section": name, "chapters": sections[name]} for name in order]


def main():
    catalog = build_catalog()
    out_dir = ROOT / "docs"
    out_dir.mkdir(exist_ok=True)
    out_file = out_dir / "data.js"
    out_file.write_text(
        "const CATALOG = " + json.dumps(catalog, indent=2) + ";\n",
        encoding="utf-8",
    )
    total_chapters = sum(len(s["chapters"]) for s in catalog)
    total_programs = sum(
        len(c["programs"]) for s in catalog for c in s["chapters"]
    )
    print(
        f"Wrote {out_file} ({len(catalog)} sections, "
        f"{total_chapters} chapters, {total_programs} programs)"
    )


if __name__ == "__main__":
    main()
