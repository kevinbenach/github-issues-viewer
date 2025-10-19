import { ApolloProvider, useQuery } from '@apollo/client/react'
import { gql } from '@apollo/client'

import client from './api/apollo-client'

const TEST_QUERY = gql`
  query TestQuery {
    viewer {
      login
      name
    }
  }
`

interface ViewerData {
  viewer: {
    login: string
    name: string | null
  }
}

function TestComponent() {
  const { data, loading, error } = useQuery<ViewerData>(TEST_QUERY)
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <div>
      <h1>Connected to GitHub!</h1>
      <p>Logged in as: {data?.viewer?.login}</p>
      <p>Name: {data?.viewer?.name}</p>
    </div>
  )
}

function App() {
  return (
    <ApolloProvider client={client}>
      <TestComponent />
    </ApolloProvider>
  )
}

export default App