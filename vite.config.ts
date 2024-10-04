/// <reference types="vitest" />
import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

import { peerDependencies } from "./package.json";

// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, "src/index.ts"),
			name: "tailwind-dot-grid-backgrounds",
			fileName: "tailwind-dot-grid-backgrounds",
		},
		rollupOptions: {
			// Exclude peer dependencies from the bundle to reduce bundle size
			external: ["react/jsx-runtime", ...Object.keys(peerDependencies)],
		},
		sourcemap: true,
		emptyOutDir: true,
	},
	plugins: [dts({ rollupTypes: true })],
	test: {
		// ...
	},
});
