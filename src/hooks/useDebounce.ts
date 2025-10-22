import { useEffect, useState } from 'react'

import { SEARCH_DEBOUNCE_MS } from '@/constants/pagination'

/**
 * Debounces a value by delaying its update
 *
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: SEARCH_DEBOUNCE_MS)
 * @returns The debounced value
 *
 * @example
 * const [searchText, setSearchText] = useState('')
 * const debouncedSearchText = useDebounce(searchText)
 * // debouncedSearchText only updates after SEARCH_DEBOUNCE_MS after user stops typing
 */
export const useDebounce = <T>(value: T, delay: number = SEARCH_DEBOUNCE_MS): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Set up the timeout to update debounced value after delay
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Clean up the timeout if value changes before delay completes
    return () => {
      clearTimeout(timeoutId)
    }
  }, [value, delay])

  return debouncedValue
}
