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
  gap: 12px;

  /* Spacing - matches IssueCard */
  padding: 16px;
  margin-bottom: 12px;

  /* Visual - matches IssueCard */
  background-color: #ffffff;
  border: 1px solid #d0d7de;
  border-radius: 6px;

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
  gap: 12px;
  height: 24px;
`

const StyledSkeletonTitle = styled.div`
  flex: 1;
  height: 20px;
  background: linear-gradient(
    to right,
    #f6f8fa 0%,
    #eaeef2 20%,
    #f6f8fa 40%,
    #f6f8fa 100%
  );
  background-size: 800px 100px;
  border-radius: 4px;
  animation: ${shimmer} 1.5s linear infinite;
`

const StyledSkeletonBadge = styled.div`
  width: 60px;
  height: 20px;
  background: linear-gradient(
    to right,
    #f6f8fa 0%,
    #eaeef2 20%,
    #f6f8fa 40%,
    #f6f8fa 100%
  );
  background-size: 800px 100px;
  border-radius: 2em;
  animation: ${shimmer} 1.5s linear infinite;
  flex-shrink: 0;
`

const StyledSkeletonMetadata = styled.div`
  display: flex;
  gap: 16px;
`

const StyledSkeletonMetadataItem = styled.div`
  width: 100px;
  height: 14px;
  background: linear-gradient(
    to right,
    #f6f8fa 0%,
    #eaeef2 20%,
    #f6f8fa 40%,
    #f6f8fa 100%
  );
  background-size: 800px 100px;
  border-radius: 4px;
  animation: ${shimmer} 1.5s linear infinite;

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
