import { FindOperator } from "./base";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Between = <T>(from: T, to: T) =>
	new FindOperator({
		type: "between",
		values: [from, to],
	});
