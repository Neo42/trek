import * as React from 'react'
import {AuthProvider} from './context'

export function AppProviders({children}: {children: React.ReactNode}) {
  return <AuthProvider>{children}</AuthProvider>
}
