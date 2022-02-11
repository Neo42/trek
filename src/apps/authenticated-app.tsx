import {ProjectsScreen} from 'screens/projects'
import {useAuth} from 'auth/context'
import styled from '@emotion/styled'
import {Button, Dropdown, Menu} from 'antd'
import {Row} from 'components'
import {ReactComponent as Logo} from 'assets/logo.svg'

export const AuthenticatedApp = () => {
  const {user, logout} = useAuth()
  return (
    <Container>
      <Header spaceBetween={true}>
        <HeaderLeft gap={true}>
          <Logo width="8rem" height="6rem" color="rgb(38,132,255)" />
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
      <Main>
        <ProjectsScreen />
      </Main>
    </Container>
  )
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``
const Main = styled.main``
