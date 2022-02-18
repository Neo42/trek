import {Card, Input} from 'antd'
import * as React from 'react'
import {useAddTask, useProjectId, useTasksQueryKey} from 'utils'

export const NewTask = ({kanbanId}: {kanbanId: number}) => {
  const [name, setName] = React.useState('')
  const [placeholder, setPlaceholder] = React.useState('Anything to be done?')
  const taskQueryKey = useTasksQueryKey()
  const {mutateAsync: addTask} = useAddTask(taskQueryKey)
  const projectId = useProjectId()
  const [inputMode, setInputMode] = React.useState(false)

  const submit = async () => {
    if (!name.length) {
      setPlaceholder('Please enter a task name')
      return
    }
    await addTask({name, projectId, kanbanId, note: ''})
    setInputMode(false)
    setName('')
  }

  const toggleInputMode = () => setInputMode(!inputMode)

  React.useEffect(() => {
    if (!inputMode) {
      setName('')
    }
  }, [inputMode])

  if (!inputMode) return <div onClick={toggleInputMode}>+ Add new Task</div>

  return (
    <Card>
      <Input
        autoFocus
        onBlur={toggleInputMode}
        onChange={(e) => setName(e.target.value)}
        onPressEnter={submit}
        placeholder={placeholder}
        value={name}
      />
    </Card>
  )
}
