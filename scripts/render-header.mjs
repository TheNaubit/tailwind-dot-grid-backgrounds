// Renders images/header.png from images/header.html with the plugin itself and headless Chrome.
// Usage: CHROME_PATH=/path/to/chrome node scripts/render-header.mjs
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { compile } from "@tailwindcss/node";

const root = new URL("..", import.meta.url).pathname;
const chrome =
	process.env.CHROME_PATH ??
	"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const html = readFileSync(join(root, "images/header.html"), "utf8");
const candidates = [...html.matchAll(/class="([^"]+)"/g)].flatMap((match) =>
	(match[1] ?? "").split(/\s+/),
);

const input = `
@import "tailwindcss";
@import "@nauverse/tailwind-dot-grid-backgrounds";
@theme {
	--font-display: "Bricolage Grotesque", sans-serif;
	--color-canary: #ffd84d;
	--color-mint: #74e4a8;
}
/* The diagonal split: a thick black seam under the dotted half */
.seam { clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 calc(100% - 10px), calc(100% - 14px) 0); }
.dots { clip-path: polygon(100% 14px, 100% 100%, 14px 100%); }
`;

const compiler = await compile(input, { base: root, onDependency: () => {} });
const page = html.replace("/* CSS */", compiler.build(candidates));

const dir = mkdtempSync(join(tmpdir(), "header-"));
const file = join(dir, "header.html");
writeFileSync(file, page);

execFileSync(chrome, [
	"--headless",
	"--hide-scrollbars",
	"--force-device-scale-factor=2",
	"--window-size=1200,430",
	"--virtual-time-budget=5000",
	`--screenshot=${join(root, "images/header.png")}`,
	`file://${file}`,
]);
