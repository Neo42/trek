import * as React from 'react'
import styled from '@emotion/styled'
import {Button, Card, Dropdown, Menu, Modal} from 'antd'
import {Kanban, Task} from 'types'
import {
  useTaskModal,
  useTaskTypes,
  useTasksSearchParams,
  useDeleteKanban,
  useKanbansQueryKey,
} from 'utils'
import {ReactComponent as IssueIcon} from 'assets/issue.svg'
import {ReactComponent as BugIcon} from 'assets/bug.svg'
import {
  Draggable,
  Droppable,
  DroppableChildren,
  Row,
  TaskSearchHighlight,
} from 'components'
import {NewTask} from './new-task'

type KanBanBoardProps = {
  kanban: Kanban
  tasks?: Task[]
}

export const KanbanBoard = React.forwardRef<HTMLDivElement, KanBanBoardProps>(
  (
    {
      // TODO - reduce taskTypes request count
      kanban,
      tasks,
      ...props
    }: KanBanBoardProps,
    ref,
  ) => {
    return (
      <BoardContainer ref={ref} {...props}>
        <Row spaceBetween>
          <h3>{kanban.name}</h3>
          <KanbanMore {...{kanban}} />
        </Row>
        <TasksContainer>
          <Droppable
            type="TASK"
            direction="vertical"
            droppableId={String(kanban.id)}
          >
            <DroppableChildren style={{minHeight: '1px'}}>
              {tasks?.map((task, index) => (
                <Draggable
                  draggableId={String(task.id)}
                  index={index}
                  key={'task' + task.id}
                >
                  <div>
                    <TaskCard key={task.id} task={task} />
                  </div>
                </Draggable>
              ))}
            </DroppableChildren>
          </Droppable>
          <NewTask kanbanId={kanban.id} />
        </TasksContainer>
      </BoardContainer>
    )
  },
)

const KanbanMore = ({kanban}: {kanban: Kanban}) => {
  const {mutateAsync: deleteKanban} = useDeleteKanban(useKanbansQueryKey())

  const handleDelete = () => {
    Modal.confirm({
      okText: 'Confirm',
      cancelText: 'Cancel',
      content: 'Are you sure you want to delete this kanban?',
      onOk: () => deleteKanban(kanban.id),
    })
  }

  const overlay = (
    <Menu>
      <Menu.Item key="delete">
        <Button danger type="link" onClick={handleDelete}>
          Delete
        </Button>
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown {...{overlay}} placement="bottomCenter">
      <Button type="link">···</Button>
    </Dropdown>
  )
}

const TaskCard = ({task}: {task: Task}) => {
  const {handleEditItem: handleEditTask} = useTaskModal()
  const {
    tasksSearchParams: {name},
  } = useTasksSearchParams()
  return (
    <Card
      key={task.id}
      onClick={() => handleEditTask(task.id)}
      style={{marginBottom: `0.5rem`, cursor: 'pointer'}}
    >
      <div>
        <TaskSearchHighlight name={task.name} keyword={name} />
      </div>
      <TaskTypeIcon id={task.typeId} />
    </Card>
  )
}

const TaskTypeIcon = ({id}: {id: number}) => {
  const {data: taskTypes} = useTaskTypes()
  const taskTypeName = taskTypes?.find((taskType) => taskType.id === id)?.name

  return taskTypeName ? (
    taskTypeName === 'issue' ? (
      <IssueIcon />
    ) : (
      <BugIcon />
    )
  ) : null
}

export const BoardContainer = styled.div`
  min-width: 25rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`
