# GitHub Issues Viewer

A modern React application for browsing GitHub issues from the **facebook/react** repository. Built with TypeScript, Apollo Client, and styled-components as a technical challenge for MediaMarktSaturn Frontend Engineer position.

![React](https://img.shields.io/badge/React-19.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Apollo](https://img.shields.io/badge/Apollo_Client-4.0-purple)
![Tests](https://img.shields.io/badge/Tests-Vitest-green)

## ✨ Features

- 🔍 **Search & Filter** - Search issues by title/body, filter by status (Open/Closed/All)
- 📄 **Pagination** - Load more results and comments seamlessly
- 🎨 **Modern UI** - Clean, GitHub-inspired interface with styled-components
- ⚡ **Debounced Search** - Optimized API calls with 300ms debounce
- 🧪 **Well Tested** - Unit and integration tests with Vitest + React Testing Library
- 🔄 **Smart Caching** - Apollo Client cache for optimal performance
- 📱 **Responsive** - Mobile-friendly design
- ♿ **Accessible** - Proper ARIA labels and semantic HTML
- 🎯 **Type Safe** - Full TypeScript with GraphQL code generation

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **GitHub Personal Access Token** (required for API access)

### 1. Clone & Install

```bash
git clone <repository-url>
cd github-issues-viewer
npm install
```

### 2. Set Up GitHub Token

Create a `.env.local` file in the project root:

```bash
VITE_GITHUB_TOKEN=your_github_token_here
```

**How to get a GitHub token:**

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a descriptive name (e.g., "GitHub Issues Viewer")
4. Select scopes: `public_repo` and `read:user`
5. Click "Generate token" and copy it
6. Paste into `.env.local`

⚠️ **Important:** Never commit `.env.local` to git (it's already in `.gitignore`)

### 3. Run Development Server

```bash
pnpm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🛠️ Available Commands

```bash
# Development
pnpm run dev              # Start dev server (with HMR)
pnpm run build            # Build for production
pnpm run preview          # Preview production build locally

# Code Quality
pnpm run lint             # Run ESLint

# Testing
pnpm test                 # Run tests in watch mode
pnpm run test:ui          # Run tests with UI

# GraphQL Codegen
pnpm run codegen          # Generate TypeScript types from GraphQL schema
pnpm run codegen:watch    # Watch mode for codegen
```

## 📁 Project Structure

```
src/
├── api/                      # GraphQL & Apollo Client
│   ├── apollo-client.ts      # Apollo Client configuration
│   ├── queries/              # GraphQL queries & fragments
│   │   ├── issues.ts         # Search issues query
│   │   └── issue-detail.ts   # Single issue query
│   └── types/
│       └── generated.ts      # Auto-generated GraphQL types
├── components/               # React components
│   ├── common/               # Reusable components
│   │   ├── ErrorBoundary/    # Error boundary wrapper
│   │   ├── LoadingSpinner/   # Loading indicator
│   │   ├── Pagination/       # Load more button
│   │   ├── StatusBadge/      # Open/Closed badge
│   │   └── IssueCardSkeleton/ # Skeleton loader
│   ├── issue/                # Issue list components
│   │   ├── IssueCard/        # Single issue card
│   │   └── IssueFilters/     # Search & filter controls
│   └── issue-detail/         # Issue detail components
│       ├── IssueHeader/      # Issue title & metadata
│       ├── IssueBody/        # Issue description
│       └── CommentCard/      # Comment card
├── pages/                    # Route components
│   ├── IssuesPage.tsx        # Issues list page (/)
│   ├── IssueDetailPage.tsx   # Issue detail page (/issue/:number)
│   ├── NotFoundPage.tsx      # 404 page
│   └── ErrorPage.tsx         # Error fallback
├── hooks/                    # Custom React hooks
│   ├── useIssues.ts          # Fetch & manage issues list
│   ├── useIssueDetail.ts     # Fetch single issue
│   └── useDebounce.ts        # Debounce hook
├── store/                    # State management
│   └── issuesStore.ts        # Zustand store for filters
├── utils/                    # Utility functions
│   ├── buildGitHubQuery.ts   # Build GitHub search query
│   └── formatDate.ts         # Date formatting
├── styles/                   # Styling
│   ├── theme.ts              # Design tokens (colors, spacing, etc.)
│   └── styled.d.ts           # TypeScript theme types
├── constants/                # Constants
│   └── env.ts                # Environment variables
├── types/                    # TypeScript types
│   └── domain.types.ts       # Domain/business types
└── test/                     # Tests
    ├── unit/                 # Unit tests
    ├── integration/          # Integration tests
    ├── helpers/              # Test utilities
    └── fixtures/             # Test data
```

## 🏗️ Architecture

### State Management Strategy

- **Apollo Client** - All server state (issues, comments from GitHub API)
- **Zustand** - UI state only (search filters, preferences)
- **Custom Hooks** - Bridge between Apollo and components

### Key Design Decisions

1. **No Generated Hooks** - Using `useQuery` directly with generated types for better control
2. **Debounced Search** - 300ms debounce prevents API spam while typing
3. **Smart Caching** - Apollo cache policies for optimal pagination
4. **Skeleton Loading** - Better perceived performance vs spinners
5. **Error Boundaries** - Graceful error handling at app level
6. **Memoization** - Strategic use of `React.memo` for list items

## 🧪 Testing

The project includes comprehensive tests:

- **Unit Tests** - Hooks, utilities, and store
- **Integration Tests** - Component behavior with state management
- **Coverage** - Focus on critical paths and user workflows

```bash
# Run all tests
pnpm test

# Run tests with UI
pnpm run test:ui
```

### Test Files

- `src/test/unit/hooks/useDebounce.test.ts` - Debounce hook testing
- `src/test/unit/utils/buildGitHubQuery.test.ts` - Query builder tests
- `src/test/unit/store/issuesStore.test.ts` - State management tests
- `src/test/integration/components/IssueFilters.test.tsx` - Filter component tests

## 📊 GraphQL Code Generation

This project uses **GraphQL Code Generator** to automatically create TypeScript types from the GitHub GraphQL schema.

```bash
# One-time generation
pnpm run codegen

# Watch mode (regenerate on query changes)
pnpm run codegen:watch
```

**What it does:**
1. Fetches GitHub's GraphQL schema using your token
2. Finds all GraphQL queries in `src/**/*.{ts,tsx}`
3. Generates fully-typed interfaces in `src/api/types/generated.ts`

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```bash
# Required
VITE_GITHUB_TOKEN=ghp_xxxxxxxxxxxx

# Optional - customize target repository (defaults to facebook/react)
VITE_GITHUB_REPO_OWNER=facebook
VITE_GITHUB_REPO_NAME=react
```

### TypeScript

- **Strict mode enabled** - Maximum type safety
- **Path aliases** - Use `@/` prefix for imports (e.g., `@/components/...`)
- **Generated types** - Auto-generated from GraphQL schema

### Apollo Client

- **Fetch policy** - `cache-first` by default
- **Error policy** - `all` to handle partial data
- **Pagination** - Automatic cache merging for "Load More" functionality

## 🚢 Production Build

```bash
# Build
pnpm run build

# Preview locally
pnpm run preview
```

Output is in the `dist/` folder, ready for deployment to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

## 📝 Technical Specifications

**Required by challenge:**
- ✅ React
- ✅ TypeScript
- ✅ Apollo Client / GraphQL

**Nice to have (implemented):**
- ✅ Pagination for search results
- ✅ Pagination for comments
- ✅ styled-components
- ✅ Testing (Vitest + React Testing Library)

**Additional features:**
- Zustand for state management
- React Router for routing
- GraphQL Code Generator for type safety
- Error boundaries
- Debounced search
- Responsive design
- Accessibility features

## 🐛 Troubleshooting

### "Missing VITE_GITHUB_TOKEN" error

Make sure you have a `.env.local` file with a valid GitHub token. See [Set Up GitHub Token](#2-set-up-github-token).

### "API rate limit exceeded"

GitHub's API has rate limits:
- **Authenticated**: 5,000 requests/hour
- **Unauthenticated**: 60 requests/hour

Make sure your token is valid and properly set in `.env.local`.

### TypeScript errors after pulling changes

Regenerate GraphQL types:

```bash
pnpm run codegen
```

### Tests failing

Make sure dependencies are installed:

```bash
pnpm install
```

## 📄 License

This project is for educational/interview purposes.

## 👤 Author

Created as a technical challenge for MediaMarktSaturn Frontend Engineer position.

---

**Built with ❤️ using React, TypeScript, Apollo Client, and styled-components**
