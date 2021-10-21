import { SaveOperator } from "./base";

/**
 * Add elements to the end of a list
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Append = <T>(...value: Array<T>) =>
	new SaveOperator({
		type: "append",
		values: value,
	});
