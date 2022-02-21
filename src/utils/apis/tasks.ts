import {DELETE, PATCH, POST} from '../../constants'
import * as React from 'react'
import {QueryKey, useMutation, useQuery} from 'react-query'
import {Task, TaskTag, TaskType} from 'types'
import {useProjectId} from './projects'
import {
  useAddConfig,
  useClient,
  useDebouncedValue,
  useDeleteConfig,
  useEditConfig,
  useQueryParams,
  useReorderTaskConfig,
} from '../hooks'
import {ReorderProps} from './kanbans'

export const useTasks = (data?: Partial<Task>) => {
  const client = useClient()
  const queryKey = useTasksQueryKey()

  return useQuery<Task[], Error>({
    queryKey,
    queryFn: () => client('tasks', {data}),
    staleTime: 5000 * 60,
  })
}

export const useTasksQueryKey = () => {
  const taskSearchParams = useTasksSearchParams().tasksSearchParams
  const debouncedName = useDebouncedValue(taskSearchParams?.name, {delay: 250})

  return ['tasks', {...taskSearchParams, name: debouncedName}]
}

export const useTask = (id: number) => {
  const client = useClient()
  return useQuery<Task>({
    queryKey: ['task', {id}],
    queryFn: () => client(`tasks/${id}`),
    enabled: !!id,
    staleTime: 5000 * 60,
  })
}

export const useAddTask = (queryKey: QueryKey) => {
  const client = useClient()
  return useMutation(
    (data: Pick<Task, 'name' | 'kanbanId' | 'projectId' | 'note'>) =>
      client('tasks', {
        method: POST,
        data,
      }),
    useAddConfig(queryKey),
  )
}

export const useEditTask = (queryKey: QueryKey) => {
  const client = useClient()
  return useMutation(
    (data: Partial<Task>) =>
      client(`tasks/${data.id}`, {
        method: PATCH,
        data,
      }),
    useEditConfig(queryKey),
  )
}

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useClient()
  return useMutation(
    (id: number) =>
      client(`tasks/${id}`, {
        method: DELETE,
      }),
    useDeleteConfig(queryKey),
  )
}

export const useReorderTasks = (queryKey: QueryKey) => {
  const client = useClient()
  return useMutation(
    (data: ReorderProps) =>
      client('tasks/reorder', {
        data,
        method: POST,
      }),
    useReorderTaskConfig(queryKey),
  )
}

export const useTaskModal = () => {
  const [{isTaskModalOpen, targetItemId}, setTaskModalParams] = useQueryParams(
    'isTaskModalOpen',
    'targetItemId',
  )

  const openModal = () => setTaskModalParams({isTaskModalOpen: true})
  const closeModal = () =>
    setTaskModalParams({
      isTaskModalOpen: undefined,
      targetItemId: undefined,
    })

  const {data: editedItem, isLoading} = useTask(Number(targetItemId))
  const handleEditItem = React.useCallback(
    (id: number) => setTaskModalParams({targetItemId: id}),
    [setTaskModalParams],
  )

  return {
    modalState: {
      name: 'TaskModal',
      isModalOpen: isTaskModalOpen === 'true' || !!targetItemId,
      openModal,
      closeModal,
    },
    handleEditItem,
    isLoading,
    editedItem,
    targetItemId,
  } as const
}

export const useTaskTypes = () => {
  const client = useClient()
  return useQuery<TaskType[]>({
    queryKey: ['taskTypes'],
    queryFn: () => client('taskTypes'),
    staleTime: 5000 * 60,
  })
}

export const useTaskTags = () => {
  const client = useClient()
  return useQuery<TaskTag[]>({
    queryKey: ['taskTags'],
    queryFn: () => client('taskTags'),
    staleTime: 5000 * 60,
  })
}

export const useTasksSearchParams = () => {
  const [{name, typeId, assigneeId, tagId, authorId}, setTasksSearchParams] =
    useQueryParams('name', 'typeId', 'assigneeId', 'authorId', 'tagId')
  const projectId = useProjectId()

  return {
    tasksSearchParams: React.useMemo(
      () => ({
        projectId,
        name,
        authorId: Number(authorId) || undefined,
        typeId: Number(typeId) || undefined,
        assigneeId: Number(assigneeId) || undefined,
        tagId: Number(tagId) || undefined,
      }),
      [projectId, name, authorId, typeId, assigneeId, tagId],
    ),
    setTasksSearchParams,
  } as const
}
