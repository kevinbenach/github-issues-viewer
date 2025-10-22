/**
 * Styled Components Theme Type Declaration
 *
 * This file extends the DefaultTheme interface from styled-components
 * to provide full TypeScript autocomplete and type checking for our theme.
 *
 * Benefits:
 * - IDE autocomplete for theme properties (theme.colors.primary.main)
 * - Compile-time errors for invalid theme paths
 * - Self-documenting theme structure
 */

import 'styled-components'
import { Theme } from './theme'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
