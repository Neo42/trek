import * as React from 'react'
import {sanitizeObject, useAsync, useClient} from 'utils'
import {User} from 'types'

export const useUsers = (params?: Partial<User>) => {
  const client = useClient()
  const {run, ...result} = useAsync<User[]>()
  React.useEffect(() => {
    run(
      client('users', {
        data: sanitizeObject(params ?? {}),
      }),
    )
  }, [client, params, run])
  return result
}
