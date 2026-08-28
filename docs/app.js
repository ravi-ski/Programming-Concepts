function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const NOTES_STORAGE_KEY = "program-library-notes";

function getSavedNotes() {
  try {
    return JSON.parse(localStorage.getItem(NOTES_STORAGE_KEY) || "{}");
  } catch (error) {
    return {};
  }
}

function getProgramKey(program) {
  return `${program.name}|${program.code}`;
}

function renderProgram(program) {
  const hasIo = program.input || program.output;
  const programKey = encodeURIComponent(getProgramKey(program));
  const savedNote = getSavedNotes()[getProgramKey(program)] || "";
  return `
    <div class="program" data-program-key="${programKey}">
      <div class="program-header">
        <span class="program-name">${escapeHtml(program.name)}</span>
      </div>
      <div class="program-body">
        <pre><code>${escapeHtml(program.code)}</code></pre>
        ${hasIo ? `
        <div class="io-grid">
          <div>
            <div class="io-label">Input</div>
            <pre>${escapeHtml(program.input || "(none)")}</pre>
          </div>
          <div>
            <div class="io-label">Output</div>
            <pre>${escapeHtml(program.output || "(none)")}</pre>
          </div>
        </div>` : ""}
        <div class="notes">
          <label for="note-${programKey}">Personal note</label>
          <textarea id="note-${programKey}" class="note-input" placeholder="Add a note about this program...">${escapeHtml(savedNote)}</textarea>
          <div class="note-actions">
            <button type="button" class="save-note">Save note</button>
            <span class="note-status" aria-live="polite"></span>
          </div>
        </div>
      </div>
    </div>`;
}

function renderChapter(chapter) {
  return `
    <div class="chapter">
      <div class="chapter-header">
        <div><span class="chevron">&#9656;</span>
          <span class="chapter-title">${escapeHtml(chapter.chapter)}</span>
          <span class="chapter-folder">${escapeHtml(chapter.folder)}</span>
        </div>
        <span class="chapter-count">${chapter.programs.length} program(s)</span>
      </div>
      <div class="chapter-body">
        ${chapter.programs.map(renderProgram).join("")}
      </div>
    </div>`;
}

function renderSection(section) {
  const totalPrograms = section.chapters.reduce((sum, c) => sum + c.programs.length, 0);
  return `
    <div class="section">
      <div class="section-header">
        <div><span class="chevron">&#9656;</span>
          <span class="section-title">${escapeHtml(section.section)}</span>
        </div>
        <span class="section-count">${section.chapters.length} chapter(s), ${totalPrograms} program(s)</span>
      </div>
      <div class="section-body">
        ${section.chapters.map(renderChapter).join("")}
      </div>
    </div>`;
}

function render(catalog) {
  const container = document.getElementById("chapters");
  if (!catalog.length) {
    container.innerHTML = `<div class="empty">No programs found yet. Add @PROGRAM blocks to your source files and regenerate the catalog.</div>`;
    return;
  }
  container.innerHTML = catalog.map(renderSection).join("");

  container.querySelectorAll(".section-header").forEach((header) => {
    header.addEventListener("click", () => {
      header.parentElement.classList.toggle("open");
    });
  });

  container.querySelectorAll(".chapter-header").forEach((header) => {
    header.addEventListener("click", (e) => {
      e.stopPropagation();
      header.parentElement.classList.toggle("open");
    });
  });

  container.querySelectorAll(".program-header").forEach((header) => {
    header.addEventListener("click", (e) => {
      e.stopPropagation();
      header.parentElement.classList.toggle("open");
    });
  });

  container.querySelectorAll(".save-note").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const program = button.closest(".program");
      const note = program.querySelector(".note-input").value;
      const notes = getSavedNotes();
      notes[decodeURIComponent(program.dataset.programKey)] = note;
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
      program.querySelector(".note-status").textContent = "Saved";
    });
  });
}

function applyFilter(query) {
  const q = query.trim().toLowerCase();
  if (!q) return render(CATALOG);
  const filtered = CATALOG
    .map((section) => {
      const chapters = section.chapters
        .map((chapter) => {
          const chapterMatches = chapter.chapter.toLowerCase().includes(q);
          const programs = chapterMatches
            ? chapter.programs
            : chapter.programs.filter((p) => p.name.toLowerCase().includes(q));
          return { ...chapter, programs };
        })
        .filter((chapter) => chapter.programs.length > 0);
      return { ...section, chapters };
    })
    .filter((section) => section.chapters.length > 0);
  render(filtered);
}

document.getElementById("search").addEventListener("input", (e) => {
  applyFilter(e.target.value);
});

render(CATALOG);
