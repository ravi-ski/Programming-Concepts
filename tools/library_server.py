#!/usr/bin/env python3
import json
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
PROGRESS = DOCS / "progress.json"
PROGRAM_EDITS = DOCS / "program-edits.json"


class LibraryHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DOCS), **kwargs)

    def do_POST(self):
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
                if not all(isinstance(value, dict) and isinstance(value.get("code"), str) for value in progress.values()):
                    raise ValueError("Program edits must contain code strings")
                output_file = PROGRAM_EDITS
            output_file.write_text(json.dumps(progress, indent=2) + "\n", encoding="utf-8")
        except (ValueError, json.JSONDecodeError):
            self.send_error(400, "Invalid progress data")
            return
        self.send_response(204)
        self.end_headers()


if __name__ == "__main__":
    server = ThreadingHTTPServer(("localhost", 8000), LibraryHandler)
    print("Program Library: http://localhost:8000")
    print("Press Ctrl+C to stop the server.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()
