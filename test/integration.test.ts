import { describe, expect, test } from "vitest";
import { declarationsOf, generate } from "./utils";

describe("integration with Tailwind CSS", () => {
	test("emits no utility when none is used", async () => {
		const css = await generate(["flex"]);
		expect(css).not.toMatch(/\.bg-(grid|dot)/);
	});

	test("registers the pattern variables as non-inherited properties", async () => {
		const css = await generate(["bg-grid-red-500"]);

		for (const name of [
			"bg-grid-color",
			"bg-grid-size",
			"bg-grid-stroke",
			"bg-dot-color",
			"bg-dot-size",
			"bg-dot-radius",
		]) {
			expect(css).toMatch(
				new RegExp(
					`@property --${name} \\{\\s*syntax: "\\*";\\s*inherits: false;\\s*\\}`,
				),
			);
		}
	});

	test("works with variants", async () => {
		const css = await generate(["md:bg-grid-size-4", "dark:bg-dot-white/10"]);

		expect(css).toContain("@media (width >= 48rem)");
		expect(declarationsOf(css, "md:bg-grid-size-4")).toEqual({
			"--bg-grid-size": "calc(var(--spacing, 0.25rem) * 4)",
		});
		expect(css).toContain(".dark\\:bg-dot-white\\/10");
	});

	// Themes that are not imported as "reference" are emitted as variables, so utilities reference them without a fallback.
	test("sizes follow a custom spacing scale", async () => {
		const css = await generate(
			["bg-grid-size-4"],
			"@theme { --spacing: 0.3rem; }",
		);
		expect(declarationsOf(css, "bg-grid-size-4")).toEqual({
			"--bg-grid-size": "calc(var(--spacing) * 4)",
		});
	});

	test("composes color, size and stroke utilities on the same element", async () => {
		const classNames = [
			"bg-grid-neutral-950",
			"bg-grid-size-12",
			"bg-grid-stroke-2",
		];
		const css = await generate(classNames);

		for (const className of classNames) {
			expect(declarationsOf(css, className)).not.toBeNull();
		}
	});

	test("does not clash with the core bg-* utilities", async () => {
		const css = await generate(["bg-red-500", "bg-grid-red-500"]);
		expect(declarationsOf(css, "bg-red-500")).toEqual({
			"background-color": "var(--color-red-500, oklch(63.7% 0.237 25.331))",
		});
	});
});
