import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { useIssues } from '@/hooks/useIssues'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import IssueCard from '@/components/issue/IssueCard'
import IssueFilters from '@/components/issue/IssueFilters'
import Pagination from '@/components/common/Pagination'
import IssueCardSkeleton from '@/components/common/IssueCardSkeleton'
import { PageContainer, PageTitle, SectionHeader, ErrorDisplay } from '@/components/layout'

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
  const { issues, loading, isDebouncing, error, hasNextPage, fetchMore, isFetchingMore } = useIssues()

  // Track if we've ever successfully loaded data (even once)
  const hasLoadedOnce = useRef(false)

  // Mark as loaded once we have data or finished loading
  useEffect(() => {
    if (!loading || issues.length > 0) {
      hasLoadedOnce.current = true
    }
  }, [loading, issues.length])

  // Only show full-page spinner on the very first load (before any data ever loaded)
  const isInitialLoad = loading && !hasLoadedOnce.current

  if (isInitialLoad) {
    return <LoadingSpinner text="Loading issues..." />
  }

  // Show inline error without unmounting the page
  const showError = error && issues.length === 0

  return (
    <PageContainer>
      <PageTitle>React Issues</PageTitle>

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
          message={error.message}
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
