import { DefaultTypes } from "../../../types/types";
import { FindOperator } from "./base";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const LessThan = (value: DefaultTypes) =>
	new FindOperator({
		type: "lessThan",
		values: [value],
	});
