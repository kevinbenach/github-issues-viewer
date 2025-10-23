import { useRef, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'

import { useIssues } from '@/hooks/useIssues'
import { useIssuesStore } from '@/store/issuesStore'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import IssueCard from '@/components/issue/IssueCard'
import IssueFilters from '@/components/issue/IssueFilters'
import Pagination from '@/components/common/Pagination'
import IssueCardSkeleton from '@/components/common/IssueCardSkeleton'
import { PageContainer, PageTitle, SectionHeader, ErrorDisplay } from '@/components/layout'
import { formatApolloError } from '@/utils/formatError'
import type { IssueFilters as IssueFiltersType } from '@/types/domain.types'

const StyledResultCount = styled.span`
  display: inline-block;
  min-width: 120px;
  text-align: right;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  white-space: nowrap;
`

const StyledIssuesList = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1; /* Fill remaining space */

  /* Reserve minimum height to prevent CLS when content changes */
  /* This ensures the container doesn't collapse when filtering */
  min-height: 300px;
`

/* Removed loading overlay - using skeleton cards instead to prevent CLS */

const StyledEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing['5xl']} ${({ theme }) => theme.spacing.lg};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.loose};
  /* Fill parent container to prevent CLS when switching from content to empty state */
  flex: 1;
  /* Match parent's min-height to maintain consistent layout */
  min-height: 300px;
`

const StyledIssuesListContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  transition: ${({ theme }) => theme.transitions.opacity};
  /* Ensure content fills parent to maintain consistent height */
  flex: 1;
  /* Match parent's min-height for consistent layout during transitions */
  min-height: 300px;
`

const IssuesPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const pageTitleRef = useRef<HTMLHeadingElement>(null)

  // Get store state and actions
  const filters = useIssuesStore((state) => state.filters)
  const setSearchText = useIssuesStore((state) => state.setSearchText)
  const setStatus = useIssuesStore((state) => state.setStatus)

  const { issues, loading, isDebouncing, error, hasNextPage, fetchMore, isFetchingMore } = useIssues()

  // Track if we've synced URL params to store on initial mount
  const hasInitializedFromUrl = useRef(false)

  /**
   * On mount: Read URL params and sync to store
   * This allows users to share URLs with filters: /?search=hooks&status=OPEN
   *
   * IMPORTANT: This effect should only run when searchParams change (mount or browser navigation),
   * NOT when filters change. We intentionally omit filters from the dependency array to avoid
   * a race condition where filter changes trigger this effect unnecessarily.
   */
  useEffect(() => {
    // Only run once on mount
    if (hasInitializedFromUrl.current) return
    hasInitializedFromUrl.current = true

    const urlSearch = searchParams.get('search') || ''
    const urlStatus = searchParams.get('status') || 'ALL'

    // Validate status is one of the allowed values
    const validStatuses: IssueFiltersType['status'][] = ['ALL', 'OPEN', 'CLOSED']
    const isValidStatus = validStatuses.includes(urlStatus as IssueFiltersType['status'])

    // Update store from URL params
    setSearchText(urlSearch)
    if (isValidStatus) {
      setStatus(urlStatus as IssueFiltersType['status'])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  /**
   * When filters change: Sync store to URL params
   * This keeps the URL in sync with the current filter state
   * Uses replace: true to avoid adding history entries on every keystroke
   */
  useEffect(() => {
    // Skip if we haven't initialized from URL yet (avoid overwriting URL on mount)
    if (!hasInitializedFromUrl.current) return

    const params = new URLSearchParams()

    // Only add params if they have values (keeps URL clean)
    if (filters.searchText.trim()) {
      params.set('search', filters.searchText.trim())
    }
    if (filters.status !== 'ALL') {
      params.set('status', filters.status)
    }

    // Update URL without adding to browser history
    setSearchParams(params, { replace: true })
  }, [filters.searchText, filters.status, setSearchParams])

  // Track if we've ever successfully loaded data (even once)
  const hasLoadedOnce = useRef(false)
  // Track if we've already focused on this page (to avoid refocusing on "Load More")
  const hasFocusedOnMount = useRef(false)

  // Mark as loaded once we have data or finished loading
  useEffect(() => {
    if (!loading || issues.length > 0) {
      hasLoadedOnce.current = true
    }
  }, [loading, issues.length])

  /**
   * Focus management for accessibility
   * Move focus to page title ONLY when user first lands on page (not on "Load More" clicks)
   * This helps screen reader users know they're on the issues list
   */
  useEffect(() => {
    // Only focus once per page visit (not on subsequent loading state changes)
    if (!loading && hasLoadedOnce.current && pageTitleRef.current && !hasFocusedOnMount.current) {
      pageTitleRef.current.focus()
      hasFocusedOnMount.current = true
    }
  }, [loading])

  // Only show full-page spinner on the very first load (before any data ever loaded)
  const isInitialLoad = loading && !hasLoadedOnce.current

  if (isInitialLoad) {
    return <LoadingSpinner text="Loading issues..." />
  }

  // Show inline error without unmounting the page
  const showError = error && issues.length === 0

  return (
    <PageContainer>
      <PageTitle ref={pageTitleRef} tabIndex={-1}>
        React Issues
      </PageTitle>

      <IssueFilters />

      <SectionHeader
        title="Issues"
        rightContent={
          <StyledResultCount>
            {loading || isDebouncing ? (
              <span>Searching...</span>
            ) : (
              <span>
                {issues.length} result{issues.length !== 1 ? 's' : ''}
              </span>
            )}
          </StyledResultCount>
        }
      />

      {showError ? (
        <ErrorDisplay
          title="Error loading issues"
          message={formatApolloError(error)}
        />
      ) : (
        <StyledIssuesList>
          {/* Show skeleton cards when loading after initial load to prevent CLS */}
          {loading && hasLoadedOnce.current && !isFetchingMore ? (
            <StyledIssuesListContent>
              {/* Show skeletons matching the number of previous results, or 5 as default */}
              {Array.from({ length: issues.length || 5 }).map((_, index) => (
                <IssueCardSkeleton key={`skeleton-${index}`} />
              ))}
            </StyledIssuesListContent>
          ) : !loading && issues.length === 0 ? (
            <StyledEmptyState>
              <div>No issues found.</div>
              <div>Try adjusting your filters.</div>
            </StyledEmptyState>
          ) : (
            <>
              <StyledIssuesListContent>
                {issues.map((issue) => (
                  <IssueCard
                    key={issue.id}
                    issue={issue}
                    onClick={() => navigate(`/issue/${issue.number}`)}
                  />
                ))}
              </StyledIssuesListContent>

              {/* Pagination component */}
              {issues.length > 0 && (
                <Pagination
                  hasNextPage={hasNextPage}
                  loading={isFetchingMore}
                  onLoadMore={fetchMore}
                />
              )}
            </>
          )}
        </StyledIssuesList>
      )}
    </PageContainer>
  )
}

export default IssuesPage
