import styled from 'styled-components'

import StatusBadge from '@/components/common/StatusBadge'
import { formatDate, formatFullDate } from '@/utils/formatDate'
import type { IssueDetail } from '@/types/domain.types'

interface IssueHeaderProps {
  issue: IssueDetail
  onBack: () => void
}

const StyledContainer = styled.div`
  background-color: white;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  padding: 24px;
  margin-bottom: 16px;
`

const StyledBackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 12px;
  font-size: 14px;
  font-weight: 500;
  color: #24292f;
  background-color: #f6f8fa;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
  margin-bottom: 16px;

  &:hover {
    background-color: #e5e7eb;
    border-color: #1f2328;
  }

  &:active {
    background-color: #d1d5db;
    transform: scale(0.98);
  }

  &::before {
    content: '←';
    font-size: 16px;
    font-weight: 600;
  }
`

const StyledHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
`

const StyledTitleContainer = styled.div`
  flex: 1;
`

const StyledTitle = styled.h1`
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 600;
  color: #1f2328;
  line-height: 1.3;
  word-break: break-word;
`

const StyledNumber = styled.span`
  color: #656d76;
  font-size: 24px;
  font-weight: 400;
  margin-right: 8px;
`

const StyledMetadata = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 14px;
  color: #656d76;
  line-height: 1.5;
  padding-top: 8px;
  border-top: 1px solid #d0d7de;
`

const StyledMetadataItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`

const StyledAuthor = styled.span`
  font-weight: 600;
  color: #1f2328;
`

const IssueHeader: React.FC<IssueHeaderProps> = ({ issue, onBack }) => {
  return (
    <StyledContainer>
      <StyledBackButton onClick={onBack}>Back to issues</StyledBackButton>

      <StyledHeader>
        <StyledTitleContainer>
          <StyledTitle>
            <StyledNumber>#{issue.number}</StyledNumber>
            {issue.title}
          </StyledTitle>
        </StyledTitleContainer>
        <StatusBadge status={issue.state} />
      </StyledHeader>

      <StyledMetadata>
        <StyledMetadataItem>
          Opened by{' '}
          <StyledAuthor>{issue.author?.login ?? 'Unknown'}</StyledAuthor>
        </StyledMetadataItem>
        <StyledMetadataItem title={formatFullDate(issue.createdAt)}>
          {formatDate(issue.createdAt)}
        </StyledMetadataItem>
        <StyledMetadataItem>
          {issue.comments.totalCount} comment
          {issue.comments.totalCount !== 1 ? 's' : ''}
        </StyledMetadataItem>
      </StyledMetadata>
    </StyledContainer>
  )
}

export default IssueHeader
