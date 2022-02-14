import * as React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as auth from './provider'
import * as authActions from '../store/auth.slice'
import {FullPageFallback, FullPageLoading} from 'components'
import {client, useAsync} from 'utils'
import {AuthForm} from 'auth/index.d'
import {User} from 'screens/projects/index.d'

const initializeUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await client('me', {token})
    user = data.user
  }
  return user
}

const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const {run, error, isLoading, isError} = useAsync<User | null>()
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()

  React.useEffect(() => {
    run(dispatch(authActions.handleInitializeUser()))
  }, [dispatch, run])

  if (isLoading) {
    return <FullPageLoading />
  }

  if (isError) {
    return <FullPageFallback error={error} />
  }

  return <>{children}</>
}

function useAuth() {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()

  const user = useSelector(authActions.selectUser)
  const login = React.useCallback(
    (data: AuthForm) => dispatch(authActions.handleLogin(data)),
    [dispatch],
  )
  const register = React.useCallback(
    (data: AuthForm) => dispatch(authActions.handleRegister(data)),
    [dispatch],
  )
  const logout = React.useCallback(
    () => dispatch(authActions.handleLogout()),
    [dispatch],
  )

  return {user, login, register, logout}
}

export {AuthProvider, initializeUser, useAuth}
