export const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN

if (!GITHUB_TOKEN) {
  throw new Error(
    'GitHub token is required. Please create .env.local with VITE_GITHUB_TOKEN'
  )
}