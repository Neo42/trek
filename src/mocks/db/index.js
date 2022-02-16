import {faker} from '@faker-js/faker'
import {factory, primaryKey} from '@mswjs/data'
import {usersKey, projectsKey, isLocalDataLoadedKey} from '../../constants'
import storage from '../storage'
import {authenticate} from './methods'
import store from '../initial-data.json'
import {hash} from 'mocks/db/utils'

const db = factory({
  [usersKey]: {
    id: primaryKey(Number),
    username: faker.internet.userName,
    passwordHash: () => hash(faker.internet.password()),
    name: faker.name.findName,
  },
  [projectsKey]: {
    id: primaryKey(Number),
    ownerId: Number,
    name: faker.company.catchPhraseNoun,
    department: faker.company.bsNoun,
    creationDate: () => Date.parse(faker.date.past()),
    isPinned: () => false,
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
  const isLocalDataLoaded = storage.get(isLocalDataLoadedKey).getValue()

  dbKeys.forEach((dbKey) => {
    const storageDataSet = storage.get(dbKey)
    const localDataStore = store[dbKey]
    const dbDataSet = db[dbKey]

    if (!isLocalDataLoaded) {
      storage.get(isLocalDataLoadedKey).update(() => true)

      console.log('loading local data')

      localDataStore.forEach((localData) => {
        storageDataSet.update((storageDataSet) => {
          const hasDataInStorage = storageDataSet.filter(
            (storageData) => storageData.id === localData.id,
          ).length
          const newStorageDateSet = [...storageDataSet, localData]
          return hasDataInStorage ? storageDataSet : newStorageDateSet
        })
      })
    }

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
