import * as auth from './provider'
import * as React from 'react'
import {AuthForm} from 'auth/index.d'
import {User} from 'screens/projects/index.d'

const AuthContext = React.createContext<
  | {
      user: User | null
      register: (form: AuthForm) => Promise<void>
      login: (form: AuthForm) => Promise<void>
      logout: () => Promise<void>
    }
  | undefined
>(undefined)
AuthContext.displayName = 'AuthContext'

const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = React.useState<User | null>(null)
  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => setUser(null))

  const value = {user, login, register, logout}
  return <AuthContext.Provider value={value} children={children} />
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within a AuthProvider.')
  return context
}

export {AuthContext, AuthProvider, useAuth}
