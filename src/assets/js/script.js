import { ToDo } from "./components/ToDo"

// let newNote = new Note(document.getElementById('app'), 'some text here')
// let newList = new NoteList(document.getElementById('app'), 'newList, G', [{ name: 'Task 1' }])
// document.getElementById('action').addEventListener('click', () => {
// 	newList.add(prompt('Enter some text'))
// })

let app = new ToDo(document.getElementById('app'))
app.addUser('user 1', 'user 1', [{ name: 'admin' }])
app.addUser('user 2')
app.addUser('user 3')
document.getElementById('action').addEventListener('click', () => {
  app.addUser(prompt('Enter some text'))
})