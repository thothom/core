import { EntityManager } from "../../../entity-manager";
import { DatabaseEntity } from "../../../types/database-entity";
import { BaseQueryOptions } from "../../queries/types/query-options";
import { formatDataArray } from "./helpers/format-data-array";

interface Injectables<EntityExtraMetadata, ColumnExtraMetadata> {
	entityManager: EntityManager<EntityExtraMetadata, ColumnExtraMetadata>;
	entity: any;
}

export interface AfterInsertParams {
	data: Array<DatabaseEntity> | Partial<DatabaseEntity>;
	options?: BaseQueryOptions;
}

export const afterInsert = <Entity, EntityExtraMetadata, ColumnExtraMetadata>(
	{
		entity,
		entityManager,
	}: Injectables<EntityExtraMetadata, ColumnExtraMetadata>,
	{ data }: AfterInsertParams,
) => {
	const dataArray = Array.isArray(data) ? data : [data];

	const dataHandled = formatDataArray({
		data: dataArray,
		entity,
		entityManager,
	});

	return Array.isArray(data)
		? (dataHandled as Array<Entity>)
		: (dataHandled.shift() as Entity);
};
