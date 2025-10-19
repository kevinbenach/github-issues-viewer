import { useQuery } from '@apollo/client/react'

import { SEARCH_ISSUES_QUERY } from '@/api/queries/issues'
import { useIssuesStore } from '@/store/issuesStore'
import { buildSearchQuery } from '@/utils/buildGitHubQuery'
import type { Issue, PageInfo } from '@/types/domain.types'

/**
 * GraphQL response type for search issues query
 */
interface SearchIssuesData {
  search: {
    edges: Array<{
      node: Issue
    }>
    pageInfo: PageInfo
  }
}

/**
 * Return type for useIssues hook
 */
interface UseIssuesResult {
  issues: Issue[]
  loading: boolean
  error: Error | undefined
  hasNextPage: boolean
  refetch: () => void
}

/**
 * Custom hook for fetching and managing GitHub issues
 * Combines Zustand filter state with Apollo GraphQL queries
 *
 * @returns Issues data, loading state, error state, and pagination info
 *
 * @example
 * const { issues, loading, error, hasNextPage, refetch } = useIssues()
 */
export const useIssues = (): UseIssuesResult => {
  const filters = useIssuesStore((state) => state.filters)
  const queryString = buildSearchQuery(filters)

  const { data, loading, error, refetch } = useQuery<SearchIssuesData>(
    SEARCH_ISSUES_QUERY,
    {
      variables: {
        query: queryString,
        first: 20,
      },
    }
  )

  const issues = data?.search?.edges?.map((edge) => edge.node) ?? []
  const hasNextPage = data?.search?.pageInfo?.hasNextPage ?? false

  return {
    issues,
    loading,
    error,
    hasNextPage,
    refetch,
  }
}
