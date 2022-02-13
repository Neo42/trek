import {factory, primaryKey} from '@mswjs/data'
import {username, uuid} from 'minifaker'
import 'minifaker/dist/esm/locales/en'
import {usersKey, projectsKey} from '../../constants'
import storage from '../storage'
import {authenticate} from './methods'
import data from '../initial-data.json'

const db = factory({
  [usersKey]: {
    id: primaryKey(uuid.v4),
    username: username,
    passwordHash: String,
    name: String,
  },
  [projectsKey]: {
    id: primaryKey(uuid.v4),
    principalId: uuid.v4,
    name: String,
    group: String,
    creationDate: Number,
    pinned: Boolean,
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
  const storageList = storage.get(dbKey)
  const dataList = data[dbKey]
  const dbList = db[dbKey]

  dataList.forEach((item) => {
    storageList.update((prevItems) => {
      const hasItem = prevItems.filter(({id}) => id === item.id).length
      return hasItem ? prevItems : [...prevItems, item]
    })
  })

  storageList.getValue().forEach((item) => {
    if (dbList.findFirst({where: {id: {equals: item.id}}})) return
    dbList.create(item)
  })
}

try {
  ;[usersKey, projectsKey].forEach(loadData)
} catch (error) {
  throw error
}

export default db
