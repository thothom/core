import { FindOperator } from "./base";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EndsWith = (value: string) =>
	new FindOperator({
		type: "endsWith",
		values: [value],
	});
