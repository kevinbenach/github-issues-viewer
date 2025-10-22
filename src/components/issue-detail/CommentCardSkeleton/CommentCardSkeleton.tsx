import styled from 'styled-components'
import { SkeletonBox } from '@/components/common/SkeletonBox'

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

const StyledSkeletonAuthor = styled(SkeletonBox)`
  /* Matches author name */
  width: 100px;
  height: 14px;
`

const StyledSkeletonSeparator = styled.span`
  color: ${({ theme }) => theme.colors.border.default};
  margin: 0 ${({ theme }) => theme.spacing.xxs};
`

const StyledSkeletonDate = styled(SkeletonBox)`
  /* Matches date */
  width: 80px;
  height: 12px;
`

const StyledSkeletonBody = styled.div`
  /* Matches comment body */
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

const StyledSkeletonLine = styled(SkeletonBox)<{ width?: string }>`
  height: 14px;
  width: ${({ width }) => width || '100%'};
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
