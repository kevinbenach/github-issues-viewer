import styled, { keyframes } from 'styled-components'

interface LoadingSpinnerProps {
  text?: string
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const StyledSpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing['3xl']};
  /* Fill entire viewport to prevent layout shift when data loads */
  /* Use exact viewport dimensions with box-sizing to prevent scrollbars */
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
`

const StyledSpinner = styled.div`
  width: ${({ theme }) => theme.spacing['4xl']};
  height: ${({ theme }) => theme.spacing['4xl']};
  border: ${({ theme }) => theme.borders.thick} ${({ theme }) => theme.colors.spinner.border};
  border-top: ${({ theme }) => theme.borders.thick} ${({ theme }) => theme.colors.spinner.active};
  border-radius: ${({ theme }) => theme.radii.circle};
  animation: ${spin} ${({ theme }) => theme.animations.spin} linear infinite;
`

const StyledText = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin: 0;
`

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text }) => {
  return (
    <StyledSpinnerContainer
      role="status"
      aria-live="polite"
      aria-label={text || 'Loading'}
    >
      <StyledSpinner aria-hidden="true" />
      {text && <StyledText>{text}</StyledText>}
    </StyledSpinnerContainer>
  )
}

export default LoadingSpinner
