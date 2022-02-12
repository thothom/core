import type { EntityManager } from "../../../entity-manager";

import type { FindConditions } from "../../types/find-conditions";
import type { BaseQueryOptions } from "../../types/query-options";

interface Injectables {
	entityManager: EntityManager;
	entity: any;
}

export interface AfterRecoverParams<Entity> {
	dataToReturn: number;
	where: FindConditions<Entity>;
	options?: BaseQueryOptions;
}

export const afterRecover = <Entity>(
	_injectables: Injectables,
	{ dataToReturn }: AfterRecoverParams<Entity>,
) => {
	return dataToReturn;
};
