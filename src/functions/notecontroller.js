import { Note } from './notes.js';
import { saveNoteToLocalStorage } from './local_storage/saveToLocalStorage.js';

export default function newNote() {
  const myNote = new Note('New note', 'Add text!', '#FFF9C4');
  saveNoteToLocalStorage(myNote);
  printNote(myNote.title, myNote.description, myNote.color);
}

export function printNote(title, description, color) {
  const notesContainer = document.getElementById('notes-container');
  const note = document.createElement('div');
  note.classList.add('note');
  const noteTitle = document.createElement('p');
  noteTitle.textContent = title;
  const noteDescription = document.createElement('p');
  noteDescription.textContent = description;
  const noteColor = document.createElement('input');
  noteColor.type = 'color';
  noteColor.value = color;

  note.appendChild(noteTitle);
  note.appendChild(noteDescription);
  note.appendChild(noteColor);
  notesContainer.appendChild(note);
}
