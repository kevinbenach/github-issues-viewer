import styled from 'styled-components'
import { SkeletonBox } from '@/components/common/SkeletonBox'

const StyledSkeletonCard = styled.div`
  /* Layout - matches IssueCard */
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs}; /* Fixed: was sm (12px), now xs (8px) to match IssueCard */

  /* Spacing - matches IssueCard */
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  /* Visual - matches IssueCard */
  background-color: ${({ theme }) => theme.colors.background.primary};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.md};

  /* Let content determine height to match IssueCard behavior */
  /* Removed fixed min-height to prevent skeleton being taller than actual card */

  /* Last card should have no margin */
  &:last-child {
    margin-bottom: 0;
  }
`

const StyledSkeletonHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  /* Removed fixed height - let skeleton boxes determine natural height */
`

const StyledSkeletonTitle = styled(SkeletonBox)`
  flex: 1;
  height: 24px; /* Matches 1-line title: 16px font-size × 1.5 line-height = 24px (most common case) */
`

const StyledSkeletonBadge = styled(SkeletonBox)`
  width: 60px;
  height: 20px; /* Matches StatusBadge: 4px padding + 12px text + 4px padding = 20px */
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radii.pill};
`

const StyledSkeletonMetadata = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`

const StyledSkeletonMetadataItem = styled(SkeletonBox)`
  width: 100px;
  height: 18px; /* Matches metadata text: 13px font-size × 1.4 line-height = 18.2px ≈ 18px */

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
