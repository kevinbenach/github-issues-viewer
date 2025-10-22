/**
 * Pagination and search constants
 *
 * Centralizes all magic numbers related to data fetching and pagination.
 * This makes it easy to adjust these values across the entire application.
 */

/**
 * Number of issues to fetch per page/request
 * Used by useIssues hook and Apollo cache policies
 */
export const ISSUES_PER_PAGE = 20

/**
 * Number of comments to fetch per page/request
 * Used by useIssueDetail hook for comment pagination
 */
export const COMMENTS_PER_PAGE = 20

/**
 * Debounce delay for search input in milliseconds
 * Prevents excessive API calls while user is typing
 * 300ms is a good balance between responsiveness and reducing API load
 */
export const SEARCH_DEBOUNCE_MS = 300

/**
 * Minimum valid issue number
 * GitHub issue numbers start at 1, so 0 or negative numbers are invalid
 */
export const MIN_VALID_ISSUE_NUMBER = 1
