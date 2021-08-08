import { FindOperator } from "./base";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Between = <T>(from: T, to: T) =>
	new FindOperator<T>({
		type: "between",
		values: [from, to],
	});
