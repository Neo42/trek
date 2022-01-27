import {ProjectsScreen} from 'screens/projects'
import {useAuth} from 'auth/context'

export function AuthenticatedApp() {
  const {logout} = useAuth()
  return (
    <div>
      <button onClick={logout}>Logout</button>
      <ProjectsScreen />
    </div>
  )
}
