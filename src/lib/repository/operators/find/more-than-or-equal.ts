import { DefaultTypes } from "../../../types/types";
import { FindOperator } from "./base";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const MoreThanOrEqual = (value: DefaultTypes) =>
	new FindOperator({
		type: "moreThanOrEqual",
		values: [value],
	});
