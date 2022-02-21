import {act, renderHook} from '@testing-library/react-hooks'
import {AsyncState} from 'types'
import {useAsync} from '../use-async'

const defaultState: ReturnType<typeof useAsync> = {
  status: 'idle',
  error: null,
  data: null,
  isIdle: true,
  isLoading: false,
  isError: false,
  isSuccess: false,
  run: expect.any(Function),
  setData: expect.any(Function),
  setError: expect.any(Function),
  reset: expect.any(Function),
}

const loadingState: ReturnType<typeof useAsync> = {
  ...defaultState,
  status: 'loading',
  isLoading: true,
  isIdle: false,
}

const successState: ReturnType<typeof useAsync> = {
  ...defaultState,
  status: 'success',
  isSuccess: true,
  isIdle: false,
}

test('should return a async state result', async () => {
  let resolve: any, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })

  const {result} = renderHook(() => useAsync())
  expect(result.current).toEqual(defaultState)

  let p: Promise<any>

  act(() => {
    p = result.current.run(promise)
  })

  expect(result.current).toEqual(loadingState)

  const resolvedValue = {mockedValue: 'resolved'}

  await act(async () => {
    resolve(resolvedValue)
    await p
  })

  expect(result.current).toEqual({...successState, data: resolvedValue})
})
