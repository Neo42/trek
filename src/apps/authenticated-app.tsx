import {useAuth} from 'auth/context'
import {ProjectsScreen} from 'screens/projects'

export function AuthenticatedApp() {
  const {logout} = useAuth()
  return (
    <div>
      <button onClick={logout}>Logout</button>
      <ProjectsScreen />
    </div>
  )
}
