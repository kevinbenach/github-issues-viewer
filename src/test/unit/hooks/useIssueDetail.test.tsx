import { describe, it, expect } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing/react'
import { ReactNode } from 'react'

import { useIssueDetail } from '@/hooks/useIssueDetail'
import { GET_ISSUE_QUERY } from '@/api/queries/issue-detail'
import { COMMENTS_PER_PAGE } from '@/constants/pagination'

/**
 * Tests for useIssueDetail hook with Apollo MockedProvider
 *
 * This tests the issue detail page data fetching logic.
 * Critical because if this breaks, the entire detail page breaks.
 *
 * Testing strategy:
 * - Mock GraphQL responses with Apollo's MockedProvider
 * - Verify loading states transition correctly
 * - Verify data is transformed correctly from GraphQL to domain types
 * - Verify error handling
 * - Verify comment pagination
 */
describe('useIssueDetail', () => {
  /**
   * SUCCESS CASE: API returns issue with comments
   */
  describe('successful data fetching', () => {
    it('should fetch issue details successfully', async () => {
      // ARRANGE: Create mock GraphQL response
      const mocks = [
        {
          request: {
            query: GET_ISSUE_QUERY,
            variables: {
              owner: 'facebook',
              name: 'react',
              number: 12345,
              commentsFirst: COMMENTS_PER_PAGE,
            },
          },
          result: {
            data: {
              repository: {
                __typename: 'Repository',
                issue: {
                  __typename: 'Issue',
                  id: 'issue-12345',
                  number: 12345,
                  title: 'Test Issue Title',
                  state: 'OPEN',
                  createdAt: '2024-01-01T00:00:00Z',
                  author: { __typename: 'User', login: 'testuser' },
                  body: 'This is the issue body with detailed description.',
                  comments: {
                    __typename: 'IssueCommentConnection',
                    totalCount: 3,
                    pageInfo: {
                      __typename: 'PageInfo',
                      hasNextPage: false,
                      endCursor: null,
                    },
                    nodes: [
                      {
                        __typename: 'IssueComment',
                        id: 'comment-1',
                        body: 'First comment',
                        createdAt: '2024-01-02T00:00:00Z',
                        author: { __typename: 'User', login: 'commenter1' },
                      },
                      {
                        __typename: 'IssueComment',
                        id: 'comment-2',
                        body: 'Second comment',
                        createdAt: '2024-01-03T00:00:00Z',
                        author: { __typename: 'User', login: 'commenter2' },
                      },
                      {
                        __typename: 'IssueComment',
                        id: 'comment-3',
                        body: 'Third comment',
                        createdAt: '2024-01-04T00:00:00Z',
                        author: { __typename: 'User', login: 'commenter3' },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      ]

      const wrapper = ({ children }: { children: ReactNode }) => (
        <MockedProvider mocks={mocks}>{children}</MockedProvider>
      )

      // ACT: Render the hook
      const { result } = renderHook(() => useIssueDetail(12345), { wrapper })

      // ASSERT: Initially should be loading
      expect(result.current.loading).toBe(true)
      expect(result.current.issue).toBeNull()
      expect(result.current.comments).toEqual([])

      // Wait for query to resolve
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // ASSERT: Issue data loaded correctly
      expect(result.current.issue).toMatchObject({
        id: 'issue-12345',
        number: 12345,
        title: 'Test Issue Title',
        state: 'OPEN',
        body: 'This is the issue body with detailed description.',
        author: { login: 'testuser' },
      })

      // ASSERT: Comments loaded correctly
      expect(result.current.comments).toHaveLength(3)
      expect(result.current.comments[0]).toMatchObject({
        id: 'comment-1',
        body: 'First comment',
        author: { login: 'commenter1' },
      })

      // ASSERT: Pagination info correct
      expect(result.current.hasNextPage).toBe(false)
    })

    it('should handle issue with no comments', async () => {
      const mocks = [
        {
          request: {
            query: GET_ISSUE_QUERY,
            variables: {
              owner: 'facebook',
              name: 'react',
              number: 99999,
              commentsFirst: COMMENTS_PER_PAGE,
            },
          },
          result: {
            data: {
              repository: {
                issue: {
                  id: 'issue-99999',
                  number: 99999,
                  title: 'Issue with no comments',
                  state: 'CLOSED',
                  createdAt: '2024-01-01T00:00:00Z',
                  author: { login: 'testuser' },
                  body: 'No one has commented yet.',
                  comments: {
                    totalCount: 0,
                    pageInfo: {
                      hasNextPage: false,
                      endCursor: null,
                    },
                    nodes: [], // Empty comments array
                  },
                },
              },
            },
          },
        },
      ]

      const wrapper = ({ children }: { children: ReactNode }) => (
        <MockedProvider mocks={mocks}>{children}</MockedProvider>
      )

      const { result } = renderHook(() => useIssueDetail(99999), { wrapper })

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Should have issue but no comments
      expect(result.current.issue).toBeDefined()
      expect(result.current.comments).toEqual([])
      expect(result.current.hasNextPage).toBe(false)
    })

    it('should handle issue with empty body', async () => {
      const mocks = [
        {
          request: {
            query: GET_ISSUE_QUERY,
            variables: {
              owner: 'facebook',
              name: 'react',
              number: 11111,
              commentsFirst: COMMENTS_PER_PAGE,
            },
          },
          result: {
            data: {
              repository: {
                issue: {
                  id: 'issue-11111',
                  number: 11111,
                  title: 'Issue with no description',
                  state: 'OPEN',
                  createdAt: '2024-01-01T00:00:00Z',
                  author: { login: 'testuser' },
                  body: '', // Empty body
                  comments: {
                    totalCount: 0,
                    pageInfo: { hasNextPage: false, endCursor: null },
                    nodes: [],
                  },
                },
              },
            },
          },
        },
      ]

      const wrapper = ({ children }: { children: ReactNode }) => (
        <MockedProvider mocks={mocks}>{children}</MockedProvider>
      )

      const { result } = renderHook(() => useIssueDetail(11111), { wrapper })

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Should handle empty body gracefully
      expect(result.current.issue?.body).toBe('')
    })
  })

  /**
   * ERROR CASE: API returns errors
   */
  describe('error handling', () => {
    it('should handle 404 - issue not found', async () => {
      const mocks = [
        {
          request: {
            query: GET_ISSUE_QUERY,
            variables: {
              owner: 'facebook',
              name: 'react',
              number: 99999999,
              commentsFirst: COMMENTS_PER_PAGE,
            },
          },
          result: {
            data: {
              repository: {
                issue: null, // Issue doesn't exist
              },
            },
          },
        },
      ]

      const wrapper = ({ children }: { children: ReactNode }) => (
        <MockedProvider mocks={mocks}>{children}</MockedProvider>
      )

      const { result } = renderHook(() => useIssueDetail(99999999), { wrapper })

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Should return null for non-existent issue
      expect(result.current.issue).toBeNull()
      expect(result.current.comments).toEqual([])
      expect(result.current.error).toBeUndefined()
    })

    it('should handle network errors', async () => {
      const mocks = [
        {
          request: {
            query: GET_ISSUE_QUERY,
            variables: {
              owner: 'facebook',
              name: 'react',
              number: 12345,
              commentsFirst: COMMENTS_PER_PAGE,
            },
          },
          error: new Error('Network request failed'),
        },
      ]

      const wrapper = ({ children }: { children: ReactNode }) => (
        <MockedProvider mocks={mocks}>{children}</MockedProvider>
      )

      const { result } = renderHook(() => useIssueDetail(12345), { wrapper })

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Should have error
      expect(result.current.error).toBeDefined()
      expect(result.current.error?.message).toContain('Network')
      expect(result.current.issue).toBeNull()
    })

    it('should handle GraphQL errors (auth/rate limit)', async () => {
      const mocks = [
        {
          request: {
            query: GET_ISSUE_QUERY,
            variables: {
              owner: 'facebook',
              name: 'react',
              number: 12345,
              commentsFirst: COMMENTS_PER_PAGE,
            },
          },
          result: {
            errors: [
              {
                message: 'API rate limit exceeded',
                extensions: { code: 'RATE_LIMITED' },
              },
            ],
          },
        },
      ]

      const wrapper = ({ children }: { children: ReactNode }) => (
        <MockedProvider mocks={mocks}>{children}</MockedProvider>
      )

      const { result } = renderHook(() => useIssueDetail(12345), { wrapper })

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.error).toBeDefined()
    })
  })

  /**
   * LOADING STATES
   */
  describe('loading states', () => {
    it('should start with loading=true', () => {
      const mocks = [
        {
          request: {
            query: GET_ISSUE_QUERY,
            variables: {
              owner: 'facebook',
              name: 'react',
              number: 12345,
              commentsFirst: COMMENTS_PER_PAGE,
            },
          },
          result: {
            data: {
              repository: {
                issue: {
                  id: 'issue-12345',
                  number: 12345,
                  title: 'Test',
                  state: 'OPEN',
                  createdAt: '2024-01-01T00:00:00Z',
                  author: { login: 'test' },
                  body: 'test',
                  comments: {
                    totalCount: 0,
                    pageInfo: { hasNextPage: false, endCursor: null },
                    nodes: [],
                  },
                },
              },
            },
          },
        },
      ]

      const wrapper = ({ children }: { children: ReactNode }) => (
        <MockedProvider mocks={mocks}>{children}</MockedProvider>
      )

      const { result } = renderHook(() => useIssueDetail(12345), { wrapper })

      // Initially loading
      expect(result.current.loading).toBe(true)
      expect(result.current.issue).toBeNull()
    })

    it('should skip query when issue number is 0 or negative', () => {
      const wrapper = ({ children }: { children: ReactNode }) => (
        <MockedProvider mocks={[]}>{children}</MockedProvider>
      )

      const { result: result1 } = renderHook(() => useIssueDetail(0), { wrapper })
      const { result: result2 } = renderHook(() => useIssueDetail(-1), { wrapper })

      // Should not load (skip: true)
      expect(result1.current.loading).toBe(false)
      expect(result1.current.issue).toBeNull()

      expect(result2.current.loading).toBe(false)
      expect(result2.current.issue).toBeNull()
    })
  })

  /**
   * NULL HANDLING: Deleted authors, missing data
   */
  describe('null and missing data handling', () => {
    it('should handle null author (deleted account)', async () => {
      const mocks = [
        {
          request: {
            query: GET_ISSUE_QUERY,
            variables: {
              owner: 'facebook',
              name: 'react',
              number: 12345,
              commentsFirst: COMMENTS_PER_PAGE,
            },
          },
          result: {
            data: {
              repository: {
                issue: {
                  id: 'issue-12345',
                  number: 12345,
                  title: 'Issue by deleted user',
                  state: 'OPEN',
                  createdAt: '2024-01-01T00:00:00Z',
                  author: null, // Deleted user
                  body: 'Content still exists',
                  comments: {
                    totalCount: 1,
                    pageInfo: { hasNextPage: false, endCursor: null },
                    nodes: [
                      {
                        id: 'comment-1',
                        body: 'Comment by deleted user',
                        createdAt: '2024-01-02T00:00:00Z',
                        author: null, // Also deleted
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      ]

      const wrapper = ({ children }: { children: ReactNode }) => (
        <MockedProvider mocks={mocks}>{children}</MockedProvider>
      )

      const { result } = renderHook(() => useIssueDetail(12345), { wrapper })

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      // Should handle null authors gracefully
      // The hook returns null for issue.author but undefined for comment.author
      // Both are acceptable - the UI handles them with the ?? operator
      expect(result.current.issue?.author).toBeNull()
      expect(result.current.comments[0]?.author).toBeUndefined()
      // Should not crash - the important thing is it handles missing authors
    })
  })

  /**
   * PAGINATION: Comments pagination
   */
  describe('comment pagination', () => {
    it('should correctly report hasNextPage for comments', async () => {
      const mocks = [
        {
          request: {
            query: GET_ISSUE_QUERY,
            variables: {
              owner: 'facebook',
              name: 'react',
              number: 12345,
              commentsFirst: COMMENTS_PER_PAGE,
            },
          },
          result: {
            data: {
              repository: {
                issue: {
                  id: 'issue-12345',
                  number: 12345,
                  title: 'Issue with many comments',
                  state: 'OPEN',
                  createdAt: '2024-01-01T00:00:00Z',
                  author: { login: 'test' },
                  body: 'Popular issue',
                  comments: {
                    totalCount: 50,
                    pageInfo: {
                      hasNextPage: true, // More comments available
                      endCursor: 'cursor-20',
                    },
                    nodes: Array.from({ length: 20 }, (_, i) => ({
                      id: `comment-${i}`,
                      body: `Comment ${i}`,
                      createdAt: '2024-01-01T00:00:00Z',
                      author: { login: 'commenter' },
                    })),
                  },
                },
              },
            },
          },
        },
      ]

      const wrapper = ({ children }: { children: ReactNode }) => (
        <MockedProvider mocks={mocks}>{children}</MockedProvider>
      )

      const { result } = renderHook(() => useIssueDetail(12345), { wrapper })

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.hasNextPage).toBe(true)
      expect(result.current.comments).toHaveLength(20)
    })

    it('should report hasNextPage=false when no more comments', async () => {
      const mocks = [
        {
          request: {
            query: GET_ISSUE_QUERY,
            variables: {
              owner: 'facebook',
              name: 'react',
              number: 12345,
              commentsFirst: COMMENTS_PER_PAGE,
            },
          },
          result: {
            data: {
              repository: {
                issue: {
                  id: 'issue-12345',
                  number: 12345,
                  title: 'Issue with few comments',
                  state: 'OPEN',
                  createdAt: '2024-01-01T00:00:00Z',
                  author: { login: 'test' },
                  body: 'Not many comments',
                  comments: {
                    totalCount: 5,
                    pageInfo: {
                      hasNextPage: false, // All comments loaded
                      endCursor: 'cursor-5',
                    },
                    nodes: Array.from({ length: 5 }, (_, i) => ({
                      id: `comment-${i}`,
                      body: `Comment ${i}`,
                      createdAt: '2024-01-01T00:00:00Z',
                      author: { login: 'commenter' },
                    })),
                  },
                },
              },
            },
          },
        },
      ]

      const wrapper = ({ children }: { children: ReactNode }) => (
        <MockedProvider mocks={mocks}>{children}</MockedProvider>
      )

      const { result } = renderHook(() => useIssueDetail(12345), { wrapper })

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })

      expect(result.current.hasNextPage).toBe(false)
      expect(result.current.comments).toHaveLength(5)
    })
  })
})
