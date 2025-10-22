import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

/**
 * Custom render function that wraps components with necessary providers
 *
 * This is useful for integration tests that need:
 * - Router context (for useNavigate, useParams, etc.)
 * - Apollo Client (for GraphQL queries)
 * - Theme providers (if using styled-components theme)
 *
 * @example
 * renderWithProviders(<MyComponent />)
 *
 * @example
 * renderWithProviders(<MyComponent />, {
 *   initialEntries: ['/issue/123']
 * })
 */

interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  // Add custom options here if needed
  // e.g., initialEntries for router, initialState for store, etc.
}

export function renderWithProviders(
  ui: ReactElement,
  options?: ExtendedRenderOptions
) {
  // For now, we'll use a simple wrapper
  // Later, you can add Router, Apollo, Theme providers here

  // const Wrapper = ({ children }: { children: React.ReactNode }) => {
  //   return (
  //     <BrowserRouter>
  //       <ApolloProvider client={mockClient}>
  //         {children}
  //       </ApolloProvider>
  //     </BrowserRouter>
  //   )
  // }

  // For components that don't need providers, use standard render
  return render(ui, { ...options })
}

// Re-export everything from React Testing Library
export * from '@testing-library/react'
