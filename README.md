<h1 align="center">
  🎨 tailwind-dot-grid-backgrounds
  <br>
</h1>

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
  <a href="#why">Why?</a> •
  <a href="#how">How?</a> •
  <a href="#typescript">TypeScript</a> •
  <a href="#guide-and-examples">Guide and examples</a> •
  <a href="#help">Help</a> •
  <a href="#contribute">Contribute</a>
</p>

## tl;dr
If you just want to try and you don't want to read this guide right now (although you should in the future if you decide to use the library), you can start quickly by:

### 1. Installing the dependency:
```bash
npm install --save @nauverse/tailwind-dot-grid-backgrounds
```

### 2. Checking this example of use:
~~~ts
import { makeURL } from "@nauverse/tailwind-dot-grid-backgrounds";

makeURL("https://api.example.com/", "/:id/:param2/:id///", {
  params: {
    id: 1,
    param2: "678"
  }
});
// https://api.example.com/1/678/1
~~~
> I added too many slashes intentionally to showcase they can be removed automatically (you also have an option to disable that)

If you want to see more examples, jump to [here](#full-examples).

### 3. You are done! 🪄
Feel free to test and explore and if later on you need more guidance, read the whole guide and ask in the GitHub repo.
