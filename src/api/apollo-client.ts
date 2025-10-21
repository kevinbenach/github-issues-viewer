import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client'

import { GITHUB_TOKEN } from '@/constants/env'

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
  link: from([httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          search: {
            // Merge pagination results by concatenating edges
            keyArgs: ['query', 'type'],
            merge(existing, incoming) {
              if (!existing) {
                return incoming
              }
              return {
                ...incoming,
                edges: [...existing.edges, ...incoming.edges],
              }
            },
          },
        },
      },
      Issue: {
        fields: {
          comments: {
            // Merge paginated comments
            keyArgs: false,
            merge(existing, incoming) {
              // If no existing data, return incoming
              if (!existing) {
                return incoming
              }
              // If existing doesn't have nodes (came from issues list), return incoming
              if (!existing.nodes) {
                return incoming
              }
              // If incoming doesn't have nodes, return existing
              if (!incoming.nodes) {
                return existing
              }
              // Both have nodes, concatenate them
              return {
                ...incoming,
                nodes: [...existing.nodes, ...incoming.nodes],
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
