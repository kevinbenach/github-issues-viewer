import styled from 'styled-components'

interface StatusBadgeProps {
  status: 'OPEN' | 'CLOSED'
}

const StyledBadge = styled.span<{ $status: 'OPEN' | 'CLOSED' }>`
  display: inline-block;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 12px;
  text-transform: uppercase;
  background-color: ${({ $status }) =>
    $status === 'OPEN' ? '#2ea44f' : '#8250df'};
  color: white;
`

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return <StyledBadge $status={status}>{status}</StyledBadge>
}

export default StatusBadge
