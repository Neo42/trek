import {ProjectsScreen} from 'screens/projects'
import {useAuth} from 'auth/context'
import styled from '@emotion/styled'

export function AuthenticatedApp() {
  const {logout} = useAuth()
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <h3>Logo</h3>
          <h3>Projects</h3>
          <h3>Users</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>Logout</button>
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
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas:
    'header header header'
    'nav main aside'
    'footer footer footer';
  height: 100vh;
  gap: 10rem;
`

const Header = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`
const HeaderRight = styled.div``

const Main = styled.main`
  grid-area: main;
`
