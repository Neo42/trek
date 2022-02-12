import {Button, Dropdown, Menu} from 'antd'
import styled from '@emotion/styled'
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom'
import {ProjectsScreen} from 'screens/projects'
import {ProjectScreen} from 'screens/project'
import {useAuth} from 'auth/context'
import {Row} from 'components'
import {ReactComponent as Logo} from 'assets/logo.svg'

export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        <Routes>
          <Route path="projects" element={<ProjectsScreen />} />
          <Route path="projects/:projectId/*" element={<ProjectScreen />} />
          <Route path="*" element={<Navigate replace to={`projects`} />} />
        </Routes>
      </Main>
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

  return (
    <Header spaceBetween={true}>
      <HeaderLeft gap={true}>
        <Button
          style={{display: 'flex', placeItems: 'center'}}
          type="link"
          onClick={() => navigate('/')}
        >
          <Logo height="5rem" width="5rem" />
        </Button>
        <h2>Projects</h2>
        <h2>Users</h2>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="logout">
                <Button type="link" onClick={logout}>
                  Logout
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button
            type="link"
            onClick={(e) => {
              e.preventDefault()
            }}
          >
            Hi, {user?.name}
          </Button>
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
