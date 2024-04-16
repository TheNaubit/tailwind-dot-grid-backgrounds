<h1 align="center">
  🎨 tailwind-dot-grid-backgrounds
  <br>
</h1>

<p align="center">
  <img src="https://github.com/TheNaubit/tailwind-dot-grid-backgrounds/blob/92a8b6c3f527533ded1f497f035c8515c85cb995/images/header.png" alt="tailwind-dot-grid-backgrounds" />
</p>

<h4 align="center">A tiny Tailwind plugin to add dot and grid customizable backgrounds fast</h4>

<p align="center">
  <a href="https://github.com/TheNaubit/tailwind-dot-grid-backgrounds/actions">
    <img src="https://github.com/TheNaubit/tailwind-dot-grid-backgrounds/actions/workflows/release.yml/badge.svg"
         alt="Build Status">
  </a>
  <a href="https://www.npmjs.com/package/@nauverse/tailwind-dot-grid-backgrounds">
    <img src="https://img.shields.io/npm/v/@nauverse/tailwind-dot-grid-backgrounds.svg?style=flat" alt="npm version">
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

## tl;dr
This is a Tailwind plugin that allows you to add background grids and background dots in an easy and customizable way:

### 1. Installing the dependency:
```bash
npm install --save @nauverse/tailwind-dot-grid-backgrounds
```

### 2. Add the plugin to the `tailwind.config.js` file:
~~~js
// ... the rest of your tailwind.config.js file

const config: Config = {
  // ... the rest of your config
  plugins: [
    require('@nauverse/tailwind-dot-grid-backgrounds')
    // ... the rest of your Tailwind plugins
  ],
};
~~~

### 3. You are done! 🪄
Try it by adding this HTML to your UI:
```html
<div class="h-screen w-screen bg-yellow-300 bg-grid-8-s-2-neutral-950"></div>
```

## What
You could achieve the same by just using some Tailwind code but... I found myself adding this kind of background in my projects very often. So I created a small Tailwind plugin to allow me adding these background but at the same allowing all the customization offered by Tailwind.

### Features
- 🎨 Fully integrated with Tailwind CSS
- 🏃‍♂️ Performant (it uses CSS to render the backgrounds)
- 0️⃣ Zero dependencies
- 🧪 Has tests!
- 🎉 Easy to use, straight to the point

## Guide and examples

### Background Grid
Pattern: `bg-grid-<SIZE>-s-<STROKE_WIDTH>-<COLOR>`

- `<SIZE>` is the size of the grid squares. It allows the numeric values of the `width` prop in Tailwind. You will see the available options in Intellisense.
- `<STROKE_WIDTH>` is the width of the strokes of the grid squares. It allows the numeric values of the `borderWidth` prop in Tailwind and also the value `1` (since Tailwind does not have a `border-1` class).
- `<COLOR>` is the color of the strokes. It allows any valid classname color in Tailwind.

#### Examples:
`bg-grid-8-s-2-neutral-950`

`bg-grid-48-s-8-blue-700/80`

### Background Dots
Pattern: `bg-dot-<SIZE>-s-<DOT_SIZE>-<COLOR>`

- `<SIZE>` is the size of the space (in both axis) between the dots. It allows the numeric values of the `width` prop in Tailwind. You will see the available options in Intellisense.
- `<DOT_SIZE>` is the size of the dots. It allows the numeric values of the `borderWidth` prop in Tailwind and also the value `1` (since Tailwind does not have a `border-1` class).
- `<COLOR>` is the color of the dots. It allows any valid classname color in Tailwind.

#### Examples:
`bg-dot-8-s-2-neutral-950`

`bg-dot-48-s-8-blue-700/80`

## Help

Thank you for using *tailwind-dot-grid-backgrounds*!

If you need any help using this plugin, feel free to [create a GitHub issue](https://github.com/TheNaubit/tailwind-dot-grid-backgrounds/issues/new/choose), and ask your questions. I'll try to answer as quickly as possible.

## Contribute

Contributions of any kind (pull requests, bug reports, feature requests, documentation, design) are more than welcome! If you like this project and want to help, but feel like you are stuck, feel free to contact the maintainers.

### Building from source

Building the project should be quick and easy. If it isn't, it's the maintainer's fault. Please report any problems with building in a GitHub issue.

You need to have a reasonably recent version of node.js to build *tailwind-dot-grid-backgrounds*. 
Tested on node version 18.0.0 and npm version 8.6.0.

First, clone the git repository:

```
git clone git@github.com:TheNaubit/tailwind-dot-grid-backgrounds.git
```

Then switch to the newly created tailwind-dot-grid-backgrounds directory and install the dependencies:

```
cd tailwind-dot-grid-backgrounds
npm install
```

You can then run the unit tests to verify that everything works correctly:

```
npm run test:run
```

And finally, build the library:

```
npm run build
```

The output will appear in the `dist` directory.

Happy hacking!

## Contributors ✨

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
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

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!