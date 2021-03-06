import * as auth from 'auth/provider'
import * as qs from 'qs'
import * as React from 'react'
import {apiUrl, GET} from '../../constants'
import {useAuth} from 'auth/context'

interface Config extends RequestInit {
  data?: object
  token?: string
}

export function client(
  endpoint: string,
  {data, token, headers: customHeaders, ...customConfig}: Config = {},
) {
  const config = {
    method: GET,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : '',
      ...customHeaders,
    },
    body: customConfig.method ? JSON.stringify(data) : undefined,
    ...customConfig,
  }

  const params = customConfig.method ? '' : data ? `?${qs.stringify(data)}` : ''

  return window
    .fetch(`${apiUrl}/${endpoint}${params}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout()
        window.location.reload()
        return Promise.reject({message: 'Please re-authenticate.'})
      }
      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
}

type ClientArgs = Parameters<typeof client>

export function useClient() {
  const token = useAuth().user?.token
  return React.useCallback(
    (endpoint: ClientArgs[0], config?: ClientArgs[1]) =>
      client(endpoint, {...config, token}),
    [token],
  )
}
