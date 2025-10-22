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
  /* Layout - matches CommentCard */
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background.primary};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.md};

  /* Last card should have no margin */
  &:last-child {
    margin-bottom: 0;
  }
`

const StyledSkeletonHeader = styled.div`
  /* Matches CommentCard header */
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-bottom: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border.default};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

const StyledSkeletonAuthor = styled.div`
  /* Matches author name */
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
`

const StyledSkeletonSeparator = styled.span`
  color: ${({ theme }) => theme.colors.border.default};
  margin: 0 ${({ theme }) => theme.spacing.xxs};
`

const StyledSkeletonDate = styled.div`
  /* Matches date */
  width: 80px;
  height: 12px;
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
  /* Matches comment body */
  padding: ${({ theme }) => theme.spacing.md};
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
 * Skeleton loading component that matches CommentCard dimensions
 * Prevents CLS (Cumulative Layout Shift) during loading states
 */
const CommentCardSkeleton: React.FC = () => {
  return (
    <StyledSkeletonCard>
      <StyledSkeletonHeader>
        <StyledSkeletonAuthor />
        <StyledSkeletonSeparator>•</StyledSkeletonSeparator>
        <StyledSkeletonDate />
      </StyledSkeletonHeader>
      <StyledSkeletonBody>
        <StyledSkeletonLine width="95%" />
        <StyledSkeletonLine width="88%" />
        <StyledSkeletonLine width="60%" />
      </StyledSkeletonBody>
    </StyledSkeletonCard>
  )
}

export default CommentCardSkeleton
