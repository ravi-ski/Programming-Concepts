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
const SORT_MODE_STORAGE_KEY = "program-library-sort-mode";
let repositoryReads = null;
let repositoryProgramEdits = null;
let databaseState = null;

function getProgramKey(program) {
  return `${program.name}|${program.code}`;
}

function getReadKey(program) {
  return program.id || getProgramKey(program);
}

function priorityValue(program) {
  const level = getSavedProgramLevels()[databaseState ? program.id : getProgramKey(program)] || "Not set";
  return { High: 3, Medium: 2, Low: 1, "Not set": 0 }[level] || 0;
}

function readCount(program) {
  return getSavedProgramReads()[getReadKey(program)] || 0;
}

function getChapterSortKey(sectionName, chapterName) {
  return `${SORT_MODE_STORAGE_KEY}|${sectionName}|${chapterName}`;
}

function sortPrograms(programs, sectionName, chapterName) {
  const mode = localStorage.getItem(getChapterSortKey(sectionName, chapterName)) || "priority";
  return [...programs].sort((left, right) => mode === "reads"
    ? readCount(right) - readCount(left) || priorityValue(right) - priorityValue(left)
    : priorityValue(right) - priorityValue(left) || readCount(right) - readCount(left));
}

function getSavedProgramEdits() {
  if (databaseState) return databaseState.programEdits;
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
    const repositoryEdits = await response.json();
    const localEdits = getLocalProgramEdits();
    repositoryProgramEdits = { ...localEdits, ...repositoryEdits };
    if (JSON.stringify(repositoryEdits) !== JSON.stringify(repositoryProgramEdits)) {
      saveRepositoryProgramEdits(repositoryProgramEdits);
    }
  } catch (error) {
    repositoryProgramEdits = getLocalProgramEdits();
  }
  render(CATALOG);
}

async function loadDatabaseState() {
  try {
    const response = await fetch("api/state?ts=" + Date.now());
    if (!response.ok) throw new Error("Database API unavailable");
    databaseState = await response.json();
    render(CATALOG);
  } catch (error) {
    Promise.all([loadRepositoryReads(), loadRepositoryProgramEdits()]);
  }
}

function saveRepositoryProgramEdits(edits) {
  fetch("api/program-edits", {
    body: JSON.stringify(edits),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  }).catch(() => {});
}

function getLocalProgramEdits() {
  try {
    return JSON.parse(localStorage.getItem(PROGRAM_EDITS_STORAGE_KEY) || "{}");
  } catch (error) {
    return {};
  }
}

function getSavedProgramReads() {
  if (databaseState) return databaseState.reads;
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
    const originalReads = await response.json();
    const migratedReads = {};
    CATALOG.forEach((section) => section.chapters.forEach((chapter) => chapter.programs.forEach((program) => {
      const oldKey = getProgramKey(program);
      const readKey = getReadKey(program);
      if (originalReads[readKey] !== undefined) migratedReads[readKey] = originalReads[readKey];
      else if (originalReads[oldKey] !== undefined) migratedReads[readKey] = originalReads[oldKey];
    })));
    repositoryReads = migratedReads;
    if (JSON.stringify(originalReads) !== JSON.stringify(migratedReads)) {
      fetch("api/progress", {
        body: JSON.stringify(migratedReads),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      }).catch(() => {});
    }
  } catch (error) {
    repositoryReads = getSavedProgramReads();
  }
  render(CATALOG);
}

function getSavedProgramLevels() {
  if (databaseState) return databaseState.levels;
  try {
    return JSON.parse(localStorage.getItem(PROGRAM_LEVELS_STORAGE_KEY) || "{}");
  } catch (error) {
    return {};
  }
}

function getDeletedItems() {
  if (databaseState) return databaseState.deleted;
  try {
    return JSON.parse(localStorage.getItem(DELETED_ITEMS_STORAGE_KEY) || "{}");
  } catch (error) {
    return {};
  }
}

