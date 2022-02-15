import {rest} from 'msw'
// import {getUser} from './user'
import {apiUrl, projectsKey, usersKey} from '../../constants'
import db from 'mocks/db'
import storage from 'mocks/storage'

const tryToNumber = (value) =>
  Array.isArray(value) ? value.map(Number) : Number(value)

const convertIds = (object) => {
  const result = {}
  Object.keys(object).forEach((key) => {
    result[key] = key.includes('Id') ? tryToNumber(object[key]) : object[key]
  })
  result.id = tryToNumber(result.id)
  return result
}

const getRestHandlers = (endpoint, dbKey) => {
  const targetDB = db[dbKey]
  const targetStorage = storage.get(dbKey)
  return [
    rest.get(`${apiUrl}/${endpoint}`, async (req, res, ctx) => {
      // TODO: match list with user id
      // const {id} = await getUser(req)
      const params = req.url.searchParams

      let searchConditions = []
      for (const [key, value] of params) {
        searchConditions.push([key, value])
      }

      searchConditions = searchConditions
        .map(([key, value]) => ({
          [key]: key.toLowerCase().includes('id')
            ? {equals: +value}
            : {contains: value},
        }))
        .reduce((result, item) => ({...result, ...item}), {})

      const queryResult = targetDB.findMany({where: searchConditions})
      await new Promise((resolve) => setTimeout(resolve, 300))
      // throw Error('test error')
      return res(ctx.json(queryResult))
    }),

    rest.get(`${apiUrl}/${endpoint}/:id`, async (req, res, ctx) => {
      const {id} = req.params
      const item = targetDB.findFirst({where: {id: {equals: Number(id)}}})
      return res(ctx.json(item))
    }),

    rest.post(`${apiUrl}/${endpoint}`, async (req, res, ctx) => {
      const item = targetDB.create({
        ...{
          id: targetDB.count() + 1,
          creationDate: new Date().getTime(),
        },
        ...req.body,
      })
      return res(ctx.json(item))
    }),

    rest.patch(`${apiUrl}/${endpoint}/:id`, async (req, res, ctx) => {
      const {id} = req.params
      const data = req.body
      targetDB.update({
        where: {id: {equals: parseInt(id)}},
        data,
      })
      targetStorage.update(() => targetDB.getAll())
      const updatedItem = targetDB.findFirst({
        where: {id: {equals: parseInt(id)}},
      })
      return res(ctx.json(updatedItem))
    }),

    rest.delete(`${apiUrl}/${endpoint}/:id`, async (req, res, ctx) => {
      const {id} = convertIds(req.params)
      targetDB.remove(id)
      return res(ctx.json({success: true}))
    }),
  ]
}

export const restHandlers = [
  ...getRestHandlers('projects', projectsKey),
  ...getRestHandlers('users', usersKey),
]
