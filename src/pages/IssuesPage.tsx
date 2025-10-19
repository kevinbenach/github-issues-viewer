import styled from 'styled-components'

import { useIssues } from '@/hooks/useIssues'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import IssueCard from '@/components/issue/IssueCard'

const StyledContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`

const StyledHeader = styled.header`
  margin-bottom: 24px;
`

const StyledTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #1f2328;
  margin: 0 0 8px 0;
`

const StyledSubtitle = styled.p`
  font-size: 16px;
  color: #656d76;
  margin: 0;
`

const StyledErrorContainer = styled.div`
  padding: 20px;
  background-color: #fff1f0;
  border: 1px solid #ffccc7;
  border-radius: 6px;
  color: #cf1322;
`

const StyledErrorTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
`

const StyledErrorMessage = styled.p`
  margin: 0;
  font-size: 14px;
`

const StyledIssuesList = styled.div`
  display: flex;
  flex-direction: column;
`

const IssuesPage: React.FC = () => {
  const { issues, loading, error } = useIssues()

  if (loading) {
    return <LoadingSpinner text="Loading issues..." />
  }

  if (error) {
    return (
      <StyledContainer>
        <StyledErrorContainer>
          <StyledErrorTitle>Error loading issues</StyledErrorTitle>
          <StyledErrorMessage>{error.message}</StyledErrorMessage>
        </StyledErrorContainer>
      </StyledContainer>
    )
  }

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitle>React Issues</StyledTitle>
        <StyledSubtitle>
          {issues.length} issue{issues.length !== 1 ? 's' : ''} found
        </StyledSubtitle>
      </StyledHeader>

      <StyledIssuesList>
        {issues.map((issue) => (
          <IssueCard
            key={issue.id}
            issue={issue}
            onClick={() => console.log(`Issue #${issue.number} clicked`)}
          />
        ))}
      </StyledIssuesList>
    </StyledContainer>
  )
}

export default IssuesPage
