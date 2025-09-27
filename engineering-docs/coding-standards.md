# Coding Standards

Consistent code is easier to review and safer to refactor. These standards align with our ESLint/Prettier setup and TypeScript configuration.

## Language and tooling

- TypeScript only. No plain JS in src/.
- Follow tsconfig.base.json targeting ES2015+ and module esnext.
- Run format/lint tasks locally before committing.
  - pnpm run fix-lint
  - pnpm run fix-stylelint (for styles where applicable)

## Naming

- Files: kebab-case for modules; PascalCase for React components.
- Types/interfaces: PascalCase (e.g., PlayerStats).
- Functions/variables: camelCase.
- Constants: SCREAMING_SNAKE_CASE only for module-level constants.

## Imports

- Use path aliases (@components-*, @datastore, @static, @helper, @quest) across libraries.
- Relative imports only within a library; don’t deep-import into another library’s internal files.
- Re-export public APIs from each library via src/index.ts.

## TypeScript

- Strict typing for public APIs and props. Avoid any except at boundaries (e.g., third-party).
- Prefer readonly and const. Avoid mutation when practical.
- Narrow types with user-defined type guards where helpful.

## React/Next.js

- Components are function components. Use hooks; avoid class components.
- Keep components pure; side effects belong in hooks.
- Co-locate component-specific hooks next to components within the library.
- Use React.memo selectively for expensive components with stable props.
- Prefer CSS Modules or scoped styles; share tokens via layout library when applicable.

## Error handling

- Fail fast with helpful messages. Wrap datastore operations with try/catch where data loss is possible.
- Propagate errors up to pages to show user-friendly messages.

## Comments and docs

- JSDoc for exported functions/types.
- Inline comments sparingly to describe why (not what).

## Commit hygiene

- Small, focused commits. Follow conventional summary style: imperative, <= 72 chars.
- Update engineering docs when introducing or changing patterns.
