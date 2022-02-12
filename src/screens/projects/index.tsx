import * as React from 'react'
import {ProjectList} from './list'
import {ProjectSearch} from './search'
import styled from '@emotion/styled'
import {Typography} from 'antd'
import {
  useDebouncedSetState,
  // useHeadTitle
  useProjects,
  useQueryParams,
  useUsers,
} from 'utils'
import {Helmet} from 'react-helmet-async'

export function ProjectsScreen() {
  // useHeadTitle('Project List | Trek')
  const keys = React.useMemo<['name', 'principalId']>(
    () => ['name', 'principalId'],
    [],
  )
  const [queryParams, setQueryParams] = useQueryParams(keys)
  const debouncedParams = useDebouncedSetState(queryParams, 250)
  const {data: projects, error, isLoading} = useProjects(debouncedParams)
  const {data: users} = useUsers()

  return (
    <Container>
      <Helmet>
        <title>Project List</title>
      </Helmet>
      <h1>Project List</h1>
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <ProjectSearch
        params={queryParams}
        setParams={setQueryParams}
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

// ProjectsScreen.whyDidYouRender = true

const Container = styled.div`
  padding: 3.2rem;
`
