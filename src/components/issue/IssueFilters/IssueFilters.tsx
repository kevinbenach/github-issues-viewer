import { ChangeEvent } from 'react'
import styled from 'styled-components'

import { useIssuesStore } from '@/store/issuesStore'
import type { IssueFilters as IssueFiltersType } from '@/types/domain.types'

const StyledContainer = styled.div`
  /* Layout */
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg}; /* Consistent spacing between filter rows */

  /* Spacing */
  padding: ${({ theme }) => theme.spacing.lg};
  /* Removed margin-bottom - parent IssuesPage gap handles it */

  /* Visual */
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.md};
`

const StyledSearchInput = styled.input`
  width: 100%;
  height: 40px;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  box-sizing: border-box;
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.background.primary};
  transition: ${({ theme }) => theme.transitions.input};
  /* Removed margin-bottom - parent gap handles it */

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.focus};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.muted};
  }
`

const StyledRadioGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
  align-items: center;
  /* Removed margin-bottom - parent gap handles it */
  /* Removed arbitrary min-height */
`

const StyledRadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  user-select: none;
  transition: color ${({ theme }) => theme.transitions.medium} ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }

  input[type='radio'] {
    cursor: pointer;
    width: 16px;
    height: 16px;
  }
`

const StyledResetButton = styled.button`
  /* Layout */
  align-self: flex-start; /* Button doesn't stretch full width */
  height: 36px;
  padding: 0 ${({ theme }) => theme.spacing.md};

  /* Typography */
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.tertiary};

  /* Visual */
  background-color: ${({ theme }) => theme.colors.background.primary};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.md};

  /* Interaction */
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.background.secondary};
    border-color: ${({ theme }) => theme.colors.text.primary};
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.background.quaternary};
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const StyledLabel = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: ${({ theme }) => theme.typography.lineHeight.base};
  /* Removed margin-bottom - parent FilterRow gap handles it */
`

const StyledFilterRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  /* Removed margin-bottom - parent gap handles it */
`

const IssueFilters: React.FC = () => {
  const filters = useIssuesStore((state) => state.filters)
  const setSearchText = useIssuesStore((state) => state.setSearchText)
  const setStatus = useIssuesStore((state) => state.setStatus)
  const resetFilters = useIssuesStore((state) => state.resetFilters)

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchText(event.target.value)
  }

  const handleStatusChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setStatus(event.target.value as IssueFiltersType['status'])
  }

  const handleReset = (): void => {
    resetFilters()
  }

  return (
    <StyledContainer role="search" aria-label="Issue filters">
      <StyledFilterRow>
        <StyledLabel htmlFor="search-input">Search</StyledLabel>
        <StyledSearchInput
          id="search-input"
          type="text"
          value={filters.searchText}
          onChange={handleSearchChange}
          placeholder="Search issues..."
          aria-label="Search issues by title or body"
        />
      </StyledFilterRow>

      <StyledFilterRow>
        <StyledLabel id="status-filter-label">Status</StyledLabel>
        <StyledRadioGroup role="radiogroup" aria-labelledby="status-filter-label">
          <StyledRadioLabel>
            <input
              type="radio"
              name="status"
              value="ALL"
              checked={filters.status === 'ALL'}
              onChange={handleStatusChange}
              aria-label="Show all issues"
            />
            All
          </StyledRadioLabel>

          <StyledRadioLabel>
            <input
              type="radio"
              name="status"
              value="OPEN"
              checked={filters.status === 'OPEN'}
              onChange={handleStatusChange}
              aria-label="Show only open issues"
            />
            Open
          </StyledRadioLabel>

          <StyledRadioLabel>
            <input
              type="radio"
              name="status"
              value="CLOSED"
              checked={filters.status === 'CLOSED'}
              onChange={handleStatusChange}
              aria-label="Show only closed issues"
            />
            Closed
          </StyledRadioLabel>
        </StyledRadioGroup>
      </StyledFilterRow>

      <StyledResetButton
        onClick={handleReset}
        aria-label="Reset all filters to default values"
      >
        Reset Filters
      </StyledResetButton>
    </StyledContainer>
  )
}

export default IssueFilters
