import { compile } from "@tailwindcss/node";

const ROOT = new URL("..", import.meta.url).pathname;

// Build the CSS for the given class names, importing the plugin the same way users do.
export async function generate(
	classNames: string[],
	extraCss = "",
): Promise<string> {
	const css = [
		'@import "tailwindcss/theme.css" theme(reference);',
		'@import "@nauverse/tailwind-dot-grid-backgrounds";',
		extraCss,
		"@tailwind utilities;",
	].join("\n");

	const compiler = await compile(css, { base: ROOT, onDependency: () => {} });
	return compiler.build(classNames);
}

function escapeClassName(className: string): string {
	return className.replace(/[^a-zA-Z0-9_-]/g, (char) => `\\${char}`);
}

// Return the top-level declarations of the rule for a class name, as { property: value }.
// Nested blocks (such as @supports fallbacks) are ignored. Returns null when the class was not generated.
export function declarationsOf(
	css: string,
	className: string,
	selectorSuffix = "",
): Record<string, string> | null {
	const selector = `.${escapeClassName(className)}${selectorSuffix} {`;
	const start = css.indexOf(selector);
	if (start === -1) return null;

	const lines = css.slice(start + selector.length).split("\n");
	const entries: Array<[string, string]> = [];
	let depth = 0;

	for (const line of lines) {
		const trimmed = line.trim();
		if (trimmed.endsWith("{")) depth += 1;
		else if (trimmed === "}") {
			if (depth === 0) break;
			depth -= 1;
		} else if (depth === 0 && trimmed.includes(":")) {
			const index = trimmed.indexOf(":");
			entries.push([
				trimmed.slice(0, index).trim(),
				trimmed
					.slice(index + 1)
					.replace(/;$/, "")
					.trim(),
			]);
		}
	}

	// Later declarations override earlier ones (e.g. the opacity modifier), like in the browser.
	return Object.fromEntries(entries);
}
