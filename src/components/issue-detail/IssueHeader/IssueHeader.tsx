import styled from 'styled-components'

import StatusBadge from '@/components/common/StatusBadge'
import { formatDate, formatFullDate } from '@/utils/formatDate'
import type { IssueDetail } from '@/types/domain.types'

interface IssueHeaderProps {
  issue: IssueDetail
  onBack: () => void
}

const StyledContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.primary};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const StyledBackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.tertiary};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.hover};
    border-color: ${({ theme }) => theme.colors.text.primary};
  }

  &:active {
    background-color: #d1d5db;
    transform: scale(0.98);
  }

  &::before {
    content: '←';
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`

const StyledHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const StyledTitleContainer = styled.div`
  flex: 1;
`

const StyledTitle = styled.h1`
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  word-break: break-word;
`

const StyledNumber = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  margin-right: ${({ theme }) => theme.spacing.xs};
`

const StyledMetadata = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.base};
  padding-top: ${({ theme }) => theme.spacing.xs};
  border-top: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border.default};
`

const StyledMetadataItem = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xxs};
`

const StyledAuthor = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`

const IssueHeader: React.FC<IssueHeaderProps> = ({ issue, onBack }) => {
  return (
    <StyledContainer>
      <StyledBackButton
        onClick={onBack}
        aria-label="Navigate back to issues list"
      >
        Back to issues
      </StyledBackButton>

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
