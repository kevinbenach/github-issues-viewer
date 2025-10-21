import styled from 'styled-components'

interface PaginationProps {
  hasNextPage: boolean
  loading: boolean
  onLoadMore: () => void
}

const StyledPaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 0;
  margin-top: 16px;
`

const StyledLoadMoreButton = styled.button`
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  color: #24292f;
  background-color: #f6f8fa;
  border: 1px solid rgba(31, 35, 40, 0.15);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover:not(:disabled) {
    background-color: #f3f4f6;
    border-color: rgba(31, 35, 40, 0.25);
  }

  &:active:not(:disabled) {
    background-color: #edeff1;
    transform: scale(0.98);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`

const StyledEndMessage = styled.div`
  font-size: 14px;
  color: #656d76;
  text-align: center;
`

/**
 * Reusable pagination component for "Load More" functionality
 *
 * @param hasNextPage - Whether more pages are available
 * @param loading - Whether data is currently loading
 * @param onLoadMore - Callback function to load more data
 */
const Pagination: React.FC<PaginationProps> = ({
  hasNextPage,
  loading,
  onLoadMore,
}) => {
  if (!hasNextPage) {
    return (
      <StyledPaginationContainer>
        <StyledEndMessage>No more items to load</StyledEndMessage>
      </StyledPaginationContainer>
    )
  }

  return (
    <StyledPaginationContainer>
      <StyledLoadMoreButton onClick={onLoadMore} disabled={loading}>
        {loading ? 'Loading...' : 'Load More'}
      </StyledLoadMoreButton>
    </StyledPaginationContainer>
  )
}

export default Pagination
