import * as React from 'react'
import {Spin} from 'antd'
import styled from '@emotion/styled'
import {Helmet} from 'react-helmet-async'
import {DragDropContext, DropResult} from 'react-beautiful-dnd'
import {
  useProjectId,
  useKanbans,
  useProject,
  useTasks,
  useTasksSearchParams,
  useTaskModal,
  useKanbansQueryKey,
  useReorderKanbans,
  useReorderTasks,
  useTasksQueryKey,
  useKanbanSearchParams,
} from 'utils'
import {
  Draggable,
  Droppable,
  DroppableChildren,
  ModalProvider,
  Profiler,
  ScreenContainer,
  TaskModal,
} from 'components'
import {KanbanBoard} from './kanban'
import {KanbanSearch} from './search'
import {NewKanban} from './new-kanban'

export const KanbansScreen = () => {
  const projectId = useProjectId()
  const {tasksSearchParams} = useTasksSearchParams()

  const {data: currentProject} = useProject(projectId)
  const {data: kanbans, isLoading: areKanbansLoading} = useKanbans(
    useKanbanSearchParams(),
  )
  const {data: tasks, isLoading: areTasksLoading} = useTasks(tasksSearchParams)
  const isLoading = areKanbansLoading || areTasksLoading
  const {modalState} = useTaskModal()

  const onDragEnd = useDragEnd()

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
          <Profiler id="kanbans">
            <DragDropContext onDragEnd={onDragEnd}>
              <Kanbans>
                <Droppable
                  type="KANBAN"
                  direction="horizontal"
                  droppableId="kanban"
                >
                  <DroppableChildren style={{display: 'flex'}}>
                    {kanbans?.map((kanban, index) => (
                      <Draggable
                        draggableId={'kanban' + kanban.id}
                        index={index}
                        key={'draggable' + kanban.id}
                      >
                        <KanbanBoard
                          key={kanban.id}
                          {...{kanban}}
                          tasks={tasks?.filter(
                            (task) => task.kanbanId === kanban.id,
                          )}
                        />
                      </Draggable>
                    ))}
                  </DroppableChildren>
                </Droppable>
                <NewKanban />
              </Kanbans>
            </DragDropContext>
          </Profiler>
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

export const useDragEnd = () => {
  const {data: kanbans} = useKanbans({projectId: useProjectId()})
  const {data: tasks = []} = useTasks(useTasksSearchParams().tasksSearchParams)
  const {mutate: reorderKanbans} = useReorderKanbans(useKanbansQueryKey())
  const {mutate: reorderTasks} = useReorderTasks(useTasksQueryKey())

  return React.useCallback(
    ({type, source, destination}: DropResult) => {
      if (!destination) return
      if (type === 'KANBAN') {
        const fromId = kanbans?.[source.index].id
        const toId = kanbans?.[destination.index].id
        if (!fromId || !toId || fromId === toId) return
        const type = destination.index > source.index ? 'after' : 'before'
        reorderKanbans({fromId, referenceId: toId, type})
      }

      if (type === 'TASK') {
        const fromKanbanId = +source.droppableId
        const toKanbanId = +destination.droppableId
        const fromTask = tasks.filter((task) => task.kanbanId === fromKanbanId)[
          source.index
        ]
        const toTask = tasks.filter((task) => task.kanbanId === toKanbanId)[
          destination.index
        ]
        if (fromTask?.id === toTask?.id) {
          return
        }
        reorderTasks({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromKanbanId,
          toKanbanId,
          type:
            fromKanbanId === toKanbanId && destination.index > source.index
              ? 'after'
              : 'before',
        })
      }
    },
    [kanbans, reorderKanbans, reorderTasks, tasks],
  )
}
