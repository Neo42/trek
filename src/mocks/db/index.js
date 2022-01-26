import {factory, primaryKey} from '@mswjs/data'
import {usersKey} from 'constants'
import {username, uuid} from 'minifaker'
import 'minifaker/locales/en'
import storage from 'mocks/storage'
import {authenticate} from './methods'

const db = factory({
  user: {
    username: primaryKey(username),
    passwordHash: String,
    id: uuid.v4,
  },
})

db.user = {
  ...db.user,
  authenticate,
}

window.deleteDB = (dbKey) => {
  db[dbKey].deleteMany({where: {}})
  console.log(`All data in ${dbKey}DB deleted.`)
}

window.showDB = (dbKey) => {
  console.log({[dbKey]: db[dbKey].getAll()})
}

function loadData() {
  const users = storage.get(usersKey).getValue()
  users.forEach((user) => db.user.create(user))
  console.log(`${usersKey} storage loaded.`)
}

try {
  loadData()
} catch (error) {
  throw error
}

export default db
