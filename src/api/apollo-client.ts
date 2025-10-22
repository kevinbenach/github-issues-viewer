import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

import { GITHUB_TOKEN } from '@/constants/env'

/**
 * Validate GitHub token at runtime (not module load time)
 * This ensures:
 * - Tests can import this module without setting env vars
 * - Helpful error message when token is missing
 * - Failure happens when Apollo client is created, not when module is imported
 */
if (!GITHUB_TOKEN) {
  throw new Error(
    'Missing VITE_GITHUB_TOKEN environment variable. ' +
    'Please create a .env.local file with your GitHub personal access token. ' +
    'See README.md for setup instructions.'
  )
}

/**
 * HTTP link for GitHub GraphQL API
 * Includes authentication header with GitHub personal access token
 */
const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: `Bearer ${GITHUB_TOKEN}`,
  },
})

/**
 * Apollo Client instance configured for GitHub GraphQL API
 * - Uses cache-first fetch policy by default
 * - Authenticates with GitHub personal access token
 * - Caches responses in memory for performance
 */
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          search: {
            /**
             * Pagination for issues list
             * - keyArgs: Cache separately by query and type (different searches = different cache entries)
             * - merge: Concatenate edges when loading more results
             */
            keyArgs: ['query', 'type'],
            merge(existing, incoming) {
              if (!existing) {
                return incoming
              }
              return {
                ...incoming,
                edges: [...(existing.edges || []), ...(incoming.edges || [])],
              }
            },
          },
        },
      },
      Issue: {
        /**
         * Cache Issue objects by their unique 'id' field
         * This ensures the same issue is cached only once, regardless of where it's fetched from
         */
        keyFields: ['id'],
        fields: {
          comments: {
            /**
             * Pagination for issue comments
             * - keyArgs: ['first', 'after'] would cache separately per page, but we want to merge
             * - We use false to merge all comment pages together for the same issue
             * - Merge: Concatenate nodes when loading more comments
             *
             * Note: This works because Issue is cached by ID, so each issue has its own comments cache
             */
            keyArgs: false,
            merge(existing, incoming) {
              // First load or cache miss
              if (!existing) {
                return incoming
              }

              // Handle incompatible structures between list and detail views
              // List view: { totalCount: number }
              // Detail view: { totalCount: number, pageInfo: {...}, nodes: [...] }
              const existingNodes = existing.nodes || []
              const incomingNodes = incoming.nodes || []

              // If incoming has no nodes, it's from list view - don't merge
              if (!incoming.nodes) {
                return incoming
              }

              // If existing has no nodes but incoming does, replace
              if (!existing.nodes) {
                return incoming
              }

              // Both have nodes - merge for pagination
              return {
                ...incoming,
                nodes: [...existingNodes, ...incomingNodes],
              }
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
  },
})

export default client
