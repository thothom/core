import { FindOperator } from "./base";

import type { DefaultTypes } from "../../../types/types";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const In = (values: Array<DefaultTypes | FindOperator>) =>
	new FindOperator({
		type: "in",
		values,
	});
