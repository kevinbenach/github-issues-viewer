import { ApolloProvider } from '@apollo/client/react'
import client from './api/apollo-client'

import IssuesPage from './pages/IssuesPage'

function App() {
  return (
    <ApolloProvider client={client}>
      <div style={{ padding: '20px' }}>
        <h1>React Issues Viewer</h1>
        <IssuesPage />
      </div>
    </ApolloProvider>
  )
}

export default App