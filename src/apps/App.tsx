import * as React from 'react'
import {ErrorBoundary, FullPageFallback, FullPageLoading} from 'components'
import {useAuth} from 'auth/context'
import './App.css'

const AuthenticatedApp = React.lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      './authenticated-app'
    ),
)
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'))

function App() {
  const {user} = useAuth()
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageFallback}>
        <React.Suspense fallback={<FullPageLoading />}>
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </React.Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default App
