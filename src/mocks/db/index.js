import {faker} from '@faker-js/faker'
import {factory, primaryKey} from '@mswjs/data'
import {
  isLocalDataLoadedKey,
  usersKey,
  projectsKey,
  projectPhasesKey,
  kanbansKey,
  tasksKey,
  taskTypesKey,
  taskGroupsKey,
} from '../../constants'
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
    ownerId: 1,
    name: faker.hacker.noun,
    department: faker.hacker.abbreviation,
    creationDate: () => Date.parse(faker.date.recent()),
    isPinned: () => false,
  },
  [tasksKey]: {
    id: primaryKey(Number),
    name: faker.hacker.noun,
    phases: () => [1],
    reporterId: () => 1,
    processorId: () => 1,
    epicId: () => 1,
    kanbanId: () => 1,
    favorite: () => false,
    typeId: () => 1,
    note: faker.lorem.lines,
  },
  [kanbansKey]: {
    id: primaryKey(Number),
    name: String,
  },
  [projectPhasesKey]: {
    id: primaryKey(Number),
    name: () => 'Initiation',
  },
  [taskTypesKey]: {
    id: primaryKey(Number),
    name: () => 'issue',
  },
  [taskGroupsKey]: {
    id: primaryKey(Number),
    name: faker.lorem.words,
    startDate: faker.date.past,
    endDate: faker.date.recent,
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
  loadData(
    usersKey,
    projectsKey,
    tasksKey,
    kanbansKey,
    projectPhasesKey,
    taskTypesKey,
    taskGroupsKey,
  )
} catch (error) {
  throw error
}

export default db
