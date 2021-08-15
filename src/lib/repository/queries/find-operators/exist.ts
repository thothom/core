import { FindOperator } from "./base";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Exist = () =>
	new FindOperator({
		type: "exist",
		values: [],
	});
