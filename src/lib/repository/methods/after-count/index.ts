import { FindConditions } from "../../queries/types/find-conditions";
import { EntityManager } from "../../../entity-manager";
import { BaseQueryOptions } from "../../queries/types/query-options";

interface Injectables {
	entityManager: EntityManager;
	entity: any;
}

export interface AfterCountParams<Entity> {
	dataToReturn: number;
	where: FindConditions<Entity>;
	options?: BaseQueryOptions;
}

export const afterCount = <Entity>(
	_injectables: Injectables,
	{ dataToReturn }: AfterCountParams<Entity>,
) => {
	return dataToReturn;
};
