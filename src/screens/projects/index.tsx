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
      .then(async (response) => {
        const data = await response.json()
        if (response.ok) return data
        else return Promise.reject(data.message)
      })
      .then((projects) => setProjects(projects))
  }, [debouncedParams])

  React.useEffect(() => {
    fetch(`${apiUrl}/users`)
      .then(async (response) => {
        const data = await response.json()
        if (response.ok) return data
        else return Promise.reject(data.message)
      })
      .then((users) => setUsers(users))
  }, [])

  return (
    <>
      <ProjectSearch params={params} setParams={setParams} users={users} />
      <ProjectList projects={projects} users={users} />
    </>
  )
}
