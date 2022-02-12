import * as React from 'react'
import {URLSearchParamsInit, useSearchParams} from 'react-router-dom'
import {sanitizeObject} from '../sanitize-object'

export const useQueryParams = <Key extends string>(keys: Key[]) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const queryParams = React.useMemo(
    () =>
      keys.reduce(
        (result, key) => ({
          ...result,
          [key]: searchParams.get(key),
        }),
        {} as {[key in Key]: string},
      ),
    [keys, searchParams],
  )

  const setQueryParams = (params: Partial<{[key in Key]: unknown}>) => {
    const queryParams = sanitizeObject({
      ...Object.fromEntries(searchParams),
      ...params,
    })
    return setSearchParams(queryParams as URLSearchParamsInit)
  }
  return [queryParams, setQueryParams] as const
}
