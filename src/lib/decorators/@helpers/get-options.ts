import { getTypeof } from "@techmmunity/utils";

import type { BaseColumnOptions } from "../types/column-options";

export const getOptions = <T extends BaseColumnOptions>(
	optionsOrOtherThing: any,
): T => {
	if (getTypeof(optionsOrOtherThing) === "object") {
		return optionsOrOtherThing;
	}

	return {} as T;
};
