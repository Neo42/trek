import {factory, primaryKey} from '@mswjs/data'
import {username, uuid} from 'minifaker'
import 'minifaker/dist/esm/locales/en'
import {usersKey, projectsKey} from '../../constants'
import storage from '../storage'
import {authenticate} from './methods'
import store from '../initial-data.json'

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

function loadData(...dbKeys) {
  dbKeys.forEach((dbKey) => {
    const storageDataSet = storage.get(dbKey)
    const localDataStore = store[dbKey]
    const dbDataSet = db[dbKey]

    localDataStore.forEach((localData) => {
      storageDataSet.update((storageDataSet) => {
        const hasDataInStorage = storageDataSet.filter(
          (storageData) => storageData.id === localData.id,
        ).length
        const newStorageDateSet = [...storageDataSet, localData]
        return hasDataInStorage ? storageDataSet : newStorageDateSet
      })
    })

    storageDataSet.getValue().forEach((data) => {
      if (dbDataSet.findFirst({where: {id: {equals: data.id}}})) return
      dbDataSet.create(data)
    })
  })
}

try {
  loadData(usersKey, projectsKey)
} catch (error) {
  throw error
}

export default db
