import { describe, expect, test } from "vitest";
import { declarationsOf, generate } from "./utils";

const DOT_IMAGE =
	"radial-gradient(var(--bg-dot-color) var(--bg-dot-radius, 1px), transparent var(--bg-dot-radius, 1px))";
const DOT_SIZE =
	"var(--bg-dot-size, calc(var(--spacing, 0.25rem) * 8)) var(--bg-dot-size, calc(var(--spacing, 0.25rem) * 8))";

async function dotRule(className: string, extraCss = "") {
	return declarationsOf(await generate([className], extraCss), className);
}

describe("bg-dot-<color>", () => {
	test("draws the dots with a theme color", async () => {
		expect(await dotRule("bg-dot-neutral-950")).toEqual({
			"--bg-dot-color": "var(--color-neutral-950, oklch(14.5% 0 none))",
			"background-image": DOT_IMAGE,
			"background-size": DOT_SIZE,
		});
	});

	test("supports an opacity modifier", async () => {
		const rule = await dotRule("bg-dot-blue-700/80");
		expect(rule?.["--bg-dot-color"]).toBe(
			"color-mix(in srgb, oklch(48.8% 0.243 264.376) calc(80 * 1%), transparent)",
		);
	});

	test.each([
		["bg-dot-[#ff0000]", "#ff0000"],
		["bg-dot-(--my-color)", "var(--my-color)"],
		["bg-dot-current", "currentcolor"],
	])("supports %s", async (className, color) => {
		const rule = await dotRule(className);
		expect(rule?.["--bg-dot-color"]).toBe(color);
		expect(rule?.["background-image"]).toBe(DOT_IMAGE);
	});

	test("does not generate unknown colors", async () => {
		expect(await dotRule("bg-dot-unknown")).toBeNull();
	});
});

describe("bg-dot-size-<value>", () => {
	test.each([
		["bg-dot-size-4", "calc(var(--spacing, 0.25rem) * 4)"],
		["bg-dot-size-[20px]", "20px"],
	])("%s sets the distance between the dots", async (className, size) => {
		expect(await dotRule(className)).toEqual({ "--bg-dot-size": size });
	});

	test("does not generate invalid sizes", async () => {
		expect(await dotRule("bg-dot-size-foo")).toBeNull();
	});
});

describe("bg-dot-radius-<value>", () => {
	test.each([
		["bg-dot-radius-2", "2px"],
		["bg-dot-radius-1.5", "1.5px"],
		["bg-dot-radius-[0.2rem]", "0.2rem"],
	])("%s sets the radius of the dots", async (className, radius) => {
		expect(await dotRule(className)).toEqual({ "--bg-dot-radius": radius });
	});

	test("does not generate invalid radiuses", async () => {
		expect(await dotRule("bg-dot-radius-foo")).toBeNull();
	});
});
