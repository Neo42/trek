import {QueryKey, useMutation, useQuery} from 'react-query'
import {DELETE, POST} from '../constants'
import {Kanban} from 'types'
import {
  useAddConfig,
  useClient,
  useDeleteConfig,
  useReorderKanbanConfig,
} from './hooks'
import {useProjectId} from './projects'

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

export interface ReorderProps {
  fromId: number
  referenceId: number
  type: 'before' | 'after'
  fromKanbanId?: number
  toKanbanId?: number
}

export const useReorderKanbans = (queryKey: QueryKey) => {
  const client = useClient()
  return useMutation(
    (data: ReorderProps) =>
      client('kanbans/reorder', {
        data,
        method: POST,
      }),
    useReorderKanbanConfig(queryKey),
  )
}

export const useKanbansQueryKey = () => ['kanbans', {projectId: useProjectId()}]
