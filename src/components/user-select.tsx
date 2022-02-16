import {useUsers} from 'utils'
import {GenericSelect} from './generic-select'
import {GenericSelectProps} from 'types'

export const UserSelect = (props: GenericSelectProps) => {
  const {data: users} = useUsers()
  return <GenericSelect options={users || []} {...props} />
}
