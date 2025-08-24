# OpenAPI TypeScript Vue Monorepo - Agent Guidelines

## Build Commands

- **Build:** `pnpm run build` (root) or `pnpm run build` (package)
- **Lint:** `pnpm run lint` (root) or `biome check .` (package)
- **Format:** `pnpm run format` (root) or `biome format . --write` (package)
- **Test:** `pnpm run test` (root) or `pnpm run test:js` (package for single test)
- **Single test file:** `cd packages/openapi-vue-query && vitest run [filename]`
- **Type check:** `pnpm run test:ts` (package level)

## Code Style (Biome Config)

- **Formatting:** 2 spaces, 120 line width, no semicolons
- **Imports:** Organize imports disabled, use explicit type imports with `type` keyword
- **Types:** Prefer interfaces for objects, strict TypeScript, no `any` allowed in suspicious contexts
- **Naming:** Use PascalCase for types/interfaces, camelCase for variables/functions
- **Error Handling:** Throw errors in query functions, use proper error types from openapi-fetch
- **Comments:** Minimal comments, prefer descriptive names
- **Files:** Use `.ts` for types/utils, `.vue` for components
- **Exports:** Use named exports, default export for main client creation function

## Project Structure

- Monorepo using pnpm workspaces with Turbo
- Main package: `packages/openapi-vue-query/` (Vue Query integration)
- Test files in `test/` directory with `.test.tsx` or `.test.ts` extensions
- Use Vitest with happy-dom environment for testing
