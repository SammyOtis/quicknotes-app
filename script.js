// 1. DOM Element Selectors
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const noteCount = document.querySelector("#note-count");
const notesList = document.querySelector("#notes-list");

// 2. Storage Key & State Management
const STORAGE_KEY = "quicknotes_app_notes";

function loadNotes() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse notes from localStorage", e);
      return [];
    }
  }
  return [];
}

let notes = loadNotes();

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// Helper function to update the note counter message
function updateNoteCount(count) {
  if (count === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (count === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${count} notes.`;
  }
}

// 3. Render Function (builds list safely using DOM methods)
function render(notesToRender = notes, isSearching = false) {
  notesList.textContent = ""; // Clear current list

  if (notesToRender.length === 0) {
    if (isSearching) {
      const emptyLi = document.createElement("li");
      emptyLi.textContent = "No notes match your search.";
      emptyLi.style.padding = "1rem";
      emptyLi.style.color = "#7f8c8d";
      emptyLi.style.fontStyle = "italic";
      notesList.appendChild(emptyLi);
    }
    updateNoteCount(notes.length);
    return;
  }

  notesToRender.forEach((note) => {
    // Create Note Card Container
    const li = document.createElement("li");
    li.className = `note-card category-${note.category.toLowerCase()}`;

    // Note Details Column
    const contentDiv = document.createElement("div");
    contentDiv.className = "note-content";

    const textP = document.createElement("p");
    textP.textContent = note.text; // Safe from XSS injection

    const metaP = document.createElement("p");
    metaP.className = "note-meta";
    metaP.textContent = `${note.category} • ${note.createdAt}`;

    contentDiv.appendChild(textP);
    contentDiv.appendChild(metaP);

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.type = "button";

    // Delete Event Handler
    deleteBtn.addEventListener("click", () => {
      notes = notes.filter((n) => n.id !== note.id);
      saveNotes();
      handleSearch(); // Re-apply search filter after delete
    });

    // Assemble Card
    li.appendChild(contentDiv);
    li.appendChild(deleteBtn);

    notesList.appendChild(li);
  });

  updateNoteCount(notes.length);
}

// 4. Search Filter Handler
function handleSearch() {
  const query = searchInput.value.toLowerCase().trim();
  const isSearching = query.length > 0;

  const filtered = notes.filter((note) =>
    note.text.toLowerCase().includes(query)
  );

  render(filtered, isSearching);
}

searchInput.addEventListener("input", handleSearch);

// 5. Form Submit Handler
noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = noteCategory.value;

  // Validation Check 1: Empty text
  if (text.length === 0) {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  // Validation Check 2: Character limit
  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  // Clear error message when valid note is added
  errorMessage.textContent = "";

  // Create Note Object
  const newNote = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(),
  };

  // Add to state, persist to localStorage, and render
  notes.push(newNote);
  saveNotes();
  
  // Reset search box if active and render
  searchInput.value = "";
  render(notes, false);

  // Reset form inputs
  noteInput.value = "";
  noteInput.focus();
});

// Initial Render on Page Load
render(notes, false);