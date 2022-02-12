import * as React from 'react'
import {AuthProvider} from './context'

export function AppProvider({children}: {children: React.ReactNode}) {
  return <AuthProvider>{children}</AuthProvider>
}
