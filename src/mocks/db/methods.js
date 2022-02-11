import db from '../db'

export async function authenticate({username, passwordHash}) {
  const user = db.__TREK_USERS__.findFirst({
    where: {username: {equals: username}},
  })
  if (user && user.passwordHash === passwordHash) {
    return {...user, token: btoa(user.id)}
  }
  const error = new Error('Invalid username or password.')
  error.status = 400
  await new Promise((resolve) => setTimeout(resolve, 2000))
  throw error
}
