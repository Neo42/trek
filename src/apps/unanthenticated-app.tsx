import * as React from 'react'
import {AuthForm} from 'auth/index.d'
import {useAuth} from 'auth/context'

interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement
  password: HTMLInputElement
}

export interface UsernameFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

export interface LoginFormProps {
  onSubmit: (form: AuthForm) => Promise<void>
  title: 'Login' | 'Create account'
}

function LoginForm({onSubmit, title}: LoginFormProps) {
  function handleSubmit(event: React.FormEvent<UsernameFormElement>) {
    event.preventDefault()
    const username = event.currentTarget.elements.username.value
    const password = event.currentTarget.elements.password.value
    onSubmit({username, password})
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
      <button type="submit" title={title}>
        {title}
      </button>
    </form>
  )
}

export function UnauthenticatedApp() {
  const [isRegisterScreen, setIsRegisterScreen] = React.useState(false)
  const {login, register} = useAuth()
  return (
    <div>
      <LoginForm
        onSubmit={isRegisterScreen ? register : login}
        title={isRegisterScreen ? 'Create account' : 'Login'}
      />
      <button onClick={() => setIsRegisterScreen(!isRegisterScreen)}>
        {isRegisterScreen ? 'Login' : 'Create account'}
      </button>
    </div>
  )
}
