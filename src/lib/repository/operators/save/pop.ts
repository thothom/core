import { SaveOperator } from "./base";

/**
 * Removes elements of a list
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Pop = <T>(...value: Array<T>) =>
	new SaveOperator({
		type: "pop",
		values: value,
	});
