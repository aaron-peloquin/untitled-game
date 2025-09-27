# Library Guidelines

How to create and evolve libraries that fit our architecture.

## Types of libraries

- Feature/UI: components-game, components-game-vr, components-layout
- Data-access: datastore, static
- Utility: helper, quest

## Creating a new library

- Use Nx generators to scaffold a new lib with jest, lint, and tsconfig pre-wired.
- Name reflects responsibility (e.g., components-inventory, helper-date, data-user-prefs).
- Expose a minimal public API via src/index.ts.
- Add a README.md in the lib describing its role and how to consume it (see existing libs for examples).

## Folder structure

- src/index.ts (re-exports)
- src/lib/** (implementation)
- For components libs, use atoms/molecules/organisms/templates subfolders.

## Dependencies and boundaries

- Utilities must not import datastore (quest library is the exception).
- Data-access must not import React/Next.js.
- Avoid circular dependencies across libs.

## Testing and linting

- Include unit tests for public functions/components.
- Keep eslint clean; prefer autofixable rules; run pnpm run fix-lint.

## Versioning and breaking changes

- Document breaking API changes in PR descriptions.
- Update call sites within the monorepo as part of the same PR.

## Performance considerations

- Keep bundle size small: avoid large transitive deps in UI libs.
- For three/XR, lazy-load heavy scenes or split code when it benefits performance.
