import * as React from 'react'
import {ProjectList} from './list'
import {ProjectSearch} from './search'
import styled from '@emotion/styled'
import {Typography} from 'antd'
import {useProjects, useDebouncedSetState, useUsers} from 'utils'

export function ProjectsScreen() {
  const [params, setParams] = React.useState(() => ({
    name: '',
    principalId: '',
  }))
  const debouncedParams = useDebouncedSetState(params, 250)
  const {data: projects, error, isLoading} = useProjects(debouncedParams)
  const {data: users} = useUsers()

  return (
    <Container>
      <h1>Project List</h1>
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <ProjectSearch
        params={params}
        setParams={setParams}
        users={users ?? []}
      />
      <ProjectList
        dataSource={projects ?? []}
        loading={isLoading}
        users={users ?? []}
      />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
