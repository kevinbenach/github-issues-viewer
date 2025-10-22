import styled from 'styled-components'

interface IssueBodyProps {
  body: string
}

const StyledContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.primary};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const StyledSectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border.default};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`

const StyledBody = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: ${({ theme }) => theme.typography.lineHeight.loose};
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: break-word;
`

const StyledEmptyMessage = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-style: italic;
  line-height: ${({ theme }) => theme.typography.lineHeight.loose};
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
