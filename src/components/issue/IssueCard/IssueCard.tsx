import styled from 'styled-components'

import StatusBadge from '@/components/common/StatusBadge'
import { formatDate, formatFullDate } from '@/utils/formatDate'
import type { Issue } from '@/types/domain.types'

interface IssueCardProps {
  issue: Issue
  onClick: () => void
}

const StyledCard = styled.div`
  /* Layout */
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Changed from center - align to top for consistency */
  gap: ${({ theme }) => theme.spacing.xs}; /* Use gap instead of margin-bottom on children */

  /* Spacing */
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  /* Visual */
  background-color: ${({ theme }) => theme.colors.background.primary};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.md};

  /* Interaction */
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};

  /* Removed arbitrary min-height: 88px - let content determine height */

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.secondary};
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${({ theme }) => theme.shadows.card};
  }

  /* Last card should have no margin */
  &:last-child {
    margin-bottom: 0;
  }
`

const StyledHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  /* margin-bottom removed - parent uses gap */
`

const StyledTitle = styled.h3`
  /* Layout */
  margin: 0;
  flex: 1;
  min-width: 0; /* Critical for flex text truncation */

  /* Typography */
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  line-height: ${({ theme }) => theme.typography.lineHeight.base};
  color: ${({ theme }) => theme.colors.text.primary};
  word-break: break-word;

  /* Multi-line ellipsis */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis; /* Shows ... when truncated */
`

const StyledNumber = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
`

const StyledMetadata = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};

  /* Responsive: reduce gap on mobile */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`

const StyledMetadataItem = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xxs};
  white-space: nowrap;
`

const IssueCard: React.FC<IssueCardProps> = ({ issue, onClick }) => {
  return (
    <StyledCard onClick={onClick}>
      <StyledHeader>
        <StyledTitle>
          <StyledNumber>#{issue.number}</StyledNumber> {issue.title}
        </StyledTitle>
        <StatusBadge status={issue.state} />
      </StyledHeader>
      <StyledMetadata>
        <StyledMetadataItem>
          By {issue.author?.login ?? 'Unknown'}
        </StyledMetadataItem>
        <StyledMetadataItem title={formatFullDate(issue.createdAt)}>
          {formatDate(issue.createdAt)}
        </StyledMetadataItem>
        <StyledMetadataItem>
          {issue.comments.totalCount} comment
          {issue.comments.totalCount !== 1 ? 's' : ''}
        </StyledMetadataItem>
      </StyledMetadata>
    </StyledCard>
  )
}

export default IssueCard
