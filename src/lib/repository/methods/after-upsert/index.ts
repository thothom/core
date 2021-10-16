import { EntityManager } from "../../../entity-manager";
import { DatabaseEntity } from "../../../types/database-entity";
import { FindConditions } from "../../queries/types/find-conditions";
import { BaseQueryOptions } from "../../queries/types/query-options";
import { formatData } from "./helpers/format-data";

interface Injectables<EntityExtraMetadata, ColumnExtraMetadata> {
	entityManager: EntityManager<EntityExtraMetadata, ColumnExtraMetadata>;
	entity: any;
}

export interface AfterUpsertParams<Entity> {
	conditions: FindConditions<Entity>;
	data: Partial<DatabaseEntity>;
	options?: BaseQueryOptions;
}

export const afterUpsert = <Entity, EntityExtraMetadata, ColumnExtraMetadata>(
	{
		entity,
		entityManager,
	}: Injectables<EntityExtraMetadata, ColumnExtraMetadata>,
	{ data }: AfterUpsertParams<Entity>,
) => {
	const dataHandled = formatData<Entity>({
		data,
		entity,
		entityManager,
	});

	return dataHandled as Entity;
};
