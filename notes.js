const notesList = document.querySelector("#notesList");
const newNoteBtn = document.querySelector("#newNoteBtn");
const noteForm = document.querySelector("#noteForm");
const noteTitle = document.querySelector("#noteTitle");
const noteContent = document.querySelector("#noteContent");
const deleteNoteBtn = document.querySelector("#deleteNoteBtn");
const noteUpdatedAt = document.querySelector("#noteUpdatedAt");
const editorEmptyState = document.querySelector("#editorEmptyState");

let notes = [];
let selectedNoteId = null;

function createNote() {
  const now = Date.now();

  const newNote = {
    id: now,
    title: "Untitled note",
    content: "",
    createdAt: now,
    updatedAt: now,
  };

  notes.push(newNote);
  selectedNoteId = newNote.id;

  renderNotes();
  renderEditor();

  noteTitle.focus();
}

newNoteBtn.addEventListener("click", function () {
  createNote();
});

function renderNotes() {
  notesList.innerHTML = "";

  if (notes.length === 0) {
    const message = document.createElement("p");
    message.textContent = "no notes yet";
    notesList.appendChild(message);
    return;
  }
  notes.forEach(function (note) {
    const card = document.createElement("article");
    card.classList.add("note-card");

    if (note.id === selectedNoteId) {
      card.classList.add("active");
    }
    const title = document.createElement("h3");
    title.textContent = note.title || "Untitled note";

    const preview = document.createElement("p");
    preview.textContent = note.content || "Empty note";

    card.appendChild(title);
    card.appendChild(preview);

    notesList.appendChild(card);


    // click function to select the note
    card.addEventListener("click", function () {
      selectNote(note.id);
      1;
    });
  });
}

// selecting note function

function selectNote(noteId) {
  const note = notes.find(function (note) {
    return note.id === noteId;
  });

  if (!note) {
    return;
  }

  selectedNoteId = noteId;

  renderNotes();
  renderEditor();
}

function renderEditor() {
  if (selectedNoteId === null) {
    editorEmptyState.classList.remove("hidden");
    noteForm.classList.add("hidden");
    return;
  }
  const note = notes.find(function (note) {
    return note.id === selectedNoteId;
  });
  if (!note) {
    selectedNoteId = null;
    editorEmptyState.classList.remove("hidden");
    noteForm.classList.add("hidden");
    return;
  }

  editorEmptyState.classList.add("hidden");
  noteForm.classList.remove("hidden");
  noteTitle.value = note.title;
  noteContent.value = note.content;
  const readableTime = new Date(note.updatedAt).toLocaleString();
  noteUpdatedAt.textContent = `Last updated: ${readableTime}`;
}

function saveNote() {
  const note = notes.find(function (note) {
    return note.id === selectedNoteId;
  });
  if (!note) {
    return;
  }
  const title = noteTitle.value.trim();
  const content = noteContent.value;
  if (title === "") {
    return;
  }
  note.title = title;
  note.content = content;
  note.updatedAt = Date.now();
  renderNotes();
  renderEditor();
}

noteForm.addEventListener("submit", function(event) {
 event.preventDefault();
 saveNote();
});

function deleteSelectedNote(){
  if (selectedNoteId === null){
    return;
  }
  const index = notes.findIndex(function(note){
    return note.id === selectedNoteId;
  });
  if (index === -1){
    return;
  }

  notes.splice(index, 1);
  selectedNoteId = null;

  renderNotes();
  renderEditor();

}
deleteNoteBtn.addEventListener("click", function(){
  deleteSelectedNote();
})


function getPreview(content) {
 const cleanContent = content.trim();
 if (cleanContent === "") {
 return "Empty note";
 }
 if (cleanContent.length <= 60) {
 return cleanContent;
 }
 return cleanContent.slice(0, 60) + "...";
}
const preview = document.createElement("p");
preview.textContent = getPreview(note.content);

const readableTime =
 new Date(note.updatedAt).toLocaleString();
noteUpdatedAt.textContent =
 `Last updated: ${readableTime}`;
