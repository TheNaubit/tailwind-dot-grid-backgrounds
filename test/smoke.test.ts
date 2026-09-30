// Version-independent checks: the exact generated values vary slightly between Tailwind CSS v4 releases,
// so CI also runs this file against the oldest supported release.
import { expect, test } from "vitest";
import { declarationsOf, generate } from "./utils";

test.each([
	[
		"bg-grid-red-500",
		["--bg-grid-color", "background-image", "background-size"],
	],
	[
		"bg-grid-red-500/50",
		["--bg-grid-color", "background-image", "background-size"],
	],
	[
		"bg-grid-[#ff0000]",
		["--bg-grid-color", "background-image", "background-size"],
	],
	[
		"bg-grid-current",
		["--bg-grid-color", "background-image", "background-size"],
	],
	["bg-grid-size-8", ["--bg-grid-size"]],
	["bg-grid-size-[18px]", ["--bg-grid-size"]],
	["bg-grid-stroke-2", ["--bg-grid-stroke"]],
	["bg-dot-red-500", ["--bg-dot-color", "background-image", "background-size"]],
	[
		"bg-dot-red-500/50",
		["--bg-dot-color", "background-image", "background-size"],
	],
	["bg-dot-current", ["--bg-dot-color", "background-image", "background-size"]],
	["bg-dot-size-4", ["--bg-dot-size"]],
	["bg-dot-radius-2", ["--bg-dot-radius"]],
])("%s is generated", async (className, properties) => {
	const rule = declarationsOf(await generate([className]), className);
	expect(Object.keys(rule ?? {}).sort()).toEqual([...properties].sort());
});

test("pixel values are valid lengths", async () => {
	const css = await generate(["bg-grid-stroke-2", "bg-dot-radius-3"]);
	expect(declarationsOf(css, "bg-grid-stroke-2")).toEqual({
		"--bg-grid-stroke": "2px",
	});
	expect(declarationsOf(css, "bg-dot-radius-3")).toEqual({
		"--bg-dot-radius": "3px",
	});
});
