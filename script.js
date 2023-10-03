// Get elements from the DOM
const noteInput = document.getElementById('noteInput');
const addNoteButton = document.getElementById('addNote');
const notesList = document.getElementById('notesList');
const themeToggle = document.getElementById('themeToggle');
const container = document.body;

// Function to create a new note element
function createNoteElement(text) {
    const li = document.createElement('li');
    li.className = 'note';
    li.innerHTML = `
        <p>${text}</p>
        <button class="delete">Delete</button>
        <button class="edit">Edit</button>
        <input type="text" class="edit-note" placeholder="Edit your note..." />
    `;

    notesList.appendChild(li);

    // Event listener for deleting a note
    const deleteButton = li.querySelector('.delete');
    deleteButton.addEventListener('click', () => {
        notesList.removeChild(li);
    });

    // Event listener for editing a note
    const editButton = li.querySelector('.edit');
    const editNoteInput = li.querySelector('.edit-note');

    editButton.addEventListener('click', () => {
        editNoteInput.style.display = 'block';
        editNoteInput.value = text;
        li.querySelector('p').style.display = 'none';
        editButton.style.display = 'none';
    });

    editNoteInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            const editedNoteText = editNoteInput.value.trim();
            if (editedNoteText !== '') {
                li.querySelector('p').textContent = editedNoteText;
                editNoteInput.style.display = 'none';
                li.querySelector('p').style.display = 'block';
                editButton.style.display = 'inline-block';
            }
        }
    });
}

// Function to add a new note
function addNote() {
    const noteText = noteInput.value.trim();
    if (noteText !== '') {
        createNoteElement(noteText);
        noteInput.value = '';
    }
}

// Event listener for adding a new note (clicking "Add" or pressing "Enter")
addNoteButton.addEventListener('click', addNote);
noteInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        addNote();
    }
});

// Function to toggle the theme
function toggleTheme() {
    container.classList.toggle('dark-mode');

    // Save the user's preference to localStorage
    const isDarkMode = container.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode.toString());
}

// Event listener for theme toggle button
themeToggle.addEventListener('click', toggleTheme);

// Check if the user has a theme preference stored in localStorage
const storedDarkMode = localStorage.getItem('darkMode');

// Apply the stored theme preference (if available)
if (storedDarkMode === 'true') {
    container.classList.add('dark-mode');
}
