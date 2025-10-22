import styled from 'styled-components'

/**
 * Main container for all pages
 * Provides consistent layout, spacing, and responsive behavior
 */
export const PageContainer = styled.div`
  /* Layout */
  width: 100%;
  max-width: 1200px;
  min-height: 100vh;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  box-sizing: border-box;

  /* Use flexbox for consistent spacing */
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};

  /* Responsive: reduce padding on mobile */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
    gap: ${({ theme }) => theme.spacing.lg};
  }
`
