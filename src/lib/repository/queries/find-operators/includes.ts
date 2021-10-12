import { DefaultTypes } from "../../../types/types";
import { FindOperator } from "./base";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Includes = (values: Array<DefaultTypes>) =>
	new FindOperator({
		type: "includes",
		values,
	});
