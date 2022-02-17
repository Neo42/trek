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

export const KanbansScreen = () => {
  const projectId = useCurrentProjectId()
  const [tasksParams] = useTasksSearchParams()

  const {data: currentProject} = useProject(projectId)
  const {data: kanbans} = useKanbans({projectId})
  const {data: tasks} = useTasks(tasksParams)

  return (
    <>
      <Helmet>
        <title>Kanban List</title>
      </Helmet>
      <h1>{currentProject?.name} Kanban</h1>
      <KanbanSearch />
      <Kanbans>
        {kanbans?.map((kanban) => (
          <KanbanColumn
            key={kanban.id}
            kanban={kanban}
            tasks={tasks?.filter((task) => task.kanbanId === kanban.id)}
          />
        ))}
      </Kanbans>
    </>
  )
}

const Kanbans = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`
