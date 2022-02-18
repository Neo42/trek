import {Button} from 'antd'
import {Helmet} from 'react-helmet-async'
import {ProjectList} from './list'
import {ProjectSearch} from './search'
import {ErrorMessage, ModalOpenButton, Row, ScreenContainer} from 'components'
import {
  useDebouncedValue,
  useProjects,
  useProjectSearchParams,
  useUsers,
} from 'utils'

export function ProjectsScreen() {
  const {projectSearchParams, setProjectSearchParams} = useProjectSearchParams()
  const debouncedProjectSearchParams = useDebouncedValue(projectSearchParams, {
    delay: 250,
  })

  const {
    data: projects,
    error,
    isLoading,
  } = useProjects(debouncedProjectSearchParams)
  const {data: users} = useUsers()

  return (
    <ScreenContainer>
      <Helmet>
        <title>Project List | Trek</title>
      </Helmet>
      <Row spaceBetween>
        <h1>Project List</h1>
        <ModalOpenButton>
          <Button>Create Project</Button>
        </ModalOpenButton>
      </Row>
      <ErrorMessage error={error} />
      <ProjectSearch
        params={projectSearchParams}
        setParams={setProjectSearchParams}
      />
      <ProjectList
        dataSource={projects ?? []}
        loading={isLoading}
        users={users ?? []}
      />
    </ScreenContainer>
  )
}

// ProjectsScreen.whyDidYouRender = true
