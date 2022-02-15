import * as React from 'react'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import {AuthProvider} from './context'

const queryClient = new QueryClient()

export function AppProvider({children}: {children: React.ReactNode}) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  )
}
