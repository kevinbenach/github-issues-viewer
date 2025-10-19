/**
 * Domain types for GitHub Issues Viewer
 * These represent the core business entities used throughout the application
 */

/**
 * Represents a GitHub issue
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
