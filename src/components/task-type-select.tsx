import {useTaskTypes} from 'utils'
import {GenericSelect} from './generic-select'
import {GenericSelectProps} from 'types'

export const TaskTypeSelect = (props: GenericSelectProps) => {
  const {data: taskTypes} = useTaskTypes()
  return <GenericSelect options={taskTypes || []} {...props} />
}
