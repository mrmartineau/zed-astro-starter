# zed-astro-starter

An opinionated [Astro](https://astro.build) starter, ready to deploy to Cloudflare Workers.

## What's included

- **[Astro 7](https://astro.build)** — static output by default
- **[ZUI](https://github.com/mrmartineau/zui)** — CSS-first UI library (`@mrmartineau/zui`) with Astro component wrappers, design tokens, and a built-in reset/base layer
- **[Vite+](https://viteplus.dev)** — unified toolchain (`vp`) for formatting, linting, type checking, and testing
- **[Cloudflare Workers](https://developers.cloudflare.com/workers/)** — via the `@astrojs/cloudflare` adapter, with static assets served from a Worker
- **GitHub Actions** — deploy on push to `main`, a preview deploy for every PR, plus an [Aikido safe-chain](https://github.com/AikidoSec/safe-chain) supply-chain scan on every branch

## Project structure

```text
/
├── .github/workflows/
│   ├── deploy.yml          # Build + deploy to Cloudflare on push to main
│   ├── preview.yml         # Preview deploy + URL comment on every PR
│   └── security.yml        # Supply-chain scan on every branch
├── public/                 # Static assets, copied verbatim
├── src/
│   ├── components/
│   │   ├── Masthead.astro  # Site header with navigation
│   │   └── Footer.astro    # Copyright + current year
│   ├── layouts/
│   │   └── BaseLayout.astro # Wraps every page; ZUI CSS, head slot, masthead, footer
│   └── pages/
│       └── index.astro     # Routes map to files in this directory
├── astro.config.mjs        # Astro + Cloudflare adapter config
└── wrangler.jsonc          # Cloudflare Worker config
```

## Layout

Every page wraps itself in `BaseLayout`, which pulls in the ZUI stylesheet and renders the masthead and footer:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro'
---

<BaseLayout title="Page title" description="Optional meta description">
  <link slot="head" rel="preload" href="…" />  <!-- optional extra head content -->
  <p>Page content</p>
</BaseLayout>
```

Styling comes from ZUI: use its components (`@mrmartineau/zui/astro`), design tokens (`--space-*`, `--color-*`, `--step-*`, …), and utility classes rather than hard-coded values. ZUI owns the CSS reset and base layer.

## Commands

All commands run from the project root:

| Command        | Action                                            |
| :------------- | :------------------------------------------------ |
| `vp install`   | Install dependencies                              |
| `pnpm dev`     | Start local dev server at `localhost:4321`        |
| `pnpm build`   | Build the production site to `./dist/`            |
| `pnpm preview` | Preview the build locally                         |
| `pnpm deploy`  | Build and deploy to Cloudflare (needs local auth) |
| `vp check`     | Format, lint, and type check                      |
| `vp test`      | Run tests                                         |

## Deployment

Pushing to `main` (or running the _Deploy to Cloudflare_ workflow manually) builds the site and deploys it to Cloudflare Workers with [`cloudflare/wrangler-action`](https://github.com/cloudflare/wrangler-action). Static files are served as Worker assets from `dist/client`.

When you run the workflow by hand, two checkboxes relax the Aikido safe-chain install:

- **skip_package_age** — allow packages newer than safe-chain's minimum age.
- **skip_safe_chain** — install without safe-chain at all. Use this only when its service is down.

### PR previews

Every pull request uploads a preview version of the Worker (`wrangler versions upload`) without touching production. Each PR gets a stable URL, `https://pr-<number>-<worker-name>.<subdomain>.workers.dev`, posted as a comment on the PR and updated on each push. PRs from forks are skipped because they can't read the repository secrets.

### One-time setup

Both workflows use the same two repository secrets.

1. **Create an API token.** In the Cloudflare dashboard, go to _My Profile → API Tokens → Create Token_ and use the **Edit Cloudflare Workers** template. Copy the token; it's only shown once.
2. **Find your account ID.** It's on the _Workers & Pages_ overview page in the dashboard, or run `pnpm wrangler whoami`.
3. **Add both as repository secrets**, either in GitHub (_Settings → Secrets and variables → Actions → New repository secret_) or with the GitHub CLI:

   ```sh
   gh secret set CLOUDFLARE_API_TOKEN
   gh secret set CLOUDFLARE_ACCOUNT_ID
   ```

   Each command prompts for the value, so it stays out of your shell history.

4. **Deploy to production once** by pushing to `main`. Preview uploads fail until the Worker exists.
5. Keep `workers.dev` enabled for the Worker (it's on by default). Preview URLs need it.
6. If the project was ever connected to Cloudflare's built-in Git integration, disable it so the two deploy paths don't conflict.

## More Astro packages

Other Astro tools I have made:

- [astro-git-dates](https://github.com/mrmartineau/astro-git-dates): set content collection dates from git history
- [astro-d1-search](https://github.com/mrmartineau/astro-d1-search): site search for Astro backed by Cloudflare D1
- [ZUI](https://github.com/mrmartineau/zui): a CSS-first UI library with Astro (and React, Solid, Svelte, Vue) components
