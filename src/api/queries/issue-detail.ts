import { gql } from '@apollo/client'

/**
 * Fragment for issue comment fields
 * Used in issue detail query
 */
export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on IssueComment {
    id
    body
    createdAt
    author {
      login
    }
  }
`

/**
 * Get single issue by owner, repository name, and issue number
 *
 * @param $owner - Repository owner (e.g., "facebook")
 * @param $name - Repository name (e.g., "react")
 * @param $number - Issue number (e.g., 12345)
 *
 * @returns Full issue details including body and first 20 comments
 *
 * Note: We don't use ISSUE_FRAGMENT here because it includes comments without arguments,
 * which would conflict with our comments(first: 20) query. Instead, we explicitly list all fields.
 */
export const GET_ISSUE_QUERY = gql`
  query GetIssue($owner: String!, $name: String!, $number: Int!) {
    repository(owner: $owner, name: $name) {
      issue(number: $number) {
        id
        number
        title
        state
        createdAt
        author {
          login
        }
        body
        comments(first: 20) {
          totalCount
          nodes {
            ...CommentFragment
          }
        }
      }
    }
  }
  ${COMMENT_FRAGMENT}
`
