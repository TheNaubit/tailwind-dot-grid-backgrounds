<h1 align="center">
  tailwind-dot-grid-backgrounds
  <br>
</h1>

<p align="center">
  <img src="https://raw.githubusercontent.com/TheNaubit/tailwind-dot-grid-backgrounds/v1/images/header.png" alt="tailwind-dot-grid-backgrounds: dot and grid backgrounds for Tailwind CSS" />
</p>

<h4 align="center">A tiny Tailwind CSS plugin to add dot and grid customizable backgrounds fast</h4>

<p align="center">
  <a href="https://github.com/TheNaubit/tailwind-dot-grid-backgrounds/actions/workflows/ci.yml">
    <img src="https://github.com/TheNaubit/tailwind-dot-grid-backgrounds/actions/workflows/ci.yml/badge.svg?branch=v1" alt="CI status">
  </a>
  <a href="https://www.npmjs.com/package/@nauverse/tailwind-dot-grid-backgrounds">
    <img src="https://img.shields.io/npm/v/@nauverse/tailwind-dot-grid-backgrounds/release-v1.svg?style=flat&label=npm%40v1" alt="npm version">
  </a>
  <a href="https://bundlephobia.com/result?p=@nauverse/tailwind-dot-grid-backgrounds">
    <img src="https://img.shields.io/bundlephobia/minzip/%40nauverse/tailwind-dot-grid-backgrounds" alt="minzipped size">
  </a>
</p>

<p align="center">
  <a href="#what">What?</a> •
  <a href="#guide-and-examples">Guide and examples</a> •
  <a href="#help">Help</a> •
  <a href="#contribute">Contribute</a>
</p>

