import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing/react'
import { ReactNode } from 'react'

import { useIssues } from '@/hooks/useIssues'
import { SEARCH_ISSUES_QUERY } from '@/api/queries/issues'
import { useIssuesStore } from '@/store/issuesStore'
import { ISSUES_PER_PAGE } from '@/constants/pagination'

/**
 * Tests for useIssues hook with Apollo MockedProvider
 *
 * This tests the CORE data fetching logic of the application.
 * We use MockedProvider to simulate GraphQL API responses without
 * actually hitting GitHub's servers.
 *
 * Why this is critical:
 * - useIssues is the primary data source for the app
 * - If this breaks, the entire app breaks
 * - Tests both success and failure scenarios
 * - Validates GraphQL query construction
 *
 * Testing strategy:
 * - Mock the GraphQL response with Apollo's MockedProvider
 * - Verify loading states transition correctly
 * - Verify data is transformed correctly from GraphQL to domain types
 * - Verify error handling displays appropriate messages
 */
describe('useIssues', () => {
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
   * SUCCESS CASE: API returns data successfully
   */
  describe('successful data fetching', () => {
    it('should fetch issues successfully and transform data correctly', async () => {
      // 1. ARRANGE: Create mock GraphQL response
      // This simulates what GitHub's API would return
      const mocks = [
        {
          request: {
            query: SEARCH_ISSUES_QUERY,
            variables: {
              query: 'repo:facebook/react is:issue', // Default query (no filters)
              first: ISSUES_PER_PAGE,
            },
          },
          result: {
            data: {
              search: {
                __typename: 'SearchResultItemConnection',
                edges: [
                  {
                    __typename: 'SearchResultItemEdge',
                    node: {
                      __typename: 'Issue',
                      id: 'issue-1',
                      number: 12345,
                      title: 'Test Issue 1',
                      state: 'OPEN',
                      createdAt: '2024-01-01T00:00:00Z',
                      author: { __typename: 'User', login: 'testuser' },
                      comments: { __typename: 'IssueCommentConnection', totalCount: 5 },
                    },
                  },
                  {
                    __typename: 'SearchResultItemEdge',
                    node: {
                      __typename: 'Issue',
                      id: 'issue-2',
                      number: 12346,
                      title: 'Test Issue 2',
                      state: 'CLOSED',
                      createdAt: '2024-01-02T00:00:00Z',
                      author: { __typename: 'User', login: 'anotheruser' },
                      comments: { __typename: 'IssueCommentConnection', totalCount: 10 },
                    },
                  },
                ],
                pageInfo: {
                  __typename: 'PageInfo',
                  hasNextPage: true,
                  endCursor: 'cursor-abc123',
                },
              },
            },
          },
        },
      ]

      // 2. Create wrapper with MockedProvider
      // This provides the Apollo Client context to the hook
      const wrapper = ({ children }: { children: ReactNode }) => (
        <MockedProvider mocks={mocks}>
          {children}
        </MockedProvider>
      )

      // 3. ACT: Render the hook
      const { result } = renderHook(() => useIssues(), { wrapper })

      // 4. ASSERT: Initially should be loading with empty data
      expect(result.current.loading).toBe(true)
      expect(result.current.issues).toEqual([])
      expect(result.current.error).toBeUndefined()
      expect(result.current.hasNextPage).toBe(false)

      // 5. Wait for the GraphQL query to resolve
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // 6. ASSERT: Data should be loaded and transformed correctly
      expect(result.current.issues).toHaveLength(2)
      expect(result.current.error).toBeUndefined()

      // Verify first issue (use toMatchObject to ignore __typename fields)
      expect(result.current.issues[0]).toMatchObject({
        id: 'issue-1',
        number: 12345,
        title: 'Test Issue 1',
        state: 'OPEN',
        createdAt: '2024-01-01T00:00:00Z',
        author: { login: 'testuser' },
        comments: { totalCount: 5 },
      })

      // Verify second issue
      expect(result.current.issues[1]).toMatchObject({
        id: 'issue-2',
        number: 12346,
        title: 'Test Issue 2',
        state: 'CLOSED',
        createdAt: '2024-01-02T00:00:00Z',
        author: { login: 'anotheruser' },
        comments: { totalCount: 10 },
      })

      // Verify pagination info
      expect(result.current.hasNextPage).toBe(true)
    })

    it('should handle empty results correctly', async () => {
      // Mock an API response with no issues
      const mocks = [
        {
          request: {
            query: SEARCH_ISSUES_QUERY,
            variables: {
              query: 'repo:facebook/react is:issue',
              first: ISSUES_PER_PAGE,
            },
          },
          result: {
            data: {
              search: {
                edges: [], // Empty array - no issues found
                pageInfo: {
                  hasNextPage: false,
                  endCursor: null,
                },
              },
            },
          },
        },
      ]

      const wrapper = ({ children }: { children: ReactNode }) => (
        <MockedProvider mocks={mocks}>
          {children}
        </MockedProvider>
      )

      const { result } = renderHook(() => useIssues(), { wrapper })

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Should have empty array, not undefined
      expect(result.current.issues).toEqual([])
      expect(result.current.error).toBeUndefined()
      expect(result.current.hasNextPage).toBe(false)
    })
  })

  /**
   * ERROR CASE: API returns an error
   */
  describe('error handling', () => {
    it('should handle API errors gracefully', async () => {
      // Mock a GraphQL error (e.g., rate limit, network error, auth error)
      const mocks = [
        {
          request: {
            query: SEARCH_ISSUES_QUERY,
            variables: {
              query: 'repo:facebook/react is:issue',
              first: ISSUES_PER_PAGE,
            },
          },
          error: new Error('API rate limit exceeded'),
        },
      ]

      const wrapper = ({ children }: { children: ReactNode }) => (
        <MockedProvider mocks={mocks}>
          {children}
        </MockedProvider>
      )

      const { result } = renderHook(() => useIssues(), { wrapper })

      // Initially loading
      expect(result.current.loading).toBe(true)

      // Wait for error to be set
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Should have error and empty issues array
      expect(result.current.error).toBeDefined()
      expect(result.current.error?.message).toContain('rate limit')
      expect(result.current.issues).toEqual([])
      expect(result.current.hasNextPage).toBe(false)
    })

    it('should handle network errors', async () => {
      const mocks = [
        {
          request: {
            query: SEARCH_ISSUES_QUERY,
            variables: {
              query: 'repo:facebook/react is:issue',
              first: ISSUES_PER_PAGE,
            },
          },
          error: new Error('Network request failed'),
        },
      ]

      const wrapper = ({ children }: { children: ReactNode }) => (
        <MockedProvider mocks={mocks}>
          {children}
        </MockedProvider>
      )

      const { result } = renderHook(() => useIssues(), { wrapper })

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.error).toBeDefined()
      expect(result.current.error?.message).toContain('Network')
      expect(result.current.issues).toEqual([])
    })

    it('should handle GraphQL errors in response', async () => {
      // GraphQL can return errors in the response (not as Error objects)
      const mocks = [
        {
          request: {
            query: SEARCH_ISSUES_QUERY,
            variables: {
              query: 'repo:facebook/react is:issue',
              first: ISSUES_PER_PAGE,
            },
          },
          result: {
            errors: [
              {
                message: 'Bad credentials',
                extensions: { code: 'UNAUTHENTICATED' },
              },
            ],
          },
        },
      ]

      const wrapper = ({ children }: { children: ReactNode }) => (
        <MockedProvider mocks={mocks}>
          {children}
        </MockedProvider>
      )

      const { result } = renderHook(() => useIssues(), { wrapper })

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Apollo should still set error when GraphQL returns errors
      expect(result.current.error).toBeDefined()
    })
  })

  /**
   * LOADING STATES: Verify proper state transitions
   */
  describe('loading states', () => {
    it('should start with loading=true', () => {
      const mocks = [
        {
          request: {
            query: SEARCH_ISSUES_QUERY,
            variables: {
              query: 'repo:facebook/react is:issue',
              first: ISSUES_PER_PAGE,
            },
          },
          result: {
            data: {
              search: {
                edges: [],
                pageInfo: { hasNextPage: false, endCursor: null },
              },
            },
          },
        },
      ]

      const wrapper = ({ children }: { children: ReactNode }) => (
        <MockedProvider mocks={mocks}>
          {children}
        </MockedProvider>
      )

      const { result } = renderHook(() => useIssues(), { wrapper })

      // On initial render, should be loading
      expect(result.current.loading).toBe(true)
      expect(result.current.issues).toEqual([])
    })

    it('should transition loading from true to false', async () => {
      const mocks = [
        {
          request: {
            query: SEARCH_ISSUES_QUERY,
            variables: {
              query: 'repo:facebook/react is:issue',
              first: ISSUES_PER_PAGE,
            },
          },
          result: {
            data: {
              search: {
                edges: [],
                pageInfo: { hasNextPage: false, endCursor: null },
              },
            },
          },
        },
      ]

      const wrapper = ({ children }: { children: ReactNode }) => (
        <MockedProvider mocks={mocks}>
          {children}
        </MockedProvider>
      )

      const { result } = renderHook(() => useIssues(), { wrapper })

      // Starts loading
      expect(result.current.loading).toBe(true)

      // Finishes loading
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
    })
  })

  /**
   * PAGINATION: Verify hasNextPage and fetchMore
   */
  describe('pagination', () => {
    it('should correctly report hasNextPage', async () => {
      const mocks = [
        {
          request: {
            query: SEARCH_ISSUES_QUERY,
            variables: {
              query: 'repo:facebook/react is:issue',
              first: ISSUES_PER_PAGE,
            },
          },
          result: {
            data: {
              search: {
                edges: [
                  {
                    node: {
                      id: 'issue-1',
                      number: 123,
                      title: 'Test',
                      state: 'OPEN',
                      createdAt: '2024-01-01T00:00:00Z',
                      author: { login: 'user' },
                      comments: { totalCount: 0 },
                    },
                  },
                ],
                pageInfo: {
                  hasNextPage: true, // More pages available
                  endCursor: 'cursor-123',
                },
              },
            },
          },
        },
      ]

      const wrapper = ({ children }: { children: ReactNode }) => (
        <MockedProvider mocks={mocks}>
          {children}
        </MockedProvider>
      )

      const { result } = renderHook(() => useIssues(), { wrapper })

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.hasNextPage).toBe(true)
    })

    it('should report hasNextPage=false when no more pages', async () => {
      const mocks = [
        {
          request: {
            query: SEARCH_ISSUES_QUERY,
            variables: {
              query: 'repo:facebook/react is:issue',
              first: ISSUES_PER_PAGE,
            },
          },
          result: {
            data: {
              search: {
                edges: [
                  {
                    node: {
                      id: 'issue-1',
                      number: 123,
                      title: 'Test',
                      state: 'OPEN',
                      createdAt: '2024-01-01T00:00:00Z',
                      author: { login: 'user' },
                      comments: { totalCount: 0 },
                    },
                  },
                ],
                pageInfo: {
                  hasNextPage: false, // Last page
                  endCursor: 'cursor-123',
                },
              },
            },
          },
        },
      ]

      const wrapper = ({ children }: { children: ReactNode }) => (
        <MockedProvider mocks={mocks}>
          {children}
        </MockedProvider>
      )

      const { result } = renderHook(() => useIssues(), { wrapper })

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.hasNextPage).toBe(false)
    })
  })

  /**
   * NULL HANDLING: Verify the hook handles null/missing data
   */
  describe('null and missing data handling', () => {
    it('should handle null author gracefully', async () => {
      const mocks = [
        {
          request: {
            query: SEARCH_ISSUES_QUERY,
            variables: {
              query: 'repo:facebook/react is:issue',
              first: ISSUES_PER_PAGE,
            },
          },
          result: {
            data: {
              search: {
                __typename: 'SearchResultItemConnection',
                edges: [
                  {
                    __typename: 'SearchResultItemEdge',
                    node: {
                      __typename: 'Issue',
                      id: 'issue-1',
                      number: 123,
                      title: 'Test Issue',
                      state: 'OPEN',
                      createdAt: '2024-01-01T00:00:00Z',
                      author: null, // Deleted user or ghost account
                      comments: { __typename: 'IssueCommentConnection', totalCount: 0 },
                    },
                  },
                ],
                pageInfo: {
                  __typename: 'PageInfo',
                  hasNextPage: false,
                  endCursor: null,
                },
              },
            },
          },
        },
      ]

      const wrapper = ({ children }: { children: ReactNode }) => (
        <MockedProvider mocks={mocks}>
          {children}
        </MockedProvider>
      )

      const { result } = renderHook(() => useIssues(), { wrapper })

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.issues).toHaveLength(1)

      // Verify the issue exists and has null author
      const issue = result.current.issues[0]
      expect(issue).toBeDefined()
      expect(issue?.author).toBeNull()
      // Should not crash - null is valid
    })
  })
})
