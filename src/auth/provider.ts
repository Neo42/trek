import {User} from 'screens/projects/index.d'
import {LOGIN, REGISTER, POST, userTokenKey} from '../constants'

const authURL = process.env.REACT_APP_AUTH_URL

async function getToken() {
  return window.localStorage.getItem(userTokenKey)
}

function handleUserResponse({user}: {user: User}) {
  window.localStorage.setItem(userTokenKey, user?.token ?? '')
  return user
}

function login(data: {username: string; password: string}) {
  return client(LOGIN, data).then(handleUserResponse)
}

function register(data: {username: string; password: string}) {
  return client(REGISTER, data).then(handleUserResponse)
}

function logout() {
  window.localStorage.removeItem(userTokenKey)
}

async function client(
  endpoint: string,
  data: {username: string; password: string},
) {
  const config = {
    method: POST,
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'},
  }
  return window
    .fetch(`${authURL}/${endpoint}`, config)
    .then(async (response) => {
      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        return Promise.reject(data.message)
      }
    })
}

export {getToken, register, login, logout}
