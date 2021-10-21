import { FindOperator } from "./base";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const IsNull = () =>
	new FindOperator({
		type: "isNull",
		values: [],
	});
