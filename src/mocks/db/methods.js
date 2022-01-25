import db from 'mocks/db'
import {validateUserForm} from 'mocks/db/utils'

export function authenticate({username, password}) {
  validateUserForm({username, password})
  const user = db.user.findFirst({
    where: {
      username: {
        equals: username,
      },
    },
  })
  if (user && user.password === password) {
    return {...user, token: btoa(user.id)}
  }
  const error = new Error('Invalid username or password.')
  error.status = 400
  throw error
}
