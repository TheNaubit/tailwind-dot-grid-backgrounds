<h1 align="center">
  tailwind-dot-grid-backgrounds
  <br>
</h1>

<p align="center">
  <img src="https://raw.githubusercontent.com/TheNaubit/tailwind-dot-grid-backgrounds/main/images/header.png" alt="tailwind-dot-grid-backgrounds: dot and grid backgrounds for Tailwind CSS" />
</p>

<h4 align="center">A tiny Tailwind CSS plugin to add customizable dot and grid backgrounds fast, in pure CSS</h4>

<p align="center">
  <a href="https://github.com/TheNaubit/tailwind-dot-grid-backgrounds/actions/workflows/ci.yml">
    <img src="https://github.com/TheNaubit/tailwind-dot-grid-backgrounds/actions/workflows/ci.yml/badge.svg?branch=main" alt="CI status">
  </a>
  <a href="https://www.npmjs.com/package/@nauverse/tailwind-dot-grid-backgrounds">
    <img src="https://img.shields.io/npm/v/@nauverse/tailwind-dot-grid-backgrounds.svg?style=flat" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/@nauverse/tailwind-dot-grid-backgrounds">
    <img src="https://img.shields.io/npm/l/@nauverse/tailwind-dot-grid-backgrounds.svg?style=flat" alt="license">
  </a>
</p>

<p align="center">
  <a href="#tldr">tl;dr</a> •
  <a href="#guide-and-examples">Guide and examples</a> •
  <a href="#migrating-from-v1">Migrating from v1</a> •
  <a href="#help">Help</a> •
  <a href="#contribute">Contribute</a>
</p>

