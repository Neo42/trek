import * as React from 'react'
import {Project} from 'screens/projects/index.d'
import {sanitizeObject, useAsync, useClient, useQueryParams} from 'utils'

export const useProjects = (params?: Partial<Project>) => {
  const client = useClient()
  const {run, ...result} = useAsync<Project[]>()
  React.useEffect(() => {
    run(
      client('projects', {
        data: sanitizeObject(params ?? {}),
      }),
    )
  }, [client, params, run])
  return result
}

export const useProjectSearchParams = () => {
  const keys = React.useMemo<['name', 'principalId']>(
    () => ['name', 'principalId'],
    [],
  )

  const [searchParamsWithStringId, setProjectSearchParams] =
    useQueryParams(keys)
  const projectSearchParams = React.useMemo(
    () => ({
      ...searchParamsWithStringId,
      principalId: Number(searchParamsWithStringId.principalId) || undefined,
    }),
    [searchParamsWithStringId],
  )

  return {projectSearchParams, setProjectSearchParams}
}

export const useProjectModal = () => {
  const keys = React.useMemo<['isProjectModalOpen']>(
    () => ['isProjectModalOpen'],
    [],
  )

  const [{isProjectModalOpen}, setSearchParams] = useQueryParams(keys)
  const openModal = () => setSearchParams({isProjectModalOpen: true})
  const closeModal = () => setSearchParams({isProjectModalOpen: undefined})

  return {
    name: 'ProjectModal',
    isModalOpen: isProjectModalOpen === 'true',
    openModal,
    closeModal,
  } as const
}
