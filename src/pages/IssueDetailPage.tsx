import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { useIssueDetail } from '@/hooks/useIssueDetail'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import IssueHeader from '@/components/issue-detail/IssueHeader'
import IssueBody from '@/components/issue-detail/IssueBody'
import CommentCard from '@/components/issue-detail/CommentCard'
import Pagination from '@/components/common/Pagination'

const StyledContainer = styled.div`
  /* Layout */
  width: 100%;
  max-width: 1200px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 24px 20px;
  box-sizing: border-box;

  /* Use flexbox for consistent spacing */
  display: flex;
  flex-direction: column;
  gap: 24px;

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
  /* Removed margin - parent gap handles spacing */
`

const StyledSectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1f2328;
  margin: 0;
  line-height: 1.2;
`

const StyledCommentCount = styled.span`
  font-size: 14px;
  color: #656d76;
  line-height: 1.4;
`

const StyledCommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const StyledErrorContainer = styled.div`
  min-height: 400px;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const StyledErrorBox = styled.div`
  max-width: 500px;
  padding: 32px;
  background-color: #fff1f0;
  border: 1px solid #ffccc7;
  border-radius: 6px;
  color: #cf1322;
`

const StyledErrorTitle = styled.h2`
  margin: 0 0 12px 0;
  font-size: 20px;
  font-weight: 600;
`

const StyledErrorMessage = styled.p`
  margin: 0 0 20px 0;
  font-size: 14px;
  line-height: 1.5;
`

const StyledBackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  background-color: #0969da;
  border: 1px solid #0969da;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background-color: #0860ca;
    border-color: #0860ca;
  }

  &:active {
    background-color: #0757ba;
    transform: scale(0.98);
  }
`

const StyledNotFoundBox = styled.div`
  max-width: 500px;
  padding: 32px;
  background-color: #f6f8fa;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  color: #1f2328;
`

const StyledNotFoundTitle = styled.h2`
  margin: 0 0 12px 0;
  font-size: 24px;
  font-weight: 600;
`

const StyledNotFoundMessage = styled.p`
  margin: 0 0 20px 0;
  font-size: 14px;
  line-height: 1.5;
  color: #656d76;
`

const StyledEmptyComments = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: #656d76;
  font-size: 14px;
  background-color: #f6f8fa;
  border: 1px solid #d0d7de;
  border-radius: 6px;
`

const IssueDetailPage: React.FC = () => {
  const { issueNumber } = useParams<{ issueNumber: string }>()
  const navigate = useNavigate()

  // Parse issue number from URL params
  const parsedIssueNumber = issueNumber ? parseInt(issueNumber, 10) : 0

  const { issue, comments, loading, error, hasNextPage, fetchMoreComments, isFetchingMore } = useIssueDetail(parsedIssueNumber)

  const handleBack = (): void => {
    navigate('/')
  }

  // Show loading spinner during initial load
  if (loading) {
    return <LoadingSpinner text="Loading issue details..." />
  }

  // Handle error state
  if (error) {
    return (
      <StyledContainer>
        <StyledPageTitle>React Issues</StyledPageTitle>
        <StyledErrorContainer>
          <StyledErrorBox>
            <StyledErrorTitle>Error loading issue</StyledErrorTitle>
            <StyledErrorMessage>{error.message}</StyledErrorMessage>
            <StyledBackButton onClick={handleBack}>
              Back to issues
            </StyledBackButton>
          </StyledErrorBox>
        </StyledErrorContainer>
      </StyledContainer>
    )
  }

  // Handle 404 - issue not found
  if (!issue) {
    return (
      <StyledContainer>
        <StyledPageTitle>React Issues</StyledPageTitle>
        <StyledErrorContainer>
          <StyledNotFoundBox>
            <StyledNotFoundTitle>Issue not found</StyledNotFoundTitle>
            <StyledNotFoundMessage>
              Issue #{parsedIssueNumber} could not be found in the facebook/react
              repository.
            </StyledNotFoundMessage>
            <StyledBackButton onClick={handleBack}>
              Back to issues
            </StyledBackButton>
          </StyledNotFoundBox>
        </StyledErrorContainer>
      </StyledContainer>
    )
  }

  // Main content - issue found
  return (
    <StyledContainer>
      <StyledPageTitle>React Issues</StyledPageTitle>

      <IssueHeader issue={issue} onBack={handleBack} />

      <IssueBody body={issue.body} />

      <StyledSectionHeader>
        <StyledSectionTitle>Comments</StyledSectionTitle>
        <StyledCommentCount>
          {comments.length} of {issue.comments.totalCount}
        </StyledCommentCount>
      </StyledSectionHeader>

      <StyledCommentsContainer>
        {comments.length > 0 ? (
          <>
            {comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}

            {/* Pagination for comments */}
            <Pagination
              hasNextPage={hasNextPage}
              loading={isFetchingMore}
              onLoadMore={fetchMoreComments}
            />
          </>
        ) : (
          <StyledEmptyComments>
            No comments yet. Be the first to comment!
          </StyledEmptyComments>
        )}
      </StyledCommentsContainer>
    </StyledContainer>
  )
}

export default IssueDetailPage
