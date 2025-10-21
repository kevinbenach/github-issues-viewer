/**
 * Domain types for GitHub Issues Viewer
 * These represent the core business entities used throughout the application
 */

/**
 * Represents a GitHub issue comment
 */
export interface IssueComment {
  id: string
  body: string
  createdAt: string
  author: {
    login: string
  } | null
}

/**
 * Represents a GitHub issue (list view)
 */
export interface Issue {
  id: string
  number: number
  title: string
  state: 'OPEN' | 'CLOSED'
  createdAt: string
  author: {
    login: string
  } | null
  comments: {
    totalCount: number
  }
}

/**
 * Represents a GitHub issue with full details (detail view)
 * Extends Issue with body and full comment list
 */
export interface IssueDetail extends Issue {
  body: string
  comments: {
    totalCount: number
    pageInfo: PageInfo
    nodes: IssueComment[]
  }
}

/**
 * Filters for searching and filtering issues
 */
export interface IssueFilters {
  searchText: string
  status: 'OPEN' | 'CLOSED' | 'ALL'
}

/**
 * Pagination information from GitHub GraphQL API
 */
export interface PageInfo {
  hasNextPage: boolean
  endCursor: string | null
}
