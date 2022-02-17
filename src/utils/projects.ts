import * as React from 'react'
import {QueryKey, useMutation, useQuery} from 'react-query'
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
  return useQuery<Project[], Error>(['projects', data], () =>
    client('projects', {data}),
  )
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
  return useQuery<Project>(['project', {id}], () => client(`projects/${id}`), {
    enabled: !!id,
  })
}

export const useProjectSearchParams = () => {
  const keys = React.useMemo<['name', 'ownerId']>(() => ['name', 'ownerId'], [])
  const [searchParamsWithStringId, setProjectSearchParams] =
    useQueryParams(keys)
  const projectSearchParams = React.useMemo(
    () => ({
      ...searchParamsWithStringId,
      ownerId: Number(searchParamsWithStringId.ownerId) || undefined,
    }),
    [searchParamsWithStringId],
  )

  return {projectSearchParams, setProjectSearchParams}
}

export const useProjectQueryKey = () => [
  'projects',
  useProjectSearchParams().projectSearchParams,
]

export const useProjectModal = () => {
  const keys = React.useMemo<['isProjectModalOpen', 'targetProjectId']>(
    () => ['isProjectModalOpen', 'targetProjectId'],
    [],
  )

  const [{isProjectModalOpen, targetProjectId}, setProjectModalParams] =
    useQueryParams(keys)
  const openModal = () => setProjectModalParams({isProjectModalOpen: true})
  const closeModal = () =>
    setProjectModalParams({
      isProjectModalOpen: undefined,
      targetProjectId: undefined,
    })

  const {data: editedProject, isLoading} = useProject(Number(targetProjectId))
  const handleEditProject = (id: number) =>
    setProjectModalParams({targetProjectId: id})

  return {
    name: 'ProjectModal',
    isModalOpen: isProjectModalOpen === 'true' || !!targetProjectId,
    openModal,
    closeModal,
    isLoading,
    editedProject,
    handleEditProject,
  } as const
}
