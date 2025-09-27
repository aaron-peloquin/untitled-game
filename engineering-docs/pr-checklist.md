# Pull Request Checklist

Before requesting review:

- Scope is focused; description explains the why and the what.
- Screenshots or GIFs for UI changes.
- Updated or added tests (unit/E2E as appropriate).
- Lint and formatting are clean: pnpm run fix-lint, pnpm run fix-stylelint.
- Affected tests pass: pnpm test.
- No direct data-access in helper functions (quest library is the exception).
- Public APIs re-exported only via src/index.ts in each library.
- Updated engineering docs if introducing new patterns.
