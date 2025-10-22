export const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN

if (!GITHUB_TOKEN) {
  throw new Error(
    'GitHub token is required. Please create .env.local with VITE_GITHUB_TOKEN'
  )
}

// GitHub repository configuration
// Defaults to facebook/react but can be overridden via environment variables
export const GITHUB_REPO_OWNER = import.meta.env.VITE_GITHUB_REPO_OWNER || 'facebook'
export const GITHUB_REPO_NAME = import.meta.env.VITE_GITHUB_REPO_NAME || 'react'