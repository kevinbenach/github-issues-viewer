/**
 * Format a date string to a human-readable relative time or absolute date
 * Similar to GitHub's date formatting
 *
 * @param dateString - ISO 8601 date string from GitHub API
 * @returns Formatted date string
 *
 * @example
 * formatDate('2024-01-15T10:30:00Z') // "Jan 15, 2024"
 * formatDate(recentDate) // "2 hours ago"
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  // Less than 1 minute
  if (diffInSeconds < 60) {
    return 'just now'
  }

  // Less than 1 hour
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`
  }

  // Less than 24 hours
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`
  }

  // Less than 30 days
  if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} day${days !== 1 ? 's' : ''} ago`
  }

  // Less than 1 year
  if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000)
    return `${months} month${months !== 1 ? 's' : ''} ago`
  }

  // 1 year or more - show absolute date
  // Format: "Jan 15, 2024"
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]

  const month = monthNames[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()

  return `${month} ${day}, ${year}`
}

/**
 * Format a date string to a full absolute date
 * Used for tooltips or when full precision is needed
 *
 * @param dateString - ISO 8601 date string
 * @returns Formatted date string
 *
 * @example
 * formatFullDate('2024-01-15T10:30:00Z') // "Jan 15, 2024 at 10:30 AM"
 */
export const formatFullDate = (dateString: string): string => {
  const date = new Date(dateString)

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]

  const month = monthNames[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()

  // Format time
  let hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours ? hours : 12 // 0 should be 12
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes

  return `${month} ${day}, ${year} at ${hours}:${minutesStr} ${ampm}`
}
