import * as React from 'react'
import * as qs from 'qs'
import {stripFalsyValue, useDebouncedSetState} from 'utils'

import {apiUrl} from '../../constants'
import {ProjectList} from './list'
import {ProjectSearch} from './search'

export function ProjectsScreen() {
  const [users, setUsers] = React.useState([])
  const [projects, setProjects] = React.useState([])
  const [params, setParams] = React.useState(() => ({
    name: '',
    principalId: '',
  }))
  const debouncedParams = useDebouncedSetState(params, 250)

  React.useEffect(() => {
    const paramsString = qs.stringify(stripFalsyValue(debouncedParams))
    fetch(`${apiUrl}/projects?${paramsString}`)
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => {
        throw error
      })
  }, [debouncedParams])

  React.useEffect(() => {
    fetch(`${apiUrl}/users`)
      .then((response) => response.json())
      .then((users) => setUsers(users))
      .catch((error) => {
        throw error
      })
  }, [])

  return (
    <>
      <ProjectSearch params={params} setParams={setParams} users={users} />
      <ProjectList projects={projects} users={users} />
    </>
  )
}
