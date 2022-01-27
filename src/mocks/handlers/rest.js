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
      const user = await getUser(req)
      const params = req.url.searchParams
      console.log(params)
      const queryResult = targetDB.queryByOwnerId(
        user.id,
        Object.fromEntries(params),
      )
      return res(ctx.json(queryResult))
    }),

    rest.get(`${apiUrl}/${endpoint}/:id`, async (req, res, ctx) => {
      const {id} = req.params
      const item = targetDB.detail(+id)
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
