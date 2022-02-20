import {faker} from '@faker-js/faker'
import {factory, nullable, primaryKey} from '@mswjs/data'
import {
  isLocalDataLoadedKey,
  usersKey,
  projectsKey,
  taskTagsKey,
  kanbansKey,
  tasksKey,
  taskTypesKey,
  taskGroupsKey,
  taskOrderKey,
  kanbanOrderKey,
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
    orderId: Number,
    name: faker.hacker.noun,
    projectId: Number,
    kanbanId: Number,
    authorId: Number,
    tags: () => [],
    assigneeId: nullable(Number),
    taskGroupId: nullable(Number),
    favorite: nullable(() => false),
    typeId: nullable(Number),
    note: nullable(faker.lorem.lines),
  },
  [kanbansKey]: {
    id: primaryKey(Number),
    orderId: Number,
    name: String,
    projectId: Number,
  },
  [taskTagsKey]: {
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
    projectId: Number,
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
    taskTagsKey,
    taskTypesKey,
    taskGroupsKey,
  )
} catch (error) {
  throw error
}

storage.get(taskOrderKey).update(() =>
  storage
    .get(tasksKey)
    .getValue()
    .map((task) => ({
      id: task.id,
    })),
)

storage.get(kanbanOrderKey).update(() =>
  storage
    .get(kanbansKey)
    .getValue()
    .map((kanban) => ({
      id: kanban.id,
    })),
)

export default db
