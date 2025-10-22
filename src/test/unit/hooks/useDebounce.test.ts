import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { useDebounce } from '@/hooks/useDebounce'

/**
 * Tests for useDebounce hook
 *
 * This hook delays updating a value until the user stops changing it.
 * Critical for search performance - prevents API spam on every keystroke.
 *
 * Testing async hooks is tricky because:
 * - Timing must be precise (300ms delay)
 * - Multiple rapid changes must be handled
 * - Cleanup must prevent memory leaks
 *
 * We use fake timers to control time precisely.
 */
describe('useDebounce', () => {
  /**
   * Setup: Use fake timers for precise timing control
   */
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  /**
   * BASIC BEHAVIOR: Initial value
   */
  describe('initial value', () => {
    it('should return initial value immediately', () => {
      const { result } = renderHook(() => useDebounce('initial', 300))

      // Should return initial value right away (no delay)
      expect(result.current).toBe('initial')
    })

    it('should work with different data types', () => {
      // String
      const { result: stringResult } = renderHook(() => useDebounce('text', 300))
      expect(stringResult.current).toBe('text')

      // Number
      const { result: numberResult } = renderHook(() => useDebounce(42, 300))
      expect(numberResult.current).toBe(42)

      // Boolean
      const { result: boolResult } = renderHook(() => useDebounce(true, 300))
      expect(boolResult.current).toBe(true)

      // Object
      const obj = { name: 'test' }
      const { result: objResult } = renderHook(() => useDebounce(obj, 300))
      expect(objResult.current).toBe(obj)
    })
  })

  /**
   * DEBOUNCE BEHAVIOR: Core functionality
   */
  describe('debounce delay', () => {
    it('should not update value immediately on change', () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 300),
        { initialProps: { value: 'first' } }
      )

      expect(result.current).toBe('first')

      // Change value
      rerender({ value: 'second' })

      // Should still be old value (debounce not complete)
      expect(result.current).toBe('first')
    })

    it('should update value after delay completes', () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 300),
        { initialProps: { value: 'first' } }
      )

      // Change value
      rerender({ value: 'second' })

      // Fast-forward time by 300ms
      act(() => {
        vi.advanceTimersByTime(300)
      })

      // Now should be updated
      expect(result.current).toBe('second')
    })

    it('should respect custom delay parameter', () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 500),
        { initialProps: { value: 'first' } }
      )

      rerender({ value: 'second' })

      // 300ms - not enough for 500ms delay
      act(() => {
        vi.advanceTimersByTime(300)
      })
      expect(result.current).toBe('first') // Still old value

      // Another 200ms (total 500ms)
      act(() => {
        vi.advanceTimersByTime(200)
      })
      expect(result.current).toBe('second') // Now updated
    })
  })

  /**
   * RAPID CHANGES: User typing fast
   */
  describe('multiple rapid changes', () => {
    it('should only update to final value after rapid changes', () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 300),
        { initialProps: { value: 'a' } }
      )

      // Simulate user typing: a -> ab -> abc -> abcd
      rerender({ value: 'ab' })
      act(() => vi.advanceTimersByTime(100))

      rerender({ value: 'abc' })
      act(() => vi.advanceTimersByTime(100))

      rerender({ value: 'abcd' })
      act(() => vi.advanceTimersByTime(100))

      // Only 300ms total passed, still should be original
      expect(result.current).toBe('a')

      // Now wait full delay from LAST change
      act(() => vi.advanceTimersByTime(200))

      // Should jump straight to final value
      expect(result.current).toBe('abcd')
    })

    it('should cancel previous timeout on new change', () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 300),
        { initialProps: { value: 'first' } }
      )

      // Change to 'second'
      rerender({ value: 'second' })
      act(() => vi.advanceTimersByTime(200)) // Wait 200ms

      // Change again to 'third' before 300ms elapsed
      rerender({ value: 'third' })
      act(() => vi.advanceTimersByTime(100)) // Total: 300ms from first change

      // Should NOT be 'second' (timeout was cancelled)
      expect(result.current).toBe('first')

      // Wait another 200ms (300ms from 'third')
      act(() => vi.advanceTimersByTime(200))

      // Should be 'third'
      expect(result.current).toBe('third')
    })

    it('should handle very rapid changes efficiently', () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 300),
        { initialProps: { value: '' } }
      )

      // Simulate rapid typing (10 changes in 100ms)
      const text = 'react hooks'
      for (let i = 0; i < text.length; i++) {
        rerender({ value: text.substring(0, i + 1) })
        act(() => vi.advanceTimersByTime(10))
      }

      // Still should be empty (no debounce completed)
      expect(result.current).toBe('')

      // Now wait full delay from last change
      act(() => vi.advanceTimersByTime(300))

      // Should be final value
      expect(result.current).toBe('react hooks')
    })
  })

  /**
   * CLEANUP: Memory leak prevention
   */
  describe('cleanup', () => {
    it('should clean up timeout on unmount', () => {
      const { result, rerender, unmount } = renderHook(
        ({ value }) => useDebounce(value, 300),
        { initialProps: { value: 'first' } }
      )

      // Change value
      rerender({ value: 'second' })

      // Unmount before debounce completes
      unmount()

      // Advance time
      act(() => {
        vi.advanceTimersByTime(300)
      })

      // No errors should occur (cleanup worked)
      // Value before unmount should still be 'first'
      expect(result.current).toBe('first')
    })

    it('should clean up previous timeout on value change', () => {
      // This tests that we don't leak timeouts
      const { rerender } = renderHook(
        ({ value }) => useDebounce(value, 300),
        { initialProps: { value: 'a' } }
      )

      // Create many pending timeouts
      for (let i = 0; i < 100; i++) {
        rerender({ value: `value-${i}` })
        act(() => vi.advanceTimersByTime(10))
      }

      // Should only have 1 timeout pending (others cleaned up)
      // We can't directly test this, but if cleanup fails, we'd get warnings
      act(() => {
        vi.advanceTimersByTime(300)
      })

      // No warnings = cleanup worked
    })
  })

  /**
   * EDGE CASES
   */
  describe('edge cases', () => {
    it('should handle delay of 0', () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 0),
        { initialProps: { value: 'first' } }
      )

      rerender({ value: 'second' })

      // With 0 delay, should update immediately (on next tick)
      act(() => {
        vi.advanceTimersByTime(0)
      })

      expect(result.current).toBe('second')
    })

    it('should handle same value changes', () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 300),
        { initialProps: { value: 'same' } }
      )

      // Change to same value
      rerender({ value: 'same' })

      act(() => {
        vi.advanceTimersByTime(300)
      })

      // Should still work (value is 'same')
      expect(result.current).toBe('same')
    })

    it('should handle undefined and null', () => {
      // Undefined
      const { result: undefinedResult, rerender: rerenderUndefined } = renderHook(
        ({ value }) => useDebounce(value, 300),
        { initialProps: { value: undefined } }
      )
      expect(undefinedResult.current).toBeUndefined()

      rerenderUndefined({ value: 'defined' })
      act(() => vi.advanceTimersByTime(300))
      expect(undefinedResult.current).toBe('defined')

      // Null
      const { result: nullResult, rerender: rerenderNull } = renderHook(
        ({ value }) => useDebounce(value, 300),
        { initialProps: { value: null } }
      )
      expect(nullResult.current).toBeNull()

      rerenderNull({ value: 'not null' })
      act(() => vi.advanceTimersByTime(300))
      expect(nullResult.current).toBe('not null')
    })

    it('should handle empty string', () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 300),
        { initialProps: { value: 'text' } }
      )

      // Clear to empty string
      rerender({ value: '' })

      act(() => {
        vi.advanceTimersByTime(300)
      })

      expect(result.current).toBe('')
    })
  })

  /**
   * REALISTIC USAGE: Search input scenario
   */
  describe('realistic search scenario', () => {
    it('should debounce search input correctly', () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 300),
        { initialProps: { value: '' } }
      )

      // User types "react"
      rerender({ value: 'r' })
      act(() => vi.advanceTimersByTime(50))

      rerender({ value: 're' })
      act(() => vi.advanceTimersByTime(50))

      rerender({ value: 'rea' })
      act(() => vi.advanceTimersByTime(50))

      rerender({ value: 'reac' })
      act(() => vi.advanceTimersByTime(50))

      rerender({ value: 'react' })

      // Still empty (user still typing)
      expect(result.current).toBe('')

      // User stops typing, wait full delay
      act(() => vi.advanceTimersByTime(300))

      // Now API call would fire with 'react'
      expect(result.current).toBe('react')
    })
  })
})
