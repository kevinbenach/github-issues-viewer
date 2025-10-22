import styled from 'styled-components'
import { ReactNode } from 'react'

const StyledErrorContainer = styled.div`
  min-height: 120px;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.error.background};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.error.border};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.error.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StyledErrorTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`

const StyledErrorMessage = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.base};
`

interface ErrorDisplayProps {
  title: string
  message: string
  children?: ReactNode
}

/**
 * Reusable error display component
 * Shows error title and message with consistent styling
 */
export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ title, message, children }) => {
  return (
    <StyledErrorContainer>
      <StyledErrorTitle>{title}</StyledErrorTitle>
      <StyledErrorMessage>{message}</StyledErrorMessage>
      {children}
    </StyledErrorContainer>
  )
}
