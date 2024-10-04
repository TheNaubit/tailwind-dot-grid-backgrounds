// @ts-expect-error - flattenColorPalette file does not export a type declaration
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
import plugin from "tailwindcss/plugin";
import type { PluginAPI } from "tailwindcss/types/config";

const REM_TO_PX = 16; // 1rem = 16px

const tailwindDotGridBackgrounds = plugin(
	({
		matchUtilities,
		theme,
	}: {
		matchUtilities: PluginAPI["matchUtilities"];
		theme: PluginAPI["theme"];
	}) => {
		// Obtain the color palette from the theme
		const colorPalette = flattenColorPalette(theme("backgroundColor"));

		// The border widths from Tailwind CSS will be the values used for the grid stoke widths. We also add the value "1" to the list of border widths (since Tailwind CSS does not include it by default).
		const borderWidths = ["1", ...Object.keys(theme("borderWidth"))];

		// For the sizes (the size of the squares in the grid or the distance between the dots in the dotted background), we will use the numeric width values from the "width" theme object. We will filter out the values that are not in "rem" units and convert the remaining values to pixels.
		const numericWidths: Array<[string, number]> = (
			Object.entries(theme("width")) as Array<[string, string]>
		)
			.filter(([, value]) => value.endsWith("rem"))
			.map(([key, value]) => [
				key,
				Number.parseFloat(value.replace("rem", "")) * REM_TO_PX,
			]);

		// Now iterate to generate all the utility classes
		for (const borderWidth of borderWidths) {
			for (const [widthKey, widthValue] of numericWidths) {
				matchUtilities(
					{
						// This key is for the square grid background
						[`bg-grid-${widthKey}-s-${borderWidth}`]: (colorValue: string) => {
							return {
								backgroundImage: `linear-gradient(to right, ${colorValue} ${borderWidth}px, transparent ${borderWidth}px),linear-gradient(to bottom, ${colorValue} ${borderWidth}px, transparent ${borderWidth}px)`,
								backgroundSize: `${widthValue}px ${widthValue}px`,
							};
						},
						// And this key is for the dotted background
						[`bg-dot-${widthKey}-s-${borderWidth}`]: (colorValue: string) => {
							return {
								backgroundImage: `radial-gradient(${colorValue} ${borderWidth}px, transparent ${borderWidth}px)`,
								backgroundSize: `${widthValue}px ${widthValue}px`,
							};
						},
					},
					{ values: colorPalette, type: "color" },
				);
			}
		}
	},
);

export default tailwindDotGridBackgrounds;
