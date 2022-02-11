import * as React from 'react'
import {Project} from 'screens/projects/index.d'
import {sanitizeObject, useAsync, useClient} from 'utils'

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
