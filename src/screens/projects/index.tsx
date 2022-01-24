import * as React from 'react'
import * as qs from 'qs'
import {stripFalsyValue, useDebouncedState} from 'utils'
import {ProjectList} from './list'
import {ProjectSearch} from './search'

const apiUrl = process.env.REACT_APP_API_URL

function ProjectsScreen() {
  const [users, setUsers] = React.useState([])
  const [projects, setProjects] = React.useState([])
  const [params, setParams] = useDebouncedState(
    {
      name: '',
      principalId: '',
    },
    2000,
  )

  React.useEffect(() => {
    const paramsString = qs.stringify(stripFalsyValue(params))
    fetch(`${apiUrl}/projects?${paramsString}`)
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => {
        throw error
      })

    fetch(`${apiUrl}/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => {
        throw error
      })
  }, [params])

  return (
    <>
      <ProjectSearch params={params} setParams={setParams} users={users} />
      <ProjectList projects={projects} users={users} />
    </>
  )
}

export {ProjectsScreen}
