import {rest} from 'msw'
import db from 'mocks/db'
import storage from 'mocks/storage'
import {usersKey} from 'constants'
import {hash, sanitizeUser, validateUserForm} from 'mocks/db/utils'
const localUsers = storage.get(usersKey)

const authUrl = process.env.REACT_APP_AUTH_URL

const userHandlers = [
  rest.post(`${authUrl}/register`, async (req, res, ctx) => {
    const {username, password} = req.body
    validateUserForm({username, password})
    const id = hash(username)
    const passwordHash = hash(password)
    await db.user.create({id, username, passwordHash})
    let user
    try {
      user = await db.user.authenticate({id, username, passwordHash})
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
    const user = await db.user.authenticate({id, username, passwordHash})
    return res(ctx.json({user}))
  }),
]

export default userHandlers
