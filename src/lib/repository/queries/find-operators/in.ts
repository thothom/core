import { DefaultTypes } from "../../../types/types";
import { FindOperator } from "./base";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const In = (values: Array<DefaultTypes | FindOperator>) =>
	new FindOperator({
		type: "in",
		values,
	});
