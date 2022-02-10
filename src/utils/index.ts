import * as React from 'react'

const isVoid = (value: unknown) =>
  value === undefined || value === null || value === ''

export const stripFalsyValue = (object: {[key: string]: unknown}) => {
  const result = {...object}
  Object.entries(result).forEach(([key, value]) => {
    if (isVoid(value)) delete result[key]
  })
  return result
}

/**
 * debounce a state and its setter function
 * @param value - the value to debounce
 * @param time - the amount of time to wait before setting the state
 * @returns The state and setState functions.
 */
export const useDebouncedSetState = <Value>(value: Value, time?: number) => {
  const [debouncedState, setDebouncedState] = React.useState(value)
  React.useEffect(() => {
    const timeout = setTimeout(() => setDebouncedState(value), time)
    return () => clearTimeout(timeout)
  }, [value, time])
  return debouncedState
}
