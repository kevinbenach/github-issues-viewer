import { create } from 'zustand'

import type { IssueFilters } from '@/types/domain.types'

/**
 * Issues store state interface
 */
interface IssuesStoreState {
  filters: IssueFilters
  setSearchText: (text: string) => void
  setStatus: (status: IssueFilters['status']) => void
  resetFilters: () => void
}

/**
 * Default filter values
 */
const DEFAULT_FILTERS: IssueFilters = {
  searchText: '',
  status: 'ALL',
}

/**
 * Zustand store for managing issue filter state
 * Stores only UI state - server state is managed by Apollo Client
 */
export const useIssuesStore = create<IssuesStoreState>((set) => ({
  filters: DEFAULT_FILTERS,

  setSearchText: (text: string) =>
    set((state) => ({
      filters: {
        ...state.filters,
        searchText: text,
      },
    })),

  setStatus: (status: IssueFilters['status']) =>
    set((state) => ({
      filters: {
        ...state.filters,
        status,
      },
    })),

  resetFilters: () =>
    set({
      filters: DEFAULT_FILTERS,
    }),
}))
