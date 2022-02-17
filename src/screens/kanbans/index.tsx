import {Helmet} from 'react-helmet-async'
import {
  useCurrentProjectId,
  useKanbans,
  useProject,
  useTasks,
  useTasksSearchParams,
} from 'utils'
import {KanbanColumn} from './kanban'
import styled from '@emotion/styled'
import {KanbanSearch} from './search'
import {ScreenContainer} from 'components'
import {Spin} from 'antd'

export const KanbansScreen = () => {
  const projectId = useCurrentProjectId()
  const [tasksParams] = useTasksSearchParams()

  const {data: currentProject} = useProject(projectId)
  const {data: kanbans, isLoading: areKanbansLoading} = useKanbans({projectId})
  const {data: tasks, isLoading: areTasksLoading} = useTasks(tasksParams)
  const isLoading = areKanbansLoading || areTasksLoading

  return (
    <ScreenContainer>
      <Helmet>
        <title>Kanban List</title>
      </Helmet>
      <h1>{currentProject?.name} Kanban</h1>
      <KanbanSearch />
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <Kanbans>
          {kanbans?.map((kanban) => (
            <KanbanColumn
              key={kanban.id}
              kanban={kanban}
              tasks={tasks?.filter((task) => task.kanbanId === kanban.id)}
            />
          ))}
        </Kanbans>
      )}
    </ScreenContainer>
  )
}

const Kanbans = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`
