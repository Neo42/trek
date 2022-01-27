import {rest} from 'msw'
import {getUser} from './user'
import {apiUrl, projectsKey, usersKey} from '../../constants'
import db from 'mocks/db'

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
  return [
    rest.get(`${apiUrl}/${endpoint}`, async (req, res, ctx) => {
      // TODO: match list with user id
      const {id} = await getUser(req)

      const params = req.url.searchParams

      let searchConditions = []
      for (const [key, value] of params) {
        searchConditions.push([key, value])
      }

      searchConditions = searchConditions
        .map(([key, value]) => ({
          [key]: {equals: key.toLowerCase().includes('id') ? +value : value},
        }))
        .reduce((result, item) => ({...result, ...item}), {})

      const queryResult = targetDB.findMany({where: searchConditions})
      return res(ctx.json(queryResult))
    }),

    rest.get(`${apiUrl}/${endpoint}/:id`, async (req, res, ctx) => {
      const {id} = req.params
      const item = targetDB.findFirst({where: {id: {equals: id}}})
      return res(ctx.json(item))
    }),

    rest.patch(`${apiUrl}/${endpoint}/:id`, async (req, res, ctx) => {
      const {id} = convertIds(req.params)
      const updates = req.body
      const updatedItem = targetDB.update(id, updates)
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
