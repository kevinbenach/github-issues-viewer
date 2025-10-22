/**
 * GitHub API token for authentication
 * Validation happens in apollo-client.ts where it's actually used
 * This allows the module to be imported in tests without a token
 */
export const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || ''

/**
 * GitHub repository configuration
 * Defaults to facebook/react but can be overridden via environment variables
 */
export const GITHUB_REPO_OWNER = import.meta.env.VITE_GITHUB_REPO_OWNER || 'facebook'
export const GITHUB_REPO_NAME = import.meta.env.VITE_GITHUB_REPO_NAME || 'react'