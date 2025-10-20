import { ChangeEvent } from 'react'
import styled from 'styled-components'

import { useIssuesStore } from '@/store/issuesStore'
import type { IssueFilters as IssueFiltersType } from '@/types/domain.types'

const StyledContainer = styled.div`
  background-color: #f6f8fa;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 24px;
  display: grid;
  grid-template-rows: auto auto auto;
  gap: 0;
`

const StyledSearchInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  margin-bottom: 16px;
  box-sizing: border-box;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #0969da;
    box-shadow: 0 0 0 3px rgba(9, 105, 218, 0.1);
  }

  &::placeholder {
    color: #656d76;
  }
`

const StyledRadioGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  min-height: 28px;
  align-items: center;
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
  height: 36px;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 500;
  color: #24292f;
  background-color: white;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
  align-self: start;

  &:hover {
    background-color: #f6f8fa;
    border-color: #1f2328;
  }

  &:active {
    background-color: #e5e7eb;
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
  margin-bottom: 8px;
  line-height: 1.4;
`

const StyledFilterRow = styled.div`
  margin-bottom: 16px;
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
