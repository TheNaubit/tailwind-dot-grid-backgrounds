// The ".js" extension is required: Tailwind CSS v3 has no "exports" map, so Node ESM needs the full file name.
import plugin from "tailwindcss/plugin.js";
import type { CSSRuleObject, PluginAPI } from "tailwindcss/types/config.js";
import { flattenColors, strokeWidths, toPxEntries } from "./theme-values.js";

type UtilityFactory = (color: string) => CSSRuleObject;

function gridBackground(size: number, stroke: number): UtilityFactory {
	return (color) => ({
		backgroundImage: `linear-gradient(to right, ${color} ${stroke}px, transparent ${stroke}px),linear-gradient(to bottom, ${color} ${stroke}px, transparent ${stroke}px)`,
		backgroundSize: `${size}px ${size}px`,
	});
}

function dotBackground(size: number, dotSize: number): UtilityFactory {
	return (color) => ({
		backgroundImage: `radial-gradient(${color} ${dotSize}px, transparent ${dotSize}px)`,
		backgroundSize: `${size}px ${size}px`,
	});
}

const tailwindDotGridBackgrounds = plugin(
	({ matchUtilities, theme }: PluginAPI) => {
		// Colors come from the "backgroundColor" theme (it includes "colors").
		const colors = flattenColors(theme("backgroundColor"));

		// Stroke widths (grid) and dot sizes come from the "borderWidth" theme, plus "1".
		const strokes = strokeWidths(theme("borderWidth"));

		// Grid square sizes and dot spacings come from the "width" theme values expressed in px or rem.
		const sizes = toPxEntries(theme("width"));

		// Tailwind types color values as strings, but a palette may also contain functions: both are handled by matchUtilities.
		const values = colors as Record<string, string>;

		for (const [strokeKey, stroke] of strokes) {
			for (const [sizeKey, size] of sizes) {
				matchUtilities(
					{
						[`bg-grid-${sizeKey}-s-${strokeKey}`]: gridBackground(size, stroke),
						[`bg-dot-${sizeKey}-s-${strokeKey}`]: dotBackground(size, stroke),
					},
					{ values, type: "color" },
				);
			}
		}
	},
);

export default tailwindDotGridBackgrounds;
