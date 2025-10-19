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
            // Merge incoming search results instead of replacing
            keyArgs: ['query', 'type'],
            merge(_existing, incoming) {
              return incoming
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
