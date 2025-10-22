/**
 * Formats Apollo/GraphQL errors into user-friendly messages
 *
 * This improves UX by showing specific messages for common API issues
 * instead of raw error messages that confuse users.
 *
 * @param error - Error from Apollo Client useQuery/useMutation
 * @returns User-friendly error message
 *
 * @example
 * const { error } = useQuery(...)
 * <ErrorDisplay message={formatApolloError(error)} />
 */
export const formatApolloError = (error: Error | undefined): string => {
  if (!error) return 'An unknown error occurred'

  const message = error.message.toLowerCase()

  // GitHub API rate limit exceeded
  if (message.includes('rate limit') || message.includes('api rate limit exceeded')) {
    return 'GitHub API rate limit exceeded. Please try again in a few minutes or check your access token.'
  }

  // Authentication/authorization errors
  if (message.includes('bad credentials') || message.includes('401') || message.includes('unauthorized')) {
    return 'Invalid GitHub token. Please check your .env.local file and ensure VITE_GITHUB_TOKEN is correct.'
  }

  // Token missing or malformed
  if (message.includes('requires authentication') || message.includes('missing token')) {
    return 'GitHub token is required. Please add VITE_GITHUB_TOKEN to your .env.local file.'
  }

  // Network/connection errors
  if (message.includes('network') || message.includes('fetch failed') || message.includes('failed to fetch')) {
    return 'Network error. Please check your internet connection and try again.'
  }

  // GraphQL-specific errors
  if (message.includes('graphql') || message.includes('syntax error')) {
    return 'GitHub API error. The request format may be invalid. Please try refreshing the page.'
  }

  // Server errors (5xx)
  if (message.includes('500') || message.includes('502') || message.includes('503')) {
    return 'GitHub servers are experiencing issues. Please try again in a few minutes.'
  }

  // Not found errors
  if (message.includes('404') || message.includes('not found')) {
    return 'The requested resource was not found. Please check the repository name.'
  }

  // Default: show the actual error message
  // This ensures we don't hide unexpected errors
  return `Error: ${error.message}`
}
