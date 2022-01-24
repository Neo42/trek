import React, {useEffect} from 'react'

/**
 * Check if a value is falsy but not zero
 * @param value - the value to check
 * @returns boolean
 */
export const isFalsyNotZero = (value: any) => (value === 0 ? false : !value)

/**
 * Strip all keys with falsy values but zero from an object
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
export const useDebouncedState = (value: any, time?: number) => {
  const [state, setState] = React.useState(value)
  useEffect(() => {
    const timeout = setTimeout(() => setState(value), time)
    return () => clearTimeout(timeout)
  }, [value, time])
  return [state, setState]
}
