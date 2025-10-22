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
  /* Layout - matches IssueBody */
  background-color: ${({ theme }) => theme.colors.background.primary};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const StyledSkeletonTitle = styled.div`
  /* Matches section title (h2, md = 16px) */
  width: 100px;
  height: 16px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border.default};
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

const StyledSkeletonBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

const StyledSkeletonLine = styled.div<{ width?: string }>`
  height: 14px;
  width: ${({ width }) => width || '100%'};
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

/**
 * Skeleton loading component that matches IssueBody dimensions
 * Prevents CLS (Cumulative Layout Shift) during loading states
 */
const IssueBodySkeleton: React.FC = () => {
  return (
    <StyledSkeletonContainer>
      <StyledSkeletonTitle />
      <StyledSkeletonBody>
        <StyledSkeletonLine width="95%" />
        <StyledSkeletonLine width="90%" />
        <StyledSkeletonLine width="85%" />
        <StyledSkeletonLine width="70%" />
      </StyledSkeletonBody>
    </StyledSkeletonContainer>
  )
}

export default IssueBodySkeleton
