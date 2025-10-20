import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client/react'

import client from './api/apollo-client'
import IssuesPage from './pages/IssuesPage'
import IssueDetailPage from './pages/IssueDetailPage'

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IssuesPage />} />
          <Route path="/issue/:issueNumber" element={<IssueDetailPage />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App