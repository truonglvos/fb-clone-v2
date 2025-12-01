# Copilot Instructions for fb-clone-v2

## Project Overview
FB Clone v2 is a React + TypeScript application built with Vite and styled using Material-UI (MUI). The project uses SWC for fast refresh during development and emphasizes strict TypeScript checking with comprehensive ESLint rules.

**Tech Stack:**
- React 19.2.0 with TypeScript
- Vite (via rolldown-vite) for bundling and dev server
- Material-UI (@mui/material) + Emotion for styling
- React Router v7 for client-side routing
- Axios for HTTP requests with interceptors
- SWC for JSX compilation
- Bun as the package manager

## Architecture & Structure

### Core Entry Point
- `src/main.tsx` - Application bootstrap, renders `<App />` into `#root` DOM element with React StrictMode
- `src/app/App.tsx` - Root component, initializes Router
- `src/app/routes/index.tsx` - Router configuration with all route definitions
- `index.html` - Single HTML file with `<div id="root"></div>` anchor and module script loader

### Project Structure
```
src/
├── app/                       # Root app component and routing
│   ├── App.tsx                # Root component with providers
│   ├── providers/             # Context providers (Theme, Auth, etc)
│   │   ├── ThemeProvider.tsx  # MUI theme configuration
│   │   ├── AuthProvider.tsx   # Authentication context
│   │   └── index.tsx          # RootProvider that combines all
│   └── routes/
│       ├── index.tsx          # Route definitions (import pages from features)
│       └── Router.tsx         # Router provider component
├── features/                  # Feature modules with pages, components, hooks
│   ├── home/
│   │   ├── pages/
│   │   │   └── HomePage.tsx
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   └── index.ts
│   ├── notFound/
│   │   ├── pages/
│   │   │   └── NotFoundPage.tsx
│   │   └── index.ts
│   └── [other features]
├── services/                  # Shared API services (httpClient, authService, storageService)
├── config/                    # Configuration files (env, appConfig)
├── styles/                    # Global SCSS (variables, globals, components)
├── assets/                    # Images, icons, static files
└── main.tsx                   # Application entry point
```

### Build Pipeline
- **Dev**: `bun dev` → Vite dev server with HMR at http://localhost:5173
- **Build**: `bun run build` → Runs `tsc -b` (type checking) then `vite build` (produces `dist/`)
- **Preview**: `bun run preview` → Serves built output locally
- **Lint**: `bun run lint` → Runs ESLint with strict rules

### TypeScript Configuration
Strict mode enabled in `tsconfig.app.json`:
- `strict: true` - Full type checking
- `noUnusedLocals: true` & `noUnusedParameters: true` - Flags unused declarations
- `noUncheckedSideEffectImports: true` - Warns about imports with side effects
- Target: ES2022, Module: ESNext
- Path aliases: `@/*`, `@services/*`, `@config/*`, `@features/*` for cleaner imports

## Development Conventions

### React Patterns
- Use functional components with hooks (React 19)
- `useState` for local state management
- Wrap App in `<StrictMode>` for development strictness checks
- Components should use `.tsx` extension

### Styling
- **SCSS with Sass compiler** - Project uses SCSS for enhanced CSS capabilities
- Global styles in `src/styles/globals.scss` - Imports variables, resets, and base typography
- Variables and mixins in `src/styles/variables.scss` - Colors, spacing, typography, breakpoints, and responsive mixins
- Component-scoped styles in `src/styles/<ComponentName>.scss` (e.g., `src/styles/components.scss`)
- **Available SCSS variables and mixins:**
  - Colors: `$primary`, `$secondary`, `$text-primary`, `$bg-secondary`, `$border-color`
  - Spacing: `$spacing-sm`, `$spacing-md`, `$spacing-lg`, `$spacing-xl`
  - Fonts: `$font-primary`, `$font-size-base`, `$font-weight-medium`
  - Utilities: `@include flex-center`, `@include flex-between`, `@include responsive('md')`
- Import variables in component files: `@use '../styles/variables' as *;`
- Material-UI components can be styled with emotion or custom SCSS
- **Naming convention:** Use BEM-like naming for CSS classes (e.g., `.card__header`, `.button--primary`)

### Code Quality
- **ESLint** enforces: React Hooks rules, React Refresh rules, TypeScript best practices
- No TypeScript `any` types without justification
- All imports must be used (no dead code)
- JSX transform uses `jsx: react-jsx` (automatic runtime, no React import needed)

## Critical Developer Workflows

### Local Development
```bash
bun install           # Install dependencies
bun dev               # Start dev server with HMR
```

### Git Hooks with Husky
Two git hooks run automatically:

**Pre-commit hook** (`pre-commit`):
- **ESLint** with `--fix` flag auto-corrects style issues in staged `.ts`/`.tsx` files
- **Type checking** via `tsc --noEmit` validates TypeScript without emitting files
- Uses `lint-staged` to check only modified files (faster than full project lint)

**Commit-msg hook** (`commit-msg`):
- **Commitlint** validates commit messages against Conventional Commits standard
- Format: `<type>(<scope>): <subject>` (e.g., `feat(auth): add login form`)
- **Allowed types:**
  - `feat` - New feature
  - `fix` - Bug fix
  - `docs` - Documentation changes
  - `style` - Code style changes (formatting, missing semicolons, etc.)
  - `refactor` - Code refactoring without feature changes
  - `perf` - Performance improvements
  - `test` - Add or update tests
  - `chore` - Dependency updates, build tools, project config
  - `ci` - CI/CD pipeline configuration
