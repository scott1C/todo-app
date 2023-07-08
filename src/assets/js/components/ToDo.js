import { NoteList } from "./NoteList"

export class ToDo {

  _currentUser = ''
  _users = []
  _notes = null

  constructor(container, currentTitle = 'admin', currentKey = 'admin', currentDef = []) {
    this.container = container
    this.nav = document.createElement('nav')
    this.title = document.createElement('h2')
    this.form = document.createElement('form')
    this.input = document.createElement('input')
    this.buttonWrapper = document.createElement('div')
    this.button = document.createElement('button')
    this.list = document.createElement('div')

    this.container.classList.add('pt-5', 'pb-5')
    this.nav.classList.add('mb-5', 'btn-group')
    this.form.classList.add('input-group', 'mb-3')
    this.input.classList.add('form-control')
    this.input.placeholder = 'Введите название нового дела'
    this.buttonWrapper.classList.add('input-group-append')
    this.button.classList.add('btn', 'btn-primary')
    this.button.textContent = 'Добавить дело'
    this.button.disabled = true

    this.buttonWrapper.append(this.button)
    this.form.append(this.input)
    this.form.append(this.buttonWrapper)
    this.container.append(this.nav)
    this.container.append(this.title)
    this.container.append(this.form)
    this.container.append(this.list)


    this.input.addEventListener('input', () => {
      this.button.disabled = false
      if (this.input.value.length === 0) {
        this.button.disabled = true
      }
    })

    this.addUser(currentTitle, currentKey, currentDef)
    this.currentUser = currentKey

    this.form.addEventListener('submit', (event) => {
      event.preventDefault()
      if (!this.input.value) {
        return
      }

      if (this._notes) {
        this._notes.add(this.input.value)
      }

      this.button.disabled = true
      this.input.value = ''
    })
  }

  addUser(title, key = title, def = []) {
    const button = document.createElement('button')
    button.classList.add('btn', 'btn-outline-primary')
    button.type = 'button'
    button.textContent = title

    button.addEventListener('click', () => {
      this.currentUser = key
    })

    this._users.push({
      title,
      key,
      def,
      button
    })
    this.nav.append(button)
  }

  removeUser(key) {
    if (this._users.length <= 1) return

    for (let i = 0; i < this._users[i].key; i++) {
      if (this._users[i].key === key) {
        this._users[i].button.remove()
        this._users.splice(i, 1)
      }
    }

    if (this.currentUser === key) {
      this.currentUser = this._users[0].key
    }
  }

  set currentUser(value) {
    this._currentUser = value
    let currentUser = null

    for (const user of this._users) {
      if (user.key === value) {
        currentUser = user
        user.button.classList.add('active')
      } else {
        user.button.classList.remove('active')
      }
    }

    this.title.textContent = currentUser.title
    this._notes = new NoteList(this.list, value, currentUser.def)
  }

  get currentUser() {
    return this._currentUser
  }
}