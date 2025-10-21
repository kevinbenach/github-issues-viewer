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
  padding: 24px 20px;
  box-sizing: border-box;

  /* Use flexbox instead of grid for simpler, more predictable layout */
  display: flex;
  flex-direction: column;
  gap: 24px; /* Consistent spacing between all sections */

  /* Responsive: reduce padding on mobile */
  @media (max-width: 640px) {
    padding: 16px 12px;
    gap: 20px;
  }
`

const StyledPageTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #1f2328;
  margin: 0; /* Parent gap handles spacing */
  line-height: 1.25;

  /* Responsive: smaller title on mobile */
  @media (max-width: 640px) {
    font-size: 24px;
  }
`

const StyledSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid #d0d7de;
  /* Removed fixed height - let content determine height */
  /* Removed margin - parent gap handles spacing */
`

const StyledSectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1f2328;
  margin: 0;
  line-height: 1.2;
`

const StyledResultCount = styled.span`
  display: inline-block;
  min-width: 120px; /* Increased to accommodate "Searching..." without width change */
  text-align: right;
  font-size: 14px;
  color: #656d76;
  line-height: 1.4;
  white-space: nowrap; /* Prevent text wrapping */
`

const StyledErrorContainer = styled.div`
  min-height: 120px;
  padding: 20px;
  background-color: #fff1f0;
  border: 1px solid #ffccc7;
  border-radius: 6px;
  color: #cf1322;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StyledErrorTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
`

const StyledErrorMessage = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
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
  gap: 8px;
  padding: 80px 20px;
  text-align: center;
  color: #656d76;
  font-size: 14px;
  line-height: 1.6;
  /* Removed arbitrary min-height */
`

const StyledIssuesListContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  transition: opacity 0.2s ease-in-out;
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
