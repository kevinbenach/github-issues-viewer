import styled, { keyframes } from 'styled-components'

/**
 * Shimmer animation for skeleton loading states
 * Moves a highlight gradient across the skeleton box from left to right
 */
const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`

interface SkeletonBoxProps {
  width?: string
  height?: string
  borderRadius?: string
  className?: string
}

/**
 * Reusable skeleton box component for loading states
 *
 * Provides a consistent shimmer animation and styling for all skeleton loaders.
 * This eliminates code duplication across IssueCardSkeleton, IssueHeaderSkeleton,
 * IssueBodySkeleton, and CommentCardSkeleton.
 *
 * @param width - CSS width value (default: '100%')
 * @param height - CSS height value (default: '20px')
 * @param borderRadius - CSS border-radius value (uses theme.radii.sm by default)
 * @param className - Optional className for styled-components composition
 *
 * @example
 * // Basic usage
 * <SkeletonBox width="200px" height="24px" />
 *
 * @example
 * // With custom border radius
 * <SkeletonBox width="60px" height="20px" borderRadius="2em" />
 *
 * @example
 * // Composed with styled-components
 * const CustomSkeleton = styled(SkeletonBox)`
 *   margin-bottom: 12px;
 * `
 */
export const SkeletonBox = styled.div<SkeletonBoxProps>`
  /* Dimensions */
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '20px'};

  /* Animated gradient background */
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.skeleton.base} 0%,
    ${({ theme }) => theme.colors.skeleton.highlight} 20%,
    ${({ theme }) => theme.colors.skeleton.base} 40%,
    ${({ theme }) => theme.colors.skeleton.base} 100%
  );
  background-size: 800px 100px;

  /* Visual */
  border-radius: ${({ borderRadius, theme }) => borderRadius || theme.radii.sm};

  /* Animation */
  animation: ${shimmer} ${({ theme }) => theme.animations.shimmer} linear infinite;
`
