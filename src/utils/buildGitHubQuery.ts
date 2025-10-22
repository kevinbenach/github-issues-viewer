import type { IssueFilters } from '@/types/domain.types'
import { GITHUB_REPO_OWNER, GITHUB_REPO_NAME } from '@/constants/env'

/**
 * Builds a GitHub search query string from filter parameters
 *
 * @param filters - Search and filter parameters
 * @returns Formatted GitHub search query string
 *
 * @example
 * buildSearchQuery({ searchText: '', status: 'OPEN' })
 * // Returns: "repo:facebook/react is:issue state:open"
 *
 * @example
 * buildSearchQuery({ searchText: 'hooks', status: 'ALL' })
 * // Returns: "repo:facebook/react is:issue hooks"
 *
 * @example
 * buildSearchQuery({ searchText: 'bug', status: 'CLOSED' })
 * // Returns: "repo:facebook/react is:issue bug state:closed"
 */
export const buildSearchQuery = (filters: IssueFilters): string => {
  const parts: string[] = [`repo:${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}`, 'is:issue']

  // Add search text if provided
  if (filters.searchText.trim()) {
    parts.push(filters.searchText.trim())
  }

  // Add state filter if not 'ALL'
  if (filters.status !== 'ALL') {
    parts.push(`state:${filters.status.toLowerCase()}`)
  }

  return parts.join(' ')
}
