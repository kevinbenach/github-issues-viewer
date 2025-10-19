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
  transition: all 0.2s ease;

  &:hover {
    border-color: #8250df;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`

const StyledTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1f2328;
  flex: 1;
`

const StyledNumber = styled.span`
  color: #656d76;
  font-size: 14px;
  font-weight: 400;
`

const StyledMetadata = styled.div`
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #656d76;
`

const StyledMetadataItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
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
