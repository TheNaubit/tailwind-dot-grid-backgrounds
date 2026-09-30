import postcss from "postcss";
import tailwindcss, { type Config } from "tailwindcss";
import { expect } from "vitest";
import dotGridBackgrounds from ".";

// Compare two CSS strings with all whitespace and semicolons removed.
// Naive, but fast and good enough for the generated utilities.
function stripped(css: string): string {
	return css.replace(/\s/g, "").replace(/;/g, "");
}

expect.extend({
	toMatchCss(received: string, expected: string) {
		const pass = stripped(received) === stripped(expected);

		return {
			pass,
			actual: stripped(received),
			expected: stripped(expected),
			message: () => (pass ? "All good!" : "CSS does not match"),
		};
	},
});

// Generate the utilities CSS for the given class names with the plugin enabled.
export async function generate(
	classNames: string[],
	config: Partial<Config> = {},
): Promise<string> {
	const result = await postcss(
		tailwindcss({
			content: [{ raw: classNames.join(" "), extension: "html" }],
			corePlugins: { preflight: false },
			plugins: [dotGridBackgrounds],
			...config,
		}),
	).process("@tailwind utilities", { from: undefined });

	return result.css;
}
