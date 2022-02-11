import * as React from 'react'
import {AuthForm} from 'auth/index.d'
import {FullPageFallback, FullPageLoading} from 'components'
import {User} from 'screens/projects/index.d'
import {client, useAsync} from 'utils'
import * as auth from './provider'

export const AuthContext = React.createContext<
  | {
      user: User | null
      register: (form: AuthForm) => Promise<void>
      login: (form: AuthForm) => Promise<void>
      logout: () => Promise<void>
    }
  | undefined
>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const {
    data: user,
    setData: setUser,
    reset: resetUser,
    run,
    error,
    isLoading,
    isError,
  } = useAsync<User>()

  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => resetUser())

  const initializeUser = React.useCallback(async () => {
    let user = null
    const token = auth.getToken()
    if (token) {
      const data = await client('me', {token})
      user = data.user
    }
    return user
  }, [])

  React.useEffect(() => {
    run(initializeUser())
  }, [initializeUser, run])

  if (isLoading) {
    return <FullPageLoading />
  }

  if (isError) {
    return <FullPageFallback error={error} />
  }

  const value = {user, login, register, logout}
  return <AuthContext.Provider value={value} children={children} />
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within a AuthProvider.')
  return context
}
