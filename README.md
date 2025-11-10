# GitHub Issues Viewer

A modern React application for browsing GitHub issues from the **facebook/react** repository. Built with TypeScript, Apollo Client, and styled-components.

**🚀 [Live Demo](https://github-issues-viewer.pages.dev/)** | Deployed on Cloudflare Pages

![React](https://img.shields.io/badge/React-19.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Apollo](https://img.shields.io/badge/Apollo_Client-4.0-purple)
![Tests](https://img.shields.io/badge/Tests-Vitest-green)
![CI](https://img.shields.io/badge/CI-GitHub_Actions-green)

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

- **Node.js** 18+ and **pnpm** 9+
- **GitHub Personal Access Token** (required for API access)

> **Note:** This project uses pnpm. Install it globally: `npm install -g pnpm`

### 1. Clone & Install

```bash
git clone <repository-url>
cd github-issues-viewer
pnpm install
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

## 🚀 CI/CD & Deployment

### Live Application
**Production URL:** https://github-issues-viewer.pages.dev/

The application is automatically deployed to **Cloudflare Pages** with every push to the `main` branch.

### GitHub Actions CI Pipeline

Every push and pull request triggers automated quality checks:

```yaml
✅ ESLint (strict TypeScript rules)
✅ Type checking (tsc --noEmit)
✅ Unit & Integration tests (Vitest)
✅ Production build verification
```

**Workflow file:** `.github/workflows/ci.yml`

The CI pipeline uses pnpm with dependency caching for fast builds (~5 seconds for cached runs).

### Cloudflare Pages Configuration

**Build Settings:**
- **Build command:** `pnpm run build`
- **Output directory:** `dist`
- **Node version:** 20

**Environment Variables:**
Set in Cloudflare Pages dashboard:
- `VITE_GITHUB_TOKEN` - Your GitHub Personal Access Token

**Features:**
- 🌍 **Global CDN** - Edge network for low latency worldwide
- 🔒 **Automatic HTTPS** - SSL certificates managed automatically
- 🔄 **Preview Deployments** - Every PR gets a unique preview URL
- ⚡ **Instant Rollbacks** - One-click rollback to previous deployments

### Branch Protection (Recommended)

To prevent broken code from reaching production:

1. Go to **GitHub Repository → Settings → Branches**
2. Add rule for `main` branch:
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date
   - ✅ Select "Quality Checks" workflow

This ensures all CI checks pass before merging PRs.

## 🚢 Local Production Build

```bash
# Build
pnpm run build

# Preview locally
pnpm run preview
```

Output is in the `dist/` folder, ready for deployment to any static hosting service.

## 📝 Technical Specifications

### Core Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.1 | UI framework |
| TypeScript | 5.9 | Type safety (strict mode) |
| Apollo Client | 4.0 | GraphQL client & caching |
| Zustand | 5.0 | UI state management |
| styled-components | 6.1 | CSS-in-JS styling |
| React Router | 7.9 | Client-side routing |
| Vite | 7.1 | Build tool & dev server |
| Vitest | 3.2 | Testing framework |

### DevOps & Tooling
- **Package Manager:** pnpm 9
- **CI/CD:** GitHub Actions
- **Hosting:** Cloudflare Pages
- **Code Quality:** ESLint + TypeScript ESLint
- **GraphQL Codegen:** Auto-generate types from schema

**Challenge Requirements:**
- ✅ React
- ✅ TypeScript
- ✅ Apollo Client / GraphQL
- ✅ Pagination (issues & comments)
- ✅ styled-components
- ✅ Testing

**Production Features:**
- ✅ CI/CD pipeline with automated quality checks
- ✅ Global CDN deployment (Cloudflare Pages)
- ✅ Preview deployments for PRs
- ✅ Branch protection with required checks
- ✅ Error boundaries & graceful error handling
- ✅ Debounced search (300ms)
- ✅ Responsive design
- ✅ Accessibility (ARIA labels, semantic HTML)
- ✅ Type-safe GraphQL with code generation

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

### CI checks failing

Run the same checks locally to debug:

```bash
pnpm run lint          # Check for lint errors
pnpm exec tsc --noEmit # Check for type errors
pnpm test -- --run     # Run all tests
pnpm run build         # Verify build works
```

### Cloudflare deployment issues

1. Verify `VITE_GITHUB_TOKEN` is set in Cloudflare Pages dashboard
2. Check build logs in Cloudflare Pages console
3. Ensure build command is `pnpm run build` and output dir is `dist`

## 📄 License

This project is for educational purposes.

## 👤 Author

Kevin Benach.

## 🔗 Links

- **Live Demo:** https://github-issues-viewer.pages.dev/
- **GitHub Actions:** Check the "Actions" tab in the repository
- **Cloudflare Pages:** Deployment dashboard (requires access)

---

**Built with ❤️ using React 19, TypeScript, Apollo Client, and deployed on Cloudflare Pages**
