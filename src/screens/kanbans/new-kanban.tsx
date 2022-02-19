import {Input} from 'antd'
import * as React from 'react'
import {useAddKanban, useKanbansQueryKey, useProjectId} from 'utils'
import {BoardContainer} from './kanban'

export const NewKanban = () => {
  const [name, setName] = React.useState('')
  const [placeholder, setPlaceholder] = React.useState('Create a New Kanban')
  const projectId = useProjectId()
  const kanbanQueryKey = useKanbansQueryKey({name, projectId})
  const {mutateAsync: addKanban} = useAddKanban(kanbanQueryKey)

  const submit = async () => {
    if (!name.length) {
      setPlaceholder('Please enter a name for new kanban')
      return
    }
    await addKanban({name, projectId})
    setName('')
  }

  return (
    <BoardContainer>
      <Input
        size="large"
        {...{placeholder}}
        onPressEnter={submit}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </BoardContainer>
  )
}
