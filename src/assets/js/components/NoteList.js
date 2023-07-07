import { Note } from "./Note"

export class NoteList {
	_notes = []
	_key = null
	_def = []

	constructor(container, key = null, def = []) {
		this.container = container
		this.list = document.createElement('div')
		this.list.classList.add('list-group')
		this._key = key
		this._def = def
		this.update()
		container.innerHTML = ''
		container.append(this.list)
	}

	add(name, done = false) {
		let newNote = new Note(this, name, done)
		newNote.id = Date.now()
		this._notes.push(newNote)
		this.checkEmpty()
		this.save()
	}

	remove(value) {
		let id

		if (value instanceof Note) {
			id = value.id
		} else {
			id = value
		}

		for (let i = 0; i < this._notes.length; i++) {
			if (this._notes[i].id == id) {
				this._notes.splice(i, 1)
			}
		}

		this.checkEmpty()
		this.save()
	}

	checkEmpty() {
		if (this._notes.length == 0) {
			this.empty = document.createElement("div");
			this.empty.classList.add(
				"d-flex",
				"list-group-item",
				"justify-content-center",
				"align-items-center",
				"text-secondary",
				"bg-light",
				"p-5"
			);

			this.empty.textContent = 'ToDo List is empty'
			this.list.append(this.empty);
		} else {
			if (this.empty) {
				this.empty.remove()
			}
		}
	}

	save() {
		if (this._key) {
			let saveList = []
			for (const note of this._notes) {
				saveList.push({
					id: note.id,
					name: note.name,
					done: note.done
				})
			}
			localStorage.setItem(this._key, JSON.stringify(saveList))
		}
	}

	update() {
		let startList = this._def
		this._notes = []
		this.list.innerHTML = ''

		if (this._key) {
			let dataLS = localStorage.getItem(this._key)
			if (dataLS !== '' && dataLS !== null)
				startList = JSON.parse(dataLS)
		}

		for (const item of startList) {
			let newNote = new Note(this, item.name, item.done)
			if (item.id) {
				newNote.id = item.id
			} else {
				newNote.id = Date.now()
			}
			this._notes.push(newNote)
		}

		this.save()
		this.checkEmpty()
	}
}
