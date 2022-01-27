import {factory, primaryKey} from '@mswjs/data'
import {usersKey, projectsKey} from '../../constants'
import {username, uuid} from 'minifaker'
import 'minifaker/locales/en'
import storage from 'mocks/storage'
import {authenticate} from './methods'

const db = factory({
  [usersKey]: {
    username: primaryKey(username),
    passwordHash: String,
    id: uuid.v4,
  },
  [projectsKey]: {
    id: primaryKey(uuid.v4),
    ownerId: uuid.v4,
  },
})

db.__TREK_USERS__ = {
  ...db.__TREK_USERS__,
  authenticate,
}

window.deleteDB = (dbKey) => {
  db[dbKey].deleteMany({where: {}})
  console.log(`All data in ${dbKey}DB deleted.`)
}

window.showDB = (dbKey) => {
  console.log({[dbKey]: db[dbKey].getAll()})
}

function loadData(dbKey) {
  const items = storage.get(dbKey).getValue()
  items.forEach((item) => db[dbKey].create(item))
  console.log(`${dbKey} storage loaded.`)
}

try {
  ;[usersKey, projectsKey].forEach(loadData)
} catch (error) {
  throw error
}

export default db
