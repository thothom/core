import { SaveOperator } from "./base";

/**
 * Add element to the end of a list
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Append = <T>(value: T) =>
	new SaveOperator({
		type: "append",
		values: [value],
	});
