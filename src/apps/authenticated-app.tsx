import {Dropdown, Menu} from 'antd'
import styled from '@emotion/styled'
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom'
import {ProjectsScreen} from 'screens/projects'
import {ProjectScreen} from 'screens/project'
import {useAuth} from 'auth/context'
import {ModalProvider, NoPaddingButton, Popover, Row} from 'components'
import {ReactComponent as Logo} from 'assets/logo.svg'
import {useProjects, useProjectModal} from 'utils'
import {ProjectModal} from '../components/project-modal'

export const AuthenticatedApp = () => {
  const projectModalState = useProjectModal()

  return (
    <Container>
      <ModalProvider modalState={projectModalState}>
        <PageHeader />
        <Main>
          <Routes>
            <Route path="projects" element={<ProjectsScreen />} />
            <Route path="projects/:projectId/*" element={<ProjectScreen />} />
            <Route path="*" element={<Navigate replace to="projects" />} />
          </Routes>
        </Main>
        <ProjectModal />
      </ModalProvider>
    </Container>
  )
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`

const PageHeader = () => {
  const {user, logout} = useAuth()
  const navigate = useNavigate()
  const {data: projects} = useProjects()

  return (
    <Header spaceBetween>
      <HeaderLeft gap>
        <NoPaddingButton
          type="link"
          style={{display: 'flex', placeItems: 'center'}}
          onClick={() => navigate('/')}
        >
          <Logo height="5rem" width="5rem" />
        </NoPaddingButton>
        <Popover
          title="Projects"
          contentTitle="Pinned Projects"
          buttonText="Create Project"
          items={projects?.filter((project) => project.pinned)}
        />
        <span>Users</span>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="logout">
                <NoPaddingButton type="link" onClick={logout}>
                  Logout
                </NoPaddingButton>
              </Menu.Item>
            </Menu>
          }
        >
          <NoPaddingButton
            type="link"
            onClick={(e) => {
              e.preventDefault()
            }}
          >
            Hi, {user?.name}
          </NoPaddingButton>
        </Dropdown>
      </HeaderRight>
    </Header>
  )
}

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``
const Main = styled.main``
