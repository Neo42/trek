import {factory, primaryKey} from '@mswjs/data'
import {password, username, uuid} from 'minifaker'
import 'minifaker/locales/en'
import {validateUserForm} from 'mocks/db-utils'

const db = factory({
  user: {
    username: primaryKey(username),
    password: password,
    id: uuid.v4,
  },
})

function authenticate({username, password}) {
  validateUserForm({username, password})
  const user = db.user.findFirst({
    where: {
      username: {
        equals: username,
      },
    },
  })
  if (user.password === password) {
    return {...user, token: btoa(user.id)}
  }
  const error = new Error('Invalid username or password.')
  error.status = 400
  throw error
}

db.user = {
  ...db.user,
  authenticate,
}

export default db
