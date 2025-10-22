import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client/react'
import { ThemeProvider } from 'styled-components'

import client from './api/apollo-client'
import { theme } from './styles/theme'
import IssuesPage from './pages/IssuesPage'
import IssueDetailPage from './pages/IssueDetailPage'
import NotFoundPage from './pages/NotFoundPage'
import ErrorPage from './pages/ErrorPage'
import ErrorBoundary from './components/common/ErrorBoundary'

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ErrorBoundary fallback={<ErrorPage />}>
            <Routes>
              <Route path="/" element={<IssuesPage />} />
              <Route path="/issue/:issueNumber" element={<IssueDetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </ErrorBoundary>
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App