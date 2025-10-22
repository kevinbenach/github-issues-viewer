import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { useIssues } from '@/hooks/useIssues'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import IssueCard from '@/components/issue/IssueCard'
import IssueFilters from '@/components/issue/IssueFilters'
import Pagination from '@/components/common/Pagination'
import IssueCardSkeleton from '@/components/common/IssueCardSkeleton'

const StyledContainer = styled.div`
  /* Layout */
  width: 100%;
  max-width: 1200px;
  min-height: 100vh;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  box-sizing: border-box;

  /* Use flexbox instead of grid for simpler, more predictable layout */
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl}; /* Consistent spacing between all sections */

  /* Responsive: reduce padding on mobile */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
    gap: ${({ theme }) => theme.spacing.lg};
  }
`

const StyledPageTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0; /* Parent gap handles spacing */
  line-height: ${({ theme }) => theme.typography.lineHeight.snug};

  /* Responsive: smaller title on mobile */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
`

const StyledSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border.default};
  /* Removed fixed height - let content determine height */
  /* Removed margin - parent gap handles spacing */
`

const StyledSectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`

const StyledResultCount = styled.span`
  display: inline-block;
  min-width: 120px; /* Increased to accommodate "Searching..." without width change */
  text-align: right;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  white-space: nowrap; /* Prevent text wrapping */
`

const StyledErrorContainer = styled.div`
  min-height: 120px;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.error.background};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.error.border};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.error.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StyledErrorTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`

const StyledErrorMessage = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.base};
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
    <StyledContainer>
      <StyledPageTitle>React Issues</StyledPageTitle>

      <IssueFilters />

      <StyledSectionHeader>
        <StyledSectionTitle>Issues</StyledSectionTitle>
        <StyledResultCount>
          {loading || isDebouncing ? (
            <span>Searching...</span>
          ) : (
            <span>
              {issues.length} result{issues.length !== 1 ? 's' : ''}
            </span>
          )}
        </StyledResultCount>
      </StyledSectionHeader>

      {showError ? (
        <StyledErrorContainer>
          <StyledErrorTitle>Error loading issues</StyledErrorTitle>
          <StyledErrorMessage>{error.message}</StyledErrorMessage>
        </StyledErrorContainer>
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
    </StyledContainer>
  )
}

export default IssuesPage
