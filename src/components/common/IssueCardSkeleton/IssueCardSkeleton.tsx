import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`

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

const StyledSkeletonTitle = styled.div`
  flex: 1;
  height: 20px;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.skeleton.base} 0%,
    ${({ theme }) => theme.colors.skeleton.highlight} 20%,
    ${({ theme }) => theme.colors.skeleton.base} 40%,
    ${({ theme }) => theme.colors.skeleton.base} 100%
  );
  background-size: 800px 100px;
  border-radius: ${({ theme }) => theme.radii.sm};
  animation: ${shimmer} ${({ theme }) => theme.animations.shimmer} linear infinite;
`

const StyledSkeletonBadge = styled.div`
  width: 60px;
  height: 20px;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.skeleton.base} 0%,
    ${({ theme }) => theme.colors.skeleton.highlight} 20%,
    ${({ theme }) => theme.colors.skeleton.base} 40%,
    ${({ theme }) => theme.colors.skeleton.base} 100%
  );
  background-size: 800px 100px;
  border-radius: ${({ theme }) => theme.radii.pill};
  animation: ${shimmer} ${({ theme }) => theme.animations.shimmer} linear infinite;
  flex-shrink: 0;
`

const StyledSkeletonMetadata = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`

const StyledSkeletonMetadataItem = styled.div`
  width: 100px;
  height: 14px;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.skeleton.base} 0%,
    ${({ theme }) => theme.colors.skeleton.highlight} 20%,
    ${({ theme }) => theme.colors.skeleton.base} 40%,
    ${({ theme }) => theme.colors.skeleton.base} 100%
  );
  background-size: 800px 100px;
  border-radius: ${({ theme }) => theme.radii.sm};
  animation: ${shimmer} ${({ theme }) => theme.animations.shimmer} linear infinite;

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
