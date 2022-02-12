import { FindOperator } from "./base";

import type { DefaultTypes } from "../../../types/types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const LessThan = (value: DefaultTypes) =>
	new FindOperator({
		type: "lessThan",
		values: [value],
	});
