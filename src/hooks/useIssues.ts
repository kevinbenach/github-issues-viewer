import { useQuery } from '@apollo/client/react'

import { SEARCH_ISSUES_QUERY } from '@/api/queries/issues'
import { useIssuesStore } from '@/store/issuesStore'
import { buildSearchQuery } from '@/utils/buildGitHubQuery'
import { useDebounce } from '@/hooks/useDebounce'
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
  isDebouncing: boolean
  error: Error | undefined
  hasNextPage: boolean
  refetch: () => void
  fetchMore: () => Promise<void>
  isFetchingMore: boolean
}

/**
 * Custom hook for fetching and managing GitHub issues
 * Combines Zustand filter state with Apollo GraphQL queries
 * Debounces search text changes by 300ms to reduce API calls
 *
 * @returns Issues data, loading state, debouncing state, error state, and pagination info
 *
 * @example
 * const { issues, loading, isDebouncing, error, hasNextPage, refetch } = useIssues()
 */
export const useIssues = (): UseIssuesResult => {
  const filters = useIssuesStore((state) => state.filters)

  // Debounce the search text to avoid excessive API calls while typing
  const debouncedSearchText = useDebounce(filters.searchText, 300)

  // Check if we're waiting for debounce (user is still typing)
  const isDebouncing = filters.searchText !== debouncedSearchText

  // Build query with debounced search text but immediate status filter
  const debouncedFilters = {
    ...filters,
    searchText: debouncedSearchText,
  }
  const queryString = buildSearchQuery(debouncedFilters)

  const { data, loading, error, refetch, fetchMore: apolloFetchMore, networkStatus } = useQuery<SearchIssuesData>(
    SEARCH_ISSUES_QUERY,
    {
      variables: {
        query: queryString,
        first: 20,
      },
      notifyOnNetworkStatusChange: true,
    }
  )

  const issues = data?.search?.edges?.map((edge) => edge.node) ?? []
  const hasNextPage = data?.search?.pageInfo?.hasNextPage ?? false
  const endCursor = data?.search?.pageInfo?.endCursor ?? null

  // networkStatus 3 means fetchMore is in progress
  const isFetchingMore = networkStatus === 3

  const fetchMore = async (): Promise<void> => {
    if (!hasNextPage || isFetchingMore || !endCursor) {
      return
    }

    await apolloFetchMore({
      variables: {
        query: queryString,
        first: 20,
        after: endCursor,
      },
    })
  }

  return {
    issues,
    loading,
    isDebouncing,
    error,
    hasNextPage,
    refetch,
    fetchMore,
    isFetchingMore,
  }
}
