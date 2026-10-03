const notesList =       document.querySelector("#notesList");
const newNoteBtn =      document.querySelector("#newNoteBtn");
const noteForm =        document.querySelector("#noteForm");
const noteTitle =       document.querySelector("#noteTitle");
const noteContent =     document.querySelector("#noteContent");
const deleteNoteBtn =   document.querySelector("#deleteNoteBtn");
const noteUpdatedAt =   document.querySelector("#noteUpdatedAt");
const editorEmptyState =document.querySelector("#editorEmptyState");


let notes = [];
let selectedNoteId = null;

function createNote(){
    
    const now = Date.now();

    const newNote = {
        id: now,
        title: "Untitled note",
        content: "",
        createdAt: now,
        updatedAt: now
    };
    
    notes.push(newNote);
    selectedNoteId = newNote.id;
    
    renderNotes();
    renderEditor();

    noteTitle.focus();
}

newNoteBtn.addEventListener("click", function(){
    createNote();
})

function renderNotes() {
    notesList.innerHTML = "";

    if(notes.length === 0){
        const message = document.createElement("p");
        message.textContent = "no notes yet";
        notesList.appendChild(message);
        return;
    }
    notes.forEach(function(note){
        const card = document.createElement("article");
        card.classList.add("note-card");
        
        if(note.id === selectedNoteId){
            card.classList.add("active");
        }
        const title = document.createElement("h3");
        title.textContent = note.title || "Untitled note";

        const preview = document.createElement("p");
        preview.textContent = note.content || "Empty note";

        card.appendChild(title);
        card.appendChild(preview);

        notesList.appendChild(card);

        card.addEventListener("click", function(){
            selectedNote(note.id);1
        });
    });
}