import * as React from 'react'
import {AsyncState} from '../index.d'

//TODO - fix unmounted state change with useRef & useLayoutEffect

const defaultInitialState: AsyncState<null> = {
  status: 'idle',
  data: null,
  error: null,
}

const defaultConfig = {
  throwOnError: false,
}

export const useAsync = <Data>(
  customInitialState?: AsyncState<Data>,
  customConfig?: typeof defaultConfig,
) => {
  const [state, setState] = React.useState<AsyncState<Data>>(
    customInitialState ?? defaultInitialState,
  )

  const {throwOnError} = customConfig ?? defaultConfig

  const setData = React.useCallback((data: Data) => {
    setState({
      status: 'success',
      data,
      error: null,
    })
  }, [])

  const setError = React.useCallback((error: Error) => {
    setState({
      status: 'error',
      data: null,
      error,
    })
  }, [])

  const reset = React.useCallback(() => {
    setState({
      status: 'idle',
      data: null,
      error: null,
    })
  }, [])

  const run = React.useCallback(
    (promise: Promise<Data>) => {
      if (!promise || !promise.then) {
        throw new Error('A promise must be provided to use the `useAsync.run`.')
      }

      setState({
        status: 'loading',
        data: null,
        error: null,
      })

      return promise
        .then((data) => {
          setData(data)
          return data
        })
        .catch((error) => {
          setError(error)
          if (throwOnError) {
            return Promise.reject(error)
          }
          return error
        })
    },
    [setData, setError, throwOnError],
  )

  return {
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isError: state.status === 'error',
    isSuccess: state.status === 'success',
    run,
    reset,
    setData,
    setError,
    ...state,
  }
}
