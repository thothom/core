import { FindOperator } from "./base";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const LessThan = <T>(value: T) =>
	new FindOperator<T>({
		type: "lessThan",
		values: [value],
	});
