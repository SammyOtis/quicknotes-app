// 1. DOM Element Selectors
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const noteCount = document.querySelector("#note-count");
const notesList = document.querySelector("#notes-list");

// 2. State Storage
let notes = [];

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
function render(notesToRender = notes) {
  notesList.textContent = ""; // Clear current list

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
      render();
    });

    // Assemble Card
    li.appendChild(contentDiv);
    li.appendChild(deleteBtn);

    notesList.appendChild(li);
  });

  updateNoteCount(notesToRender.length);
}

// 4. Form Submit Handler with Exact Validation Strings
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

  // Add to state and update view
  notes.push(newNote);
  render();

  // Reset form inputs
  noteInput.value = "";
  noteInput.focus();
});

// Initial Render
render();