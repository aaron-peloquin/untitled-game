# Copilot Instructions for UntitledGame

## Project Architecture
- **Nx Monorepo**: Uses Nx for managing multiple apps and libraries. Apps are in `/apps`, libraries in `/libs`.
- **Apps**: UI and entry points (e.g., `nextjs-ui`).
- **Libs**: Feature, UI, data-access, and utility libraries. Key patterns:
  - `components-game`, `components-game-vr`: React feature libraries (Templates, Organisms, Molecules, Atoms).
  - `components-layout`: UI library for layout and icons.
  - `datastore`: Data-access, uses Dexie/IndexedDB for persistence.
  - `static`: Exports static data.
  - `helper`, `quest`: Utility libraries (general and quest-specific helpers).

## Developer Workflows
- **Install dependencies**: `pnpm i`
- **Start dev server**: `pnpm run start` (default: http://localhost:4200)
- **Start with SSL/WebXR**: `pnpm run startSSL` (https://localhost:3000)
- **Global Nx CLI**: Install with `pnpm install -g nx`

## Testing
- Uses Jest for unit tests. Test configs in `jest.config.js` and `jest.preset.js`.
- E2E tests for UI in `apps/nextjs-ui-e2e` (Cypress).

## Conventions & Patterns
- **React Component Structure**: Follows Atomic Design (Atoms, Molecules, Organisms, Templates).
- **Data Flow**: Feature/UI components get data from data-access libraries (`datastore`, `static`).
- **Utility Libraries**: Helpers in `helper` (general) and `quest` (quest-specific).
- **Type Definitions**: Shared types in `/types` (e.g., `band.d.ts`, `quest.d.ts`).
- **No direct data-access in helpers** (except quest helpers).

## Integration Points
- **Dexie/IndexedDB**: Used for client-side persistence in `datastore`.
- **Next.js**: Main UI app in `apps/nextjs-ui`.
- **Cypress**: E2E tests in `apps/nextjs-ui-e2e`.

## Examples
- To add a new React feature: Place in `libs/components-game/src/lib/{atoms|molecules|organisms|templates}`.
- To add a new data-access function: Place in `libs/datastore/src/lib`.
- To add a new static dataset: Place in `libs/static/src/lib`.

## References
- See each library's README for more details on its role and conventions.
- Main project README: `/README.md`

---
For questions or unclear conventions, check the relevant README or ask for clarification.
