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
  const [queryParams, setQueryParams] = useQueryParams(keys)
  const paramsWithNumberId = React.useMemo(
    () => ({
      ...queryParams,
      principalId: Number(queryParams.principalId) || undefined,
    }),
    [queryParams],
  )
  return [paramsWithNumberId, setQueryParams] as const
}
