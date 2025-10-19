import { gql } from '@apollo/client'

/**
 * Fragment for common issue fields
 * Used across issue list and detail queries
 */
export const ISSUE_FRAGMENT = gql`
  fragment IssueFragment on Issue {
    id
    number
    title
    state
    createdAt
    author {
      login
    }
    comments {
      totalCount
    }
  }
`

/**
 * Search issues query with pagination support
 *
 * @param $query - GitHub search query string (e.g., "repo:facebook/react is:issue")
 * @param $first - Number of issues to fetch (pagination limit)
 * @param $after - Cursor for pagination (optional)
 *
 * @returns Issue edges with fragment data and pagination info
 */
export const SEARCH_ISSUES_QUERY = gql`
  query SearchIssues($query: String!, $first: Int!, $after: String) {
    search(query: $query, type: ISSUE, first: $first, after: $after) {
      edges {
        node {
          ...IssueFragment
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${ISSUE_FRAGMENT}
`
