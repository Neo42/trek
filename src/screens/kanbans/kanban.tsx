import styled from '@emotion/styled'
import {Button, Card, Dropdown, Menu, Modal} from 'antd'
import {Kanban, Task} from 'types'
import {
  useTaskModal,
  useTaskTypes,
  useTasksSearchParams,
  useDeleteKanban,
  useKanbansQueryKey,
  useProjectId,
} from 'utils'
import {ReactComponent as IssueIcon} from 'assets/issue.svg'
import {ReactComponent as BugIcon} from 'assets/bug.svg'
import {Row, TaskSearchHighlight} from 'components'
import {NewTask} from './new-task'

export const KanbanBoard = ({
  // TODO - reduce taskTypes request count
  kanban,
  tasks,
}: {
  kanban: Kanban
  tasks?: Task[]
}) => {
  return (
    <BoardContainer>
      <Row spaceBetween>
        <h3>{kanban.name}</h3>
        <KanbanMore {...{kanban}} />
      </Row>
      <TasksContainer>
        {tasks?.map((task) => (
          <TaskCard key={task.id} {...{task}} />
        ))}
        <NewTask kanbanId={kanban.id} />
      </TasksContainer>
    </BoardContainer>
  )
}

const KanbanMore = ({kanban}: {kanban: Kanban}) => {
  const projectId = useProjectId()
  const {mutateAsync: deleteKanban} = useDeleteKanban(
    useKanbansQueryKey({name: kanban.name, projectId}),
  )

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
      <Menu.Item>
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
  min-width: 27rem;
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
