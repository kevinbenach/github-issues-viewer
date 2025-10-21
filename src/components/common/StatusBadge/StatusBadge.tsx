import styled from 'styled-components'

interface StatusBadgeProps {
  status: 'OPEN' | 'CLOSED'
}

const StyledBadge = styled.span<{ $status: 'OPEN' | 'CLOSED' }>`
  /* Layout - inline-flex works better in flex containers */
  display: inline-flex;
  align-items: center;
  justify-content: center;

  /* Prevent shrinking when space is tight */
  flex-shrink: 0;

  /* Spacing */
  padding: 4px 10px;

  /* Typography */
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
  white-space: nowrap; /* Prevent text wrapping */

  /* Visual */
  border-radius: 2em; /* More modern pill shape */
  background-color: ${({ $status }) =>
    $status === 'OPEN' ? '#1a7f37' : '#8250df'};
  color: #ffffff;

  /* Subtle enhancement */
  letter-spacing: 0.02em;
`

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return <StyledBadge $status={status}>{status}</StyledBadge>
}

export default StatusBadge
