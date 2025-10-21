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
  gap: 8px; /* Use gap instead of margin-bottom on children */

  /* Spacing */
  padding: 16px;
  margin-bottom: 12px;

  /* Visual */
  background-color: #ffffff;
  border: 1px solid #d0d7de;
  border-radius: 6px;

  /* Interaction */
  cursor: pointer;
  transition: all 0.15s ease-in-out;

  /* Removed arbitrary min-height: 88px - let content determine height */

  &:hover {
    background-color: #f6f8fa;
    border-color: #0969da;
    box-shadow: 0 1px 3px rgba(31, 35, 40, 0.12), 0 8px 24px rgba(66, 74, 83, 0.12);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(31, 35, 40, 0.12);
  }

  /* Last card should have no margin */
  &:last-child {
    margin-bottom: 0;
  }
`

const StyledHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  /* margin-bottom removed - parent uses gap */
`

const StyledTitle = styled.h3`
  /* Layout */
  margin: 0;
  flex: 1;
  min-width: 0; /* Critical for flex text truncation */

  /* Typography */
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  color: #1f2328;
  word-break: break-word;

  /* Multi-line ellipsis */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis; /* Shows ... when truncated */
`

const StyledNumber = styled.span`
  color: #656d76;
  font-size: 14px;
  font-weight: 400;
`

const StyledMetadata = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 13px;
  color: #656d76;
  line-height: 1.4;

  /* Responsive: reduce gap on mobile */
  @media (max-width: 640px) {
    gap: 12px;
    font-size: 12px;
  }
`

const StyledMetadataItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
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
