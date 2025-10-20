import styled from 'styled-components'

import StatusBadge from '@/components/common/StatusBadge'
import type { Issue } from '@/types/domain.types'

interface IssueCardProps {
  issue: Issue
  onClick: () => void
}

const StyledCard = styled.div`
  border: 1px solid #d0d7de;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 12px;
  background-color: white;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  min-height: 88px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &:hover {
    border-color: #8250df;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`

const StyledHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 8px;
`

const StyledTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  color: #1f2328;
  flex: 1;
  word-break: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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
        <StyledMetadataItem>
          Created: {issue.createdAt}
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
