

# UntitledGame

This project runs on [Nx](https://nx.dev).

## Multi-Package Structure
Applications ([/apps](./apps)) are packages that link, bundle and compile functionality implemented in library ([/libs](./libs)) packages for being deployed.

## Getting Started
1. `pnpm install -g nx` globally install the `nx` cli on your dev machine
2. `pnpm i` to install packages local packages
3. `pnpm run start` to start the local dev server on [localhost:4200](http://localhost:4200)
4. _optional_ `pnpm run startSSL` to start an SSL proxy on [localhost:3000](https://localhost:3000), only required if you want to use WebXR functionality