function incrementProgramRead(programElement) {
  const key = programElement.dataset.readKey || decodeURIComponent(programElement.dataset.programKey);
  const reads = getSavedProgramReads();
  reads[key] = (reads[key] || 0) + 1;
  if (databaseState) databaseState.reads = reads;
  if (databaseState) {
    fetch("api/reads/" + encodeURIComponent(key), { method: "POST" }).catch(() => {});
  }
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
  if (databaseState) databaseState.deleted = deletedItems;
  if (databaseState) {
    fetch("api/items/" + encodeURIComponent(itemKey), { method: "DELETE" }).catch(() => {});
  }
  localStorage.setItem(DELETED_ITEMS_STORAGE_KEY, JSON.stringify(deletedItems));
  applyFilter(document.getElementById("search").value);
}

function isDeleted(itemKey) {
  return Boolean(getDeletedItems()[itemKey]);
}

function getSavedQuestions() {
  if (databaseState) return databaseState.questions;
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

function catalogWithDatabaseQuestions() {
  if (!databaseState) return CATALOG;
  const catalog = CATALOG.map((section) => ({
    ...section,
    chapters: section.chapters.map((chapter) => ({ ...chapter, programs: [...chapter.programs] })),
  }));
  databaseState.questions.forEach((question) => {
    let section = catalog.find((item) => item.section === question.section);
    if (!section) {
      section = { section: question.section, chapters: [] };
      catalog.push(section);
    }
    let chapter = section.chapters.find((item) => item.chapter === question.chapter);
    if (!chapter) {
      chapter = { chapter: question.chapter, folder: "Custom", programs: [] };
      section.chapters.push(chapter);
    }
  });
  return catalog;
}

function renderQuestion(question) {
  const questionKey = encodeURIComponent(JSON.stringify(question));
  const itemKey = `${question.section}|${question.chapter}|${question.question}`;
  const answerHtml = sanitizeAnswerHtml(question.answer);
  return `
    <div class="question program" data-question-key="${questionKey}" data-question-id="${escapeHtml(question.id || "")}" data-item-key="${escapeHtml(itemKey)}">
      <div class="program-header">
        <span class="question-badge">Q&A</span>
        <span class="program-name">${escapeHtml(question.question)}</span>
        <button type="button" class="edit-question-title">Edit question</button>
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

async function saveQuestionTitle(questionElement, oldQuestion) {
  const input = questionElement.querySelector(".question-title-input");
  const newQuestion = input.value.trim();
  if (!newQuestion) return;
  const question = JSON.parse(decodeURIComponent(questionElement.dataset.questionKey));
  const questions = getSavedQuestions();
  const index = questions.findIndex((item) => item.id === question.id || item.question === oldQuestion);
  if (index === -1) return;
  if (databaseState && question.id) {
    const response = await fetch("api/questions/" + encodeURIComponent(question.id), {
      body: JSON.stringify({ answer: questions[index].answer, question: newQuestion }),
      headers: { "Content-Type": "application/json" },
      method: "PUT",
    });
    if (!response.ok) throw new Error("Unable to save the question");
  }
  questions[index].question = newQuestion;
  localStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify(questions));
  applyFilter(document.getElementById("search").value);
}

async function saveQuestionAnswer(questionElement) {
  const question = JSON.parse(decodeURIComponent(questionElement.dataset.questionKey));
  const answerInput = questionElement.querySelector(".question-answer-input");
  const questions = getSavedQuestions();
  const index = questions.findIndex((item) =>
    item.section === question.section && item.chapter === question.chapter && item.question === question.question
  );
  if (index === -1) return;
  questions[index].answer = sanitizeAnswerHtml(answerInput.innerHTML.trim());
  if (databaseState && question.id) {
    const response = await fetch("api/questions/" + encodeURIComponent(question.id), {
      body: JSON.stringify({ answer: questions[index].answer }),
      headers: { "Content-Type": "application/json" },
      method: "PUT",
    });
    if (!response.ok) throw new Error("Unable to save the answer");
  }
  localStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify(questions));
  applyFilter(document.getElementById("search").value);
}

function renderProgram(program) {
  const editKey = databaseState ? program.id : getProgramKey(program);
  const savedEdit = getSavedProgramEdits()[editKey] || {};
  const editedProgram = { ...program, ...savedEdit };
  const hasIo = editedProgram.input || editedProgram.output;
  const programKey = encodeURIComponent(getProgramKey(program));
  const readKey = getReadKey(program);
  const readCount = getSavedProgramReads()[readKey] || 0;
  const levelKey = databaseState ? program.id : getProgramKey(program);
  const level = getSavedProgramLevels()[levelKey] || "Not set";
  const answerHtml = savedEdit.code === undefined ? escapeHtml(program.code) : sanitizeAnswerHtml(savedEdit.code);
  return `
    <div class="program" data-program-key="${programKey}" data-program-id="${escapeHtml(program.id || "")}" data-read-key="${escapeHtml(readKey)}" data-program-name="${escapeHtml(editedProgram.name)}">
      <div class="program-header">
        <span class="program-name">${escapeHtml(editedProgram.name)}</span>
        <span class="read-count">Read ${readCount} time${readCount === 1 ? "" : "s"}</span>
        <span class="program-level level-${level.toLowerCase().replace(" ", "-")}">${escapeHtml(level)}</span>
        <button type="button" class="edit-program-title">Edit question</button>
        <button type="button" class="edit-program header-edit">Edit answer</button>
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
          <button type="button" class="delete-item">Delete</button>
        </div>
      </div>
    </div>`;
}

async function saveProgramEdit(programElement) {
  const key = databaseState ? programElement.dataset.programId : decodeURIComponent(programElement.dataset.programKey);
  const edits = getSavedProgramEdits();
  edits[key] = {
    code: sanitizeAnswerHtml(programElement.querySelector(".program-code-input").innerHTML.trim()),
  };
  localStorage.setItem(PROGRAM_EDITS_STORAGE_KEY, JSON.stringify(edits));
  if (databaseState && programElement.dataset.programId) {
    const response = await fetch("api/programs/" + encodeURIComponent(programElement.dataset.programId), {
      body: JSON.stringify(edits[key]),
      headers: { "Content-Type": "application/json" },
      method: "PUT",
    });
    if (!response.ok) throw new Error("Unable to save the answer");
  }
  repositoryProgramEdits = edits;
  if (databaseState) databaseState.programEdits = edits;
  saveRepositoryProgramEdits(edits);
  applyFilter(document.getElementById("search").value);
}

async function saveProgramTitle(programElement, oldTitle) {
  const input = programElement.querySelector(".program-title-input");
  const newTitle = input.value.trim();
  if (!newTitle) return;
  const programId = programElement.dataset.programId;
  const original = CATALOG.flatMap((section) => section.chapters.flatMap((chapter) => chapter.programs)).find((program) => program.id === programId);
  if (!original) return;
  const edits = getSavedProgramEdits();
  const key = databaseState ? programId : decodeURIComponent(programElement.dataset.programKey);
  const existing = edits[key] || {};
  if (databaseState && programId) {
    const response = await fetch("api/programs/" + encodeURIComponent(programId), {
      body: JSON.stringify({ code: existing.code || original.code, name: newTitle }),
      headers: { "Content-Type": "application/json" },
      method: "PUT",
    });
    if (!response.ok) throw new Error("Unable to save the question");
  }
  edits[key] = { ...existing, name: newTitle };
  localStorage.setItem(PROGRAM_EDITS_STORAGE_KEY, JSON.stringify(edits));
  if (databaseState) databaseState.programEdits = edits;
  applyFilter(document.getElementById("search").value);
}

function renderChapter(chapter) {
  const questions = (chapter.matchingQuestions || getQuestionsForChapter(chapter.sectionName, chapter.chapter))
    .filter((question) => !isDeleted(`${question.section}|${question.chapter}|${question.question}`));
  const sectionName = chapter.sectionName || "";
  const sortKey = getChapterSortKey(sectionName, chapter.chapter);
  const sortMode = localStorage.getItem(sortKey) || "priority";
  const programs = sortPrograms(chapter.programs.filter((program) => !isDeleted(getProgramKey(program))), sectionName, chapter.chapter);
  const itemCount = programs.length + questions.length;
  return `
    <div class="chapter">
      <div class="chapter-header">
        <div><span class="chevron">&#9656;</span>
          <span class="chapter-title">${escapeHtml(chapter.chapter)}</span>
          <span class="chapter-folder">${escapeHtml(chapter.folder)}</span>
        </div>
          <span class="chapter-count">${itemCount} item(s)</span>
          <select class="chapter-sort" data-sort-key="${escapeHtml(sortKey)}" aria-label="Sort this chapter" title="Sort this chapter">
            <option value="priority" ${sortMode === "priority" ? "selected" : ""}>Complexity</option>
            <option value="reads" ${sortMode === "reads" ? "selected" : ""}>Reads</option>
          </select>
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
    <div class="section" data-section-key="${escapeHtml(section.section)}">
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
  const openSections = new Set([...container.querySelectorAll(".section.open")].map((section) => section.dataset.sectionKey));
  const openChapters = new Set([...container.querySelectorAll(".chapter.open .chapter-sort")].map((select) => select.dataset.sortKey));
  container.innerHTML = catalogWithDatabaseQuestions().filter((section) =>
    catalog.some((item) => item.section === section.section)
  ).map(renderSection).join("");

  container.querySelectorAll(".section").forEach((section) => {
    if (openSections.has(section.dataset.sectionKey)) section.classList.add("open");
  });
  container.querySelectorAll(".chapter").forEach((chapter) => {
    if (openChapters.has(chapter.querySelector(".chapter-sort")?.dataset.sortKey)) chapter.classList.add("open");
  });

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

  container.querySelectorAll(".chapter-sort").forEach((select) => {
    select.addEventListener("click", (event) => event.stopPropagation());
    select.addEventListener("change", (event) => {
      event.stopPropagation();
      localStorage.setItem(select.dataset.sortKey, select.value);
      applyFilter(document.getElementById("search").value);
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
      const key = databaseState ? program.dataset.programId : decodeURIComponent(program.dataset.programKey);
      const levels = getSavedProgramLevels();
      levels[key] = select.value;
      if (databaseState) databaseState.levels = levels;
      localStorage.setItem(PROGRAM_LEVELS_STORAGE_KEY, JSON.stringify(levels));
      if (databaseState) {
        fetch("api/levels/" + encodeURIComponent(program.dataset.programId), {
          body: JSON.stringify({ level: select.value }),
          headers: { "Content-Type": "application/json" },
          method: "POST",
        }).catch(() => {});
      }
      const levelBadge = program.querySelector(".program-level");
      levelBadge.className = `program-level level-${select.value.toLowerCase().replace(" ", "-")}`;
      levelBadge.textContent = select.value;
    });
  });

  container.querySelectorAll(".delete-item").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const program = button.closest(".program");
      deleteItem(program.dataset.itemKey || (databaseState ? program.dataset.programId : decodeURIComponent(program.dataset.programKey)));
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
        saveQuestionAnswer(question).catch((error) => window.alert(error.message));
      });
      question.querySelector(".cancel-question").addEventListener("click", (event) => {
        event.stopPropagation();
        applyFilter(document.getElementById("search").value);
      });
    });
  });

  container.querySelectorAll(".edit-question-title").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const question = button.closest(".question");
      const title = question.querySelector(".program-name");
      const oldQuestion = title.textContent;
      title.outerHTML = `<input class="question-title-input" type="text" value="${escapeHtml(oldQuestion)}" aria-label="Question" />`;
      button.hidden = true;
      const input = question.querySelector(".question-title-input");
      input.focus();
      input.select();
      input.addEventListener("click", (clickEvent) => clickEvent.stopPropagation());
      input.addEventListener("keydown", (keyEvent) => {
        if (keyEvent.key === "Enter") {
          saveQuestionTitle(question, oldQuestion).catch((error) => window.alert(error.message));
        }
        if (keyEvent.key === "Escape") applyFilter(document.getElementById("search").value);
      });
      input.insertAdjacentHTML("afterend", `<div class="question-title-actions"><button type="button" class="save-question-title">Save</button><button type="button" class="cancel-question-title">Cancel</button></div>`);
      question.querySelector(".save-question-title").addEventListener("click", (saveEvent) => {
        saveEvent.stopPropagation();
        saveQuestionTitle(question, oldQuestion).catch((error) => window.alert(error.message));
      });
      question.querySelector(".cancel-question-title").addEventListener("click", (cancelEvent) => {
        cancelEvent.stopPropagation();
        applyFilter(document.getElementById("search").value);
      });
    });
  });

  container.querySelectorAll(".save-question").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      saveQuestionAnswer(button.closest(".question")).catch((error) => window.alert(error.message));
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
        saveProgramEdit(program).catch((error) => window.alert(error.message));
      });
      program.querySelector(".cancel-program").addEventListener("click", (event) => {
        event.stopPropagation();
        applyFilter(document.getElementById("search").value);
      });
    });
  });

  container.querySelectorAll(".edit-program-title").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const program = button.closest(".program");
      const title = program.querySelector(".program-name");
      const oldTitle = title.textContent;
      title.outerHTML = `<input class="program-title-input" type="text" value="${escapeHtml(oldTitle)}" aria-label="Question" />`;
      button.hidden = true;
      const input = program.querySelector(".program-title-input");
      input.focus();
      input.select();
      input.addEventListener("click", (clickEvent) => clickEvent.stopPropagation());
      input.insertAdjacentHTML("afterend", `<div class="program-title-actions"><button type="button" class="save-program-title">Save</button><button type="button" class="cancel-program-title">Cancel</button></div>`);
      program.querySelector(".save-program-title").addEventListener("click", (saveEvent) => {
        saveEvent.stopPropagation();
        saveProgramTitle(program, oldTitle).catch((error) => window.alert(error.message));
      });
      program.querySelector(".cancel-program-title").addEventListener("click", (cancelEvent) => {
        cancelEvent.stopPropagation();
        applyFilter(document.getElementById("search").value);
      });
    });
  });

  container.querySelectorAll(".save-program").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      saveProgramEdit(button.closest(".program")).catch((error) => window.alert(error.message));
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
  sectionSelect.innerHTML = catalogWithDatabaseQuestions().map((section) =>
    `<option value="${escapeHtml(section.section)}">${escapeHtml(section.section)}</option>`
  ).join("") + `<option value="__new__">New section...</option>`;
  updateQuestionChapters();
}

