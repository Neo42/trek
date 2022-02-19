import {Spin} from 'antd'
import styled from '@emotion/styled'
import {Helmet} from 'react-helmet-async'
import {
  useProjectId,
  useKanbans,
  useProject,
  useTasks,
  useTasksSearchParams,
  useTaskModal,
} from 'utils'
import {KanbanBoard} from './kanban'
import {KanbanSearch} from './search'
import {ModalProvider, ScreenContainer, TaskModal} from 'components'
import {NewKanban} from './new-kanban'

export const KanbansScreen = () => {
  const projectId = useProjectId()
  const {tasksSearchParams} = useTasksSearchParams()

  const {data: currentProject} = useProject(projectId)
  const {data: kanbans, isLoading: areKanbansLoading} = useKanbans({projectId})
  const {data: tasks, isLoading: areTasksLoading} = useTasks(tasksSearchParams)
  const isLoading = areKanbansLoading || areTasksLoading
  const {modalState} = useTaskModal()

  return (
    <ScreenContainer>
      <ModalProvider {...{modalState}}>
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
              <KanbanBoard
                key={kanban.id}
                {...{kanban}}
                tasks={tasks?.filter((task) => task.kanbanId === kanban.id)}
              />
            ))}
            <NewKanban />
          </Kanbans>
        )}
        <TaskModal />
      </ModalProvider>
    </ScreenContainer>
  )
}

export const Kanbans = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`
