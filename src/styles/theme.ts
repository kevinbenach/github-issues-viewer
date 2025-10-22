/**
 * GitHub Issues Viewer - Design System Theme
 *
 * Centralized design tokens extracted from the existing codebase.
 * All values match the current visual design exactly - this is a refactor
 * for maintainability, not a redesign.
 *
 * Benefits:
 * - Single source of truth for colors, spacing, typography
 * - Type-safe theme access via TypeScript
 * - Easy to maintain and update
 * - Enables future dark mode support
 * - Self-documenting design system
 */

export const theme = {
  /**
   * Color Palette
   * GitHub-inspired light theme colors
   */
  colors: {
    // Primary brand color (GitHub blue)
    primary: {
      main: '#0969da',
      hover: '#0860ca',
      active: '#0757ba',
      focus: 'rgba(9, 105, 218, 0.12)',
    },

    // Text colors
    text: {
      primary: '#1f2328',      // Main content text
      secondary: '#656d76',    // Metadata, timestamps
      tertiary: '#24292f',     // Form labels
      muted: '#8c959f',        // Placeholder text
    },

    // Background colors
    background: {
      primary: '#ffffff',      // Cards, main background
      secondary: '#f6f8fa',    // Filter panels, sections
      tertiary: '#eaeef2',     // Hover states
      quaternary: '#edeff1',   // Active states
      hover: '#e5e7eb',        // Special hover (IssueDetailPage button)
    },

    // Border colors
    border: {
      default: '#d0d7de',
      light: 'rgba(31, 35, 40, 0.15)',
      medium: 'rgba(31, 35, 40, 0.25)',
    },

    // Status badge colors
    status: {
      open: '#1a7f37',         // Green for open issues
      closed: '#8250df',       // Purple for closed issues
    },

    // Error/alert colors
    error: {
      primary: '#cf1322',      // Main error text
      dark: '#8c1b1b',         // Dark error text
      medium: '#a53939',       // Medium error text
      background: '#fff1f0',   // Error box background
      border: '#ffccc7',       // Error box border
    },

    // Component-specific colors
    spinner: {
      border: '#d0d7de',
      active: '#0969da',
    },

    skeleton: {
      base: '#f6f8fa',
      highlight: '#eaeef2',
    },
  },

  /**
   * Spacing Scale
   */
  spacing: {
    xxs: '4px',
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '20px',
    xl: '24px',
    xxl: '32px',
    '3xl': '40px',
    '4xl': '48px',
    '5xl': '80px',
  },

  /**
   * Typography System
   */
  typography: {
    // Font families
    fontFamily: {
      base: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
      mono: '"Monaco", "Menlo", "Courier New", monospace',
    },

    // Font sizes
    fontSize: {
      xxs: '11px',
      xs: '12px',
      sm: '13px',
      base: '14px',
      md: '16px',
      lg: '20px',
      xl: '24px',
      '2xl': '28px',
      '3xl': '32px',
      '4xl': '48px',
      '5xl': '64px',
      '6xl': '72px',
    },

    // Font weights
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },

    // Line heights
    lineHeight: {
      none: 1,       // Icons, badges
      tight: 1.2,    // Section titles
      snug: 1.25,    // Main page titles
      normal: 1.3,   // Issue headers
      relaxed: 1.4,  // Default page content
      base: 1.5,     // Global default
      loose: 1.6,    // Body content, comments
    },

    // Letter spacing
    letterSpacing: {
      tight: '-0.01em',
      normal: '0',
      wide: '0.02em',  // Status badges
    },
  },

  /**
   * Border Radius
   */
  radii: {
    sm: '4px',
    md: '6px',
    lg: '8px',
    pill: '2em',
    circle: '50%',
  },

  /**
   * Box Shadows
   */
  shadows: {
    card: '0 1px 2px rgba(31, 35, 40, 0.12)',
    cardHover: '0 1px 3px rgba(31, 35, 40, 0.12), 0 8px 24px rgba(66, 74, 83, 0.12)',
  },

  /**
   * Transitions
   */
  transitions: {
    default: 'all 0.15s ease',
    medium: '0.2s',
    input: 'all 0.2s ease',
    opacity: 'opacity 0.2s ease-in-out',
  },

  /**
   * Animations
   */
  animations: {
    spin: '0.8s',
    shimmer: '1.5s',
  },

  /**
   * Breakpoints
   */
  breakpoints: {
    mobile: '640px',
  },

  /**
   * Borders
   */
  borders: {
    thin: '1px solid',
    thick: '3px solid',
  },
} as const

// Export type for use in styled.d.ts
export type Theme = typeof theme
