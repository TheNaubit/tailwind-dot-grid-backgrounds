# tailwind-dot-grid-backgrounds v1 - agent guide

This is the `v1` branch of `@nauverse/tailwind-dot-grid-backgrounds`: the `1.x` line, a JavaScript plugin for **Tailwind CSS v3**.
It is in maintenance: bug fixes and dependency updates only. New features go to `main` (`2.x`, pure CSS for Tailwind CSS v4).

## Commands

Use **npm** only. Node.js `^22.14.0 || >=24.10.0` (`.nvmrc` has the recommended version).

```bash
npm install
npm run lint           # Biome
npm run typecheck      # tsc --noEmit
npm run test:coverage  # Vitest with coverage thresholds (90%)
npm run build          # vite build (ESM + UMD) and tsc declarations -> dist/
```

Run lint, typecheck, tests and build before you say a task is done. CI runs the same steps on Node.js 22, 24 and 26.

## Layout

```
src/
  index.ts              public export (default: the plugin)
  plugin.ts             the Tailwind CSS plugin: registers bg-grid-* and bg-dot-* with matchUtilities
  theme-values.ts       pure helpers: px/rem conversion, color palette flattening, stroke widths
  *.test.ts             Vitest tests (plugin.test.ts runs real Tailwind CSS v3 through PostCSS)
  test-utils.ts         generate() helper and the toMatchCss matcher
vite.config.ts          library build and test config
tsconfig.build.json     declaration emit
```

## Hard rules

1. **Keep the class API.** `bg-grid-<size>-s-<stroke>-<color>` and `bg-dot-<size>-s-<dot>-<color>` must keep generating the same CSS. Do not change the output order either (one `matchUtilities` call per stroke and size pair).
2. **Never bundle Tailwind CSS.** Every `tailwindcss` import (including subpaths) is external, so the user's own copy is used.
3. **Import `tailwindcss/plugin.js` and `tailwindcss/types/config.js` with the extension.** Tailwind CSS v3 has no `exports` map: Node.js ESM and `moduleResolution: nodenext` need the file name. Relative imports use `.js` too.
4. **Do not use Tailwind CSS internals** (`tailwindcss/lib/...`). `theme-values.ts` has its own palette flattening.
5. **Immutability.** Build new objects and arrays. No mutation.
6. **No emojis** in code, comments or docs. No `console.log`.
7. **Files stay small** (under 400 lines typical, 800 max).

## Testing

- TDD. Write the failing test first. Coverage stays at 90% or more (it is 100% now).
- After a build change, check the packed tarball in a real Tailwind CSS v3 project: `require()`, ESM `import`, and TypeScript with `moduleResolution` `bundler` and `nodenext`.

## Releases

- Use Conventional Commits: `fix:`, `docs:`, `test:`, `chore:`, `ci:`. Never use a breaking change (`!` or `BREAKING CHANGE`) here: this branch only releases `1.x`.
- Do not add "Co-Authored-By" or similar lines to commit messages.
- `semantic-release` runs in `.github/workflows/release.yml`. This branch is a maintenance branch (`1.x`) published under the npm dist-tag `v1`, so it never moves `latest`. Do not bump `version` by hand.
- Publishing uses npm trusted publishing (OIDC) for `TheNaubit/tailwind-dot-grid-backgrounds`, `release.yml` and the `npm` environment. There is no `NPM_TOKEN` or personal access token. Do not add one.
- Every action is pinned to a commit SHA with the version in a comment. Check workflows with `actionlint` and `zizmor`.
- Dependabot and the issue forms are configured on `main` (GitHub only reads them from the default branch).
