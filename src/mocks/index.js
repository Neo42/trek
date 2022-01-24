import {setupWorker} from 'msw'
import {LiveStorage} from '@mswjs/storage'
import {factory, primaryKey} from '@mswjs/data'
import {username, password, uuid} from 'minifaker'
import 'minifaker/locales/en'

export const db = factory({
  user: {
    username: primaryKey(username),
    password: password,
    id: uuid.v4,
  },
})

const handlers = [...db.user.toHandlers('rest')]

const users = new LiveStorage('users', [])

export const storage = {
  saveUsers: (user) => {
    users.update((prevUsers) => [...prevUsers, user])
    console.log(users)
  },
}

window.deleteUsers = () => {
  db.user.deleteMany({
    where: {},
  })
  users.update(() => [])
  console.log('All users deleted.')
}

export const worker = setupWorker(...handlers)
