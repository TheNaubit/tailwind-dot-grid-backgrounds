# tailwind-dot-grid-backgrounds - agent guide

This is a publishable Tailwind CSS plugin: `@nauverse/tailwind-dot-grid-backgrounds`.
It adds dot and grid background utilities.

- `main` is `2.x`, for Tailwind CSS v4. It is **pure CSS**: `index.css` is the whole package. There is no JavaScript and no build step.
- `v1` is `1.x`, for Tailwind CSS v3. It is a JavaScript plugin. It is in maintenance: fixes only. It has its own `AGENTS.md`.

## Commands

Use **npm** only. Node.js `^22.14.0 || >=24.10.0` (`.nvmrc` has the recommended version).

```bash
npm install
npm run lint        # Biome (TypeScript, JSON and CSS with Tailwind directives)
npm run typecheck   # tsc --noEmit (tests and config)
npm run test:run    # Vitest
```

Run lint, typecheck and tests before you say a task is done. CI runs the same steps on Node.js 22, 24 and 26.

## Layout

```
index.css                  the plugin: @property registrations and @utility definitions
test/
  utils.ts                 compiles CSS with @tailwindcss/node, the way users import the plugin
  grid.test.ts             bg-grid-* utilities (exact output, latest Tailwind CSS)
  dot.test.ts              bg-dot-* utilities (exact output, latest Tailwind CSS)
  integration.test.ts      variants, theme customization, @property, core utilities
  smoke.test.ts            version-independent checks, also run on Tailwind CSS 4.0.0 in CI
images/header.html         source of images/header.png
scripts/render-header.mjs  renders the header with the plugin and headless Chrome
```

## Hard rules

1. **One wildcard per utility.** `@utility` supports a single `*`. Each part of a pattern (color, size, stroke or radius) is its own utility. They communicate through the `--bg-grid-*` and `--bg-dot-*` variables.
2. **The variables do not inherit.** Every pattern variable has an `@property` with `inherits: false`. A new variable needs one too, or nested patterns inherit their parent's settings.
3. **Defaults live in `var()` fallbacks**, not in the `@property` initial value: `var(--bg-grid-stroke, 1px)` and `var(--bg-grid-size, --spacing(8))`.
4. **Support Tailwind CSS `^4.0.0`.** Do not use `@utility` features newer than 4.0.0. Check new syntax against 4.0.0 (CI does it with `test/smoke.test.ts`).
5. **Biome does not format `index.css`.** Its formatter inserts spaces that break Tailwind functions: `--value(number)px` must stay `--value(number)px`, never `--value(number) px`. Keep each declaration on one line so the generated CSS stays compact.
6. **Biome cannot parse `--modifier(number)%`.** Write `calc(--modifier(number) * 1%)` instead.
7. **No emojis** in code, comments or docs. No `console.log`.
8. **Files stay small** (under 400 lines typical, 800 max).

## Testing

- TDD. Write the failing test first.
- `test/utils.ts` imports the plugin as `@import "@nauverse/tailwind-dot-grid-backgrounds"`, so the package `exports` (`style` condition) are tested too.
- Exact values (such as `oklch(...)` fallbacks) change between Tailwind CSS releases. Put version-independent checks in `smoke.test.ts`.
- A green test does not prove a pattern looks right. Render it in a browser (the header script is a quick way) when you change a gradient.

## Releases

- Use Conventional Commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`, `perf:`, `ci:`.
- Do not add "Co-Authored-By" or similar lines to commit messages.
- `semantic-release` runs in `.github/workflows/release.yml` on pushes to `main` and `v1`. It sets the version, updates `CHANGELOG.md`, tags, creates the GitHub release and publishes. Do not bump `version` by hand.
- `v1` is a maintenance branch (`1.x`) published under the npm dist-tag `v1`. See `.releaserc.json`.
- Publishing uses npm trusted publishing (OIDC) for `TheNaubit/tailwind-dot-grid-backgrounds`, `release.yml` and the `npm` environment. There is no `NPM_TOKEN` or personal access token. Do not add one. If you rename the workflow file or the environment, update the trusted publisher on npm.
- Before you publish, check the tarball with `npm pack --dry-run`. It must only contain `index.css`, `README.md`, `LICENSE` and `package.json`.
- Every action in `.github/workflows` is pinned to a commit SHA with the version in a comment. Keep it that way. Check workflows with `actionlint` and `zizmor`.

## Gotchas

- Colors accept `[*]` so that `bg-grid-(--my-color)` works. As in Tailwind CSS itself, arbitrary values are not validated.
- `bg-grid-current` and `bg-dot-current` are static utilities, so they take no opacity modifier.
- The six `@property` rules are emitted whenever the plugin is imported. Tailwind CSS does not hoist `@property` from inside `@utility`.
- `@semantic-release/changelog` 7 and `@semantic-release/git` 11 need Node.js 24.15 or later. They are pinned to 6.0.3 and 10.0.1 (same features) so that contributors on older Node.js 24 releases can install.