- **Examples:**
  ```bash
  git commit -m "feat(auth): add login form component"
  git commit -m "fix(feed): resolve infinite scroll bug"
  git commit -m "docs: update README with setup instructions"
  git commit -m "style: format components with prettier"
  git commit -m "refactor(api): extract API client logic"
  git commit -m "chore: update MUI to latest version"
  ```

**If a commit hook fails**, fix the issues and retry. For message failures, use proper conventional format.

### Verification Before Commit
```bash
bun run lint          # Check TypeScript and ESLint violations
bun run build         # Full type check + bundle test
```

### Adding Dependencies
```bash
bun add <package>     # Add runtime dependency
bun add -D <package>  # Add dev dependency
```

### Common Issues
- **"Cannot find module"**: Run `bun install` and restart dev server
- **HMR not working**: Check that `src/main.tsx` hasn't been modified; clear browser cache
- **Type errors**: Run `bun run build` to see full type check output from `tsc`

## Integration Points

### App Providers Setup
Providers are configured in `src/app/providers/` and combined in `RootProvider`:
- **ThemeProvider** - MUI theme configuration (colors, typography, component overrides)
- **AuthProvider** - Authentication context with `useAuth()` hook for auth state
- **RootProvider** - Combines all providers and wraps the app in `App.tsx`

**Using AuthProvider in components:**
```tsx
import { useAuth } from '@/app/providers/AuthProvider'

export function LoginButton() {
  const { user, login, logout, isAuthenticated } = useAuth()
  
  if (isAuthenticated) {
    return <button onClick={logout}>Logout {user?.name}</button>
  }
  
  return <button onClick={() => login('email', 'password')}>Login</button>
}
```

### React Router Setup
Routes are configured in `src/app/routes/index.tsx` using React Router v7:
- Page components live in `src/features/<feature>/pages/` folder within their respective features
- Add routes in `src/app/routes/index.tsx` using `createBrowserRouter`
- Use `Link` and `useNavigate` for navigation
- 404 fallback uses wildcard `path: '*'`

**Example adding a new route:**
```tsx
// In src/app/routes/index.tsx
import { LoginPage } from '@features/auth/pages/LoginPage'
import { HomePage } from '@features/home/pages/HomePage'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/profile/:id',
    element: <ProfilePage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]
```

### SCSS Setup
SCSS is configured with Sass compiler. Key files:
- `src/styles/variables.scss` - Global variables, mixins, and responsive breakpoints
- `src/styles/globals.scss` - Global styles, CSS reset, base typography
- `src/styles/components.scss` - Example reusable component styles

**Usage example:**
```scss
// In a component SCSS file
@use '@styles/variables' as *;

.header {
  @include flex-between;
  padding: $spacing-lg;
  background-color: $bg-primary;
  border-bottom: 1px solid $border-color;

  @include responsive('md') {
    padding: $spacing-md;
  }
}
```

### Axios HTTP Client
Axios is configured with request/response interceptors for API communication. Key files:
- `src/services/httpClient.ts` - Axios instance with interceptors for auth tokens and error handling
- `src/services/authService.ts` - Example API service for authentication endpoints
- `src/services/storageService.ts` - Token management utilities
- **Base URL:** Uses `VITE_API_BASE_URL` environment variable (defaults to `http://localhost:3000/api`)
- **Request interceptor:** Automatically adds `Authorization: Bearer <token>` header from localStorage
- **Response interceptor:** Handles 401 errors by clearing auth token and redirecting to login

**Example creating a new API service:**
```tsx
// src/features/post/api/postService.ts
import { httpClient } from '@services/httpClient'

interface Post {
  id: string
  title: string
  content: string
}

export const postService = {
  getPosts: async () => httpClient.get<Post[]>('/posts'),
  getPost: async (id: string) => httpClient.get<Post>(`/posts/${id}`),
  createPost: async (data: Omit<Post, 'id'>) => 
    httpClient.post<Post>('/posts', data),
  updatePost: async (id: string, data: Partial<Post>) =>
    httpClient.put<Post>(`/posts/${id}`, data),
  deletePost: async (id: string) =>
    httpClient.delete(`/posts/${id}`),
}
```

### Material-UI Setup
MUI is pre-configured with Emotion. When adding new components:
1. Import from `@mui/material`: `import { Button, Box } from '@mui/material'`
2. Use theme provider if customization needed (currently not configured, can extend)
3. Can combine with SCSS for additional styling flexibility

## Files to Know
- `.github/copilot-instructions.md` - This file (AI guidelines)
- `vite.config.ts` - Vite + React SWC configuration with path aliases
- `eslint.config.js` - Flat ESLint config with TypeScript & React Hooks plugins
- `tsconfig.app.json` - Application TypeScript settings (strict mode)
- `commitlint.config.js` - Commit message validation rules
- `src/app/routes/index.tsx` - React Router configuration
- `src/services/httpClient.ts` - Axios HTTP client with interceptors
- `src/styles/variables.scss` - SCSS variables and mixins
- `src/styles/globals.scss` - Global styles and reset
- `package.json` - Dependencies and build scripts
