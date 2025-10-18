# GitHub Copilot Instructions

## Project Context
GitHub Issues Viewer - React, TypeScript, Apollo Client, Zustand, Styled-components

## Code Style

### TypeScript
- Strict mode, no `any`
- Use `interface` for objects, `type` for unions
- Explicit return types on exports

### React
- Functional components only
- Props destructuring in signature
- Hooks before conditionals

### Styled Components
- Prefix with `Styled` (StyledButton)
- Use theme: `${({ theme }) => theme.colors.primary}`
- Mobile-first responsive

### Imports
```typescript
// 1. React
import { useState } from 'react';
// 2. Third-party
import { useQuery } from '@apollo/client';
// 3. Internal
import { useStore } from '@/store';
// 4. Types
import type { Issue } from '@/types';
```

## Auto-completion Patterns

### "query" → GraphQL query
```typescript
const QUERY = gql`
  query Name($var: Type!) {
    search(query: $var, type: ISSUE) {
      edges { node { ... } }
    }
  }
`;
```

### "hook" → Custom hook
```typescript
export const useCustomHook = () => {
  const [state, setState] = useState();
  return { state };
};
```

### "styled" → Styled component
```typescript
const StyledDiv = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;
```

### "test" → Test
```typescript
describe('Component', () => {
  it('should render', () => {
    render(<Component />);
    expect(screen.getByText('text')).toBeInTheDocument();
  });
});
```

## Rules
- ❌ No `any` types
- ❌ No class components
- ❌ No console.logs in production
- ✅ Always handle loading/error states
- ✅ Use semantic HTML
- ✅ Add ARIA labels