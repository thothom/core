import { FindOperator } from "./base";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Exist = <T>() =>
	new FindOperator<T>({
		type: "exist",
		values: [],
	});
