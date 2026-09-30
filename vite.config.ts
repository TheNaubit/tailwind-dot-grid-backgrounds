import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

// https://vite.dev/guide/build.html#library-mode
export default defineConfig({
	build: {
		lib: {
			entry: resolve(import.meta.dirname, "src/index.ts"),
			name: "tailwindDotGridBackgrounds",
			fileName: "tailwind-dot-grid-backgrounds",
			formats: ["es", "umd"],
		},
		rolldownOptions: {
			// Tailwind CSS is a peer dependency: never bundle it (including subpaths
			// such as "tailwindcss/plugin"), so the consumer's own copy is used.
			external: [/^tailwindcss(\/.*)?$/],
			output: {
				exports: "default",
				globals: { "tailwindcss/plugin.js": "tailwindcss.plugin" },
			},
		},
		sourcemap: true,
		emptyOutDir: true,
	},
	test: {
		include: ["src/**/*.test.ts"],
		coverage: {
			include: ["src/**/*.ts"],
			exclude: ["src/**/*.test.ts", "src/test-utils.ts", "src/vitest.d.ts"],
			thresholds: { lines: 90, functions: 90, branches: 90, statements: 90 },
		},
	},
});
