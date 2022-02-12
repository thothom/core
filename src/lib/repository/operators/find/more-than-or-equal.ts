import { FindOperator } from "./base";

import type { DefaultTypes } from "../../../types/types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const MoreThanOrEqual = (value: DefaultTypes) =>
	new FindOperator({
		type: "moreThanOrEqual",
		values: [value],
	});
