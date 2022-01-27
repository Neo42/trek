import {rest} from 'msw'
import db from 'mocks/db'
import storage from 'mocks/storage'
import {usersKey} from 'constants'
import {hash, sanitizeUser, validateUserForm} from 'mocks/db/utils'

const localUsers = storage.get(usersKey)
const userDB = db.__TREK_USERS__

const authUrl = process.env.REACT_APP_AUTH_URL

const getToken = (req) =>
  req.headers.get('Authorization')?.replace('Bearer ', '')

export async function getUser(req) {
  const token = getToken(req)
  if (!token) {
    const error = new Error('A token must be provided')
    error.status = 401
    throw error
  }
  let id
  try {
    id = atob(token)
  } catch (e) {
    const error = new Error('Invalid token. Please login again.')
    error.status = 401
    throw error
  }

  return await userDB.findFirst({where: {id: {equals: id}}})
}

export const userHandlers = [
  ...userDB.toHandlers('rest'),

  rest.get(`${authUrl}/me`, async (req, res, ctx) => {
    const user = await getUser(req)
    const token = getToken(req)
    return res(ctx.json({user: {...user, token}}))
  }),

  rest.post(`${authUrl}/register`, async (req, res, ctx) => {
    const {username, password} = req.body
    validateUserForm({username, password})
    const id = hash(username)
    const passwordHash = hash(password)
    await userDB.create({id, username, passwordHash})
    let user
    try {
      user = await userDB.authenticate({id, username, passwordHash})
    } catch (error) {
      return res(
        ctx.status(400),
        ctx.json({status: 400, message: error.message}),
      )
    }
    localUsers.update((prevUsers) => [...prevUsers, sanitizeUser(user)])
    return res(ctx.json({user}))
  }),

  rest.post(`${authUrl}/login`, async (req, res, ctx) => {
    const {username, password} = req.body
    validateUserForm({username, password})
    const id = hash(username)
    const passwordHash = hash(password)
    const user = await userDB.authenticate({
      id,
      username,
      passwordHash,
    })
    return res(ctx.json({user}))
  }),
]
