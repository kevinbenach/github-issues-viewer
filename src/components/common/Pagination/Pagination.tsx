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
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  margin-top: ${({ theme }) => theme.spacing.md};
`

const StyledLoadMoreButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.tertiary};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover:not(:disabled) {
    background-color: #f3f4f6;
    border-color: ${({ theme }) => theme.colors.border.medium};
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.background.quaternary};
    transform: scale(0.98);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`

const StyledEndMessage = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
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
      <StyledLoadMoreButton
        onClick={onLoadMore}
        disabled={loading}
        aria-label={loading ? 'Loading more items' : 'Load more items'}
        aria-busy={loading}
      >
        {loading ? 'Loading...' : 'Load More'}
      </StyledLoadMoreButton>
    </StyledPaginationContainer>
  )
}

export default Pagination
