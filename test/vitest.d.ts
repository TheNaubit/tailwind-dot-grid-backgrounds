import "vitest";

interface CustomMatchers<R = unknown> {
	toMatchCss: (expected: string) => R;
}

declare module "vitest" {
	interface Matchers<T = unknown> extends CustomMatchers<T> {}
}
