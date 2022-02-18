import {Button, Input} from 'antd'
import {Row, TaskTypeSelect, UserSelect} from 'components'
import {useTasksSearchParams} from 'utils'

export const KanbanSearch = () => {
  const {
    tasksSearchParams: {name, assigneeId, authorId, typeId},
    setTasksSearchParams,
  } = useTasksSearchParams()

  const reset = () =>
    setTasksSearchParams({
      name: undefined,
      typeId: undefined,
      authorId: undefined,
      assigneeId: undefined,
      tagId: undefined,
    })

  return (
    <Row marginBottom={4} gap>
      <Input
        style={{width: '20rem'}}
        placeholder="Task Name"
        value={name}
        onChange={(e) => setTasksSearchParams({name: e.target.value})}
      />
      <UserSelect
        defaultOptionName="Author"
        value={authorId}
        onChange={(value) =>
          setTasksSearchParams({authorId: value || undefined})
        }
      />
      <UserSelect
        defaultOptionName="Assignee"
        value={assigneeId}
        onChange={(value) =>
          setTasksSearchParams({assigneeId: value || undefined})
        }
      />
      <TaskTypeSelect
        defaultOptionName="Task Types"
        value={typeId}
        onChange={(value) => setTasksSearchParams({typeId: value || undefined})}
      />
      <Button onClick={reset}>Clear Filters</Button>
    </Row>
  )
}
