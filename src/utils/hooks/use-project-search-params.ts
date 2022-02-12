import * as React from 'react'
import {useQueryParams} from './use-query-params'

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
