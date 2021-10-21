import { SaveOperator } from "./base";

/**
 * Sets the value of a column as itself `-` the value passed as param
 *
 * Ex:
 * ```ts
 * // Before: { count: 2 }
 * repository.save({ count: Minus(1) })
 * // After: { count: 1 }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Minus = (value: number) =>
	new SaveOperator({
		type: "minus",
		values: [value],
	});
