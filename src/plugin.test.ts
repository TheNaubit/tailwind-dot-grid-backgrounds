import path from "node:path";
import postcss from "postcss";
import tailwindcss, { type Config } from "tailwindcss";
import { expect, test } from "vitest";
import examplePlugin from ".";

// Custom CSS matcher
expect.extend({
	// Compare two CSS strings with all whitespace removed
	// This is probably naive but it's fast and works well enough.
	toMatchCss(received, argument) {
		function stripped(string_: string) {
			return string_.replace(/\s/g, "").replace(/;/g, "").replace(/\t/g, "");
		}

		const pass = stripped(received) === stripped(argument);

		return {
			pass,
			actual: stripped(received),
			expected: stripped(argument),
			message: () => (pass ? "All good!" : "CSS does not match"),
		};
	},
});

// Function to run the plugin
function run(
	config: Config,
	css = "@tailwind utilities",
	plugin = tailwindcss,
) {
	const { currentTestName } = expect.getState();

	const patchedConfig = {
		...{
			plugins: [examplePlugin],
			corePlugins: {
				preflight: false,
			},
		},
		...config,
	};

	return postcss(plugin(patchedConfig)).process(css, {
		from: `${path.resolve(__filename)}?test=${currentTestName}`,
	});
}

test("addBase", () => {
	const config = {
		content: [
			{
				raw: String.raw`🫣`,
			},
		],
		corePlugins: {
			preflight: true,
		},
	};

	return run(config, "@tailwind base").then((result) => {
		expect(result.css).toContain("*, ::before, ::after");
	});
});

test("gridBackground", () => {
	const config = {
		content: [
			{
				raw: String.raw`
          <div class="bg-grid-8-s-2-neutral-950"></div>
          <div class="bg-grid-1-s-8-yellow-50"></div>
          <div class="bg-grid-96-s-1-slate-950/40"></div>
        `,
			},
		],
	};

	return run(config).then((result) => {
		expect(result.css).toMatchCss(`
        .bg-grid-96-s-1-slate-950\\/40 {
            background-image: linear-gradient(to right, rgb(2 6 23 / 0.4)   1px, transparent 1px),linear-gradient(to bottom, rgb(2 6 23 / 0.4) 1px, transparent 1px);
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
});

test("dotBackground", () => {
	const config = {
		content: [
			{
				raw: String.raw`
            <div class="bg-dot-8-s-2-neutral-950"></div>
            <div class="bg-dot-1-s-8-yellow-50"></div>
            <div class="bg-dot-96-s-1-slate-950/40"></div>
          `,
			},
		],
	};

	return run(config).then((result) => {
		expect(result.css).toMatchCss(`
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
