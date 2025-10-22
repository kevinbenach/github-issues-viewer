import { describe, it, expect } from 'vitest'
import { buildSearchQuery } from '@/utils/buildGitHubQuery'
import type { IssueFilters } from '@/types/domain.types'

/**
 * Tests for buildSearchQuery utility function
 *
 * This function builds GitHub search query strings from filter parameters.
 * It's a critical piece of infrastructure - if this breaks, ALL API queries fail.
 *
 * Testing strategy:
 * - Test each filter parameter individually
 * - Test combinations of filters
 * - Test edge cases (empty strings, whitespace, special chars)
 * - Ensure output format matches GitHub's search syntax
 */
describe('buildSearchQuery', () => {
  /**
   * BASE CASE: Default/minimal filters
   */
  describe('default filters', () => {
    it('should build query with only repo and issue type when no filters applied', () => {
      const filters: IssueFilters = {
        searchText: '',
        status: 'ALL',
      }

      const result = buildSearchQuery(filters)

      // Should only include base query parts
      expect(result).toBe('repo:facebook/react is:issue')
    })
  })

  /**
   * SEARCH TEXT HANDLING
   */
  describe('search text', () => {
    it('should include search text when provided', () => {
      const filters: IssueFilters = {
        searchText: 'hooks',
        status: 'ALL',
      }

      const result = buildSearchQuery(filters)

      expect(result).toBe('repo:facebook/react is:issue hooks')
      expect(result).toContain('hooks')
    })

    it('should trim whitespace from search text', () => {
      const filters: IssueFilters = {
        searchText: '  hooks  ',
        status: 'ALL',
      }

      const result = buildSearchQuery(filters)

      // Should trim extra spaces
      expect(result).toBe('repo:facebook/react is:issue hooks')
      expect(result).not.toContain('  hooks  ')
    })

    it('should handle empty string search text', () => {
      const filters: IssueFilters = {
        searchText: '',
        status: 'ALL',
      }

      const result = buildSearchQuery(filters)

      // Empty string should not be added to query
      expect(result).toBe('repo:facebook/react is:issue')
      expect(result).not.toMatch(/\s{2,}/) // No double spaces
    })

    it('should handle search text with only spaces', () => {
      const filters: IssueFilters = {
        searchText: '    ',
        status: 'ALL',
      }

      const result = buildSearchQuery(filters)

      // Only spaces should be trimmed away
      expect(result).toBe('repo:facebook/react is:issue')
    })

    it('should handle multi-word search text', () => {
      const filters: IssueFilters = {
        searchText: 'react hooks bug',
        status: 'ALL',
      }

      const result = buildSearchQuery(filters)

      expect(result).toBe('repo:facebook/react is:issue react hooks bug')
    })

    it('should handle special characters in search text', () => {
      const filters: IssueFilters = {
        searchText: 'bug-fix #123',
        status: 'ALL',
      }

      const result = buildSearchQuery(filters)

      // Special chars should pass through (GitHub will handle them)
      expect(result).toContain('bug-fix #123')
    })
  })

  /**
   * STATUS FILTER HANDLING
   */
  describe('status filter', () => {
    it('should add state:open when status is OPEN', () => {
      const filters: IssueFilters = {
        searchText: '',
        status: 'OPEN',
      }

      const result = buildSearchQuery(filters)

      expect(result).toBe('repo:facebook/react is:issue state:open')
      expect(result).toContain('state:open')
    })

    it('should add state:closed when status is CLOSED', () => {
      const filters: IssueFilters = {
        searchText: '',
        status: 'CLOSED',
      }

      const result = buildSearchQuery(filters)

      expect(result).toBe('repo:facebook/react is:issue state:closed')
      expect(result).toContain('state:closed')
    })

    it('should not add state filter when status is ALL', () => {
      const filters: IssueFilters = {
        searchText: '',
        status: 'ALL',
      }

      const result = buildSearchQuery(filters)

      // Should not contain "state:" at all
      expect(result).toBe('repo:facebook/react is:issue')
      expect(result).not.toContain('state:')
    })

    it('should lowercase the status value', () => {
      const filters: IssueFilters = {
        searchText: '',
        status: 'OPEN',
      }

      const result = buildSearchQuery(filters)

      // GitHub expects lowercase "open", not "OPEN"
      expect(result).toContain('state:open')
      expect(result).not.toContain('state:OPEN')
    })
  })

  /**
   * COMBINED FILTERS
   */
  describe('combined filters', () => {
    it('should combine search text and OPEN status', () => {
      const filters: IssueFilters = {
        searchText: 'hooks',
        status: 'OPEN',
      }

      const result = buildSearchQuery(filters)

      expect(result).toBe('repo:facebook/react is:issue hooks state:open')
      expect(result).toContain('hooks')
      expect(result).toContain('state:open')
    })

    it('should combine search text and CLOSED status', () => {
      const filters: IssueFilters = {
        searchText: 'bug',
        status: 'CLOSED',
      }

      const result = buildSearchQuery(filters)

      expect(result).toBe('repo:facebook/react is:issue bug state:closed')
      expect(result).toContain('bug')
      expect(result).toContain('state:closed')
    })

    it('should handle multi-word search with status filter', () => {
      const filters: IssueFilters = {
        searchText: 'react hooks',
        status: 'OPEN',
      }

      const result = buildSearchQuery(filters)

      expect(result).toBe('repo:facebook/react is:issue react hooks state:open')
    })
  })

  /**
   * QUERY FORMAT VALIDATION
   */
  describe('query format', () => {
    it('should always start with repo:facebook/react', () => {
      const filters: IssueFilters = {
        searchText: 'test',
        status: 'ALL',
      }

      const result = buildSearchQuery(filters)

      expect(result).toMatch(/^repo:facebook\/react/)
    })

    it('should always include is:issue', () => {
      const filters: IssueFilters = {
        searchText: 'test',
        status: 'OPEN',
      }

      const result = buildSearchQuery(filters)

      expect(result).toContain('is:issue')
    })

    it('should separate query parts with single spaces', () => {
      const filters: IssueFilters = {
        searchText: 'hooks',
        status: 'OPEN',
      }

      const result = buildSearchQuery(filters)

      // Should not have double spaces
      expect(result).not.toMatch(/\s{2,}/)
    })

    it('should not have leading or trailing spaces', () => {
      const filters: IssueFilters = {
        searchText: 'test',
        status: 'OPEN',
      }

      const result = buildSearchQuery(filters)

      expect(result).toBe(result.trim())
      expect(result[0]).not.toBe(' ')
      expect(result[result.length - 1]).not.toBe(' ')
    })
  })
})
