import * as React from 'react'
import {apiUrl} from 'constants/index'

interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement
  password: HTMLInputElement
}
interface UsernameFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

export function LoginScreen() {
  function login(params: {username: string; password: string}) {
    fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(params),
    }).then((response) => response.json())
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
        Login
      </button>
    </form>
  )
}
