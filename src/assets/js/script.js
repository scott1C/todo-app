import { Note } from "./components/Note"
import { NoteList } from "./components/NoteList"

// let newNote = new Note(document.getElementById('app'), 'some text here')
let newList = new NoteList(document.getElementById('app'), 'newList, G', [{ name: 'Task 1' }])
document.getElementById('action').addEventListener('click', () => {
	newList.add(prompt('Enter some text'))
})