import styled from 'styled-components'
import { SkeletonBox } from '@/components/common/SkeletonBox'

const StyledSkeletonContainer = styled.div`
  /* Layout - matches IssueHeader */
  background-color: ${({ theme }) => theme.colors.background.primary};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const StyledSkeletonBackButton = styled(SkeletonBox)`
  /* Matches back button dimensions */
  width: 120px;
  height: 32px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.md};
`

const StyledSkeletonHeader = styled.div`
  /* Matches IssueHeader header section */
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const StyledSkeletonTitleContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

const StyledSkeletonTitle = styled(SkeletonBox)`
  /* Large title skeleton - matches h1 size (2xl = 28px) */
  height: 28px;
  width: 80%;
`

const StyledSkeletonBadge = styled(SkeletonBox)`
  /* Matches StatusBadge pill */
  width: 60px;
  height: 20px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radii.pill};
`

const StyledSkeletonMetadata = styled.div`
  /* Matches IssueHeader metadata section */
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.xs};
  border-top: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border.default};
`

const StyledSkeletonMetadataItem = styled(SkeletonBox)`
  width: 120px;
  height: 14px;

  &:nth-child(2) {
    width: 100px;
  }

  &:nth-child(3) {
    width: 90px;
  }
`

/**
 * Skeleton loading component that matches IssueHeader dimensions
 * Prevents CLS (Cumulative Layout Shift) during loading states
 */
const IssueHeaderSkeleton: React.FC = () => {
  return (
    <StyledSkeletonContainer>
      <StyledSkeletonBackButton />

      <StyledSkeletonHeader>
        <StyledSkeletonTitleContainer>
          <StyledSkeletonTitle />
        </StyledSkeletonTitleContainer>
        <StyledSkeletonBadge />
      </StyledSkeletonHeader>

      <StyledSkeletonMetadata>
        <StyledSkeletonMetadataItem />
        <StyledSkeletonMetadataItem />
        <StyledSkeletonMetadataItem />
      </StyledSkeletonMetadata>
    </StyledSkeletonContainer>
  )
}

export default IssueHeaderSkeleton
