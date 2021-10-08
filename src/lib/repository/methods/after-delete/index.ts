import { FindConditions } from "../../queries/types/find-conditions";
import { EntityManager } from "../../../entity-manager";
import { BaseQueryOptions } from "../../queries/types/query-options";

interface Injectables<EntityExtraMetadata, ColumnExtraMetadata> {
	entityManager: EntityManager<EntityExtraMetadata, ColumnExtraMetadata>;
	entity: any;
}

export interface AfterDeleteParams<Entity> {
	dataToReturn: number;
	where: FindConditions<Entity>;
	options?: BaseQueryOptions;
}

export const afterDelete = <Entity, EntityExtraMetadata, ColumnExtraMetadata>(
	_injectables: Injectables<EntityExtraMetadata, ColumnExtraMetadata>,
	{ dataToReturn }: AfterDeleteParams<Entity>,
) => {
	return dataToReturn;
};
