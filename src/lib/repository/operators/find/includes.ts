import { FindOperator } from "./base";

import type { DefaultTypes } from "../../../types/types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Includes = (values: Array<DefaultTypes>) =>
	new FindOperator({
		type: "includes",
		values,
	});
