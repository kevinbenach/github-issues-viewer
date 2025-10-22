import styled from 'styled-components'
import { useNavigate, useLocation } from 'react-router-dom'

const StyledContainer = styled.div`
  /* Layout */
  width: 100%;
  max-width: 1200px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 24px 20px;
  box-sizing: border-box;

  /* Flexbox layout */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;

  /* Responsive: reduce padding on mobile */
  @media (max-width: 640px) {
    padding: 16px 12px;
  }
`

const StyledNotFoundBox = styled.div`
  max-width: 600px;
  width: 100%;
  padding: 48px 32px;
  background-color: #f6f8fa;
  border: 1px solid #d0d7de;
  border-radius: 8px;
  text-align: center;

  @media (max-width: 640px) {
    padding: 32px 20px;
  }
`

const StyledNotFoundIcon = styled.div`
  font-size: 72px;
  margin-bottom: 24px;
  line-height: 1;
  opacity: 0.8;
`

const StyledNotFoundCode = styled.div`
  font-size: 48px;
  font-weight: 700;
  color: #656d76;
  margin-bottom: 16px;
  font-family: 'Monaco', 'Menlo', 'Courier New', monospace;

  @media (max-width: 640px) {
    font-size: 36px;
  }
`

const StyledNotFoundTitle = styled.h1`
  margin: 0 0 16px 0;
  font-size: 32px;
  font-weight: 600;
  color: #1f2328;
  line-height: 1.25;

  @media (max-width: 640px) {
    font-size: 24px;
  }
`

const StyledNotFoundMessage = styled.p`
  margin: 0 0 12px 0;
  font-size: 16px;
  line-height: 1.6;
  color: #656d76;

  @media (max-width: 640px) {
    font-size: 14px;
  }
`

const StyledNotFoundPath = styled.code`
  display: inline-block;
  margin: 0 0 32px 0;
  padding: 8px 12px;
  background-color: #fff;
  border: 1px solid #d0d7de;
  border-radius: 4px;
  font-size: 13px;
  font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
  color: #cf222e;
  word-break: break-all;
`

const StyledButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
`

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 20px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  background-color: #0969da;
  border: 1px solid #0969da;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background-color: #0860ca;
    border-color: #0860ca;
  }

  &:active {
    background-color: #0757ba;
    transform: scale(0.98);
  }
`

const StyledSecondaryButton = styled(StyledButton)`
  color: #0969da;
  background-color: transparent;
  border-color: #d0d7de;

  &:hover {
    color: #0860ca;
    background-color: #f6f8fa;
    border-color: #d0d7de;
  }

  &:active {
    background-color: #eaeef2;
    transform: scale(0.98);
  }
`

const StyledSuggestionsList = styled.ul`
  text-align: left;
  margin: 24px 0 32px 0;
  padding: 0;
  list-style: none;
`

const StyledSuggestionItem = styled.li`
  padding: 8px 0;
  font-size: 14px;
  color: #656d76;
  line-height: 1.5;

  &::before {
    content: '→';
    margin-right: 8px;
    color: #0969da;
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
          <StyledButton onClick={handleGoHome}>Go to Home</StyledButton>
          <StyledSecondaryButton onClick={handleGoBack}>Go Back</StyledSecondaryButton>
        </StyledButtonGroup>
      </StyledNotFoundBox>
    </StyledContainer>
  )
}

export default NotFoundPage
