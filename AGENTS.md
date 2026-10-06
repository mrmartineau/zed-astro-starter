# Agent notes

An Astro 7 starter: static output, ZUI for styling, deployed to Cloudflare Workers. See `README.md` for the full setup.

## Development

- Package manager is pnpm (pinned in `package.json`). Do not use npm; `devEngines` blocks it.
- `pnpm dev` runs the dev server through portless at `https://zed-astro-starter.localhost`.
- To run the server in the background, use `pnpm astro dev --background`. Manage it with `pnpm astro dev stop`, `pnpm astro dev status` and `pnpm astro dev logs`.
- `pnpm build` must pass before you commit. `vp check` formats, lints and type checks; the pre-commit hook runs `vp check --fix` on staged files.

## Conventions

- Site name, description, contact email and nav links live in `src/site.ts`. Read them from there; do not hard-code them.
- Every page wraps itself in `src/layouts/BaseLayout.astro`. Pass `title` (the layout appends the site name) and `description`.
- Use ZUI's Astro components (`@mrmartineau/zui/astro`), design tokens and utility classes. Do not write raw `zui-` class markup or hard-coded colours and spacing. Theme overrides go in `src/styles/global.css`.
- Vite+ supplies Vite: `vite` resolves to `@voidzero-dev/vite-plus-core` through the pnpm catalog in `pnpm-workspace.yaml`. When you bump `vite-plus` there, bump the `vite-plus-core` version on the `vite:` line to the same number, or the dev server crashes on a missing native binding.

## Deployment

- `.github/workflows/deploy.yml` deploys to production on push to `main`.
- `.github/workflows/preview.yml` uploads a preview version for each PR at `pr-<number>-zed-astro-starter.<subdomain>.workers.dev`.
- Do not run `wrangler deploy` unless the user asks.

## Astro docs

Full documentation: https://docs.astro.build

- [Routing](https://docs.astro.build/en/guides/routing/)
- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Cloudflare adapter](https://docs.astro.build/en/guides/integrations-guide/cloudflare/)
