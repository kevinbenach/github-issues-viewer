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
  gap: 12px;
  padding: 40px;
  /* Fill entire viewport to prevent layout shift when data loads */
  min-height: 100vh;
  width: 100%;
`

const StyledSpinner = styled.div`
  width: 48px;
  height: 48px;
  border: 3px solid #d0d7de;
  border-top: 3px solid #0969da;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`

const StyledText = styled.p`
  color: #656d76;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
`

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text }) => {
  return (
    <StyledSpinnerContainer>
      <StyledSpinner />
      {text && <StyledText>{text}</StyledText>}
    </StyledSpinnerContainer>
  )
}

export default LoadingSpinner
