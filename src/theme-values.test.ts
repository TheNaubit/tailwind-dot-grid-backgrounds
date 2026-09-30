import { describe, expect, test } from "vitest";
import { flattenColors, strokeWidths, toPx, toPxEntries } from "./theme-values";

describe("toPx", () => {
	test.each([
		["2px", 2],
		["0.5rem", 8],
		[" 1rem ", 16],
		[".25rem", 4],
		["0px", 0],
	])("converts %s to %d", (value, expected) => {
		expect(toPx(value)).toBe(expected);
	});

	test.each([
		["50%"],
		["auto"],
		["100vw"],
		["1em"],
		["calc(1px + 1rem)"],
		[undefined],
		[4],
	])("returns null for %s", (value) => {
		expect(toPx(value)).toBeNull();
	});
});

describe("toPxEntries", () => {
	test("keeps only px and rem values", () => {
		expect(
			toPxEntries({ 1: "0.25rem", px: "1px", full: "100%", auto: "auto" }),
		).toEqual([
			["1", 4],
			["px", 1],
		]);
	});

	test("handles a missing theme section", () => {
		expect(toPxEntries(undefined)).toEqual([]);
	});
});

describe("strokeWidths", () => {
	test("adds 1 and drops DEFAULT", () => {
		expect(strokeWidths({ DEFAULT: "1px", 0: "0px", 2: "2px" })).toEqual([
			["1", 1],
			["0", 0],
			["2", 2],
		]);
	});

	test("does not duplicate 1 when the theme already defines it", () => {
		expect(strokeWidths({ 1: "1px", 3: "3px" })).toEqual([
			["1", 1],
			["3", 3],
		]);
	});

	test("handles a missing theme section", () => {
		expect(strokeWidths(undefined)).toEqual([["1", 1]]);
	});
});

describe("flattenColors", () => {
	test("flattens nested palettes and maps DEFAULT to the parent name", () => {
		expect(
			flattenColors({
				white: "#fff",
				inherit: "inherit",
				brand: {
					DEFAULT: "#123",
					soft: "#abc",
					dark: { DEFAULT: "#000", 900: "#111" },
				},
			}),
		).toEqual({
			white: "#fff",
			brand: "#123",
			"brand-soft": "#abc",
			"brand-dark": "#000",
			"brand-dark-900": "#111",
		});
	});

	test("keeps color functions", () => {
		const color = () => "rgb(0 0 0)";
		expect(flattenColors({ fn: color })).toEqual({ fn: color });
	});

	test("handles a missing palette", () => {
		expect(flattenColors(undefined)).toEqual({});
	});
});
