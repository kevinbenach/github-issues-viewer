import styled from 'styled-components'
import { useNavigate, useLocation } from 'react-router-dom'

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

const StyledNotFoundBox = styled.div`
  max-width: 600px;
  width: 100%;
  padding: ${({ theme }) => theme.spacing['4xl']} ${({ theme }) => theme.spacing.xxl};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.lg};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
  }
`

const StyledNotFoundIcon = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize['6xl']};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: ${({ theme }) => theme.typography.lineHeight.none};
  opacity: 0.8;
`

const StyledNotFoundCode = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 36px;
  }
`

const StyledNotFoundTitle = styled.h1`
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: ${({ theme }) => theme.typography.lineHeight.snug};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
`

const StyledNotFoundMessage = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  line-height: ${({ theme }) => theme.typography.lineHeight.loose};
  color: ${({ theme }) => theme.colors.text.secondary};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
`

const StyledNotFoundPath = styled.code`
  display: inline-block;
  margin: 0 0 ${({ theme }) => theme.spacing.xxl} 0;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.background.primary};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  color: ${({ theme }) => theme.colors.error.primary};
  word-break: break-all;
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

const StyledSuggestionsList = styled.ul`
  text-align: left;
  margin: ${({ theme }) => theme.spacing.xl} 0 ${({ theme }) => theme.spacing.xxl} 0;
  padding: 0;
  list-style: none;
`

const StyledSuggestionItem = styled.li`
  padding: ${({ theme }) => theme.spacing.xs} 0;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.base};

  &::before {
    content: '→';
    margin-right: ${({ theme }) => theme.spacing.xs};
    color: ${({ theme }) => theme.colors.primary.main};
  }
`

/**
 * 404 Not Found page component
 *
 * Displayed when a user navigates to a route that doesn't exist.
 * Provides helpful navigation options and suggestions.
 */
const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleGoHome = (): void => {
    navigate('/')
  }

  const handleGoBack = (): void => {
    navigate(-1)
  }

  return (
    <StyledContainer>
      <StyledNotFoundBox>
        <StyledNotFoundIcon>🔍</StyledNotFoundIcon>
        <StyledNotFoundCode>404</StyledNotFoundCode>
        <StyledNotFoundTitle>Page not found</StyledNotFoundTitle>
        <StyledNotFoundMessage>
          The page you're looking for doesn't exist or has been moved.
        </StyledNotFoundMessage>
        <StyledNotFoundPath>{location.pathname}</StyledNotFoundPath>

        <StyledSuggestionsList>
          <StyledSuggestionItem>
            Check the URL for typos or errors
          </StyledSuggestionItem>
          <StyledSuggestionItem>
            Use the navigation to find what you're looking for
          </StyledSuggestionItem>
          <StyledSuggestionItem>
            Go back to the home page and start over
          </StyledSuggestionItem>
        </StyledSuggestionsList>

        <StyledButtonGroup>
          <StyledButton
            onClick={handleGoHome}
            aria-label="Navigate to home page"
          >
            Go to Home
          </StyledButton>
          <StyledSecondaryButton
            onClick={handleGoBack}
            aria-label="Go back to previous page"
          >
            Go Back
          </StyledSecondaryButton>
        </StyledButtonGroup>
      </StyledNotFoundBox>
    </StyledContainer>
  )
}

export default NotFoundPage
