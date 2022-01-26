import {AuthForm} from 'auth/index.d'
import storage from 'mocks/storage'
import {User} from 'screens/projects/index.d'
import {LOGIN, POST, REGISTER, userTokenKey} from '../constants'

const authURL = process.env.REACT_APP_AUTH_URL
const tokenStorage = storage.get(userTokenKey)

async function getToken() {
  return tokenStorage.getValue()
}

function handleUserResponse({user}: {user: User}) {
  tokenStorage.update(() => user?.token ?? '')
  return user
}

function login(data: AuthForm) {
  return client(LOGIN, data).then(handleUserResponse)
}

function register(data: AuthForm) {
  return client(REGISTER, data).then(handleUserResponse)
}

async function logout() {
  tokenStorage.update(() => '')
}

async function client(endpoint: string, data: AuthForm) {
  const config = {
    method: POST,
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'},
  }
  return window
    .fetch(`${authURL}/${endpoint}`, config)
    .then(async (response) => {
      const data = await response.json()
      if (response.ok) return data
      else return Promise.reject(data.message)
    })
}

export {getToken, register, login, logout}
