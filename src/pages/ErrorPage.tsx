import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const StyledContainer = styled.div`
  /* Layout */
  width: 100%;
  max-width: 1200px;
  min-height: 100vh;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  box-sizing: border-box;

  /* Flexbox layout */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xl};

  /* Responsive: reduce padding on mobile */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
  }
`

const StyledErrorBox = styled.div`
  max-width: 600px;
  width: 100%;
  padding: ${({ theme }) => theme.spacing['4xl']} ${({ theme }) => theme.spacing.xxl};
  background-color: ${({ theme }) => theme.colors.error.background};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.error.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
  }
`

const StyledErrorIcon = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize['5xl']};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: ${({ theme }) => theme.typography.lineHeight.none};
`

const StyledErrorTitle = styled.h1`
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.error.primary};
  line-height: ${({ theme }) => theme.typography.lineHeight.snug};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
`

const StyledErrorMessage = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.xl} 0;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  line-height: ${({ theme }) => theme.typography.lineHeight.loose};
  color: ${({ theme }) => theme.colors.error.dark};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
`

const StyledErrorDescription = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.xxl} 0;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.base};
  color: ${({ theme }) => theme.colors.error.medium};
`

const StyledButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: center;
  flex-wrap: wrap;
`

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  height: 40px;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: white;
  background-color: ${({ theme }) => theme.colors.primary.main};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.primary.main};
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.hover};
    border-color: ${({ theme }) => theme.colors.primary.hover};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.primary.active};
    transform: scale(0.98);
  }
`

const StyledSecondaryButton = styled(StyledButton)`
  color: ${({ theme }) => theme.colors.primary.main};
  background-color: transparent;
  border-color: ${({ theme }) => theme.colors.border.default};

  &:hover {
    color: ${({ theme }) => theme.colors.primary.hover};
    background-color: ${({ theme }) => theme.colors.background.secondary};
    border-color: ${({ theme }) => theme.colors.border.default};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.background.tertiary};
    transform: scale(0.98);
  }
`

const StyledDetails = styled.details`
  text-align: left;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.background.primary};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.error.border};
  border-radius: ${({ theme }) => theme.radii.sm};
`

const StyledSummary = styled.summary`
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.error.dark};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

const StyledPre = styled.pre`
  font-size: ${({ theme }) => theme.typography.fontSize.xxs};
  margin: ${({ theme }) => theme.spacing.xs} 0 0 0;
  padding: ${({ theme }) => theme.spacing.xs};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.sm};
  overflow: auto;
  color: ${({ theme }) => theme.colors.text.primary};
  white-space: pre-wrap;
  word-break: break-word;
`

interface ErrorPageProps {
  error?: Error
  resetError?: () => void
}

/**
 * Full-page error display component
 *
 * Shows a user-friendly error message when the app encounters an unrecoverable error.
 * Provides actions to navigate back home or reload the page.
 */
const ErrorPage: React.FC<ErrorPageProps> = ({ error, resetError }) => {
  const navigate = useNavigate()

  const handleGoHome = (): void => {
    if (resetError) {
      resetError()
    }
    navigate('/')
  }

  const handleReload = (): void => {
    window.location.reload()
  }

  return (
    <StyledContainer>
      <StyledErrorBox>
        <StyledErrorIcon>⚠️</StyledErrorIcon>
        <StyledErrorTitle>Oops! Something went wrong</StyledErrorTitle>
        <StyledErrorMessage>
          We encountered an unexpected error while loading this page.
        </StyledErrorMessage>
        <StyledErrorDescription>
          This might be a temporary issue. Try refreshing the page or returning to the home page.
        </StyledErrorDescription>
        {error && (
          <StyledDetails>
            <StyledSummary>Technical details</StyledSummary>
            <StyledPre>{error.toString()}</StyledPre>
          </StyledDetails>
        )}
        <StyledButtonGroup>
          <StyledButton
            onClick={handleGoHome}
            aria-label="Navigate to home page"
          >
            Go to Home
          </StyledButton>
          <StyledSecondaryButton
            onClick={handleReload}
            aria-label="Refresh the current page"
          >
            Refresh Page
          </StyledSecondaryButton>
        </StyledButtonGroup>
      </StyledErrorBox>
    </StyledContainer>
  )
}

export default ErrorPage
