import { FindConditions } from "../../queries/types/find-conditions";
import { EntityManager } from "../../../entity-manager";
import { BaseQueryOptions } from "../../queries/types/query-options";

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
