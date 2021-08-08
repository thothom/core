import { FindOperator } from "./base";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Like = <T>(value: T) =>
	new FindOperator<T>({
		type: "like",
		values: [value],
	});
