export function validateUserForm({username, password}) {
  if (!username) {
    const error = new Error('A username is required.')
    error.status = 400
    throw error
  }
  if (!password) {
    const error = new Error('A password is required.')
    error.status = 400
    throw error
  }
}

export const stripUserPassword = ({password, ...rest}) => rest

export function hash(str) {
  var hash = 5381,
    i = str.length
  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i)
  }
  return String(hash >>> 0)
}
