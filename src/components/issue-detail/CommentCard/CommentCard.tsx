import styled from 'styled-components'

import { formatDate, formatFullDate } from '@/utils/formatDate'
import type { IssueComment } from '@/types/domain.types'

interface CommentCardProps {
  comment: IssueComment
}

const StyledCard = styled.div`
  /* Layout */
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;

  /* Spacing */
  margin-bottom: 16px;

  /* Visual */
  background-color: #ffffff;
  border: 1px solid #d0d7de;
  border-radius: 6px;

  /* Last card should have no margin */
  &:last-child {
    margin-bottom: 0;
  }
`

const StyledHeader = styled.div`
  background-color: #f6f8fa;
  border-bottom: 1px solid #d0d7de;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`

const StyledAuthor = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #1f2328;
`

const StyledDate = styled.span`
  font-size: 13px;
  color: #656d76;
`

const StyledSeparator = styled.span`
  color: #d0d7de;
  margin: 0 4px;
`

const StyledBody = styled.div`
  padding: 16px;
  font-size: 14px;
  color: #1f2328;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: break-word;
`

const StyledEmptyMessage = styled.div`
  padding: 16px;
  font-size: 14px;
  color: #656d76;
  font-style: italic;
  line-height: 1.6;
`

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <StyledCard>
      <StyledHeader>
        <StyledAuthor>{comment.author?.login ?? 'Unknown'}</StyledAuthor>
        <StyledSeparator>•</StyledSeparator>
        <StyledDate title={formatFullDate(comment.createdAt)}>
          {formatDate(comment.createdAt)}
        </StyledDate>
      </StyledHeader>
      {comment.body.trim() ? (
        <StyledBody>{comment.body}</StyledBody>
      ) : (
        <StyledEmptyMessage>No comment text.</StyledEmptyMessage>
      )}
    </StyledCard>
  )
}

export default CommentCard
