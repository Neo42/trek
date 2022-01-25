import {rest} from 'msw'
import db from 'mocks/db'

const authUrl = process.env.REACT_APP_AUTH_URL

const userHandlers = [
  rest.post(`${authUrl}/register`, async (req, res, ctx) => {
    const {username, password} = req.body
    const userFields = {username, password}
    await db.user.create(userFields)
    let user
    try {
      user = await db.user.authenticate(userFields)
    } catch (error) {
      return res(
        ctx.status(400),
        ctx.json({status: 400, message: error.message}),
      )
    }
    return res(ctx.json({user}))
  }),

  rest.post(`${authUrl}/login`, async (req, res, ctx) => {
    const {username, password} = req.body
    const user = await db.user.authenticate({username, password})
    return res(ctx.json({user}))
  }),
]

export default userHandlers
