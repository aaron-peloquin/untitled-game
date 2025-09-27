# Nx Cheat Sheet

Common Nx and package scripts used in this repo.

## Scripts

- Start dev server: pnpm run start
- Start with SSL proxy for WebXR: pnpm run startSSL
- Build: pnpm run build
- Analyze bundle: pnpm run build-analyze
- Lint fix all projects: pnpm run fix-lint
- Stylelint fix all projects: pnpm run fix-stylelint
- Prune unused exports in nextjs-ui: pnpm run prune

## Nx basics

- nx serve <project>
- nx build <project>
- nx test <project>
- nx affected:test
- nx run-many --target=<target> --all

See workspace.json for project names.
