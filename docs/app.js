function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function sanitizeAnswerHtml(html) {
  const template = document.createElement("template");
  template.innerHTML = html;
  template.content.querySelectorAll("*").forEach((element) => {
    if (!["B", "STRONG", "U", "SPAN", "BR", "DIV"].includes(element.tagName)) {
      element.replaceWith(...element.childNodes);
      return;
    }
    [...element.attributes].forEach((attribute) => {
      if (attribute.name !== "style") {
        element.removeAttribute(attribute.name);
        return;
      }
      const styles = attribute.value.split(";").map((style) => style.trim()).filter((style) =>
        /^(color:\s*(#[0-9a-f]{3,8}|rgb\([^)]*\)|[a-z]+)|font-weight:\s*(bold|700)|text-decoration(?:-line)?:\s*underline)\s*$/i.test(style)
      );
      if (styles.length) element.setAttribute("style", styles.join("; "));
      else element.removeAttribute(attribute.name);
    });
  });
  return template.innerHTML;
}

const QUESTIONS_STORAGE_KEY = "program-library-questions";
const PROGRAM_EDITS_STORAGE_KEY = "program-library-program-edits";
const PROGRAM_READS_STORAGE_KEY = "program-library-program-reads";
const PROGRAM_LEVELS_STORAGE_KEY = "program-library-program-levels";
const DELETED_ITEMS_STORAGE_KEY = "program-library-deleted-items";
let repositoryReads = null;
let repositoryProgramEdits = null;

function getProgramKey(program) {
  return `${program.name}|${program.code}`;
}

function getSavedProgramEdits() {
  if (repositoryProgramEdits) return repositoryProgramEdits;
  try {
    return JSON.parse(localStorage.getItem(PROGRAM_EDITS_STORAGE_KEY) || "{}");
  } catch (error) {
    return {};
  }
}

async function loadRepositoryProgramEdits() {
  try {
    const response = await fetch(`program-edits.json?ts=${Date.now()}`);
    if (!response.ok) throw new Error("Program edits file unavailable");
    repositoryProgramEdits = await response.json();
    repositoryProgramEdits = { ...getLocalProgramEdits(), ...repositoryProgramEdits };
  } catch (error) {
    repositoryProgramEdits = getLocalProgramEdits();
  }
  render(CATALOG);
}

function getLocalProgramEdits() {
  try {
    return JSON.parse(localStorage.getItem(PROGRAM_EDITS_STORAGE_KEY) || "{}");
  } catch (error) {
    return {};
  }
}

function getSavedProgramReads() {
  if (repositoryReads) return repositoryReads;
  try {
    return JSON.parse(localStorage.getItem(PROGRAM_READS_STORAGE_KEY) || "{}");
  } catch (error) {
    return {};
  }
}

async function loadRepositoryReads() {
  try {
    const response = await fetch(`progress.json?ts=${Date.now()}`);
    if (!response.ok) throw new Error("Progress file unavailable");
    repositoryReads = await response.json();
  } catch (error) {
    repositoryReads = getSavedProgramReads();
  }
  render(CATALOG);
}

function getSavedProgramLevels() {
  try {
    return JSON.parse(localStorage.getItem(PROGRAM_LEVELS_STORAGE_KEY) || "{}");
  } catch (error) {
    return {};
  }
}

function getDeletedItems() {
  try {
    return JSON.parse(localStorage.getItem(DELETED_ITEMS_STORAGE_KEY) || "{}");
  } catch (error) {
    return {};
  }
}

function incrementProgramRead(programElement) {
  const key = decodeURIComponent(programElement.dataset.programKey);
  const reads = getSavedProgramReads();
  reads[key] = (reads[key] || 0) + 1;
  localStorage.setItem(PROGRAM_READS_STORAGE_KEY, JSON.stringify(reads));
  fetch("api/progress", {
    body: JSON.stringify(reads),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  }).catch(() => {});
  programElement.querySelector(".read-count").textContent = `Read ${reads[key]} time${reads[key] === 1 ? "" : "s"}`;
}

function deleteItem(itemKey) {
  if (!window.confirm("Delete this item from the library?")) return;
  const deletedItems = getDeletedItems();
  deletedItems[itemKey] = true;
  localStorage.setItem(DELETED_ITEMS_STORAGE_KEY, JSON.stringify(deletedItems));
  applyFilter(document.getElementById("search").value);
}

function isDeleted(itemKey) {
  return Boolean(getDeletedItems()[itemKey]);
}

function getSavedQuestions() {
  try {
    return JSON.parse(localStorage.getItem(QUESTIONS_STORAGE_KEY) || "[]");
  } catch (error) {
    return [];
  }
}

function getQuestionsForChapter(sectionName, chapterName) {
  return getSavedQuestions().filter((question) =>
    question.section === sectionName && question.chapter === chapterName
  );
}

function renderQuestion(question) {
  const questionKey = encodeURIComponent(JSON.stringify(question));
  const itemKey = `${question.section}|${question.chapter}|${question.question}`;
  const answerHtml = sanitizeAnswerHtml(question.answer);
  return `
    <div class="question program" data-question-key="${questionKey}" data-item-key="${escapeHtml(itemKey)}">
      <div class="program-header">
        <span class="question-badge">Q&A</span>
        <span class="program-name">${escapeHtml(question.question)}</span>
      </div>
      <div class="program-body">
        <div class="answer-label">Answer</div>
        <div class="answer">${answerHtml}</div>
        <div class="item-actions">
          <button type="button" class="edit-question">Edit answer</button>
          <button type="button" class="delete-item">Delete</button>
        </div>
      </div>
    </div>`;
}

function saveQuestionAnswer(questionElement) {
  const question = JSON.parse(decodeURIComponent(questionElement.dataset.questionKey));
  const answerInput = questionElement.querySelector(".question-answer-input");
  const questions = getSavedQuestions();
  const index = questions.findIndex((item) =>
    item.section === question.section && item.chapter === question.chapter && item.question === question.question
  );
  if (index === -1) return;
  questions[index].answer = sanitizeAnswerHtml(answerInput.innerHTML.trim());
  localStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify(questions));
  applyFilter(document.getElementById("search").value);
}

function renderProgram(program) {
  const savedEdit = getSavedProgramEdits()[getProgramKey(program)] || {};
  const editedProgram = { ...program, ...savedEdit };
  const hasIo = editedProgram.input || editedProgram.output;
  const programKey = encodeURIComponent(getProgramKey(program));
  const readCount = getSavedProgramReads()[getProgramKey(program)] || 0;
  const level = getSavedProgramLevels()[getProgramKey(program)] || "Not set";
  const answerHtml = savedEdit.code === undefined ? escapeHtml(program.code) : sanitizeAnswerHtml(savedEdit.code);
  return `
    <div class="program" data-program-key="${programKey}" data-program-name="${escapeHtml(editedProgram.name)}">
      <div class="program-header">
        <span class="program-name">${escapeHtml(editedProgram.name)}</span>
        <span class="read-count">Read ${readCount} time${readCount === 1 ? "" : "s"}</span>
        <span class="program-level level-${level.toLowerCase().replace(" ", "-")}">${escapeHtml(level)}</span>
      </div>
      <div class="program-body">
        <pre class="answer-code"><code>${answerHtml}</code></pre>
        ${hasIo ? `
        <div class="io-grid">
          <div>
            <div class="io-label">Input</div>
            <pre>${escapeHtml(editedProgram.input || "(none)")}</pre>
          </div>
          <div>
            <div class="io-label">Output</div>
            <pre>${escapeHtml(editedProgram.output || "(none)")}</pre>
          </div>
        </div>` : ""}
        <div class="item-actions">
          <button type="button" class="read-program">+1 Read</button>
          <label class="level-control">
            <select class="program-level-select" aria-label="Program level">
              <option value="Not set" ${level === "Not set" ? "selected" : ""}>Not set</option>
              <option value="Low" ${level === "Low" ? "selected" : ""}>Low</option>
              <option value="Medium" ${level === "Medium" ? "selected" : ""}>Medium</option>
              <option value="High" ${level === "High" ? "selected" : ""}>High</option>
            </select>
          </label>
          <button type="button" class="edit-program">Edit answer</button>
          <button type="button" class="delete-item">Delete</button>
        </div>
      </div>
    </div>`;
}

function saveProgramEdit(programElement) {
  const key = decodeURIComponent(programElement.dataset.programKey);
  const edits = getSavedProgramEdits();
  edits[key] = {
    code: sanitizeAnswerHtml(programElement.querySelector(".program-code-input").innerHTML.trim()),
  };
  localStorage.setItem(PROGRAM_EDITS_STORAGE_KEY, JSON.stringify(edits));
  repositoryProgramEdits = edits;
  fetch("api/program-edits", {
    body: JSON.stringify(edits),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  }).catch(() => {});
  applyFilter(document.getElementById("search").value);
}

function renderChapter(chapter) {
  const questions = (chapter.matchingQuestions || getQuestionsForChapter(chapter.sectionName, chapter.chapter))
    .filter((question) => !isDeleted(`${question.section}|${question.chapter}|${question.question}`));
  const programs = chapter.programs.filter((program) => !isDeleted(getProgramKey(program)));
  const itemCount = programs.length + questions.length;
  return `
    <div class="chapter">
      <div class="chapter-header">
        <div><span class="chevron">&#9656;</span>
          <span class="chapter-title">${escapeHtml(chapter.chapter)}</span>
          <span class="chapter-folder">${escapeHtml(chapter.folder)}</span>
        </div>
        <span class="chapter-count">${itemCount} item(s)</span>
      </div>
      <div class="chapter-body">
        ${programs.map(renderProgram).join("")}
        ${questions.map(renderQuestion).join("")}
      </div>
    </div>`;
}

function renderSection(section) {
  const totalItems = section.chapters.reduce((sum, c) =>
    sum + c.programs.filter((program) => !isDeleted(getProgramKey(program))).length +
      getQuestionsForChapter(section.section, c.chapter)
        .filter((question) => !isDeleted(`${question.section}|${question.chapter}|${question.question}`)).length, 0);
  return `
    <div class="section">
      <div class="section-header">
        <div><span class="chevron">&#9656;</span>
          <span class="section-title">${escapeHtml(section.section)}</span>
        </div>
        <span class="section-count">${section.chapters.length} chapter(s), ${totalItems} item(s)</span>
      </div>
      <div class="section-body">
        ${section.chapters.map((chapter) => renderChapter({ ...chapter, sectionName: section.section })).join("")}
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
      const program = header.parentElement;
      program.classList.toggle("open");
    });
  });

  container.querySelectorAll(".read-program").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      incrementProgramRead(button.closest(".program"));
    });
  });

  container.querySelectorAll(".program-level-select").forEach((select) => {
    select.addEventListener("change", (e) => {
      e.stopPropagation();
      const program = select.closest(".program");
      const key = decodeURIComponent(program.dataset.programKey);
      const levels = getSavedProgramLevels();
      levels[key] = select.value;
      localStorage.setItem(PROGRAM_LEVELS_STORAGE_KEY, JSON.stringify(levels));
      const levelBadge = program.querySelector(".program-level");
      levelBadge.className = `program-level level-${select.value.toLowerCase().replace(" ", "-")}`;
      levelBadge.textContent = select.value;
    });
  });

  container.querySelectorAll(".delete-item").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteItem(button.closest(".program").dataset.itemKey || decodeURIComponent(button.closest(".program").dataset.programKey));
    });
  });

  container.querySelectorAll(".edit-question").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const question = button.closest(".question");
      const answer = question.querySelector(".answer");
      answer.innerHTML = `<div class="format-toolbar" role="toolbar" aria-label="Answer formatting"><button type="button" data-command="bold"><strong>B</strong></button><button type="button" data-command="underline"><u>U</u></button><select class="answer-color" aria-label="Text color"><option value="">Color</option><option value="#ff9b9b">Red</option><option value="#f4cf78">Yellow</option><option value="#8be0d1">Teal</option><option value="#6ea8fe">Blue</option></select></div><div class="question-answer-input" contenteditable="true" role="textbox" aria-label="Answer">${sanitizeAnswerHtml(answer.innerHTML)}</div><div class="question-actions"><button type="button" class="save-question">Save answer</button><button type="button" class="cancel-question">Cancel</button></div>`;
      button.hidden = true;
      const editor = question.querySelector(".question-answer-input");
      editor.focus();
      document.execCommand("styleWithCSS", false, true);
      question.querySelectorAll("[data-command]").forEach((control) => {
        control.addEventListener("mousedown", (event) => event.preventDefault());
        control.addEventListener("click", () => document.execCommand(control.dataset.command, false));
      });
      question.querySelector(".answer-color").addEventListener("change", (event) => {
        if (event.target.value) document.execCommand("foreColor", false, event.target.value);
        event.target.value = "";
        editor.focus();
      });
      question.querySelector(".save-question").addEventListener("click", (event) => {
        event.stopPropagation();
        saveQuestionAnswer(question);
      });
      question.querySelector(".cancel-question").addEventListener("click", (event) => {
        event.stopPropagation();
        applyFilter(document.getElementById("search").value);
      });
    });
  });

  container.querySelectorAll(".save-question").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      saveQuestionAnswer(button.closest(".question"));
    });
  });

  container.querySelectorAll(".cancel-question").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      applyFilter(document.getElementById("search").value);
    });
  });

  container.querySelectorAll(".edit-program").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const program = button.closest(".program");
      const code = program.querySelector("code").textContent;
      const body = program.querySelector(".program-body");
      button.hidden = true;
      body.querySelector("pre").outerHTML = `<div class="format-toolbar" role="toolbar" aria-label="Answer formatting"><button type="button" data-command="bold"><strong>B</strong></button><button type="button" data-command="underline"><u>U</u></button><select class="answer-color" aria-label="Text color"><option value="">Color</option><option value="#ff9b9b">Red</option><option value="#f4cf78">Yellow</option><option value="#8be0d1">Teal</option><option value="#6ea8fe">Blue</option></select></div><pre class="program-code-input" contenteditable="true" role="textbox" aria-label="Answer">${escapeHtml(code)}</pre>`;
      const editor = program.querySelector(".program-code-input");
      editor.focus();
      document.execCommand("styleWithCSS", false, true);
      program.querySelectorAll("[data-command]").forEach((control) => {
        control.addEventListener("mousedown", (event) => event.preventDefault());
        control.addEventListener("click", () => document.execCommand(control.dataset.command, false));
      });
      program.querySelector(".answer-color").addEventListener("change", (event) => {
        if (event.target.value) document.execCommand("foreColor", false, event.target.value);
        event.target.value = "";
        editor.focus();
      });
      button.insertAdjacentHTML("afterend", `<div class="program-actions"><button type="button" class="save-program">Save answer</button><button type="button" class="cancel-program">Cancel</button></div>`);
      program.querySelector(".save-program").addEventListener("click", (event) => {
        event.stopPropagation();
        saveProgramEdit(program);
      });
      program.querySelector(".cancel-program").addEventListener("click", (event) => {
        event.stopPropagation();
        applyFilter(document.getElementById("search").value);
      });
    });
  });

  container.querySelectorAll(".save-program").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      saveProgramEdit(button.closest(".program"));
    });
  });

  container.querySelectorAll(".cancel-program").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      applyFilter(document.getElementById("search").value);
    });
  });
}

function populateQuestionSections() {
  const sectionSelect = document.getElementById("question-section");
  sectionSelect.innerHTML = CATALOG.map((section) =>
    `<option value="${escapeHtml(section.section)}">${escapeHtml(section.section)}</option>`
  ).join("");
  updateQuestionChapters();
}

function updateQuestionChapters() {
  const section = CATALOG.find((item) => item.section === document.getElementById("question-section").value);
  const chapterSelect = document.getElementById("question-chapter");
  chapterSelect.innerHTML = (section ? section.chapters : []).map((chapter) =>
    `<option value="${escapeHtml(chapter.chapter)}">${escapeHtml(chapter.chapter)}</option>`
  ).join("");
}

function closeQuestionDialog() {
  document.getElementById("question-dialog").hidden = true;
  document.getElementById("question-form").reset();
}

function addQuestion(event) {
  event.preventDefault();
  const questions = getSavedQuestions();
  questions.push({
    section: document.getElementById("question-section").value,
    chapter: document.getElementById("question-chapter").value,
    question: document.getElementById("question-title").value.trim(),
    answer: document.getElementById("question-answer").value.trim(),
  });
  localStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify(questions));
  closeQuestionDialog();
  applyFilter(document.getElementById("search").value);
}

function applyFilter(query) {
  const q = query.trim().toLowerCase();
  if (!q) return render(CATALOG);
  const filtered = CATALOG
    .map((section) => {
      const chapters = section.chapters
        .map((chapter) => {
          const chapterMatches = chapter.chapter.toLowerCase().includes(q);
          const availablePrograms = chapter.programs.filter((program) => !isDeleted(getProgramKey(program)));
          const programs = chapterMatches
            ? availablePrograms
            : availablePrograms.filter((p) => p.name.toLowerCase().includes(q));
          const questions = getQuestionsForChapter(section.section, chapter.chapter)
            .filter((question) => !isDeleted(`${question.section}|${question.chapter}|${question.question}`));
          const matchingQuestions = chapterMatches
            ? questions
            : questions.filter((item) => `${item.question} ${item.answer}`.toLowerCase().includes(q));
          return { ...chapter, programs, matchingQuestions };
        })
        .filter((chapter) => chapter.programs.length > 0 || chapter.matchingQuestions.length > 0);
      return { ...section, chapters };
    })
    .filter((section) => section.chapters.length > 0);
  render(filtered);
}

document.getElementById("search").addEventListener("input", (e) => {
  applyFilter(e.target.value);
});

document.getElementById("add-question").addEventListener("click", () => {
  populateQuestionSections();
  document.getElementById("question-dialog").hidden = false;
  document.getElementById("question-title").focus();
});
document.getElementById("toggle-header").addEventListener("click", () => {
  const header = document.querySelector("header");
  const minimized = header.classList.toggle("minimized");
  const toggle = document.getElementById("toggle-header");
  toggle.innerHTML = minimized ? "+" : "&minus;";
  toggle.setAttribute("aria-label", minimized ? "Restore toolbar" : "Minimize toolbar");
  toggle.title = minimized ? "Restore toolbar" : "Minimize toolbar";
});
document.getElementById("question-section").addEventListener("change", updateQuestionChapters);
document.getElementById("question-form").addEventListener("submit", addQuestion);
document.getElementById("close-dialog").addEventListener("click", closeQuestionDialog);
document.getElementById("cancel-dialog").addEventListener("click", closeQuestionDialog);
document.getElementById("question-dialog").addEventListener("click", (event) => {
  if (event.target.id === "question-dialog") closeQuestionDialog();
});

Promise.all([loadRepositoryReads(), loadRepositoryProgramEdits()]);
