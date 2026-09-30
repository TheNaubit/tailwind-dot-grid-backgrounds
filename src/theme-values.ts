const REM_TO_PX = 16; // 1rem = 16px

// Colors that cannot be used inside a gradient color stop.
const UNSUPPORTED_COLORS = new Set(["inherit"]);

type ColorValue = string | ((...args: never[]) => string);
type ColorPalette = { [key: string]: ColorValue | ColorPalette };

// Convert a "px" or "rem" length to a number of pixels. Other values (percentages, keywords, other units...) return null.
export function toPx(value: unknown): number | null {
	if (typeof value !== "string") return null;

	const match = /^(-?\d*\.?\d+)(px|rem)$/.exec(value.trim());
	if (!match) return null;

	const amount = Number.parseFloat(match[1] as string);
	return match[2] === "rem" ? amount * REM_TO_PX : amount;
}

// Turn a theme section into [key, px] pairs, keeping only the values expressed in "px" or "rem".
export function toPxEntries(
	section: Record<string, unknown> | undefined,
): Array<[string, number]> {
	return Object.entries(section ?? {}).flatMap(([key, value]) => {
		const px = toPx(value);
		return px === null ? [] : [[key, px] as [string, number]];
	});
}

// Flatten a nested color palette into [name, color] pairs ("DEFAULT" maps to the parent name), like Tailwind does.
function colorEntries(
	palette: ColorPalette,
	prefix: string,
): Array<[string, ColorValue]> {
	return Object.entries(palette).flatMap(([key, value]) => {
		const name = key === "DEFAULT" ? prefix : prefix ? `${prefix}-${key}` : key;

		if (typeof value === "object" && value !== null) {
			return colorEntries(value, name);
		}

		return UNSUPPORTED_COLORS.has(name)
			? []
			: [[name, value] as [string, ColorValue]];
	});
}

export function flattenColors(
	palette: ColorPalette | undefined,
): Record<string, ColorValue> {
	return Object.fromEntries(colorEntries(palette ?? {}, ""));
}

// The stroke widths: every border width expressed in px or rem, except "DEFAULT" (it would create "-s-DEFAULT-" classes). "1" is always available since Tailwind has no "border-1".
export function strokeWidths(
	borderWidth: Record<string, unknown> | undefined,
): Array<[string, number]> {
	const entries = toPxEntries(borderWidth).filter(([key]) => key !== "DEFAULT");
	return entries.some(([key]) => key === "1")
		? entries
		: [["1", 1], ...entries];
}
