import {useAsync, useClient} from 'utils'
import {Project} from 'screens/projects/index.d'
import {PATCH, POST} from '../constants'

export const useUpdateListItem = () => {
  const client = useClient()
  const {run} = useAsync()

  const update = (data: Partial<Project>) => {
    return run(
      client(`projects/${data.id}`, {
        method: PATCH,
        data,
      }),
    )
  }

  return {update}
}

export const useCreateListItem = () => {
  const client = useClient()
  const {run} = useAsync()

  const create = (data: Partial<Project>) => {
    return run(
      client(`projects/${data.id}`, {
        method: POST,
        data,
      }),
    )
  }

  return {create}
}
