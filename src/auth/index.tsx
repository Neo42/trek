import {ReactNode} from 'react'
import {AuthProvider} from './context'

export function AppProviders({children}: {children: ReactNode}) {
  return <AuthProvider>{children}</AuthProvider>
}
