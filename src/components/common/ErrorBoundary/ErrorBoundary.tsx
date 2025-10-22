import { Component, ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

/**
 * Error Boundary component that catches JavaScript errors in child components
 *
 * Prevents the entire app from unmounting when a component crashes.
 * Instead, it displays a fallback UI and logs the error for debugging.
 *
 * @example
 * <ErrorBoundary fallback={<ErrorPage />}>
 *   <App />
 * </ErrorBoundary>
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  /**
   * Static method called when an error is thrown in a child component
   * Updates state to trigger fallback UI rendering
   */
  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render shows the fallback UI
    return {
      hasError: true,
      error,
    }
  }

  /**
   * Called after an error has been captured
   * Used for logging errors to error reporting services
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    // Store error info in state for display
    this.setState({
      errorInfo,
    })

    // Call optional error handler prop
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  /**
   * Reset error state to retry rendering children
   * Useful for "Try Again" functionality
   */
  resetErrorBoundary = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI provided by parent
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default fallback UI
      return (
        <div
          style={{
            padding: '40px 20px',
            textAlign: 'center',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          <div
            style={{
              maxWidth: '600px',
              margin: '0 auto',
              padding: '32px',
              backgroundColor: '#fff1f0',
              border: '1px solid #ffccc7',
              borderRadius: '6px',
              color: '#cf1322',
            }}
          >
            <h2 style={{ margin: '0 0 12px 0', fontSize: '24px', fontWeight: 600 }}>
              Something went wrong
            </h2>
            <p style={{ margin: '0 0 20px 0', fontSize: '14px', lineHeight: 1.5 }}>
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <details style={{ textAlign: 'left', marginBottom: '20px' }}>
              <summary
                style={{
                  cursor: 'pointer',
                  fontSize: '12px',
                  color: '#8c1b1b',
                  marginBottom: '8px',
                }}
              >
                Error details (for developers)
              </summary>
              <pre
                style={{
                  fontSize: '11px',
                  padding: '12px',
                  backgroundColor: '#fff',
                  border: '1px solid #ffccc7',
                  borderRadius: '4px',
                  overflow: 'auto',
                  textAlign: 'left',
                  color: '#1f2328',
                }}
              >
                {this.state.error?.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
            <button
              onClick={() => window.location.reload()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                height: '36px',
                padding: '0 16px',
                fontSize: '14px',
                fontWeight: 500,
                color: 'white',
                backgroundColor: '#0969da',
                border: '1px solid #0969da',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Refresh page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
