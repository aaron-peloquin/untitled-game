# Types and Contracts

Shared ambient type definitions live in the /types folder as .d.ts files. They describe core domain entities such as band, quest, location, mercenary, and stats.

## Guidelines

- Keep shared types narrow and stable. Prefer local types when scope is limited to a single library.
- Add JSDoc to describe fields and non-obvious constraints.
- Evolve contracts in backwards-compatible ways when possible; document breaking changes in PRs.

## Consumption

- Import types from the package’s public index where available; ambient .d.ts are automatically included via tsconfig base config.
