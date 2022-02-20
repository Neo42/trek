import {QueryKey, useMutation, useQuery} from 'react-query'
import {useAddConfig, useClient, useDeleteConfig} from './hooks'
import {useProjectId} from './projects'
import {DELETE, POST} from '../constants'
import {TaskGroup} from 'types'

export const useTaskGroups = (data?: Partial<TaskGroup>) => {
  const client = useClient()
  return useQuery<TaskGroup[], Error>({
    queryKey: ['taskGroups', data],
    queryFn: () => client('taskGroups', {data}),
    staleTime: 5000 * 60,
  })
}

export const useAddTaskGroup = (queryKey: QueryKey) => {
  const client = useClient()
  return useMutation(
    (data: Partial<TaskGroup>) =>
      client('taskGroups', {
        method: POST,
        data,
      }),
    useAddConfig(queryKey),
  )
}

export const useDeleteTaskGroup = (queryKey: QueryKey) => {
  const client = useClient()
  return useMutation(
    (id: number) =>
      client(`taskGroups/${id}`, {
        method: DELETE,
      }),
    useDeleteConfig(queryKey),
  )
}

export const useTaskGroupsQueryKey = () => [
  'taskGroups',
  {projectId: useTaskGroupsSearchParams()},
]
export const useTaskGroupsSearchParams = () => ({projectId: useProjectId()})
