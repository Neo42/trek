import styled from '@emotion/styled'
import {Button, Typography} from 'antd'
import {Helmet} from 'react-helmet-async'
import {ProjectList} from './list'
import {ProjectSearch} from './search'
import {ModalOpenButton, Row} from 'components'
import {
  useDebouncedSetState,
  // useHeadTitle
  useProjects,
  useProjectSearchParams,
  useUsers,
} from 'utils'

export function ProjectsScreen() {
  // useHeadTitle('Project List | Trek')
  const {projectSearchParams, setProjectSearchParams} = useProjectSearchParams()
  const debouncedProjectSearchParams = useDebouncedSetState(
    projectSearchParams,
    {delay: 250},
  )
  const {
    data: projects,
    error,
    isLoading,
  } = useProjects(debouncedProjectSearchParams)
  const {data: users} = useUsers()

  return (
    <Container>
      <Helmet>
        <title>Project List | Trek</title>
      </Helmet>
      <Row spaceBetween>
        <h1>Project List</h1>
        <ModalOpenButton>
          <Button>Create Project</Button>
        </ModalOpenButton>
      </Row>
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <ProjectSearch
        params={projectSearchParams}
        setParams={setProjectSearchParams}
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
