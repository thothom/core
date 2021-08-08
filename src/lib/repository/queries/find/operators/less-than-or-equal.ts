import { FindOperator } from "./base";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const LessThanOrEqual = <T>(value: T) =>
	new FindOperator<T>({
		type: "lessThanOrEqual",
		values: [value],
	});
