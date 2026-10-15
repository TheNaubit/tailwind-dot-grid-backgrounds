import { describe, expect, test } from "vitest";
import { declarationsOf, generate } from "./utils";

const STRIPE_SIZE = "var(--bg-stripe-size, calc(var(--spacing, 0.25rem) * 8))";
const STRIPE_IMAGE = `repeating-linear-gradient(var(--bg-stripe-rotation, 0deg), var(--bg-stripe-color) 0 var(--bg-stripe-stroke, 1px), transparent var(--bg-stripe-stroke, 1px) ${STRIPE_SIZE})`;

async function stripeRule(className: string, extraCss = "") {
	return declarationsOf(await generate([className], extraCss), className);
}

describe("bg-stripe-<color>", () => {
	test("draws the stripes with a theme color", async () => {
		expect(await stripeRule("bg-stripe-neutral-950")).toEqual({
			"--bg-stripe-color": "var(--color-neutral-950, oklch(14.5% 0 none))",
			"background-image": STRIPE_IMAGE,
		});
	});

	test("supports an opacity modifier", async () => {
		const rule = await stripeRule("bg-stripe-blue-700/80");
		expect(rule?.["--bg-stripe-color"]).toBe(
			"color-mix(in srgb, oklch(48.8% 0.243 264.376) calc(80 * 1%), transparent)",
		);
	});

	test("supports a decimal opacity modifier", async () => {
		const rule = await stripeRule("bg-stripe-blue-700/33.5");
		expect(rule?.["--bg-stripe-color"]).toBe(
			"color-mix(in srgb, oklch(48.8% 0.243 264.376) calc(33.5 * 1%), transparent)",
		);
	});

	test("supports an arbitrary opacity modifier", async () => {
		const rule = await stripeRule("bg-stripe-blue-700/[35%]");
		expect(rule?.["--bg-stripe-color"]).toBe(
			"color-mix(in srgb, oklch(48.8% 0.243 264.376) 35%, transparent)",
		);
	});

	test.each([
		["bg-stripe-[#ff0000]", "#ff0000"],
		["bg-stripe-[rgb(0_0_0/0.5)]", "rgb(0 0 0/0.5)"],
		["bg-stripe-[var(--my-color)]", "var(--my-color)"],
		["bg-stripe-(--my-color)", "var(--my-color)"],
		["bg-stripe-current", "currentcolor"],
	])("supports %s", async (className, color) => {
		const rule = await stripeRule(className);
		expect(rule?.["--bg-stripe-color"]).toBe(color);
		// expect(rule?.["background-image"]).toBe(GRID_IMAGE);
	});

	test("supports custom theme colors", async () => {
		const rule = await stripeRule(
			"bg-stripe-brand",
			"@theme { --color-brand: #123456; }",
		);
		expect(rule?.["--bg-stripe-color"]).toBe("var(--color-brand)");
	});

	test("does not generate unknown colors", async () => {
		expect(await stripeRule("bg-stripe-unknown")).toBeNull();
	});
});

describe("bg-stripe-size-<value>", () => {
	test.each([
		["bg-stripe-size-8", "calc(var(--spacing, 0.25rem) * 8)"],
		["bg-stripe-size-2.5", "calc(var(--spacing, 0.25rem) * 2.5)"],
		["bg-stripe-size-[18px]", "18px"],
		["bg-stripe-size-[3rem]", "3rem"],
		["bg-stripe-size-(--cell)", "var(--cell)"],
		["bg-stripe-size-[var(--cell)]", "var(--cell)"],
	])("%s sets the size of the squares", async (className, size) => {
		expect(await stripeRule(className)).toEqual({ "--bg-stripe-size": size });
	});

	test("does not generate invalid sizes", async () => {
		expect(await stripeRule("bg-stripe-size-foo")).toBeNull();
	});
});

describe("bg-stripe-stroke-<value>", () => {
	test.each([
		["bg-stripe-stroke-2", "2px"],
		["bg-stripe-stroke-0.5", "0.5px"],
		["bg-stripe-stroke-[0.1rem]", "0.1rem"],
		["bg-stripe-stroke-(--line)", "var(--line)"],
	])("%s sets the width of the lines", async (className, stroke) => {
		expect(await stripeRule(className)).toEqual({
			"--bg-stripe-stroke": stroke,
		});
	});

	test("does not generate invalid strokes", async () => {
		expect(await stripeRule("bg-stripe-stroke-foo")).toBeNull();
	});
});

describe("bg-stripe-rotation-<value>", () => {
	test.each([
		["bg-stripe-rotation-0", "0deg"],
		["bg-stripe-rotation-0.5", "0.5deg"],
		["bg-stripe-rotation-[3deg]", "3deg"],
		["bg-stripe-rotation-(angle:--line)", "var(--line)"],
		["-bg-stripe-rotation-40", "calc(40 * -1deg)"],
		["-bg-stripe-rotation-0.5", "calc(0.5 * -1deg)"],
		["-bg-stripe-rotation-[3deg]", "calc(3deg * -1)"],
		["-bg-stripe-rotation-(angle:--line)", "calc(var(--line) * -1)"],
	])("%s sets the rotation of the lines", async (className, rotation) => {
		expect(await stripeRule(className)).toEqual({
			"--bg-stripe-rotation": rotation,
		});
	});

	test.each(["bg-stripe-rotation-foo", "bg-stripe-rotation-[0.1rem]"])(
		"does not generate invalid strokes",
		async (className) => {
			expect(await stripeRule(className)).toBeNull();
		},
	);
});
