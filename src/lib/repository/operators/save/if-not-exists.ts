import { SaveOperator } from "./base";

/**
 * Only sets the column if it NOT already exists
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const IfNotExists = () =>
	new SaveOperator({
		type: "if-not-exists",
		values: [],
	});