function updateQuestionChapters() {
  const sectionSelect = document.getElementById("question-section");
  const newSection = document.getElementById("new-section");
  const isNewSection = sectionSelect.value === "__new__";
  newSection.hidden = !isNewSection;
  newSection.required = isNewSection;
  const section = catalogWithDatabaseQuestions().find((item) => item.section === sectionSelect.value);
  const chapterSelect = document.getElementById("question-chapter");
  chapterSelect.hidden = isNewSection;
  chapterSelect.required = !isNewSection;
  chapterSelect.innerHTML = (section ? section.chapters : []).map((chapter) =>
    `<option value="${escapeHtml(chapter.chapter)}">${escapeHtml(chapter.chapter)}</option>`
  ).join("") + (isNewSection ? "" : `<option value="__new__">New chapter...</option>`);
  document.getElementById("new-chapter").hidden = false;
  document.getElementById("new-chapter").required = isNewSection;
}

function closeQuestionDialog() {
  document.getElementById("question-dialog").hidden = true;
  document.getElementById("question-form").reset();
}

async function addQuestion(event) {
  event.preventDefault();
  const sectionSelect = document.getElementById("question-section");
  const chapterSelect = document.getElementById("question-chapter");
  const sectionName = sectionSelect.value === "__new__"
    ? document.getElementById("new-section").value.trim()
    : sectionSelect.value;
  const chapterName = sectionSelect.value === "__new__" || chapterSelect.value === "__new__"
    ? document.getElementById("new-chapter").value.trim()
    : chapterSelect.value;
  const question = {
    section: sectionName,
    chapter: chapterName,
    question: document.getElementById("question-title").value.trim(),
    answer: document.getElementById("question-answer").value.trim(),
  };
  const questions = getSavedQuestions();
  questions.push(question);
  if (databaseState) {
    fetch("api/questions", {
      body: JSON.stringify(question),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    }).then((response) => response.json()).then((savedQuestion) => {
      question.id = savedQuestion.id;
      databaseState.questions = questions;
      applyFilter(document.getElementById("search").value);
    }).catch(() => {});
  } else {
    applyFilter(document.getElementById("search").value);
  }
  localStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify(questions));
  closeQuestionDialog();
  applyFilter(document.getElementById("search").value);
}

function applyFilter(query) {
  const q = query.trim().toLowerCase();
  const sourceCatalog = catalogWithDatabaseQuestions();
  if (!q) return render(sourceCatalog);
  const filtered = sourceCatalog
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

loadDatabaseState();
