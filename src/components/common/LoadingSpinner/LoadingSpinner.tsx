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
`

const StyledSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`

const StyledText = styled.p`
  color: #666;
  font-size: 14px;
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
