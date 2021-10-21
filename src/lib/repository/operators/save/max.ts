import { SaveOperator } from "./base";

/**
 * Changes the value of the column ONLY IF it's lower than the value specified
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Max = (value: number) =>
	new SaveOperator({
		type: "max",
		values: [value],
	});
