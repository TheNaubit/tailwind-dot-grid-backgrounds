// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import type { Assertion, AsymmetricMatchersContaining } from "vitest";

interface CustomMatchers<R = unknown> {
	// eslint-disable-next-line no-unused-vars
	toMatchCss: (received: string) => R;
}

declare module "vitest" {
	interface Assertion<T = unknown> extends CustomMatchers<T> {}
	interface AsymmetricMatchersContaining extends CustomMatchers {}
}
