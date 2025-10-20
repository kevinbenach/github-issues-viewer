import styled from 'styled-components'

interface IssueBodyProps {
  body: string
}

const StyledContainer = styled.div`
  background-color: white;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  padding: 24px;
  margin-bottom: 24px;
`

const StyledSectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #1f2328;
  margin: 0 0 16px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid #d0d7de;
  line-height: 1.4;
`

const StyledBody = styled.div`
  font-size: 14px;
  color: #1f2328;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: break-word;
`

const StyledEmptyMessage = styled.div`
  font-size: 14px;
  color: #656d76;
  font-style: italic;
  line-height: 1.6;
`

const IssueBody: React.FC<IssueBodyProps> = ({ body }) => {
  return (
    <StyledContainer>
      <StyledSectionTitle>Description</StyledSectionTitle>
      {body.trim() ? (
        <StyledBody>{body}</StyledBody>
      ) : (
        <StyledEmptyMessage>No description provided.</StyledEmptyMessage>
      )}
    </StyledContainer>
  )
}

export default IssueBody
