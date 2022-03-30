import styled from '@emotion/styled'
import {Menu} from 'antd'
import {Link, Route, Routes, Navigate, useLocation} from 'react-router-dom'
import {KanbansScreen} from '../kanbans'
import {TaskGroupsScreen} from '../task-groups'

// hook location with antd menu selectedKeys
const useSubRoute = () => {
  const chunks = useLocation().pathname.split('/')
  return chunks[chunks.length - 1]
}

export const ProjectScreen = () => {
  const route = useSubRoute()
  return (
    <ProjectContainer>
      <Aside>
        <Menu style={{width: '100%'}} mode="inline" selectedKeys={[route]}>
          <Menu.Item key="kanbans">
            <Link to="kanbans">Kanbans</Link>
          </Menu.Item>
          <Menu.Item key="task-groups">
            <Link to="task-groups">Task Groups</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path="kanbans" element={<KanbansScreen />} />
          <Route path="task-groups" element={<TaskGroupsScreen />} />
          <Route path="*" element={<Navigate replace to="kanbans" />} />
        </Routes>
      </Main>
    </ProjectContainer>
  )
}

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`

const Main = styled.main`
  display: flex;
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
`

const ProjectContainer = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
`
