import { FindConditions } from "../../types/find-conditions";
import { EntityManager } from "../../../entity-manager";
import { BaseQueryOptions } from "../../types/query-options";

interface Injectables {
	entityManager: EntityManager;
	entity: any;
}

export interface AfterSoftDeleteParams<Entity> {
	dataToReturn: number;
	where: FindConditions<Entity>;
	options?: BaseQueryOptions;
}

export const afterSoftDelete = <Entity>(
	_injectables: Injectables,
	{ dataToReturn }: AfterSoftDeleteParams<Entity>,
) => {
	return dataToReturn;
};
