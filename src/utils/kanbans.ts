import {DELETE, POST} from '../constants'
import {QueryKey, useMutation, useQuery} from 'react-query'
import {Kanban} from 'types'
import {useAddConfig, useClient, useDeleteConfig} from './hooks'

export const useKanbans = (data?: Partial<Kanban>) => {
  const client = useClient()
  return useQuery<Kanban[], Error>({
    queryKey: ['kanbans', data],
    queryFn: () => client('kanbans', {data}),
    staleTime: 5000 * 60,
  })
}

export const useAddKanban = (queryKey: QueryKey) => {
  const client = useClient()
  return useMutation(
    (data: Partial<Kanban>) =>
      client('kanbans', {
        method: POST,
        data,
      }),
    useAddConfig(queryKey),
  )
}

export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useClient()
  return useMutation(
    (id: number) =>
      client(`kanbans/${id}`, {
        method: DELETE,
      }),
    useDeleteConfig(queryKey),
  )
}

export const useKanbansQueryKey = ({
  name,
  projectId,
}: {
  name: string
  projectId: number
}) => ['kanbans', {name, projectId}]
