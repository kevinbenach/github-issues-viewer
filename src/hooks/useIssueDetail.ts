import { useQuery } from '@apollo/client/react'

import { GET_ISSUE_QUERY } from '@/api/queries/issue-detail'
import type { IssueDetail, IssueComment } from '@/types/domain.types'
import { GITHUB_REPO_OWNER, GITHUB_REPO_NAME } from '@/constants/env'
import { COMMENTS_PER_PAGE, MIN_VALID_ISSUE_NUMBER } from '@/constants/pagination'

// ✨ NEW: Import generated types from codegen
import type {
  GetIssueQuery,
  GetIssueQueryVariables,
} from '@/api/types/generated'

/**
 * Return type for useIssueDetail hook
 */
interface UseIssueDetailResult {
  issue: IssueDetail | null
  comments: IssueComment[]
  loading: boolean
  error: Error | undefined
  refetch: () => void
  hasNextPage: boolean
  fetchMoreComments: () => Promise<void>
  isFetchingMore: boolean
}

/**
 * Custom hook for fetching a single GitHub issue with full details
 * Fetches issue from facebook/react repository by issue number
 * Includes issue body and first 20 comments
 *
 * 🎯 NOW USING CODEGEN:
 * - GetIssueQuery type is auto-generated from GraphQL schema
 * - No manual type definitions needed
 * - Types guaranteed to match actual API
 *
 * @param issueNumber - The GitHub issue number to fetch
 * @returns Issue details, comments array, loading state, error state, and refetch function
 *
 * @example
 * const { issue, comments, loading, error, refetch } = useIssueDetail(12345)
 *
 * if (loading) return <LoadingSpinner />
 * if (error) return <ErrorMessage error={error} />
 * if (!issue) return <NotFound />
 *
 * return (
 *   <div>
 *     <h1>{issue.title}</h1>
 *     <p>{issue.body}</p>
 *     <CommentsList comments={comments} />
 *   </div>
 * )
 */
export const useIssueDetail = (issueNumber: number): UseIssueDetailResult => {
  // ✨ NEW: Using generated GetIssueQuery and GetIssueQueryVariables types
  // VS Code now knows exact shape of data and variables
  const { data, loading, error, refetch, fetchMore: apolloFetchMore, networkStatus } = useQuery<
    GetIssueQuery,
    GetIssueQueryVariables
  >(GET_ISSUE_QUERY, {
    variables: {
      owner: GITHUB_REPO_OWNER,
      name: GITHUB_REPO_NAME,
      number: issueNumber,
      commentsFirst: COMMENTS_PER_PAGE,
    },
    skip: !issueNumber || issueNumber < MIN_VALID_ISSUE_NUMBER,
    notifyOnNetworkStatusChange: true,
  })

  // ✨ NEW: data.repository.issue is now fully typed by codegen
  // TypeScript knows: data.repository.issue.{id, title, body, comments, etc.}
  // Handle null/undefined cases safely
  const issue = data?.repository?.issue ?? null
  const comments = issue?.comments?.nodes ?? []
  const hasNextPage = issue?.comments?.pageInfo?.hasNextPage ?? false
  const endCursor = issue?.comments?.pageInfo?.endCursor ?? null

  // networkStatus 3 means fetchMore is in progress
  const isFetchingMore = networkStatus === 3

  const fetchMoreComments = async (): Promise<void> => {
    if (!hasNextPage || isFetchingMore || !endCursor) {
      return
    }

    await apolloFetchMore({
      variables: {
        owner: GITHUB_REPO_OWNER,
        name: GITHUB_REPO_NAME,
        number: issueNumber,
        commentsFirst: COMMENTS_PER_PAGE,
        commentsAfter: endCursor,
      },
    })
  }

  return {
    issue: issue as IssueDetail | null,
    comments: comments as IssueComment[],
    loading,
    error,
    refetch,
    hasNextPage,
    fetchMoreComments,
    isFetchingMore,
  }
}
