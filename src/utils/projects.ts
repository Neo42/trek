import * as React from 'react'
import {QueryKey, useMutation, useQuery} from 'react-query'
import {useLocation} from 'react-router-dom'
import {
  useClient,
  useQueryParams,
  useEditConfig,
  useAddConfig,
  useDeleteConfig,
} from 'utils'
import {PATCH, POST, DELETE} from '../constants'
import {Project} from 'types'

export const useProjects = (data?: Partial<Project>) => {
  const client = useClient()
  return useQuery<Project[], Error>({
    queryKey: ['projects', data],
    queryFn: () => client('projects', {data}),
    staleTime: 5000 * 60,
  })
}

export const useEditProject = (queryKey: QueryKey) => {
  const client = useClient()
  return useMutation(
    (data: Partial<Project>) =>
      client(`projects/${data.id}`, {
        method: PATCH,
        data,
      }),
    useEditConfig(queryKey),
  )
}

export const useAddProject = (queryKey: QueryKey) => {
  const client = useClient()
  return useMutation(
    (data: Partial<Project>) =>
      client('projects', {
        method: POST,
        data,
      }),
    useAddConfig(queryKey),
  )
}

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useClient()
  return useMutation(
    (id: number) =>
      client(`projects/${id}`, {
        method: DELETE,
      }),
    useDeleteConfig(queryKey),
  )
}

export const useProject = (id: number) => {
  const client = useClient()
  return useQuery<Project>({
    queryKey: ['project', {id}],
    queryFn: () => client(`projects/${id}`),
    enabled: !!id,
    staleTime: 5000 * 60,
  })
}

export const useProjectId = () => {
  const {pathname} = useLocation()
  const id = pathname.match(/projects\/(\d+)/)?.[1]
  return Number(id)
}

export const useProjectSearchParams = () => {
  const [{name, ownerId}, setProjectSearchParams] = useQueryParams(
    'name',
    'ownerId',
  )
  const projectSearchParams = React.useMemo(
    () => ({
      name,
      ownerId: Number(ownerId) || undefined,
    }),
    [name, ownerId],
  )

  return {projectSearchParams, setProjectSearchParams}
}

export const useProjectQueryKey = () => [
  'projects',
  useProjectSearchParams().projectSearchParams,
]

export const useProjectModal = () => {
  const [{isProjectModalOpen, targetProjectId}, setProjectModalParams] =
    useQueryParams('isProjectModalOpen', 'targetProjectId')

  const openModal = () => setProjectModalParams({isProjectModalOpen: true})
  const closeModal = () =>
    setProjectModalParams({
      isProjectModalOpen: undefined,
      targetProjectId: undefined,
    })

  const {data: editedItem, isLoading} = useProject(Number(targetProjectId))
  const handleEditItem = React.useCallback(
    (id: number) => setProjectModalParams({targetProjectId: id}),
    [setProjectModalParams],
  )
  return {
    modalState: {
      name: 'ProjectModal',
      isModalOpen: isProjectModalOpen === 'true' || !!targetProjectId,
      openModal,
      closeModal,
    },
    handleEditItem,
    isLoading,
    editedItem,
  } as const
}
