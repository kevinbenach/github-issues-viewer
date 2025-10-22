import { useQuery } from '@apollo/client/react'

import { SEARCH_ISSUES_QUERY } from '@/api/queries/issues'
import { useIssuesStore } from '@/store/issuesStore'
import { buildSearchQuery } from '@/utils/buildGitHubQuery'
import { useDebounce } from '@/hooks/useDebounce'
import { ISSUES_PER_PAGE, SEARCH_DEBOUNCE_MS } from '@/constants/pagination'
import type { Issue } from '@/types/domain.types'

// ✨ NEW: Import generated types from codegen
import type {
  SearchIssuesQuery,
  SearchIssuesQueryVariables,
} from '@/api/types/generated'

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
 * 🎯 NOW USING CODEGEN:
 * - SearchIssuesQuery type is auto-generated from GraphQL schema
 * - No manual type definitions needed
 * - Types guaranteed to match actual API
 *
 * @returns Issues data, loading state, debouncing state, error state, and pagination info
 *
 * @example
 * const { issues, loading, isDebouncing, error, hasNextPage, refetch } = useIssues()
 */
export const useIssues = (): UseIssuesResult => {
  const filters = useIssuesStore((state) => state.filters)

  // Debounce the search text to avoid excessive API calls while typing
  const debouncedSearchText = useDebounce(filters.searchText, SEARCH_DEBOUNCE_MS)

  // Check if we're waiting for debounce (user is still typing)
  const isDebouncing = filters.searchText !== debouncedSearchText

  // Build query with debounced search text but immediate status filter
  const debouncedFilters = {
    ...filters,
    searchText: debouncedSearchText,
  }
  const queryString = buildSearchQuery(debouncedFilters)

  // ✨ NEW: Using generated SearchIssuesQuery type
  // VS Code now knows exact shape of data
  const { data, loading, error, refetch, fetchMore: apolloFetchMore, networkStatus } = useQuery<
    SearchIssuesQuery,
    SearchIssuesQueryVariables
  >(SEARCH_ISSUES_QUERY, {
    variables: {
      query: queryString,
      first: ISSUES_PER_PAGE,
    },
    notifyOnNetworkStatusChange: true,
  })

  // ✨ NEW: data.search is now fully typed by codegen
  // TypeScript knows: data.search.edges[].node.{id, title, state, etc.}
  const issues = (data?.search?.edges
    ?.map((edge) => edge?.node)
    .filter((node): node is NonNullable<typeof node> => node !== null) ?? []) as Issue[]

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
        first: ISSUES_PER_PAGE,
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
