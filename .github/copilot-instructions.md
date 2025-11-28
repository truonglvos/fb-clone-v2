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
- Material-UI components with Emotion CSS-in-JS
- Global styles in `src/index.css`
- Component-scoped styles in corresponding `.css` files (e.g., `App.css`)
- Import MUI components from `@mui/material` (e.g., `import Button from '@mui/material/Button'`)

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

### Material-UI Setup
MUI is pre-configured with Emotion. When adding new components:
1. Import from `@mui/material`: `import { Button, Box } from '@mui/material'`
2. Use theme provider if customization needed (currently not configured, can extend)
3. Emotion styled components via `@emotion/styled` for custom styling

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
- `package.json` - Dependencies and build scripts
