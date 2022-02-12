import type { EntityManager } from "../../../entity-manager";

import type { FindConditions } from "../../types/find-conditions";
import type { BaseQueryOptions } from "../../types/query-options";

interface Injectables {
	entityManager: EntityManager;
	entity: any;
}

export interface AfterPerformativeCountParams<Entity> {
	dataToReturn: number;
	where: FindConditions<Entity>;
	options?: BaseQueryOptions;
}

export const afterPerformativeCount = <Entity>(
	_injectables: Injectables,
	{ dataToReturn }: AfterPerformativeCountParams<Entity>,
) => {
	return dataToReturn;
};
