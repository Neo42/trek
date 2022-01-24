import * as React from 'react'

/**
 * Check if a value is falsy but not zero
 * @param value - the value to check
 * @returns boolean
 */
export const isFalsyNotZero = (value: any) => (value === 0 ? false : !value)

/**
 * Strip all keys with falsy values but not zero from an object
 * @param object - the object to be tidied up
 * @returns result
 */
export const stripFalsyValue = (object: object) => {
  const result = {...object}
  Object.entries(result).forEach(([key, value]) => {
    // @ts-ignore
    if (isFalsyNotZero(value)) delete result[key]
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
