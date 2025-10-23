import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/styles/theme'

/**
 * Custom render function that wraps components with necessary providers
 *
 * This is useful for integration tests that need:
 * - Router context (for useNavigate, useParams, etc.)
 * - Apollo Client (for GraphQL queries)
 * - Theme providers (styled-components theme)
 *
 * @example
 * renderWithProviders(<MyComponent />)
 *
 * @example
 * renderWithProviders(<MyComponent />, {
 *   initialEntries: ['/issue/123']
 * })
 */

// Custom options type - extends RenderOptions without 'wrapper'
// Future additions: initialEntries for router, initialState for store, etc.
type ExtendedRenderOptions = Omit<RenderOptions, 'wrapper'>

export function renderWithProviders(
  ui: ReactElement,
  options?: ExtendedRenderOptions
) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    )
  }

  return render(ui, { wrapper: Wrapper, ...options })
}

// Re-export everything from React Testing Library
export * from '@testing-library/react'
