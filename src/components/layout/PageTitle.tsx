import styled from 'styled-components'

/**
 * Main page title (h1)
 * Used consistently across all pages
 */
export const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.snug};

  /* Remove focus outline - title is focused programmatically for screen readers only */
  /* Not an interactive element, so visual focus ring is unnecessary */
  &:focus {
    outline: none;
  }

  /* Responsive: smaller title on mobile */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
`
