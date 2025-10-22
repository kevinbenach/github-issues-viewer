import type { Issue, IssueDetail, IssueComment } from '@/types/domain.types'

/**
 * Mock issue data for testing
 * Provides realistic GitHub issue fixtures that can be reused across tests
 */

/**
 * Creates a mock issue with default values that can be overridden
 */
export const createMockIssue = (overrides?: Partial<Issue>): Issue => ({
  id: 'issue-1',
  number: 12345,
  title: 'Test Issue: Example bug report',
  state: 'OPEN',
  createdAt: '2024-01-15T10:30:00Z',
  author: {
    login: 'testuser',
  },
  comments: {
    totalCount: 5,
  },
  ...overrides,
})

/**
 * Creates a mock issue detail with comments
 */
export const createMockIssueDetail = (
  overrides?: Partial<IssueDetail>
): IssueDetail => ({
  ...createMockIssue(),
  body: 'This is a detailed description of the issue.\n\n## Steps to reproduce\n1. Do something\n2. See error',
  comments: {
    totalCount: 3,
    pageInfo: {
      hasNextPage: false,
      endCursor: null,
    },
    nodes: [
      createMockComment({ id: 'comment-1' }),
      createMockComment({ id: 'comment-2', body: 'Second comment' }),
      createMockComment({ id: 'comment-3', body: 'Third comment' }),
    ],
  },
  ...overrides,
})

/**
 * Creates a mock comment
 */
export const createMockComment = (
  overrides?: Partial<IssueComment>
): IssueComment => ({
  id: 'comment-1',
  body: 'This is a test comment',
  createdAt: '2024-01-15T11:00:00Z',
  author: {
    login: 'commenter',
  },
  ...overrides,
})

/**
 * Pre-made fixtures for common scenarios
 */
export const mockIssues = {
  // Open issue
  openIssue: createMockIssue({
    id: 'open-issue',
    number: 1,
    title: 'Open issue example',
    state: 'OPEN',
  }),

  // Closed issue
  closedIssue: createMockIssue({
    id: 'closed-issue',
    number: 2,
    title: 'Closed issue example',
    state: 'CLOSED',
  }),

  // Issue with no comments
  issueWithNoComments: createMockIssue({
    id: 'no-comments',
    number: 3,
    title: 'Issue with no comments',
    comments: {
      totalCount: 0,
    },
  }),

  // Issue with many comments
  issueWithManyComments: createMockIssue({
    id: 'many-comments',
    number: 4,
    title: 'Popular issue',
    comments: {
      totalCount: 150,
    },
  }),

  // Issue with null author (deleted user)
  issueWithNullAuthor: createMockIssue({
    id: 'null-author',
    number: 5,
    title: 'Issue from deleted user',
    author: null,
  }),
}

/**
 * List of multiple issues for testing pagination, filtering, etc.
 */
export const mockIssueList: Issue[] = [
  mockIssues.openIssue,
  mockIssues.closedIssue,
  mockIssues.issueWithNoComments,
  mockIssues.issueWithManyComments,
  mockIssues.issueWithNullAuthor,
]
