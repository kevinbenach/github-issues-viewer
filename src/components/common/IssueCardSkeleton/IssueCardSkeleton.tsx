import styled from 'styled-components'
import { SkeletonBox } from '@/components/common/SkeletonBox'

const StyledSkeletonCard = styled.div`
  /* Layout - matches IssueCard */
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  /* Spacing - matches IssueCard */
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  /* Visual - matches IssueCard */
  background-color: ${({ theme }) => theme.colors.background.primary};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.md};

  /* Fixed height to prevent CLS */
  min-height: 110px;

  /* Last card should have no margin */
  &:last-child {
    margin-bottom: 0;
  }
`

const StyledSkeletonHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  height: 24px;
`

const StyledSkeletonTitle = styled(SkeletonBox)`
  flex: 1;
  height: 20px;
`

const StyledSkeletonBadge = styled(SkeletonBox)`
  width: 60px;
  height: 20px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radii.pill};
`

const StyledSkeletonMetadata = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`

const StyledSkeletonMetadataItem = styled(SkeletonBox)`
  width: 100px;
  height: 14px;

  &:nth-child(2) {
    width: 120px;
  }

  &:nth-child(3) {
    width: 80px;
  }
`

/**
 * Skeleton loading card that matches IssueCard dimensions
 * Prevents CLS (Cumulative Layout Shift) during loading states
 */
const IssueCardSkeleton: React.FC = () => {
  return (
    <StyledSkeletonCard>
      <StyledSkeletonHeader>
        <StyledSkeletonTitle />
        <StyledSkeletonBadge />
      </StyledSkeletonHeader>
      <StyledSkeletonMetadata>
        <StyledSkeletonMetadataItem />
        <StyledSkeletonMetadataItem />
        <StyledSkeletonMetadataItem />
      </StyledSkeletonMetadata>
    </StyledSkeletonCard>
  )
}

export default IssueCardSkeleton
