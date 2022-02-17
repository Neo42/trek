import {Button, Input} from 'antd'
import {Row, TaskTypeSelect, UserSelect} from 'components'
import * as React from 'react'
import {useTasksSearchParams} from 'utils'

export const KanbanSearch = () => {
  const [{name, typeId, assigneeId, authorId}, setTasksSearchParams] =
    useTasksSearchParams()

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
        onChange={(authorId) => setTasksSearchParams({authorId})}
      />
      <UserSelect
        defaultOptionName="Assignee"
        value={assigneeId}
        onChange={(assigneeId) => setTasksSearchParams({assigneeId})}
      />
      <TaskTypeSelect
        defaultOptionName="Task Types"
        value={typeId}
        onChange={(typeId) => setTasksSearchParams({typeId})}
      />
      <Button onClick={reset}>Clear Filters</Button>
    </Row>
  )
}
