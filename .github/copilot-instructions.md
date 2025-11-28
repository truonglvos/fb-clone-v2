# Copilot Instructions for fb-clone-v2

## Project Overview
FB Clone v2 is a React + TypeScript application built with Vite and styled using Material-UI (MUI). The project uses SWC for fast refresh during development and emphasizes strict TypeScript checking with comprehensive ESLint rules.

**Tech Stack:**
- React 19.2.0 with TypeScript
- Vite (via rolldown-vite) for bundling and dev server
- Material-UI (@mui/material) + Emotion for styling
- SWC for JSX compilation
- Bun as the package manager

## Architecture & Structure

### Core Entry Point
- `src/main.tsx` - Application bootstrap, renders `<App />` into `#root` DOM element with React StrictMode
- `src/App.tsx` - Root component (currently placeholder Vite template)
- `index.html` - Single HTML file with `<div id="root"></div>` anchor and module script loader

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
- Import variables in component files: `@import '../styles/variables.scss'`
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

### SCSS Setup
SCSS is configured with Sass compiler. Key files:
- `src/styles/variables.scss` - Global variables, mixins, and responsive breakpoints
- `src/styles/globals.scss` - Global styles, CSS reset, base typography
- `src/styles/components.scss` - Example reusable component styles

**Usage example:**
```scss
// In a component SCSS file
@import '../styles/variables.scss';

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

### Material-UI Setup
MUI is pre-configured with Emotion. When adding new components:
1. Import from `@mui/material`: `import { Button, Box } from '@mui/material'`
2. Use theme provider if customization needed (currently not configured, can extend)
3. Can combine with SCSS for additional styling flexibility

### Future Facebook Features
As FB Clone evolves, consider:
- State management library (Redux, Zustand, Context API) for feed/user data
- Routing library (React Router) for page navigation
- API client setup for backend communication
- Authentication flow integration

## Files to Know
- `.github/copilot-instructions.md` - This file (AI guidelines)
- `vite.config.ts` - Vite + React SWC configuration
- `eslint.config.js` - Flat ESLint config with TypeScript & React Hooks plugins
- `tsconfig.app.json` - Application TypeScript settings (strict mode)
- `commitlint.config.js` - Commit message validation rules
- `src/styles/variables.scss` - SCSS variables and mixins
- `src/styles/globals.scss` - Global styles and reset
- `package.json` - Dependencies and build scripts
