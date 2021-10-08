import { FindConditions } from "../../queries/types/find-conditions";
import { EntityManager } from "../../../entity-manager";
import { BaseQueryOptions } from "../../queries/types/query-options";

interface Injectables<EntityExtraMetadata, ColumnExtraMetadata> {
	entityManager: EntityManager<EntityExtraMetadata, ColumnExtraMetadata>;
	entity: any;
}

export interface AfterSoftDeleteParams<Entity> {
	dataToReturn: number;
	where: FindConditions<Entity>;
	options?: BaseQueryOptions;
}

export const afterSoftDelete = <
	Entity,
	EntityExtraMetadata,
	ColumnExtraMetadata,
>(
	_injectables: Injectables<EntityExtraMetadata, ColumnExtraMetadata>,
	{ dataToReturn }: AfterSoftDeleteParams<Entity>,
) => {
	return dataToReturn;
};
