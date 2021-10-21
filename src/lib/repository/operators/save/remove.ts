import { SaveOperator } from "./base";

/**
 * Removes a column from a record
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Remove = () =>
	new SaveOperator({
		type: "remove",
		values: [],
	});
