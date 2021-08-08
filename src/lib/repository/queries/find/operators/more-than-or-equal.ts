import { FindOperator } from "./base";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const MoreThanOrEqual = <T>(value: T) =>
	new FindOperator<T>({
		type: "moreThanOrEqual",
		values: [value],
	});
