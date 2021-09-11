import { EntityManager } from "../..";
import { FindConditions } from "../../../repository/queries/types/find-conditions";
import { isUndefined } from "../../../utils/validations/is-undefined";
import { CustomClass } from "../../types/metadata-type";
import { getConditionsArray } from "./helpers/get-conditions-array";
import { getConditionsFormatted } from "./helpers/get-conditions-formatted";

interface Injectables {
	entityManager: EntityManager<any, any>;
}

export interface FormatConditionsParams {
	entity: CustomClass;
	conditions: FindConditions<Record<string, any>>;
}

export const formatConditions = (
	{ entityManager }: Injectables,
	{ entity, conditions: rawConditions }: FormatConditionsParams,
) => {
	if (isUndefined(rawConditions)) return {};

	const entityMetadata = entityManager.getEntityMetadata(entity);

	/**
	 * As the conditions can both be an array and a single value,
	 * formats the conditions to an array, so it doesn't need to be handled
	 * two different ways
	 */
	const conditionsArray = getConditionsArray(rawConditions);

	/**
	 * Alert: The getConditionsFormatted has a recursive call to
	 * the formatConditions function
	 */
	const conditionsFormatted = getConditionsFormatted({
		entityManager,
		entityMetadata,
		conditionsArray,
	});

	/**
	 * As the conditions can both be an array and a single value,
	 * and this was previous converted to an array, convert to the
	 * correct format before return
	 */
	return Array.isArray(rawConditions)
		? conditionsFormatted
		: (conditionsFormatted.shift() as Record<string, any>);
};
