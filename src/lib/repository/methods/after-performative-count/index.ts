import { FindConditions } from "../../queries/types/find-conditions";
import { EntityManager } from "../../../entity-manager";
import { BaseQueryOptions } from "../../queries/types/query-options";

interface Injectables<EntityExtraMetadata, ColumnExtraMetadata> {
	entityManager: EntityManager<EntityExtraMetadata, ColumnExtraMetadata>;
	entity: any;
}

export interface AfterPerformativeCountParams<Entity> {
	dataToReturn: number;
	where: FindConditions<Entity>;
	options?: BaseQueryOptions;
}

export const afterPerformativeCount = <
	Entity,
	EntityExtraMetadata,
	ColumnExtraMetadata,
>(
	_injectables: Injectables<EntityExtraMetadata, ColumnExtraMetadata>,
	{ dataToReturn }: AfterPerformativeCountParams<Entity>,
) => {
	return dataToReturn;
};
