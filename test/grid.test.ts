import { describe, expect, test } from "vitest";
import { declarationsOf, generate } from "./utils";

const GRID_IMAGE =
	"linear-gradient(to right, var(--bg-grid-color) var(--bg-grid-stroke, 1px), transparent var(--bg-grid-stroke, 1px)), linear-gradient(to bottom, var(--bg-grid-color) var(--bg-grid-stroke, 1px), transparent var(--bg-grid-stroke, 1px))";
const GRID_SIZE =
	"var(--bg-grid-size, calc(var(--spacing, 0.25rem) * 8)) var(--bg-grid-size, calc(var(--spacing, 0.25rem) * 8))";

async function gridRule(className: string, extraCss = "") {
	return declarationsOf(await generate([className], extraCss), className);
}

describe("bg-grid-<color>", () => {
	test("draws the grid with a theme color", async () => {
		expect(await gridRule("bg-grid-neutral-950")).toEqual({
			"--bg-grid-color": "var(--color-neutral-950, oklch(14.5% 0 none))",
			"background-image": GRID_IMAGE,
			"background-size": GRID_SIZE,
		});
	});

	test("supports an opacity modifier", async () => {
		const rule = await gridRule("bg-grid-blue-700/80");
		expect(rule?.["--bg-grid-color"]).toBe(
			"color-mix(in srgb, oklch(48.8% 0.243 264.376) calc(80 * 1%), transparent)",
		);
	});

	test("supports an arbitrary opacity modifier", async () => {
		const rule = await gridRule("bg-grid-blue-700/[35%]");
		expect(rule?.["--bg-grid-color"]).toBe(
			"color-mix(in srgb, oklch(48.8% 0.243 264.376) 35%, transparent)",
		);
	});

	test.each([
		["bg-grid-[#ff0000]", "#ff0000"],
		["bg-grid-[rgb(0_0_0/0.5)]", "rgb(0 0 0/0.5)"],
		["bg-grid-[var(--my-color)]", "var(--my-color)"],
		["bg-grid-(--my-color)", "var(--my-color)"],
		["bg-grid-current", "currentcolor"],
	])("supports %s", async (className, color) => {
		const rule = await gridRule(className);
		expect(rule?.["--bg-grid-color"]).toBe(color);
		expect(rule?.["background-image"]).toBe(GRID_IMAGE);
	});

	test("supports custom theme colors", async () => {
		const rule = await gridRule(
			"bg-grid-brand",
			"@theme { --color-brand: #123456; }",
		);
		expect(rule?.["--bg-grid-color"]).toBe("var(--color-brand)");
	});

	test("does not generate unknown colors", async () => {
		expect(await gridRule("bg-grid-unknown")).toBeNull();
	});
});

describe("bg-grid-size-<value>", () => {
	test.each([
		["bg-grid-size-8", "calc(var(--spacing, 0.25rem) * 8)"],
		["bg-grid-size-2.5", "calc(var(--spacing, 0.25rem) * 2.5)"],
		["bg-grid-size-[18px]", "18px"],
		["bg-grid-size-[3rem]", "3rem"],
	])("%s sets the size of the squares", async (className, size) => {
		expect(await gridRule(className)).toEqual({ "--bg-grid-size": size });
	});

	test("supports spacing theme keys", async () => {
		expect(
			await gridRule("bg-grid-size-cell", "@theme { --spacing-cell: 18px; }"),
		).toEqual({
			"--bg-grid-size": "var(--spacing-cell)",
		});
	});

	test("does not generate invalid sizes", async () => {
		expect(await gridRule("bg-grid-size-foo")).toBeNull();
		expect(await gridRule("bg-grid-size-[red]")).toBeNull();
	});
});

describe("bg-grid-stroke-<value>", () => {
	test.each([
		["bg-grid-stroke-2", "2px"],
		["bg-grid-stroke-0.5", "0.5px"],
		["bg-grid-stroke-[0.1rem]", "0.1rem"],
	])("%s sets the width of the lines", async (className, stroke) => {
		expect(await gridRule(className)).toEqual({ "--bg-grid-stroke": stroke });
	});

	test("does not generate invalid strokes", async () => {
		expect(await gridRule("bg-grid-stroke-foo")).toBeNull();
	});
});
