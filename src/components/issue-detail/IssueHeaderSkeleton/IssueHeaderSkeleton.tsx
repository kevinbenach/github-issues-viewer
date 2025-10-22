import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`

const StyledSkeletonContainer = styled.div`
  /* Layout - matches IssueHeader */
  background-color: ${({ theme }) => theme.colors.background.primary};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const StyledSkeletonBackButton = styled.div`
  /* Matches back button dimensions */
  width: 120px;
  height: 32px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.skeleton.base} 0%,
    ${({ theme }) => theme.colors.skeleton.highlight} 20%,
    ${({ theme }) => theme.colors.skeleton.base} 40%,
    ${({ theme }) => theme.colors.skeleton.base} 100%
  );
  background-size: 800px 100px;
  border-radius: ${({ theme }) => theme.radii.md};
  animation: ${shimmer} ${({ theme }) => theme.animations.shimmer} linear infinite;
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

const StyledSkeletonTitle = styled.div`
  /* Large title skeleton - matches h1 size (2xl = 28px) */
  height: 28px;
  width: 80%;
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
  /* Matches StatusBadge pill */
  width: 60px;
  height: 20px;
  flex-shrink: 0;
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
`

const StyledSkeletonMetadata = styled.div`
  /* Matches IssueHeader metadata section */
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.xs};
  border-top: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border.default};
`

const StyledSkeletonMetadataItem = styled.div`
  width: 120px;
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
