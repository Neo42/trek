import {rest} from 'msw'
import {
  apiUrl,
  usersKey,
  projectsKey,
  kanbansKey,
  tasksKey,
  taskTagsKey,
  taskTypesKey,
} from '../../constants'
import db from 'mocks/db'
import storage from 'mocks/storage'
import {getUser} from 'mocks/handlers/user'

const getRestHandlers = (endpoint, dbKey) => {
  const targetDB = db[dbKey]
  const targetStorage = storage.get(dbKey)
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

      const queryResult = targetDB.findMany({where: searchConditions})
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
      console.log('posting')
      const {id} = await getUser(req)
      let item = targetDB.create({
        ...req.body,
        ...{
          id: targetDB.count() + 1,
          creationDate: new Date().getTime(),
          [endpoint === 'tasks' ? 'authorId' : 'ownerId']: id,
        },
      })
      console.log(item)
      targetStorage.update(() => targetDB.getAll())
      return res(ctx.json(item))
    }),

    rest.patch(`${apiUrl}/${endpoint}/:id`, async (req, res, ctx) => {
      const {id} = req.params
      const data = req.body
      targetDB.update({where: {id: {equals: parseInt(id)}}, data})
      targetStorage.update(() => targetDB.getAll())
      const updatedItem = targetDB.findFirst({
        where: {id: {equals: parseInt(id)}},
      })
      console.log(updatedItem)
      return res(ctx.json(updatedItem))
    }),

    rest.delete(`${apiUrl}/${endpoint}/:id`, async (req, res, ctx) => {
      const {id} = req.params
      targetDB.delete({where: {id: {equals: parseInt(id)}}})
      targetStorage.update(() => targetDB.getAll())
      return res(ctx.json({success: true}))
    }),
  ]
}

export const restHandlers = [
  ...getRestHandlers('projects', projectsKey),
  ...getRestHandlers('kanbans', kanbansKey),
  ...getRestHandlers('tasks', tasksKey),
  ...getRestHandlers('taskTypes', taskTypesKey),
  ...getRestHandlers('taskTags', taskTagsKey),
  ...getRestHandlers('users', usersKey),
]
