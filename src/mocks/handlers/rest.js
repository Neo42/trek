import {rest} from 'msw'
import {
  apiUrl,
  usersKey,
  projectsKey,
  kanbansKey,
  tasksKey,
  taskTagsKey,
  taskTypesKey,
  taskGroupsKey,
} from '../../constants'
import db from 'mocks/db'
import storage from 'mocks/storage'
import {getUser} from 'mocks/handlers/user'

const getRestHandlers = (endpoint, dbKey) => {
  const targetDB = dbKey && db[dbKey]
  const targetStorage = dbKey && storage.get(dbKey)
  return [
    rest.get(`${apiUrl}/${endpoint}`, async (req, res, ctx) => {
      const params = req.url.searchParams
      let searchConditions = []

      for (const [key, value] of params) {
        searchConditions.push([key, value])
      }

      searchConditions = searchConditions
        .map(([key, value]) => ({
          [key]: key.toLocaleLowerCase().includes('id')
            ? {equals: +value}
            : {contains: value},
        }))
        .reduce((result, item) => ({...result, ...item}), {})

      const queryResult = targetDB.findMany({
        where: searchConditions,
        orderBy: {orderId: 'asc'},
      })
      // simulate slow response
      await new Promise((resolve) => setTimeout(resolve, 300))
      // throw Error('test error')
      return res(ctx.json(queryResult))
    }),

    rest.get(`${apiUrl}/${endpoint}/:id`, async (req, res, ctx) => {
      const {id} = req.params
      const item = targetDB.findFirst({where: {id: {equals: Number(id)}}})
      // simulate slow response
      await new Promise((resolve) => setTimeout(resolve, 300))
      return res(ctx.json(item))
    }),

    rest.post(`${apiUrl}/${endpoint}`, async (req, res, ctx) => {
      if (endpoint === 'profile') {
        return res(ctx.json(req.body))
      }
      const {id} = await getUser(req)
      let item = {
        ...req.body,
        ...{
          id: new Date().getTime(),
          orderId: targetDB.count(),
          creationDate: new Date().getTime(),
          [endpoint === 'tasks' ? 'authorId' : 'ownerId']: id,
        },
      }

      const createdItem = targetDB.create(item)
      targetStorage.update(() => targetDB.getAll())
      return res(ctx.json(createdItem))
    }),

    rest.patch(`${apiUrl}/${endpoint}/:id`, async (req, res, ctx) => {
      const {id} = req.params
      const data = req.body
      targetDB.update({where: {id: {equals: parseInt(id)}}, data})
      targetStorage.update(() => targetDB.getAll())
      const updatedItem = targetDB.findFirst({
        where: {id: {equals: parseInt(id)}},
      })
      return res(ctx.json(updatedItem))
    }),

    rest.delete(`${apiUrl}/${endpoint}/:id`, async (req, res, ctx) => {
      const {id} = req.params
      targetDB.delete({where: {id: {equals: parseInt(id)}}})
      if (endpoint === 'projects') {
        db[kanbansKey].deleteMany({where: {projectId: {equals: Number(id)}}})
        db[tasksKey].deleteMany({where: {projectId: {equals: Number(id)}}})
        db[taskGroupsKey].deleteMany({where: {projectId: {equals: Number(id)}}})
        storage.get(kanbansKey).update(() => db[kanbansKey].getAll())
      }
      if (endpoint === 'kanbans') {
        db[tasksKey].deleteMany({where: {kanbanId: {equals: Number(id)}}})
      }
      storage.get(tasksKey).update(() => db[tasksKey].getAll())
      targetStorage.update(() => targetDB.getAll())
      return res(ctx.json({success: true}))
    }),
  ]
}

export const restHandlers = [
  ...getRestHandlers('users', usersKey),
  ...getRestHandlers('projects', projectsKey),
  ...getRestHandlers('kanbans', kanbansKey),
  ...getRestHandlers('tasks', tasksKey),
  ...getRestHandlers('taskTypes', taskTypesKey),
  ...getRestHandlers('taskTags', taskTagsKey),
  ...getRestHandlers('taskGroups', taskGroupsKey),
  ...getRestHandlers('profile', taskGroupsKey),
]
