import styled from '@emotion/styled'
import {Card} from 'antd'
import {Kanban, Task} from 'types'
import {useTaskTypes} from 'utils'
import {ReactComponent as IssueIcon} from 'assets/issue.svg'
import {ReactComponent as BugIcon} from 'assets/bug.svg'

export const KanbanColumn = ({
  kanban,
  tasks,
}: {
  kanban: Kanban
  tasks?: Task[]
}) => {
  return (
    <Column>
      <h3>{kanban.name}</h3>
      <TasksContainer>
        {tasks?.map((task) => (
          <Card key={task.id} style={{marginBottom: `0.5rem`}}>
            <div>{task.name}</div>
            <TaskTypeIcon id={task.typeId} />
          </Card>
        ))}
      </TasksContainer>
    </Column>
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

const Column = styled.div`
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
