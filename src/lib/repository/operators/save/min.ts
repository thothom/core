import { SaveOperator } from "./base";

/**
 * Changes the value of the column ONLY IF it's greater than the value specified
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Min = (value: number) =>
	new SaveOperator({
		type: "min",
		values: [value],
	});
