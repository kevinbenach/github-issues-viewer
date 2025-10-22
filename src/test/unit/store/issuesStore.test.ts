import { describe, it, expect, beforeEach } from 'vitest'
import { useIssuesStore } from '@/store/issuesStore'

/**
 * Tests for Zustand issues store
 *
 * This store manages UI state for issue filtering.
 * It's critical because:
 * - Filters control all API queries
 * - State must be immutable (React requirement)
 * - Reset functionality must work correctly
 *
 * Testing Zustand is straightforward - we can test it without React!
 */
describe('useIssuesStore', () => {
  /**
   * Reset store to default state before each test
   * This ensures tests don't interfere with each other
   */
  beforeEach(() => {
    useIssuesStore.setState({
      filters: {
        searchText: '',
        status: 'ALL',
      },
    })
  })

  /**
   * INITIAL STATE
   */
  describe('initial state', () => {
    it('should initialize with default filters', () => {
      const { filters } = useIssuesStore.getState()

      expect(filters).toEqual({
        searchText: '',
        status: 'ALL',
      })
    })

    it('should have empty search text by default', () => {
      const { filters } = useIssuesStore.getState()

      expect(filters.searchText).toBe('')
    })

    it('should have ALL status by default', () => {
      const { filters } = useIssuesStore.getState()

      expect(filters.status).toBe('ALL')
    })
  })

  /**
   * SEARCH TEXT ACTIONS
   */
  describe('setSearchText', () => {
    it('should update search text', () => {
      const { setSearchText } = useIssuesStore.getState()

      setSearchText('hooks')

      const { filters } = useIssuesStore.getState()
      expect(filters.searchText).toBe('hooks')
    })

    it('should handle empty search text', () => {
      const { setSearchText } = useIssuesStore.getState()

      // Set a value first
      setSearchText('test')
      // Then clear it
      setSearchText('')

      const { filters } = useIssuesStore.getState()
      expect(filters.searchText).toBe('')
    })

    it('should handle multi-word search', () => {
      const { setSearchText } = useIssuesStore.getState()

      setSearchText('react hooks bug')

      const { filters } = useIssuesStore.getState()
      expect(filters.searchText).toBe('react hooks bug')
    })

    it('should handle special characters', () => {
      const { setSearchText } = useIssuesStore.getState()

      setSearchText('bug-fix #123')

      const { filters } = useIssuesStore.getState()
      expect(filters.searchText).toBe('bug-fix #123')
    })

    it('should handle search text with whitespace', () => {
      const { setSearchText } = useIssuesStore.getState()

      setSearchText('  test  ')

      const { filters } = useIssuesStore.getState()
      // Store doesn't trim - component should handle that
      expect(filters.searchText).toBe('  test  ')
    })

    it('should not affect status when updating search text', () => {
      const { setSearchText, setStatus } = useIssuesStore.getState()

      // Set status first
      setStatus('OPEN')

      // Update search text
      setSearchText('test')

      const { filters } = useIssuesStore.getState()
      expect(filters.status).toBe('OPEN') // Should remain unchanged
      expect(filters.searchText).toBe('test')
    })
  })

  /**
   * STATUS FILTER ACTIONS
   */
  describe('setStatus', () => {
    it('should update status to OPEN', () => {
      const { setStatus } = useIssuesStore.getState()

      setStatus('OPEN')

      const { filters } = useIssuesStore.getState()
      expect(filters.status).toBe('OPEN')
    })

    it('should update status to CLOSED', () => {
      const { setStatus } = useIssuesStore.getState()

      setStatus('CLOSED')

      const { filters } = useIssuesStore.getState()
      expect(filters.status).toBe('CLOSED')
    })

    it('should update status to ALL', () => {
      const { setStatus } = useIssuesStore.getState()

      // Set to OPEN first
      setStatus('OPEN')
      // Then back to ALL
      setStatus('ALL')

      const { filters } = useIssuesStore.getState()
      expect(filters.status).toBe('ALL')
    })

    it('should not affect search text when updating status', () => {
      const { setSearchText, setStatus } = useIssuesStore.getState()

      // Set search text first
      setSearchText('hooks')

      // Update status
      setStatus('OPEN')

      const { filters } = useIssuesStore.getState()
      expect(filters.searchText).toBe('hooks') // Should remain unchanged
      expect(filters.status).toBe('OPEN')
    })

    it('should handle multiple status changes', () => {
      const { setStatus } = useIssuesStore.getState()

      setStatus('OPEN')
      expect(useIssuesStore.getState().filters.status).toBe('OPEN')

      setStatus('CLOSED')
      expect(useIssuesStore.getState().filters.status).toBe('CLOSED')

      setStatus('ALL')
      expect(useIssuesStore.getState().filters.status).toBe('ALL')
    })
  })

  /**
   * RESET FILTERS ACTION
   */
  describe('resetFilters', () => {
    it('should reset all filters to defaults', () => {
      const { setSearchText, setStatus, resetFilters } = useIssuesStore.getState()

      // Set some filters
      setSearchText('test')
      setStatus('OPEN')

      // Verify they're set
      expect(useIssuesStore.getState().filters.searchText).toBe('test')
      expect(useIssuesStore.getState().filters.status).toBe('OPEN')

      // Reset
      resetFilters()

      // Verify back to defaults
      const { filters } = useIssuesStore.getState()
      expect(filters.searchText).toBe('')
      expect(filters.status).toBe('ALL')
    })

    it('should reset search text to empty', () => {
      const { setSearchText, resetFilters } = useIssuesStore.getState()

      setSearchText('test query')
      resetFilters()

      const { filters } = useIssuesStore.getState()
      expect(filters.searchText).toBe('')
    })

    it('should reset status to ALL', () => {
      const { setStatus, resetFilters } = useIssuesStore.getState()

      setStatus('CLOSED')
      resetFilters()

      const { filters } = useIssuesStore.getState()
      expect(filters.status).toBe('ALL')
    })

    it('should be idempotent (safe to call multiple times)', () => {
      const { setSearchText, resetFilters } = useIssuesStore.getState()

      setSearchText('test')

      // Reset multiple times
      resetFilters()
      resetFilters()
      resetFilters()

      // Should still be at defaults
      const { filters } = useIssuesStore.getState()
      expect(filters.searchText).toBe('')
      expect(filters.status).toBe('ALL')
    })
  })

  /**
   * IMMUTABILITY TESTS
   */
  describe('immutability', () => {
    it('should not mutate previous state when updating search text', () => {
      const initialFilters = useIssuesStore.getState().filters
      const { setSearchText } = useIssuesStore.getState()

      setSearchText('new text')

      // Initial reference should be unchanged
      expect(initialFilters.searchText).toBe('')
    })

    it('should not mutate previous state when updating status', () => {
      const initialFilters = useIssuesStore.getState().filters
      const { setStatus } = useIssuesStore.getState()

      setStatus('OPEN')

      // Initial reference should be unchanged
      expect(initialFilters.status).toBe('ALL')
    })

    it('should create new filter object on each update', () => {
      const { setSearchText } = useIssuesStore.getState()

      const filters1 = useIssuesStore.getState().filters
      setSearchText('test')
      const filters2 = useIssuesStore.getState().filters

      // Should be different objects
      expect(filters1).not.toBe(filters2)
    })
  })

  /**
   * COMBINED OPERATIONS
   */
  describe('combined filter operations', () => {
    it('should handle setting both search text and status', () => {
      const { setSearchText, setStatus } = useIssuesStore.getState()

      setSearchText('hooks')
      setStatus('OPEN')

      const { filters } = useIssuesStore.getState()
      expect(filters.searchText).toBe('hooks')
      expect(filters.status).toBe('OPEN')
    })

    it('should handle complex filter workflow', () => {
      const { setSearchText, setStatus, resetFilters } = useIssuesStore.getState()

      // User searches
      setSearchText('react')
      expect(useIssuesStore.getState().filters.searchText).toBe('react')

      // User filters by OPEN
      setStatus('OPEN')
      expect(useIssuesStore.getState().filters.status).toBe('OPEN')

      // User refines search
      setSearchText('react hooks')
      expect(useIssuesStore.getState().filters.searchText).toBe('react hooks')

      // User changes to CLOSED
      setStatus('CLOSED')
      expect(useIssuesStore.getState().filters.status).toBe('CLOSED')

      // User resets
      resetFilters()
      const { filters } = useIssuesStore.getState()
      expect(filters.searchText).toBe('')
      expect(filters.status).toBe('ALL')
    })
  })

  /**
   * TYPE SAFETY TESTS
   */
  describe('type safety', () => {
    it('should only accept valid status values', () => {
      const { setStatus } = useIssuesStore.getState()

      // These should be type-safe (TypeScript prevents invalid values)
      setStatus('OPEN')
      setStatus('CLOSED')
      setStatus('ALL')

      // This would be a TypeScript error:
      // setStatus('INVALID') // TS error: Type '"INVALID"' is not assignable

      // Verify last valid value
      expect(useIssuesStore.getState().filters.status).toBe('ALL')
    })

    it('should accept any string for search text', () => {
      const { setSearchText } = useIssuesStore.getState()

      // Should accept various strings
      setSearchText('')
      setSearchText('test')
      setSearchText('123')
      setSearchText('!@#$%^&*()')

      expect(useIssuesStore.getState().filters.searchText).toBe('!@#$%^&*()')
    })
  })

  /**
   * STORE ISOLATION TESTS
   */
  describe('store isolation', () => {
    it('should maintain independent state across test runs', () => {
      // This test verifies beforeEach reset works

      const { setSearchText } = useIssuesStore.getState()
      setSearchText('test')

      // State should be clean in next test due to beforeEach
    })

    it('should start with clean state', () => {
      // Verify previous test's state was cleaned
      const { filters } = useIssuesStore.getState()

      expect(filters.searchText).toBe('')
      expect(filters.status).toBe('ALL')
    })
  })
})
