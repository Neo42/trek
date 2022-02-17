import * as React from 'react'
import {useQuery} from 'react-query'
import {Task, TaskTag, TaskType} from 'types'
import {useClient, useQueryParams} from './hooks'
import {useCurrentProjectId} from './projects'

export const useTasks = (data?: Partial<Task>) => {
  const client = useClient()
  const queryKey = useTasksQueryKey()
  return useQuery<Task[], Error>({
    queryKey,
    queryFn: () => client('tasks', {data}),
    staleTime: 5000 * 60,
  })
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
  const projectId = useCurrentProjectId()

  return [
    React.useMemo(
      () => ({
        projectId,
        name: name,
        authorId: Number(authorId) || undefined,
        typeId: Number(typeId) || undefined,
        assigneeId: Number(assigneeId) || undefined,
        tagId: Number(tagId) || undefined,
      }),
      [assigneeId, name, projectId, tagId, typeId, authorId],
    ),
    setTasksSearchParams,
  ] as const
}

const useTasksQueryKey = () => ['tasks', useTasksSearchParams()[0]]
