import { SaveOperator } from "./base";

/**
 * Sets the value of a column as itself `+` the value passed as param
 *
 * Ex:
 * ```ts
 * // Before: { count: 1 }
 * repository.save({ count: Plus(1) })
 * // After: { count: 2 }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Plus = (value: number) =>
	new SaveOperator({
		type: "plus",
		values: [value],
	});
