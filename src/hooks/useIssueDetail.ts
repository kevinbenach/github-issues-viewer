import { useQuery } from '@apollo/client/react'

import { GET_ISSUE_QUERY } from '@/api/queries/issue-detail'
import type { IssueDetail, IssueComment } from '@/types/domain.types'

/**
 * GraphQL response type for get issue query
 */
interface GetIssueData {
  repository: {
    issue: IssueDetail | null
  } | null
}

/**
 * Variables for get issue query
 */
interface GetIssueVariables {
  owner: string
  name: string
  number: number
}

/**
 * Return type for useIssueDetail hook
 */
interface UseIssueDetailResult {
  issue: IssueDetail | null
  comments: IssueComment[]
  loading: boolean
  error: Error | undefined
  refetch: () => void
}

/**
 * Custom hook for fetching a single GitHub issue with full details
 * Fetches issue from facebook/react repository by issue number
 * Includes issue body and first 20 comments
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
  const { data, loading, error, refetch } = useQuery<
    GetIssueData,
    GetIssueVariables
  >(GET_ISSUE_QUERY, {
    variables: {
      owner: 'facebook',
      name: 'react',
      number: issueNumber,
    },
    skip: !issueNumber || issueNumber <= 0,
  })

  // Handle null/undefined cases safely
  const issue = data?.repository?.issue ?? null
  const comments = issue?.comments?.nodes ?? []

  return {
    issue,
    comments,
    loading,
    error,
    refetch,
  }
}
