export function validateUserForm({username, password}) {
  if (!username) {
    const error = new Error('用户名是必填项。')
    error.status = 400
    throw error
  }
  if (!password) {
    const error = new Error('密码是必填项。')
    error.status = 400
    throw error
  }
}

export function hash(str) {
  var hash = 5381,
    i = str.length
  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i)
  }
  return String(hash >>> 0)
}
