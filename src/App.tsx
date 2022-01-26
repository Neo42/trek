import * as React from 'react'
import './App.css'

import {AuthenticatedApp} from 'apps/authenticated-app'
import {UnauthenticatedApp} from 'apps/unanthenticated-app'
import {useAuth} from 'auth/context'

function App() {
  const {user} = useAuth()
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  )
}

export default App
