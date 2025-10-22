import { useParams, useNavigate } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import styled from 'styled-components'

import { useIssueDetail } from '@/hooks/useIssueDetail'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import IssueHeader from '@/components/issue-detail/IssueHeader'
import IssueBody from '@/components/issue-detail/IssueBody'
import CommentCard from '@/components/issue-detail/CommentCard'
import Pagination from '@/components/common/Pagination'
import { PageContainer, PageTitle, SectionHeader } from '@/components/layout'

const StyledCommentCount = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`

const StyledCommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const StyledErrorContainer = styled.div`
  min-height: 400px;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const StyledErrorBox = styled.div`
  max-width: 500px;
  padding: ${({ theme }) => theme.spacing.xxl};
  background-color: ${({ theme }) => theme.colors.error.background};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.error.border};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.error.primary};
`

const StyledErrorTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`

const StyledErrorMessage = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.base};
`

const StyledBackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  height: 36px;
  padding: 0 ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: white;
  background-color: ${({ theme }) => theme.colors.primary.main};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.primary.main};
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.hover};
    border-color: ${({ theme }) => theme.colors.primary.hover};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.primary.active};
    transform: scale(0.98);
  }
`

const StyledEmptyComments = styled.div`
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.lg};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.md};
`

const IssueDetailPage: React.FC = () => {
  const { issueNumber } = useParams<{ issueNumber: string }>()
  const navigate = useNavigate()

  // Parse issue number from URL params
  const parsedIssueNumber = issueNumber ? parseInt(issueNumber, 10) : 0

  const { issue, comments, loading, error, hasNextPage, fetchMoreComments, isFetchingMore } = useIssueDetail(parsedIssueNumber)

  // Track if we've ever successfully loaded data (even once)
  const hasLoadedOnce = useRef(false)

  // Mark as loaded once we have issue data or finished loading
  useEffect(() => {
    if (!loading || issue) {
      hasLoadedOnce.current = true
    }
  }, [loading, issue])

  // Reset hasLoadedOnce when issue number changes (navigating to different issue)
  useEffect(() => {
    hasLoadedOnce.current = false
  }, [parsedIssueNumber])

  const handleBack = (): void => {
    navigate('/')
  }

  // Only show full-page spinner on the very first load (before any data ever loaded)
  const isInitialLoad = loading && !hasLoadedOnce.current

  if (isInitialLoad) {
    return <LoadingSpinner text="Loading issue details..." />
  }

  // Handle error state
  if (error) {
    return (
      <PageContainer>
        <PageTitle>React Issues</PageTitle>
        <StyledErrorContainer>
          <StyledErrorBox>
            <StyledErrorTitle>Error loading issue</StyledErrorTitle>
            <StyledErrorMessage>{error.message}</StyledErrorMessage>
            <StyledBackButton onClick={handleBack}>← Back to issues</StyledBackButton>
          </StyledErrorBox>
        </StyledErrorContainer>
      </PageContainer>
    )
  }

  // Handle 404 - issue not found
  if (!issue) {
    return (
      <PageContainer>
        <PageTitle>React Issues</PageTitle>
        <StyledErrorContainer>
          <StyledErrorBox>
            <StyledErrorTitle>Issue not found</StyledErrorTitle>
            <StyledErrorMessage>
              Issue #{parsedIssueNumber} could not be found in the facebook/react repository.
            </StyledErrorMessage>
            <StyledBackButton onClick={handleBack}>← Back to issues</StyledBackButton>
          </StyledErrorBox>
        </StyledErrorContainer>
      </PageContainer>
    )
  }

  // Main content - issue found
  return (
    <PageContainer>
      <PageTitle>React Issues</PageTitle>

      <IssueHeader issue={issue} onBack={handleBack} />

      <IssueBody body={issue.body} />

      <SectionHeader
        title="Comments"
        rightContent={
          <StyledCommentCount>
            {comments.length} of {issue.comments.totalCount}
          </StyledCommentCount>
        }
      />

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
    </PageContainer>
  )
}

export default IssueDetailPage
