import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop Component
 *
 * Automatically scrolls to the top of the page when the route changes.
 * This is a common UX pattern for SPAs to mimic browser behavior.
 *
 * Why this is needed:
 * - React Router doesn't automatically scroll to top on navigation
 * - Users expect pages to start at the top (like traditional websites)
 * - Prevents confusing mid-page loads
 *
 * Usage:
 * Place this component inside <BrowserRouter> in App.tsx
 *
 * @example
 * <BrowserRouter>
 *   <ScrollToTop />
 *   <Routes>...</Routes>
 * </BrowserRouter>
 */
export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    // Scroll to top instantly when route changes
    // Using 'instant' behavior prevents janky smooth scrolling during navigation
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior,
    })
  }, [pathname])

  // This component doesn't render anything
  return null
}
