import * as React from 'react'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {Project} from 'screens/projects/index.d'
import {useClient, useQueryParams} from 'utils'
import {PATCH, POST} from '../constants'

export const useProjects = (data?: Partial<Project>) => {
  const client = useClient()
  return useQuery<Project[], Error>(
    ['projects', data],
    () => client('projects', {data}),
    {staleTime: Infinity},
  )
}

export const useEditProject = () => {
  const client = useClient()
  const queryClient = useQueryClient()
  return useMutation(
    (data: Partial<Project>) =>
      client(`projects/${data.id}`, {
        method: PATCH,
        data,
      }),
    {onSettled: () => queryClient.invalidateQueries('projects')},
  )
}

export const useAddProject = () => {
  const client = useClient()
  const queryClient = useQueryClient()
  return useMutation(
    (data: Partial<Project>) =>
      client('projects', {
        method: POST,
        data,
      }),
    {onSettled: () => queryClient.invalidateQueries('projects')},
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
