import storage from 'mocks/storage'
import {AuthForm, User} from 'types'
import {authUrl, LOGIN, POST, REGISTER, userTokenKey} from '../constants'

const tokenStorage = storage.get(userTokenKey)

function getToken() {
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
    .fetch(`${authUrl}/${endpoint}`, config)
    .then(async (response) => {
      const data = await response.json()
      if (response.ok) return data
      else return Promise.reject(data)
    })
}

export {getToken, register, login, logout}
