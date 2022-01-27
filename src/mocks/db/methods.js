import db from 'mocks/db'

export function authenticate({username, passwordHash, id}) {
  const user = db.__TREK_USERS__.findFirst({
    where: {username: {equals: username}},
  })
  if (user && user.passwordHash === passwordHash) {
    return {...user, token: btoa(user.id)}
  }
  const error = new Error('Invalid username or password.')
  error.status = 400
  throw error
}
