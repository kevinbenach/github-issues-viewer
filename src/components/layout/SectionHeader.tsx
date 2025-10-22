import styled from 'styled-components'
import { ReactNode } from 'react'

const StyledSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border.default};
`

const StyledSectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`

interface SectionHeaderProps {
  title: string
  rightContent?: ReactNode
}

/**
 * Section header with title and optional right-side content
 * Used for "Issues", "Comments", etc. sections
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, rightContent }) => {
  return (
    <StyledSectionHeader>
      <StyledSectionTitle>{title}</StyledSectionTitle>
      {rightContent}
    </StyledSectionHeader>
  )
}
