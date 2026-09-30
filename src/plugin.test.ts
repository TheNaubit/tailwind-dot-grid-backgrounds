import { describe, expect, test } from "vitest";
import { generate } from "./test-utils";

describe("bg-grid", () => {
	test("generates grid backgrounds from theme widths, border widths and colors", async () => {
		const css = await generate([
			"bg-grid-8-s-2-neutral-950",
			"bg-grid-1-s-8-yellow-50",
			"bg-grid-96-s-1-slate-950/40",
		]);

		expect(css).toMatchCss(`
			.bg-grid-96-s-1-slate-950\\/40 {
				background-image: linear-gradient(to right, rgb(2 6 23 / 0.4) 1px, transparent 1px),linear-gradient(to bottom, rgb(2 6 23 / 0.4) 1px, transparent 1px);
				background-size: 384px 384px;
			}
			.bg-grid-8-s-2-neutral-950 {
				background-image: linear-gradient(to right, #0a0a0a 2px, transparent 2px),linear-gradient(to bottom, #0a0a0a 2px, transparent 2px);
				background-size: 32px 32px;
			}
			.bg-grid-1-s-8-yellow-50 {
				background-image: linear-gradient(to right, #fefce8 8px, transparent 8px),linear-gradient(to bottom, #fefce8 8px, transparent 8px);
				background-size: 4px 4px;
			}
		`);
	});

	test("supports arbitrary colors", async () => {
		const css = await generate(["bg-grid-8-s-2-[#ff0000]"]);

		expect(css).toMatchCss(`
			.bg-grid-8-s-2-\\[\\#ff0000\\] {
				background-image: linear-gradient(to right, #ff0000 2px, transparent 2px),linear-gradient(to bottom, #ff0000 2px, transparent 2px);
				background-size: 32px 32px;
			}
		`);
	});
});

describe("bg-dot", () => {
	test("generates dot backgrounds from theme widths, border widths and colors", async () => {
		const css = await generate([
			"bg-dot-8-s-2-neutral-950",
			"bg-dot-1-s-8-yellow-50",
			"bg-dot-96-s-1-slate-950/40",
		]);

		expect(css).toMatchCss(`
			.bg-dot-96-s-1-slate-950\\/40 {
				background-image: radial-gradient(rgb(2 6 23 / 0.4) 1px, transparent 1px);
				background-size: 384px 384px;
			}
			.bg-dot-8-s-2-neutral-950 {
				background-image: radial-gradient(#0a0a0a 2px, transparent 2px);
				background-size: 32px 32px;
			}
			.bg-dot-1-s-8-yellow-50 {
				background-image: radial-gradient(#fefce8 8px, transparent 8px);
				background-size: 4px 4px;
			}
		`);
	});
});

describe("invalid values are not generated", () => {
	test("does not generate the DEFAULT border width key", async () => {
		const css = await generate([
			"bg-grid-8-s-DEFAULT-red-500",
			"bg-dot-8-s-DEFAULT-red-500",
		]);

		expect(css).not.toContain("DEFAULT");
	});

	test("does not generate the inherit color (invalid inside a gradient)", async () => {
		const css = await generate([
			"bg-grid-8-s-2-inherit",
			"bg-dot-8-s-2-inherit",
		]);

		expect(css).toBe("");
	});

	test("does not generate non-length widths such as fractions or keywords", async () => {
		const css = await generate([
			"bg-grid-1/2-s-2-red-500",
			"bg-grid-auto-s-2-red-500",
			"bg-grid-screen-s-2-red-500",
		]);

		expect(css).toBe("");
	});
});

describe("custom theme values", () => {
	test("uses the border width value, not its key", async () => {
		const css = await generate(["bg-grid-8-s-thick-red-500"], {
			theme: { extend: { borderWidth: { thick: "3px" } } },
		});

		expect(css).toMatchCss(`
			.bg-grid-8-s-thick-red-500 {
				background-image: linear-gradient(to right, #ef4444 3px, transparent 3px),linear-gradient(to bottom, #ef4444 3px, transparent 3px);
				background-size: 32px 32px;
			}
		`);
	});

	test("supports border widths defined in rem", async () => {
		const css = await generate(["bg-dot-8-s-hair-red-500"], {
			theme: { extend: { borderWidth: { hair: "0.125rem" } } },
		});

		expect(css).toMatchCss(`
			.bg-dot-8-s-hair-red-500 {
				background-image: radial-gradient(#ef4444 2px, transparent 2px);
				background-size: 32px 32px;
			}
		`);
	});

	test("supports widths defined in px", async () => {
		const css = await generate(
			["bg-grid-px-s-1-red-500", "bg-grid-cell-s-1-red-500"],
			{
				theme: { extend: { width: { cell: "18px" } } },
			},
		);

		expect(css).toMatchCss(`
			.bg-grid-px-s-1-red-500 {
				background-image: linear-gradient(to right, #ef4444 1px, transparent 1px),linear-gradient(to bottom, #ef4444 1px, transparent 1px);
				background-size: 1px 1px;
			}
			.bg-grid-cell-s-1-red-500 {
				background-image: linear-gradient(to right, #ef4444 1px, transparent 1px),linear-gradient(to bottom, #ef4444 1px, transparent 1px);
				background-size: 18px 18px;
			}
		`);
	});

	test("supports custom nested colors", async () => {
		const css = await generate(
			["bg-dot-4-s-1-brand", "bg-dot-4-s-1-brand-soft"],
			{
				theme: {
					extend: {
						colors: { brand: { DEFAULT: "#123456", soft: "#abcdef" } },
					},
				},
			},
		);

		expect(css).toMatchCss(`
			.bg-dot-4-s-1-brand {
				background-image: radial-gradient(#123456 1px, transparent 1px);
				background-size: 16px 16px;
			}
			.bg-dot-4-s-1-brand-soft {
				background-image: radial-gradient(#abcdef 1px, transparent 1px);
				background-size: 16px 16px;
			}
		`);
	});

	test("works with variants", async () => {
		const css = await generate(["hover:bg-grid-8-s-2-red-500"]);

		expect(css).toContain(".hover\\:bg-grid-8-s-2-red-500:hover");
	});
});
