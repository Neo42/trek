import {useQuery} from 'react-query'
import {Kanban} from 'types'
import {useClient} from './hooks'

export const useKanbans = (data?: Partial<Kanban>) => {
  const client = useClient()
  return useQuery<Kanban[], Error>({
    queryKey: ['kanbans', data],
    queryFn: () => client('kanbans', {data}),
    staleTime: 5000 * 60,
  })
}
