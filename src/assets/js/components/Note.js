import { NoteList } from "./NoteList"

export class Note {
	_name = ''
	_done = false

	constructor(container, name = "", done = false) {
		this.container = container
		this.item = document.createElement('div')
		this.buttonGroup = document.createElement('div')
		this.nameSpan = document.createElement('span')
		this.doneButton = document.createElement('button')
		this.deleteButton = document.createElement('button')
		this.name = name
		this.done = done

		this.item.classList.add(
			'list-group-item',
			'd-flex',
			'justify-content-between',
			'align-items-center'
		)
		this.buttonGroup.classList.add('btn-group', 'btn-group-sm')
		this.doneButton.classList.add('btn', 'btn-success')
		this.doneButton.textContent = 'Finished'
		this.deleteButton.classList.add('btn', 'btn-danger')
		this.deleteButton.textContent = 'Delete'

		this.doneButton.addEventListener('click', () => {
			this.done = !this.done
		})

		this.deleteButton.addEventListener('click', () => {
			if (confirm('Are you sure about this decision?')) {
				this.delete()
			}
		})

		this.buttonGroup.append(this.doneButton)
		this.buttonGroup.append(this.deleteButton)
		this.item.append(this.nameSpan)
		this.item.append(this.buttonGroup)

		if (container instanceof NoteList) {
			container.list.append(this.item)
		} else {
			container.append(this.item)
		}
	}

	delete() {
		this.item.remove()
		if (this.container instanceof NoteList) {
			this.container.remove(this)
		}
	}

	set name(value) {
		this._name = value
		this.nameSpan.textContent = value
	}

	get name() {
		return this._name
	}

	set done(value) {
		this._done = value

		if (value) {
			this.item.classList.add('list-group-item-success')
		} else {
			this.item.classList.remove('list-group-item-success')
		}

		if (this.container instanceof NoteList) {
			this.container.save()
		}
	}

	get done() {
		return this._done
	}
}