> [!IMPORTANT]
> **This is the `v1` line of the plugin, for Tailwind CSS v3.**
>
> Using **Tailwind CSS v4**? Use the latest version instead (`v2` and later). It is a pure CSS plugin with no JavaScript, loaded with `@import "@nauverse/tailwind-dot-grid-backgrounds";`. See the [main branch README](https://github.com/TheNaubit/tailwind-dot-grid-backgrounds#readme) for its guide and the migration steps.

| Plugin version | Tailwind CSS | How it works | Branch |
| -------------- | ------------ | ------------ | ------ |
| `2.x` (latest) | `^4.0`       | Pure CSS (`@utility`), no JavaScript | [`main`](https://github.com/TheNaubit/tailwind-dot-grid-backgrounds/tree/main) |
| `1.x`          | `^3.4`       | JavaScript plugin (Node.js `>=22`) | [`v1`](https://github.com/TheNaubit/tailwind-dot-grid-backgrounds/tree/v1) (maintenance) |

## tl;dr
This is a Tailwind CSS v3 plugin that allows you to add background grids and background dots in an easy and customizable way.

### 1. Install the dependency
```bash
npm install --save-dev @nauverse/tailwind-dot-grid-backgrounds@1
```

### 2. Add the plugin to your Tailwind CSS config
`tailwind.config.ts` / `tailwind.config.mjs`:
```ts
import dotGridBackgrounds from "@nauverse/tailwind-dot-grid-backgrounds";
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  plugins: [
    dotGridBackgrounds,
    // ... the rest of your Tailwind CSS plugins
  ],
} satisfies Config;
```

Or, with a CommonJS `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  plugins: [
    require("@nauverse/tailwind-dot-grid-backgrounds"),
    // ... the rest of your Tailwind CSS plugins
  ],
};
```

### 3. You are done!
Try it by adding this HTML to your UI:
```html
<div class="h-screen w-screen bg-yellow-300 bg-grid-8-s-2-neutral-950"></div>
```

## What
You could achieve the same by just using some Tailwind CSS code but... I found myself adding this kind of background in my projects very often. So I created a small Tailwind CSS plugin to allow me adding these backgrounds while keeping all the customization offered by Tailwind CSS.

### Features
- Fully integrated with Tailwind CSS: it uses your theme colors, widths and border widths
- Performant: the backgrounds are rendered with CSS gradients, no images
- Zero dependencies
- Tested
- Easy to use, straight to the point

## Guide and examples

### Background Grid
Pattern: `bg-grid-<SIZE>-s-<STROKE_WIDTH>-<COLOR>`

- `<SIZE>` is the size of the grid squares. It accepts the keys of the `width` theme whose value is in `px` or `rem` (such as `8`, `0.5`, `px`...). You will see the available options in IntelliSense.
- `<STROKE_WIDTH>` is the width of the strokes of the grid squares. It accepts the keys of the `borderWidth` theme whose value is in `px` or `rem` (such as `0`, `2`, `4`, `8`), plus `1` (since Tailwind CSS does not have a `border-1` class).
- `<COLOR>` is the color of the strokes. It accepts any color of your theme, an opacity modifier (`/50`) and arbitrary values (`[#ff0000]`).

#### Examples:
`bg-grid-8-s-2-neutral-950`
<p align="center">
  <img src="https://raw.githubusercontent.com/TheNaubit/tailwind-dot-grid-backgrounds/f3e4cac4117dee081ed982739d3c38ff12544869/images/bg-grid-8-s-2-neutral-950.png" alt="tailwind-dot-grid-backgrounds bg-grid-8-s-2-neutral-950" />
</p>

`bg-grid-48-s-8-blue-700/80`
<p align="center">
  <img src="https://raw.githubusercontent.com/TheNaubit/tailwind-dot-grid-backgrounds/f3e4cac4117dee081ed982739d3c38ff12544869/images/bg-grid-48-s-8-blue-700_80.png" alt="tailwind-dot-grid-backgrounds bg-grid-48-s-8-blue-700/80" />
</p>

### Background Dots
Pattern: `bg-dot-<SIZE>-s-<DOT_SIZE>-<COLOR>`

- `<SIZE>` is the size of the space (in both axes) between the dots. It accepts the keys of the `width` theme whose value is in `px` or `rem`. You will see the available options in IntelliSense.
- `<DOT_SIZE>` is the radius of the dots. It accepts the keys of the `borderWidth` theme whose value is in `px` or `rem`, plus `1`.
- `<COLOR>` is the color of the dots. It accepts any color of your theme, an opacity modifier (`/50`) and arbitrary values (`[#ff0000]`).

#### Examples:
`bg-dot-8-s-2-neutral-950`
<p align="center">
  <img src="https://raw.githubusercontent.com/TheNaubit/tailwind-dot-grid-backgrounds/f3e4cac4117dee081ed982739d3c38ff12544869/images/bg-dot-8-s-2-neutral-950.png" alt="tailwind-dot-grid-backgrounds bg-dot-8-s-2-neutral-950" />
</p>

`bg-dot-16-s-8-blue-700/80`
<p align="center">
  <img src="https://raw.githubusercontent.com/TheNaubit/tailwind-dot-grid-backgrounds/f3e4cac4117dee081ed982739d3c38ff12544869/images/bg-dot-16-s-8-blue-700_80.png" alt="tailwind-dot-grid-backgrounds bg-dot-16-s-8-blue-700/80" />
</p>

### Customizing
The plugin reads your theme, so extending it adds new classes:

```ts
export default {
  theme: {
    extend: {
      colors: { brand: { DEFAULT: "#123456", soft: "#abcdef" } }, // bg-grid-8-s-1-brand, bg-dot-8-s-1-brand-soft
      width: { cell: "18px" }, // bg-grid-cell-s-1-red-500
      borderWidth: { thick: "3px" }, // bg-grid-8-s-thick-red-500
    },
  },
} satisfies Config;
```

## Help

Thank you for using *tailwind-dot-grid-backgrounds*!

If you need any help using this plugin, feel free to [create a GitHub issue](https://github.com/TheNaubit/tailwind-dot-grid-backgrounds/issues/new/choose), and ask your questions. I'll try to answer as quickly as possible.

## Contribute

Contributions of any kind (pull requests, bug reports, feature requests, documentation, design) are more than welcome! Read the [contributing guide](./CONTRIBUTING.md) to get started. Fixes for the Tailwind CSS v3 line go to the `v1` branch.

## Contributors

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://albertadler.com"><img src="https://avatars.githubusercontent.com/u/22015497?v=4?s=100" width="100px;" alt="Al &#124; Naucode"/><br /><sub><b>Al &#124; Naucode</b></sub></a><br /><a href="https://github.com/TheNaubit/tailwind-dot-grid-backgrounds/issues?q=author%3ATheNaubit" title="Bug reports">🐛</a> <a href="https://github.com/TheNaubit/tailwind-dot-grid-backgrounds/commits?author=TheNaubit" title="Code">💻</a> <a href="https://github.com/TheNaubit/tailwind-dot-grid-backgrounds/commits?author=TheNaubit" title="Documentation">📖</a> <a href="#maintenance-TheNaubit" title="Maintenance">🚧</a> <a href="#infra-TheNaubit" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/TheNaubit/tailwind-dot-grid-backgrounds/commits?author=TheNaubit" title="Tests">⚠️</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
