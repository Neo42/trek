import {Button} from 'antd'
import {ProjectList} from './list'
import {ProjectSearch} from './search'
import {
  ErrorMessage,
  ModalOpenButton,
  ModalProvider,
  ProjectModal,
  Row,
  ScreenContainer,
} from 'components'
import {
  useDebouncedValue,
  useHeadTitle,
  useProjectModal,
  useProjects,
  useProjectSearchParams,
  useUsers,
} from 'utils'

export function ProjectsScreen() {
  useHeadTitle('Project List | Trek')
  const {modalState} = useProjectModal()
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
      <ModalProvider {...{modalState}}>
        <Row spaceBetween>
          <h1>Project List</h1>
          <ModalOpenButton>
            <Button>Create Project</Button>
          </ModalOpenButton>
        </Row>
        <ErrorMessage {...{error}} />
        <ProjectSearch
          params={projectSearchParams}
          setParams={setProjectSearchParams}
        />
        <ProjectList
          dataSource={projects ?? []}
          loading={isLoading}
          users={users ?? []}
        />
        <ProjectModal />
      </ModalProvider>
    </ScreenContainer>
  )
}

// ProjectsScreen.whyDidYouRender = true
