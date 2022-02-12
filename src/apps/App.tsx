import {AuthenticatedApp} from 'apps/authenticated-app'
import {UnauthenticatedApp} from 'apps/unauthenticated-app'
import {useAuth} from 'auth/context'
import './App.css'
import {ErrorBoundary, FullPageFallback} from 'components'

function App() {
  const {user} = useAuth()
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  )
}

export default App
