import * as React from 'react'
import {uuid} from 'minifaker'
import {storage} from 'mocks'

interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement
  password: HTMLInputElement
}
interface UsernameFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

export function LoginScreen() {
  function login(params: {username: string; password: string}) {
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: uuid.v4(),
        ...params,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) throw new Error(data.message)
        return data
      })
      .then((user) => storage.saveUsers(user))
  }

  function handleSubmit(event: React.FormEvent<UsernameFormElement>) {
    event.preventDefault()
    const username = event.currentTarget.elements.username.value
    const password = event.currentTarget.elements.password.value
    login({username, password})
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input title="Username" type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input title="Password" type="password" id="password" />
      </div>
      <button type="submit" title="Login">
        Register
      </button>
    </form>
  )
}
