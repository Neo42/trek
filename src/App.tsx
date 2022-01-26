import * as React from 'react'
import './App.css'
import {useAuth} from 'auth/context'
import {UnauthenticatedApp} from 'apps/unanthenticated-app'
import {AuthenticatedApp} from 'apps/authenticated-app'

function App() {
  const {user} = useAuth()
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  )
}

export default App
