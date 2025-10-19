import { ApolloProvider, useQuery } from '@apollo/client/react'
import client from './api/apollo-client'
import { SEARCH_ISSUES_QUERY } from './api/queries/issues'

function IssuesTest() {
  const { data, loading, error } = useQuery(SEARCH_ISSUES_QUERY, {
    variables: {
      query: 'repo:facebook/react is:issue state:open',
      first: 10,
    },
  })
  
  if (loading) return <div>Loading issues...</div>
  if (error) return <div>Error: {error.message}</div>
  
  const issues = data?.search?.edges?.map((edge: any) => edge.node) ?? []
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>React Issues ({issues.length})</h1>
      {issues.map((issue: any) => (
        <div key={issue.id} style={{ 
          border: '1px solid #ccc', 
          padding: '10px', 
          margin: '10px 0' 
        }}>
          <h3>#{issue.number}: {issue.title}</h3>
          <p>State: {issue.state}</p>
          <p>Author: {issue.author?.login}</p>
          <p>Comments: {issue.comments.totalCount}</p>
        </div>
      ))}
    </div>
  )
}

function App() {
  return (
    <ApolloProvider client={client}>
      <IssuesTest />
    </ApolloProvider>
  )
}

export default App