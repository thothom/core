import { DefaultTypes } from "../../../types/types";
import { FindOperator } from "./base";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const LessThanOrEqual = (value: DefaultTypes) =>
	new FindOperator({
		type: "lessThanOrEqual",
		values: [value],
	});
