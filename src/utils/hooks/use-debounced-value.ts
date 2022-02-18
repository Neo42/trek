import * as React from 'react'

/**
 * debounce a state and its setter function
 * @param value - the value to debounce
 * @param delay - the amount of time to wait before setting the state
 * @returns The state and setState functions.
 */
export const useDebouncedValue = <Value>(
  value: Value,
  option?: {delay: number},
) => {
  const [debounceValue, setDebounceValue] = React.useState(value)
  React.useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), option?.delay)
    return () => clearTimeout(timeout)
  }, [value, option?.delay])
  return debounceValue
}
