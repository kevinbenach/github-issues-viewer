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
  padding: ${({ theme }) => theme.spacing.xxs} 10px;

  /* Typography */
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  line-height: ${({ theme }) => theme.typography.lineHeight.none};
  text-transform: uppercase;
  white-space: nowrap; /* Prevent text wrapping */

  /* Visual */
  border-radius: ${({ theme }) => theme.radii.pill}; /* More modern pill shape */
  background-color: ${({ $status, theme }) =>
    $status === 'OPEN' ? theme.colors.status.open : theme.colors.status.closed};
  color: #ffffff;

  /* Subtle enhancement */
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
`

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return <StyledBadge $status={status}>{status}</StyledBadge>
}

export default StatusBadge