| Plugin version | Tailwind CSS | How it works | Branch |
| -------------- | ------------ | ------------ | ------ |
| `2.x` (latest) | `^4.0`       | Pure CSS (`@utility`), no JavaScript | [`main`](https://github.com/TheNaubit/tailwind-dot-grid-backgrounds/tree/main) |
| `1.x`          | `^3.4`       | JavaScript plugin | [`v1`](https://github.com/TheNaubit/tailwind-dot-grid-backgrounds/tree/v1) (maintenance, [docs](https://github.com/TheNaubit/tailwind-dot-grid-backgrounds/tree/v1#readme)) |

Still on Tailwind CSS v3? Install the `v1` line: `npm install --save-dev @nauverse/tailwind-dot-grid-backgrounds@1`.

## tl;dr
This is a Tailwind CSS v4 plugin that allows you to add background grids and background dots in an easy and customizable way.

### 1. Install the dependency
```bash
npm install --save-dev @nauverse/tailwind-dot-grid-backgrounds
```

### 2. Import it in your CSS, after Tailwind CSS
```css
@import "tailwindcss";
@import "@nauverse/tailwind-dot-grid-backgrounds";
```

### 3. You are done!
Try it by adding this HTML to your UI:
```html
<div class="h-screen w-screen bg-yellow-300 bg-grid-neutral-950 bg-grid-size-8 bg-grid-stroke-2"></div>
```

## What
You could achieve the same by just using some Tailwind CSS code but... I found myself adding this kind of background in my projects very often. So I created a small Tailwind CSS plugin to allow me adding these backgrounds while keeping all the customization offered by Tailwind CSS.

### Features
- Fully integrated with Tailwind CSS: theme colors, opacity modifiers, the spacing scale, arbitrary values and every variant (`hover:`, `md:`, `dark:`...)
- Pure CSS: just an `@import`, no JavaScript and no configuration
- Performant: the backgrounds are CSS gradients, and only the classes you use are generated
- Zero dependencies
- Tested against the latest and the oldest supported Tailwind CSS v4 releases

## Guide and examples

A pattern is drawn by its color class. Its size and line (or dot) width are optional classes that you can combine with it, so each part can change on its own with variants (for example `md:bg-grid-size-12`).

### Background grid

| Class | What it sets | Default |
| ----- | ------------ | ------- |
| `bg-grid-<color>` | Draws the grid with this line color | - |
| `bg-grid-size-<number>` | The size of the squares, in spacing units (like `w-<number>`) | `8` (`2rem`) |
| `bg-grid-stroke-<number>` | The width of the lines, in pixels | `1` (`1px`) |

- `<color>` accepts any theme color (`neutral-950`, your own `--color-*` variables), `current`, an opacity modifier (`bg-grid-blue-700/80`, `bg-grid-blue-700/[35%]`), arbitrary values (`bg-grid-[#ff0000]`) and CSS variables (`bg-grid-(--my-color)`).
- `bg-grid-size-*` also accepts `--spacing-*` theme keys (`bg-grid-size-cell` with `--spacing-cell: 18px`) and arbitrary lengths (`bg-grid-size-[18px]`).
- `bg-grid-stroke-*` also accepts decimals (`bg-grid-stroke-0.5`) and arbitrary lengths (`bg-grid-stroke-[0.1rem]`).

#### Examples:
`bg-grid-neutral-950 bg-grid-size-8 bg-grid-stroke-2`
<p align="center">
  <img src="https://raw.githubusercontent.com/TheNaubit/tailwind-dot-grid-backgrounds/f3e4cac4117dee081ed982739d3c38ff12544869/images/bg-grid-8-s-2-neutral-950.png" alt="bg-grid-neutral-950 bg-grid-size-8 bg-grid-stroke-2" />
</p>

`bg-grid-blue-700/80 bg-grid-size-48 bg-grid-stroke-8`
<p align="center">
  <img src="https://raw.githubusercontent.com/TheNaubit/tailwind-dot-grid-backgrounds/f3e4cac4117dee081ed982739d3c38ff12544869/images/bg-grid-48-s-8-blue-700_80.png" alt="bg-grid-blue-700/80 bg-grid-size-48 bg-grid-stroke-8" />
</p>

### Background dots

| Class | What it sets | Default |
| ----- | ------------ | ------- |
| `bg-dot-<color>` | Draws the dots with this color | - |
| `bg-dot-size-<number>` | The distance between the dots (in both axes), in spacing units | `8` (`2rem`) |
| `bg-dot-radius-<number>` | The radius of the dots, in pixels | `1` (`1px`) |

They accept the same values as their grid counterparts.

#### Examples:
`bg-dot-neutral-950 bg-dot-size-8 bg-dot-radius-2`
<p align="center">
  <img src="https://raw.githubusercontent.com/TheNaubit/tailwind-dot-grid-backgrounds/f3e4cac4117dee081ed982739d3c38ff12544869/images/bg-dot-8-s-2-neutral-950.png" alt="bg-dot-neutral-950 bg-dot-size-8 bg-dot-radius-2" />
</p>

`bg-dot-blue-700/80 bg-dot-size-16 bg-dot-radius-8`
<p align="center">
  <img src="https://raw.githubusercontent.com/TheNaubit/tailwind-dot-grid-backgrounds/f3e4cac4117dee081ed982739d3c38ff12544869/images/bg-dot-16-s-8-blue-700_80.png" alt="bg-dot-blue-700/80 bg-dot-size-16 bg-dot-radius-8" />
</p>

### Customizing
Everything comes from your Tailwind CSS theme:

```css
@import "tailwindcss";
@import "@nauverse/tailwind-dot-grid-backgrounds";

@theme {
  --color-brand: #123456; /* bg-grid-brand, bg-dot-brand/50 */
  --spacing-cell: 18px; /* bg-grid-size-cell */
}
```

The pattern settings are stored in the `--bg-grid-color`, `--bg-grid-size`, `--bg-grid-stroke`, `--bg-dot-color`, `--bg-dot-size` and `--bg-dot-radius` CSS variables. They are registered with `@property` as non-inherited, so a pattern never leaks into the patterns of its children.

## Migrating from v1

Version 2 is for Tailwind CSS v4. It is a pure CSS plugin, and each part of a pattern is now its own class.

1. Upgrade to Tailwind CSS v4 ([upgrade guide](https://tailwindcss.com/docs/upgrade-guide)).
2. Install the latest version: `npm install --save-dev @nauverse/tailwind-dot-grid-backgrounds@latest`.
3. Remove the plugin from your `tailwind.config.*` `plugins` (or the `@plugin` directive) and add `@import "@nauverse/tailwind-dot-grid-backgrounds";` after `@import "tailwindcss";`.
4. Replace the classes. `<SIZE>`, `<STROKE_WIDTH>`/`<DOT_SIZE>` and `<COLOR>` keep the same values:

| v1 | v2 |
| -- | -- |
| `bg-grid-<SIZE>-s-<STROKE_WIDTH>-<COLOR>` | `bg-grid-<COLOR> bg-grid-size-<SIZE> bg-grid-stroke-<STROKE_WIDTH>` |
| `bg-dot-<SIZE>-s-<DOT_SIZE>-<COLOR>` | `bg-dot-<COLOR> bg-dot-size-<SIZE> bg-dot-radius-<DOT_SIZE>` |
| `bg-grid-8-s-2-neutral-950` | `bg-grid-neutral-950 bg-grid-size-8 bg-grid-stroke-2` |
| `bg-dot-16-s-8-blue-700/80` | `bg-dot-blue-700/80 bg-dot-size-16 bg-dot-radius-8` |
| `bg-grid-px-s-1-red-500` | `bg-grid-red-500 bg-grid-size-[1px]` |

Sizes now follow your spacing scale (`--spacing`) instead of being converted to pixels, and the stroke width and dot radius default to `1px`, so `bg-grid-<COLOR> bg-grid-size-<SIZE>` is enough for 1px lines.

## Help

Thank you for using *tailwind-dot-grid-backgrounds*!

If you need any help using this plugin, feel free to [create a GitHub issue](https://github.com/TheNaubit/tailwind-dot-grid-backgrounds/issues/new/choose), and ask your questions. I'll try to answer as quickly as possible.

## Contribute

Contributions of any kind (pull requests, bug reports, feature requests, documentation, design) are more than welcome! Read the [contributing guide](./CONTRIBUTING.md) to get started.

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
