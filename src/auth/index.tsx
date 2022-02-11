import * as React from 'react'
import {AuthProvider} from './context'

export function AppProviders({children}: {children: React.ReactNode}) {
  return <AuthProvider>{children}</AuthProvider>
}

export {getToken, register, login, logout} from './provider'
export {AuthContext, AuthProvider, useAuth} from './context'
