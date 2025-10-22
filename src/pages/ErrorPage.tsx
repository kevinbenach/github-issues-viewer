import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

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

const StyledErrorBox = styled.div`
  max-width: 600px;
  width: 100%;
  padding: 48px 32px;
  background-color: #fff1f0;
  border: 1px solid #ffccc7;
  border-radius: 8px;
  text-align: center;

  @media (max-width: 640px) {
    padding: 32px 20px;
  }
`

const StyledErrorIcon = styled.div`
  font-size: 64px;
  margin-bottom: 24px;
  line-height: 1;
`

const StyledErrorTitle = styled.h1`
  margin: 0 0 16px 0;
  font-size: 32px;
  font-weight: 600;
  color: #cf1322;
  line-height: 1.25;

  @media (max-width: 640px) {
    font-size: 24px;
  }
`

const StyledErrorMessage = styled.p`
  margin: 0 0 24px 0;
  font-size: 16px;
  line-height: 1.6;
  color: #8c1b1b;

  @media (max-width: 640px) {
    font-size: 14px;
  }
`

const StyledErrorDescription = styled.p`
  margin: 0 0 32px 0;
  font-size: 14px;
  line-height: 1.5;
  color: #a53939;
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
          <details
            style={{
              textAlign: 'left',
              marginBottom: '24px',
              padding: '12px',
              backgroundColor: '#fff',
              border: '1px solid #ffccc7',
              borderRadius: '4px',
            }}
          >
            <summary
              style={{
                cursor: 'pointer',
                fontSize: '12px',
                color: '#8c1b1b',
                fontWeight: 500,
                marginBottom: '8px',
              }}
            >
              Technical details
            </summary>
            <pre
              style={{
                fontSize: '11px',
                margin: '8px 0 0 0',
                padding: '8px',
                backgroundColor: '#f6f8fa',
                border: '1px solid #d0d7de',
                borderRadius: '4px',
                overflow: 'auto',
                color: '#1f2328',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {error.toString()}
            </pre>
          </details>
        )}
        <StyledButtonGroup>
          <StyledButton onClick={handleGoHome}>Go to Home</StyledButton>
          <StyledSecondaryButton onClick={handleReload}>Refresh Page</StyledSecondaryButton>
        </StyledButtonGroup>
      </StyledErrorBox>
    </StyledContainer>
  )
}

export default ErrorPage
