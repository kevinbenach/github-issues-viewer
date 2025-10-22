import { describe, it, expect, beforeEach } from 'vitest'
import { screen, act } from '@testing-library/react'
import { renderWithProviders as render } from '@/test/helpers/renderWithProviders'
import userEvent from '@testing-library/user-event'
import IssueFilters from '@/components/issue/IssueFilters/IssueFilters'
import { useIssuesStore } from '@/store/issuesStore'

/**
 * Integration tests for IssueFilters component
 *
 * This is an INTEGRATION test because it tests:
 * - Component rendering (React)
 * - User interactions (click, type)
 * - State management (Zustand store)
 * - Real behavior users experience
 *
 * Unlike unit tests, we test the WHOLE flow together.
 */
describe('IssueFilters', () => {
  /**
   * Reset store before each test to ensure isolation
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
   * RENDERING TESTS: Component structure
   */
  describe('rendering', () => {
    it('should render search input', () => {
      render(<IssueFilters />)

      const searchInput = screen.getByLabelText(/search/i)
      expect(searchInput).toBeInTheDocument()
      expect(searchInput).toHaveAttribute('type', 'text')
      expect(searchInput).toHaveAttribute('placeholder', 'Search issues...')
    })

    it('should render all status radio buttons', () => {
      render(<IssueFilters />)

      expect(screen.getByLabelText(/all/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/open/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/closed/i)).toBeInTheDocument()
    })

    it('should render reset button', () => {
      render(<IssueFilters />)

      const resetButton = screen.getByRole('button', { name: /reset filters/i })
      expect(resetButton).toBeInTheDocument()
    })

    it('should have search label', () => {
      render(<IssueFilters />)

      expect(screen.getByText(/^Search$/i)).toBeInTheDocument()
    })

    it('should have status label', () => {
      render(<IssueFilters />)

      expect(screen.getByText(/^Status$/i)).toBeInTheDocument()
    })
  })

  /**
   * INITIAL STATE TESTS
   */
  describe('initial state', () => {
    it('should have empty search input initially', () => {
      render(<IssueFilters />)

      const searchInput = screen.getByLabelText(/search/i)
      expect(searchInput).toHaveValue('')
    })

    it('should have ALL status selected by default', () => {
      render(<IssueFilters />)

      const allRadio = screen.getByLabelText(/all/i)
      expect(allRadio).toBeChecked()
    })

    it('should not have OPEN selected initially', () => {
      render(<IssueFilters />)

      const openRadio = screen.getByLabelText(/open/i)
      expect(openRadio).not.toBeChecked()
    })

    it('should not have CLOSED selected initially', () => {
      render(<IssueFilters />)

      const closedRadio = screen.getByLabelText(/closed/i)
      expect(closedRadio).not.toBeChecked()
    })
  })

  /**
   * SEARCH INPUT INTERACTION
   */
  describe('search input interaction', () => {
    it('should update store when typing in search', async () => {
      const user = userEvent.setup()
      render(<IssueFilters />)

      const searchInput = screen.getByLabelText(/search/i)
      await user.type(searchInput, 'hooks')

      // Check store was updated
      const { filters } = useIssuesStore.getState()
      expect(filters.searchText).toBe('hooks')
    })

    it('should reflect search text in input', async () => {
      const user = userEvent.setup()
      render(<IssueFilters />)

      const searchInput = screen.getByLabelText(/search/i)
      await user.type(searchInput, 'react hooks')

      // Input should show what user typed
      expect(searchInput).toHaveValue('react hooks')
    })

    it('should handle clearing search text', async () => {
      const user = userEvent.setup()
      render(<IssueFilters />)

      const searchInput = screen.getByLabelText(/search/i)

      // Type something
      await user.type(searchInput, 'test')
      expect(searchInput).toHaveValue('test')

      // Clear it
      await user.clear(searchInput)
      expect(searchInput).toHaveValue('')

      // Store should be updated
      expect(useIssuesStore.getState().filters.searchText).toBe('')
    })

    it('should handle special characters', async () => {
      const user = userEvent.setup()
      render(<IssueFilters />)

      const searchInput = screen.getByLabelText(/search/i)
      await user.type(searchInput, 'bug-fix #123')

      expect(searchInput).toHaveValue('bug-fix #123')
      expect(useIssuesStore.getState().filters.searchText).toBe('bug-fix #123')
    })

    it('should handle multi-word search', async () => {
      const user = userEvent.setup()
      render(<IssueFilters />)

      const searchInput = screen.getByLabelText(/search/i)
      await user.type(searchInput, 'react hooks state')

      expect(useIssuesStore.getState().filters.searchText).toBe('react hooks state')
    })
  })

  /**
   * STATUS RADIO BUTTON INTERACTION
   */
  describe('status radio interaction', () => {
    it('should update store when selecting OPEN', async () => {
      const user = userEvent.setup()
      render(<IssueFilters />)

      const openRadio = screen.getByLabelText(/open/i)
      await user.click(openRadio)

      // Check store was updated
      const { filters } = useIssuesStore.getState()
      expect(filters.status).toBe('OPEN')
    })

    it('should update store when selecting CLOSED', async () => {
      const user = userEvent.setup()
      render(<IssueFilters />)

      const closedRadio = screen.getByLabelText(/closed/i)
      await user.click(closedRadio)

      expect(useIssuesStore.getState().filters.status).toBe('CLOSED')
    })

    it('should update store when selecting ALL', async () => {
      const user = userEvent.setup()
      render(<IssueFilters />)

      // First select OPEN
      const openRadio = screen.getByLabelText(/open/i)
      await user.click(openRadio)

      // Then select ALL
      const allRadio = screen.getByLabelText(/all/i)
      await user.click(allRadio)

      expect(useIssuesStore.getState().filters.status).toBe('ALL')
    })

    it('should show OPEN as checked when selected', async () => {
      const user = userEvent.setup()
      render(<IssueFilters />)

      const openRadio = screen.getByLabelText(/open/i)
      await user.click(openRadio)

      expect(openRadio).toBeChecked()
    })

    it('should uncheck previous selection when selecting new status', async () => {
      const user = userEvent.setup()
      render(<IssueFilters />)

      const openRadio = screen.getByLabelText(/open/i)
      const closedRadio = screen.getByLabelText(/closed/i)

      // Select OPEN
      await user.click(openRadio)
      expect(openRadio).toBeChecked()

      // Select CLOSED
      await user.click(closedRadio)
      expect(closedRadio).toBeChecked()
      expect(openRadio).not.toBeChecked() // OPEN should be unchecked
    })

    it('should handle multiple status changes', async () => {
      const user = userEvent.setup()
      render(<IssueFilters />)

      const allRadio = screen.getByLabelText(/all/i)
      const openRadio = screen.getByLabelText(/open/i)
      const closedRadio = screen.getByLabelText(/closed/i)

      // ALL -> OPEN -> CLOSED -> ALL
      await user.click(openRadio)
      expect(useIssuesStore.getState().filters.status).toBe('OPEN')

      await user.click(closedRadio)
      expect(useIssuesStore.getState().filters.status).toBe('CLOSED')

      await user.click(allRadio)
      expect(useIssuesStore.getState().filters.status).toBe('ALL')
    })
  })

  /**
   * RESET BUTTON INTERACTION
   */
  describe('reset button', () => {
    it('should reset all filters when clicked', async () => {
      const user = userEvent.setup()
      render(<IssueFilters />)

      // Set some filters
      const searchInput = screen.getByLabelText(/search/i)
      await user.type(searchInput, 'test')

      const openRadio = screen.getByLabelText(/open/i)
      await user.click(openRadio)

      // Verify filters are set
      expect(useIssuesStore.getState().filters.searchText).toBe('test')
      expect(useIssuesStore.getState().filters.status).toBe('OPEN')

      // Click reset
      const resetButton = screen.getByRole('button', { name: /reset filters/i })
      await user.click(resetButton)

      // Verify filters are reset
      const { filters } = useIssuesStore.getState()
      expect(filters.searchText).toBe('')
      expect(filters.status).toBe('ALL')
    })

    it('should clear search input when reset', async () => {
      const user = userEvent.setup()
      render(<IssueFilters />)

      const searchInput = screen.getByLabelText(/search/i)
      await user.type(searchInput, 'test')

      const resetButton = screen.getByRole('button', { name: /reset filters/i })
      await user.click(resetButton)

      expect(searchInput).toHaveValue('')
    })

    it('should select ALL status when reset', async () => {
      const user = userEvent.setup()
      render(<IssueFilters />)

      // Select CLOSED
      const closedRadio = screen.getByLabelText(/closed/i)
      await user.click(closedRadio)

      // Reset
      const resetButton = screen.getByRole('button', { name: /reset filters/i })
      await user.click(resetButton)

      // ALL should be selected
      const allRadio = screen.getByLabelText(/all/i)
      expect(allRadio).toBeChecked()
    })

    it('should be safe to click reset multiple times', async () => {
      const user = userEvent.setup()
      render(<IssueFilters />)

      const resetButton = screen.getByRole('button', { name: /reset filters/i })

      // Click reset multiple times
      await user.click(resetButton)
      await user.click(resetButton)
      await user.click(resetButton)

      // Should still be at defaults
      const { filters } = useIssuesStore.getState()
      expect(filters.searchText).toBe('')
      expect(filters.status).toBe('ALL')
    })
  })

  /**
   * COMBINED OPERATIONS: Real user workflows
   */
  describe('combined operations', () => {
    it('should handle search and status filter together', async () => {
      const user = userEvent.setup()
      render(<IssueFilters />)

      // Type search
      const searchInput = screen.getByLabelText(/search/i)
      await user.type(searchInput, 'hooks')

      // Select status
      const openRadio = screen.getByLabelText(/open/i)
      await user.click(openRadio)

      // Check both are applied
      const { filters } = useIssuesStore.getState()
      expect(filters.searchText).toBe('hooks')
      expect(filters.status).toBe('OPEN')
    })

    it('should maintain search when changing status', async () => {
      const user = userEvent.setup()
      render(<IssueFilters />)

      // Set search
      const searchInput = screen.getByLabelText(/search/i)
      await user.type(searchInput, 'test')

      // Change status multiple times
      await user.click(screen.getByLabelText(/open/i))
      await user.click(screen.getByLabelText(/closed/i))

      // Search should still be there
      expect(useIssuesStore.getState().filters.searchText).toBe('test')
    })

    it('should handle complex user workflow', async () => {
      const user = userEvent.setup()
      render(<IssueFilters />)

      // User searches
      const searchInput = screen.getByLabelText(/search/i)
      await user.type(searchInput, 'react')

      // User filters by OPEN
      await user.click(screen.getByLabelText(/open/i))

      // User refines search
      await user.clear(searchInput)
      await user.type(searchInput, 'react hooks')

      // User changes to CLOSED
      await user.click(screen.getByLabelText(/closed/i))

      // Verify final state
      const { filters } = useIssuesStore.getState()
      expect(filters.searchText).toBe('react hooks')
      expect(filters.status).toBe('CLOSED')

      // User resets
      const resetButton = screen.getByRole('button', { name: /reset filters/i })
      await user.click(resetButton)

      // Verify reset
      const finalFilters = useIssuesStore.getState().filters
      expect(finalFilters.searchText).toBe('')
      expect(finalFilters.status).toBe('ALL')
    })
  })

  /**
   * CONTROLLED INPUT TESTS: React fundamentals
   */
  describe('controlled inputs', () => {
    it('should reflect store state in search input', () => {
      // Pre-set store state
      useIssuesStore.setState({
        filters: { searchText: 'preset', status: 'ALL' },
      })

      render(<IssueFilters />)

      const searchInput = screen.getByLabelText(/search/i)
      expect(searchInput).toHaveValue('preset')
    })

    it('should reflect store state in status radio', () => {
      // Pre-set store state
      useIssuesStore.setState({
        filters: { searchText: '', status: 'OPEN' },
      })

      render(<IssueFilters />)

      const openRadio = screen.getByLabelText(/open/i)
      expect(openRadio).toBeChecked()
    })

    it('should update UI when store changes externally', () => {
      render(<IssueFilters />)

      // Change store directly (simulating external change)
      act(() => {
        useIssuesStore.getState().setSearchText('external change')
        useIssuesStore.getState().setStatus('CLOSED')
      })

      // UI should reflect changes
      const searchInput = screen.getByLabelText(/search/i)
      const closedRadio = screen.getByLabelText(/closed/i)

      expect(searchInput).toHaveValue('external change')
      expect(closedRadio).toBeChecked()
    })
  })

  /**
   * ACCESSIBILITY TESTS
   */
  describe('accessibility', () => {
    it('should have proper label associations', () => {
      render(<IssueFilters />)

      // Search input should be associated with label
      const searchInput = screen.getByLabelText(/search/i)
      expect(searchInput).toHaveAttribute('id', 'search-input')
    })

    it('should have proper radio button names', () => {
      render(<IssueFilters />)

      const allRadio = screen.getByLabelText(/all/i)
      const openRadio = screen.getByLabelText(/open/i)
      const closedRadio = screen.getByLabelText(/closed/i)

      // All radios should have same name (for grouping)
      expect(allRadio).toHaveAttribute('name', 'status')
      expect(openRadio).toHaveAttribute('name', 'status')
      expect(closedRadio).toHaveAttribute('name', 'status')
    })

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup()
      render(<IssueFilters />)

      // Tab to search input
      await user.tab()
      expect(screen.getByLabelText(/search/i)).toHaveFocus()

      // Type in search
      await user.keyboard('test')
      expect(screen.getByLabelText(/search/i)).toHaveValue('test')
    })
  })
})
