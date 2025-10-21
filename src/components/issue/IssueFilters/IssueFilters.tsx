import { ChangeEvent } from 'react'
import styled from 'styled-components'

import { useIssuesStore } from '@/store/issuesStore'
import type { IssueFilters as IssueFiltersType } from '@/types/domain.types'

const StyledContainer = styled.div`
  /* Layout */
  display: flex;
  flex-direction: column;
  gap: 20px; /* Consistent spacing between filter rows */

  /* Spacing */
  padding: 20px;
  /* Removed margin-bottom - parent IssuesPage gap handles it */

  /* Visual */
  background-color: #f6f8fa;
  border: 1px solid #d0d7de;
  border-radius: 6px;
`

const StyledSearchInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  font-size: 14px;
  box-sizing: border-box;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  background-color: #ffffff;
  transition: all 0.2s ease;
  /* Removed margin-bottom - parent gap handles it */

  &:focus {
    outline: none;
    border-color: #0969da;
    box-shadow: 0 0 0 3px rgba(9, 105, 218, 0.12);
  }

  &::placeholder {
    color: #8c959f;
  }
`

const StyledRadioGroup = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  align-items: center;
  /* Removed margin-bottom - parent gap handles it */
  /* Removed arbitrary min-height */
`

const StyledRadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #1f2328;
  cursor: pointer;
  user-select: none;
  transition: color 0.2s ease;

  &:hover {
    color: #0969da;
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
  padding: 0 16px;

  /* Typography */
  font-size: 14px;
  font-weight: 500;
  color: #24292f;

  /* Visual */
  background-color: #ffffff;
  border: 1px solid #d0d7de;
  border-radius: 6px;

  /* Interaction */
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover:not(:disabled) {
    background-color: #f6f8fa;
    border-color: #1f2328;
  }

  &:active:not(:disabled) {
    background-color: #edeff1;
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const StyledLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #1f2328;
  line-height: 1.5;
  /* Removed margin-bottom - parent FilterRow gap handles it */
`

const StyledFilterRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
    <StyledContainer>
      <StyledFilterRow>
        <StyledLabel htmlFor="search-input">Search</StyledLabel>
        <StyledSearchInput
          id="search-input"
          type="text"
          value={filters.searchText}
          onChange={handleSearchChange}
          placeholder="Search issues..."
        />
      </StyledFilterRow>

      <StyledFilterRow>
        <StyledLabel>Status</StyledLabel>
        <StyledRadioGroup>
          <StyledRadioLabel>
            <input
              type="radio"
              name="status"
              value="ALL"
              checked={filters.status === 'ALL'}
              onChange={handleStatusChange}
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
            />
            Closed
          </StyledRadioLabel>
        </StyledRadioGroup>
      </StyledFilterRow>

      <StyledResetButton onClick={handleReset}>Reset Filters</StyledResetButton>
    </StyledContainer>
  )
}

export default IssueFilters
