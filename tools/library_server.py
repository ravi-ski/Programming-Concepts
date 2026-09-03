#!/usr/bin/env python3
import json
import re
import sqlite3
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
PROGRESS = DOCS / "progress.json"
PROGRAM_EDITS = DOCS / "program-edits.json"
DATABASE_DIR = ROOT / "data"
DATABASE = DATABASE_DIR / "library.sqlite3"


def catalog_data():
    data = (DOCS / "data.js").read_text(encoding="utf-8")
    return json.loads(re.sub(r"^const CATALOG\s*=\s*", "", data).rstrip(";\n"))


def connection():
    DATABASE_DIR.mkdir(exist_ok=True)
    db = sqlite3.connect(DATABASE)
    db.row_factory = sqlite3.Row
    db.executescript("""
        CREATE TABLE IF NOT EXISTS questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            section TEXT NOT NULL,
            chapter TEXT NOT NULL,
            question TEXT NOT NULL,
            answer TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS program_state (
            program_id TEXT PRIMARY KEY,
            reads INTEGER NOT NULL DEFAULT 0,
            level TEXT NOT NULL DEFAULT 'Not set',
            deleted INTEGER NOT NULL DEFAULT 0,
            answer TEXT,
            name TEXT
        );
        CREATE TABLE IF NOT EXISTS settings (name TEXT PRIMARY KEY);
    """)
    columns = {row[1] for row in db.execute("PRAGMA table_info(program_state)")}
    if "name" not in columns:
        db.execute("ALTER TABLE program_state ADD COLUMN name TEXT")
        db.commit()
    if db.execute("SELECT 1 FROM settings WHERE name = 'json_migration'").fetchone() is None:
        migrate_json_state(db)
        db.execute("INSERT INTO settings(name) VALUES ('json_migration')")
        db.commit()
    return db


def migrate_json_state(db):
    if PROGRESS.exists():
        progress = json.loads(PROGRESS.read_text(encoding="utf-8"))
        for program_id, reads in progress.items():
            if isinstance(reads, int) and reads >= 0:
                db.execute("INSERT OR IGNORE INTO program_state(program_id, reads) VALUES (?, ?)", (program_id, reads))
    if PROGRAM_EDITS.exists():
        edits = json.loads(PROGRAM_EDITS.read_text(encoding="utf-8"))
        for program_key, edit in edits.items():
            if isinstance(edit, dict) and (isinstance(edit.get("code"), str) or isinstance(edit.get("name"), str)):
                program_name = program_key.split("|", 1)[0]
                program_id = next((program["id"] for section in catalog_data() for chapter in section["chapters"] for program in chapter["programs"] if program["name"] == program_name), None)
                if program_id:
                    db.execute("INSERT OR IGNORE INTO program_state(program_id, answer, name) VALUES (?, ?, ?)", (program_id, edit.get("code"), edit.get("name")))


def state():
    db = connection()
    questions = [dict(row) for row in db.execute("SELECT * FROM questions ORDER BY id")]
    records = db.execute("SELECT * FROM program_state").fetchall()
    db.close()
    return {
        "questions": questions,
        "reads": {row["program_id"]: row["reads"] for row in records if row["reads"]},
        "levels": {row["program_id"]: row["level"] for row in records if row["level"] != "Not set"},
        "deleted": {row["program_id"]: True for row in records if row["deleted"]},
        "programEdits": {row["program_id"]: {**({"code": row["answer"]} if row["answer"] is not None else {}), **({"name": row["name"]} if row["name"] is not None else {})} for row in records if row["answer"] is not None or row["name"] is not None},
    }


class LibraryHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DOCS), **kwargs)

    def do_POST(self):
        if self.path == "/api/questions":
            payload = self.read_json()
            db = connection()
            cursor = db.execute("INSERT INTO questions(section, chapter, question, answer) VALUES (?, ?, ?, ?)", (payload["section"], payload["chapter"], payload["question"], payload["answer"]))
            db.commit()
            self.json_response({"id": cursor.lastrowid, **payload})
            db.close()
            return
        match = re.fullmatch(r"/api/reads/(.+)", self.path)
        if match:
            program_id = self.unquote(match.group(1))
            db = connection()
            db.execute("INSERT INTO program_state(program_id, reads) VALUES (?, 1) ON CONFLICT(program_id) DO UPDATE SET reads = reads + 1", (program_id,))
            db.commit()
            db.close()
            self.send_response(204)
            self.end_headers()
            return
        match = re.fullmatch(r"/api/levels/(.+)", self.path)
        if match:
            program_id = self.unquote(match.group(1))
            payload = self.read_json()
            if payload.get("level") not in {"Not set", "Low", "Medium", "High"}:
                self.send_error(400, "Invalid level")
                return
            db = connection()
            db.execute("INSERT INTO program_state(program_id, level) VALUES (?, ?) ON CONFLICT(program_id) DO UPDATE SET level = excluded.level", (program_id, payload["level"]))
            db.commit()
            db.close()
            self.send_response(204)
            self.end_headers()
            return
        if self.path not in {"/api/progress", "/api/program-edits"}:
            self.send_error(404)
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
            progress = json.loads(self.rfile.read(length))
            if not isinstance(progress, dict):
                raise ValueError("Data must be a JSON object")
            if self.path == "/api/progress":
                if not all(isinstance(value, int) and value >= 0 for value in progress.values()):
                    raise ValueError("Progress must contain non-negative integers")
                output_file = PROGRESS
            else:
                if not all(isinstance(value, dict) and (isinstance(value.get("code"), str) or isinstance(value.get("name"), str)) for value in progress.values()):
                    raise ValueError("Program edits must contain code or name strings")
                output_file = PROGRAM_EDITS
            output_file.write_text(json.dumps(progress, indent=2) + "\n", encoding="utf-8")
        except (ValueError, json.JSONDecodeError):
            self.send_error(400, "Invalid progress data")
            return
        self.send_response(204)
        self.end_headers()

    def do_GET(self):
        if self.path.split("?")[0] == "/api/state":
            self.json_response(state())
            return
        super().do_GET()

    def do_PUT(self):
        match = re.fullmatch(r"/api/programs/(.+)", self.path)
        if match:
            program_id = self.unquote(match.group(1))
            payload = self.read_json()
            db = connection()
            db.execute("INSERT INTO program_state(program_id, answer, name) VALUES (?, ?, ?) ON CONFLICT(program_id) DO UPDATE SET answer = COALESCE(excluded.answer, program_state.answer), name = COALESCE(excluded.name, program_state.name)", (program_id, payload.get("code"), payload.get("name")))
            db.commit()
            db.close()
            self.send_response(204)
            self.end_headers()
            return
        match = re.fullmatch(r"/api/questions/(\d+)", self.path)
        if match:
            payload = self.read_json()
            db = connection()
            if "question" in payload:
                db.execute("UPDATE questions SET question = ?, answer = ? WHERE id = ?", (payload["question"], payload["answer"], int(match.group(1))))
            else:
                db.execute("UPDATE questions SET answer = ? WHERE id = ?", (payload["answer"], int(match.group(1))))
            db.commit()
            db.close()
            self.send_response(204)
            self.end_headers()
            return
        self.send_error(404)

    def do_DELETE(self):
        match = re.fullmatch(r"/api/items/(.+)", self.path)
        if not match:
            self.send_error(404)
            return
        item_id = self.unquote(match.group(1))
        db = connection()
        db.execute("INSERT INTO program_state(program_id, deleted) VALUES (?, 1) ON CONFLICT(program_id) DO UPDATE SET deleted = 1", (item_id,))
        db.commit()
        db.close()
        self.send_response(204)
        self.end_headers()

    def read_json(self):
        length = int(self.headers.get("Content-Length", "0"))
        return json.loads(self.rfile.read(length))

    def json_response(self, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    @staticmethod
    def unquote(value):
        from urllib.parse import unquote
        return unquote(value)


if __name__ == "__main__":
    server = ThreadingHTTPServer(("localhost", 8000), LibraryHandler)
    print("Program Library: http://localhost:8000")
    print("Press Ctrl+C to stop the server.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()
