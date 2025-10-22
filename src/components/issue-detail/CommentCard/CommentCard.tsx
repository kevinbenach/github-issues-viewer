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
  margin-bottom: ${({ theme }) => theme.spacing.md};

  /* Visual */
  background-color: ${({ theme }) => theme.colors.background.primary};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.md};

  /* Last card should have no margin */
  &:last-child {
    margin-bottom: 0;
  }
`

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-bottom: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border.default};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

const StyledAuthor = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`

const StyledDate = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const StyledSeparator = styled.span`
  color: ${({ theme }) => theme.colors.border.default};
  margin: 0 ${({ theme }) => theme.spacing.xxs};
`

const StyledBody = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: ${({ theme }) => theme.typography.lineHeight.loose};
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: break-word;
`

const StyledEmptyMessage = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-style: italic;
  line-height: ${({ theme }) => theme.typography.lineHeight.loose};
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
