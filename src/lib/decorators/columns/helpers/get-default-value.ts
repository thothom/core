import { getTypeof } from "@techmmunity/utils";

import type { ColumnMetadata } from "../../../entity-manager/types/column-metadata";

export const getDefaultValue = (
	defaultValue?: any,
): Pick<ColumnMetadata, "autoGenerate" | "autoGenerateOnlyOnEvents"> => {
	if (getTypeof(defaultValue) !== "undefined") {
		return {
			autoGenerateOnlyOnEvents: ["insert"],
			autoGenerate: defaultValue,
		};
	}

	return {};
};
