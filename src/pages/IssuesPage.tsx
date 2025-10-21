import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { useIssues } from '@/hooks/useIssues'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import IssueCard from '@/components/issue/IssueCard'
import IssueFilters from '@/components/issue/IssueFilters'
import Pagination from '@/components/common/Pagination'

const StyledContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto auto auto 1fr;
  gap: 0;
`

const StyledPageTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #1f2328;
  margin: 0 0 24px 0;
  line-height: 1.2;
`

const StyledSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 52px;
  margin: 24px 0 16px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid #d0d7de;
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
  min-width: 100px;
  text-align: right;
  font-size: 14px;
  color: #656d76;
  line-height: 1.4;
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
  min-height: 400px;
  flex: 1;
`

const StyledLoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  z-index: 10;
  transition: opacity 0.2s ease-in-out;
`

const StyledInlineSpinner = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #656d76;
  padding: 12px 16px;
  background-color: white;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

const StyledLoadingDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #0969da;
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
  }
`

const StyledEmptyState = styled.div`
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: #656d76;
  font-size: 14px;
  line-height: 1.6;
  transition: opacity 0.3s ease-in-out;
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
          {!loading && issues.length === 0 ? (
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

          {/* Show loading overlay when fetching new results after initial load (but not when using pagination) */}
          {loading && hasLoadedOnce.current && !isFetchingMore && (
            <StyledLoadingOverlay>
              <StyledInlineSpinner>
                <StyledLoadingDot />
                <StyledLoadingDot style={{ animationDelay: '0.2s' }} />
                <StyledLoadingDot style={{ animationDelay: '0.4s' }} />
                <span>Loading...</span>
              </StyledInlineSpinner>
            </StyledLoadingOverlay>
          )}
        </StyledIssuesList>
      )}
    </StyledContainer>
  )
}

export default IssuesPage
