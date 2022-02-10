import * as React from 'react'
import {ProjectList} from './list'
import {ProjectSearch} from './search'
import {stripFalsyValue, useDebouncedSetState} from 'utils'
import {useClient} from 'utils/api-client'
import styled from '@emotion/styled'

export function ProjectsScreen() {
  const [users, setUsers] = React.useState([])
  const [projects, setProjects] = React.useState([])
  const [params, setParams] = React.useState(() => ({
    name: '',
    principalId: '',
  }))
  const debouncedParams = useDebouncedSetState(params, 250)
  const client = useClient()

  React.useEffect(() => {
    client('projects', {
      data: stripFalsyValue(debouncedParams),
    }).then(setProjects)
  }, [client, debouncedParams])

  React.useEffect(() => {
    client('users').then(setUsers)
  }, [client])

  return (
    <Container>
      <h1>Project List</h1>
      <ProjectSearch params={params} setParams={setParams} users={users} />
      <ProjectList projects={projects} users={users} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
