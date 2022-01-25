import {setupWorker} from 'msw'
import db from './db'
import {userHandlers} from 'mocks/handlers'
import {LiveStorage} from '@mswjs/storage'

const users = new LiveStorage('users', [])

const handlers = [...db.user.toHandlers('rest'), ...userHandlers]

export const worker = setupWorker(...handlers)

export const storage = {
  saveUsers: (user) => {
    users.update((prevUsers) => [...prevUsers, user])
    console.log('New user added.')
  },
}

window.deleteUsers = () => {
  db.user.deleteMany({
    where: {},
  })
  users.update(() => [])
  console.log('All users deleted.')
}

window.showUsers = () => {
  console.log(users)
}
