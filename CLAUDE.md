# CLAUDE.md

## Project Overview
GitHub Issues Viewer for MediaMarktSaturn Frontend Engineer Challenge.
Browse issues from facebook/react repository using GitHub GraphQL API.

## Tech Stack
- React 18 + TypeScript 5 (strict mode)
- Apollo Client 3 (GraphQL)
- Zustand 4 (UI state only)
- Styled-components 6
- React Router 6
- Vitest + React Testing Library
- Vite 5

## Architecture Principles

### State Management
- **Apollo Client**: All server state (issues, comments from GitHub)
- **Zustand**: Only UI state (search filters, preferences)
- **Custom Hooks**: Bridge between Apollo and components

### Folder Structure
```
src/
├── api/              # Apollo client + GraphQL queries
│   ├── apollo-client.ts
│   ├── queries/
│   └── types/
├── components/       # Presentational components
│   ├── common/       # Reusable (Button, Spinner, etc.)
│   ├── issue/        # Issue list components
│   └── issue-detail/ # Detail page components
├── pages/           # Route components
├── hooks/           # Custom hooks (business logic)
├── store/           # Zustand stores
├── types/           # TypeScript domain types
├── utils/           # Helper functions
├── constants/       # App constants
└── styles/          # Theme + global styles
```

## Coding Standards

### Components
- Functional components only
- TypeScript interfaces: `ComponentNameProps`
- One component per file
- Export component as default, types as named

### Naming
- Components: `PascalCase` (IssueCard.tsx)
- Hooks: `camelCase` with 'use' (useIssues.ts)
- Types: `PascalCase` (Issue, IssueFilters)
- Constants: `UPPER_SNAKE_CASE`
- Styled components: Prefix `Styled` (StyledButton)

### Import Order
1. React imports
2. Third-party libraries
3. Internal modules (@ alias)
4. Types
5. Styles

### GraphQL
- Queries in `api/queries/`
- Use fragments for reusable fields
- Generate types with codegen

### Error Handling
- Network errors → Toast/banner
- Component crashes → Error Boundary
- 404 routes → NotFoundPage
- Always show user-friendly messages

## GitHub API
- Repository: `facebook/react`
- Auth: Personal Access Token in `.env.local`
- Required scopes: `public_repo`, `read:user`
- Rate limit: 5000 points/hour

## Common Patterns

### Custom Hook
```typescript
export const useIssues = (filters: IssueFilters) => {
  const { data, loading, error } = useQuery(SEARCH_ISSUES, {
    variables: buildQueryVariables(filters),
  });
  
  return {
    issues: data?.search?.edges?.map(e => e.node) ?? [],
    loading,
    error,
  };
};
```

### Component
```typescript
interface IssueCardProps {
  issue: Issue;
  onClick?: (id: number) => void;
}

export const IssueCard: React.FC<IssueCardProps> = ({ issue, onClick }) => {
  // Minimal logic, mostly presentation
};
```

## Performance
- React.memo for list items
- Debounce search (300ms)
- Apollo cache-first
- Pagination

## Testing
- Focus on user behavior
- Mock Apollo at hook level
- Critical paths only
- Use React Testing Library

## Out of Scope
- Issue creation/editing
- Authentication beyond token
- Real-time updates
- Advanced markdown rendering