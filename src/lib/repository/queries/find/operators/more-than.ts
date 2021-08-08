import { FindOperator } from "./base";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const MoreThan = <T>(value: T) =>
	new FindOperator<T>({
		type: "moreThan",
		values: [value],
	});
