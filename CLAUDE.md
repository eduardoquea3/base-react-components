# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

The project uses Bun as the package manager with Rsbuild and Biome:

- `bun run dev` - Start development server with auto-reload
- `bun run build` - Build for production
- `bun run preview` - Preview production build locally
- `bun run check` - Lint and format code with Biome (includes auto-fix)
- `bun run format` - Format code with Biome
- `bun run test` - Run tests in watch mode
- `bun run test:run` - Run tests once
- `bun run test:ui` - Run tests with UI interface
- `bun run test:coverage` - Run tests with coverage report

**Always run `bun run check` and `bun run test:run` before completing tasks to ensure code quality.**

## Project Architecture

### Technology Stack
- **Build Tool**: Rsbuild with React plugin
- **Router**: TanStack Router with file-based routing and auto code-splitting
- **State Management**: Zustand for global state
- **Data Tables**: TanStack Table with custom hooks
- **UI Components**: Radix UI primitives with custom wrapper components
- **Styling**: Tailwind CSS with class sorting via Biome
- **Animation**: Framer Motion
- **Testing**: Vitest with React Testing Library and jsdom
- **Code Quality**: Biome for linting and formatting
- **TypeScript**: Strict mode enabled with custom path aliases

### Code Organization

The project follows TanStack Router conventions with a clear separation:

- **`src/routes/`** - Route definitions and route-specific components following TanStack Router file-based structure
- **`src/shared/`** - Reusable code across the application:
  - `components/` - Generic UI components (data tables, etc.)
  - `hooks/` - Custom React hooks (`useDataTable`, `useSidebar`)
  - `types/` - TypeScript type definitions
- **`src/app/`** - Feature-specific code with local components and stores
- **`src/components/ui/`** - Base UI components (buttons, dialogs) wrapping Radix primitives
- **`src/lib/`** - Utility functions and shared logic

### State Management Patterns

1. **Global State**: Zustand stores in feature folders (e.g., `modal.store.ts`, `useSidebar`)
2. **Data Tables**: Custom `useDataTable` hook with TanStack Table integration
3. **Modal Management**: Centralized modal store supporting multiple concurrent modals with props

### TypeScript Configuration

- Path aliases configured for clean imports:
  - `@/*` → `./src/*`
  - `@shadcn/*` → `./src/components/ui/*`
  - `@utils/*` → `./src/lib/*`
  - `@lib/*` → `./src/shared/lib/*`
  - `@components/*` → `./src/shared/components/*`
  - `@hooks/*` → `./src/shared/hooks/*`
  - `@types/*` → `./src/shared/types/*`

### Component Conventions

- Use kebab-case for file naming
- Functional components with TypeScript interfaces for props
- Extract reusable logic into custom hooks in `src/shared/hooks/`
- UI components should wrap Radix primitives for consistent API
- Data tables use the `useDataTable` hook with column definitions
- **Reusable Component Rule**: When creating a new component, evaluate if it can be used across multiple parts of the application. If reusable, place it in `src/shared/components/ui/` instead of feature-specific folders
- **Component Base Check**: Before creating new form components, check existing components in `src/shared/components/ui/` for similar functionality and use them as a base for consistency
- **TypeScript Alias Management**: When creating new folders in `src/app/`, check if they need TypeScript path aliases in `tsconfig.json`. Add aliases using the folder name (e.g., `"@controls/*": ["./src/app/controls/*"]`)

### File Size and Code Organization Rules

- **200 Line Limit**: Files should not exceed 200 lines
- **Logic Extraction**: If a file exceeds 200 lines, analyze the logic:
  - If substantial logic can be extracted, create custom hooks in the appropriate `hooks/` folder:
    - For shared logic: `src/shared/hooks/`
    - For feature-specific logic: `src/app/[feature]/hooks/`
  - Extract complex business logic, state management, and data processing into separate hook files
  - Keep the main component focused on rendering and event handling

### Testing Conventions

- **Test Files**: Place test files alongside components with `.test.tsx` extension
- **Test Structure**: Use `describe` blocks to group related tests, `it` for individual test cases
- **Component Testing**: Use React Testing Library's `render` and user interaction utilities
- **Test Coverage**: Aim for meaningful tests that cover user interactions and edge cases
- **Test Organization**: 
  - For module-specific components: Create tests alongside the component
  - For shared components in `src/shared/components/`: Create tests in `src/test/common/` folder