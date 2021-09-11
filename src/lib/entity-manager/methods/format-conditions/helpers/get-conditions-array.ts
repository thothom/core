import { FormatConditionsParams } from "..";

export const getConditionsArray = (
	conditions: FormatConditionsParams["conditions"],
) => {
	if (Array.isArray(conditions)) {
		return conditions;
	}

	return [conditions];
};
