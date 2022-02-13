import * as React from 'react'
import {AsyncState} from '../index.d'

const defaultInitialState: AsyncState<null> = {
  status: 'idle',
  data: null,
  error: null,
}

const defaultConfig = {
  throwOnError: false,
}

function useSafeDispatch<Type>(dispatch: React.Dispatch<AsyncState<Type>>) {
  const mounted = React.useRef(false)
  React.useLayoutEffect(() => {
    mounted.current = true
    return () => void (mounted.current = false)
  }, [])
  return React.useCallback(
    (...args: [AsyncState<Type>]) =>
      mounted.current ? dispatch(...args) : void 0,
    [dispatch],
  )
}

export const useAsync = <Data>(
  customInitialState?: AsyncState<Data>,
  customConfig?: typeof defaultConfig,
) => {
  const initialStateRef = React.useRef({
    ...defaultInitialState,
    ...customInitialState,
  })

  const [state, setState] = React.useReducer<
    (s: AsyncState<Data>, a: AsyncState<Data>) => AsyncState<Data>
  >((s, a) => ({...s, ...a}), initialStateRef.current)

  const safeSetState = useSafeDispatch(setState)

  const {throwOnError} = customConfig ?? defaultConfig

  const setData = React.useCallback(
    (data: Data) => {
      safeSetState({
        status: 'success',
        data,
        error: null,
      })
    },
    [safeSetState],
  )

  const setError = React.useCallback(
    (error: Error) => {
      safeSetState({
        status: 'error',
        data: null,
        error,
      })
    },
    [safeSetState],
  )

  const reset = React.useCallback(() => {
    safeSetState({
      status: 'idle',
      data: null,
      error: null,
    })
  }, [safeSetState])

  const run = React.useCallback(
    (promise: Promise<Data>) => {
      if (!promise || !promise.then) {
        throw new Error('A promise must be provided to use the `useAsync.run`.')
      }

      safeSetState({
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
    [safeSetState, setData, setError, throwOnError],
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
