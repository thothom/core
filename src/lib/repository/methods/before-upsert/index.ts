import { EntityManager } from "../../../entity-manager";
import { FindConditions } from "../../queries/types/find-conditions";
import { BaseQueryOptions } from "../../queries/types/query-options";
import { formatData } from "./helpers/format-data";
import { DatabaseEntity } from "../../../types/database-entity";

interface Injectables<EntityExtraMetadata, ColumnExtraMetadata> {
	entityManager: EntityManager<EntityExtraMetadata, ColumnExtraMetadata>;
	entity: any;
}

export interface BeforeUpsertParams<Entity> {
	conditions: FindConditions<Entity>;
	data: Partial<Entity>;
	options?: BaseQueryOptions;
}
export const beforeUpsert = <Entity, EntityExtraMetadata, ColumnExtraMetadata>(
	{
		entity,
		entityManager,
	}: Injectables<EntityExtraMetadata, ColumnExtraMetadata>,
	{
		conditions: rawConditions,
		data: rawData,
		options: rawOptions,
	}: BeforeUpsertParams<Entity>,
) => {
	const result = {} as BeforeUpsertParams<DatabaseEntity>;

	result.data = formatData({
		data: rawData,
		entity,
		entityManager,
	});

	result.conditions = entityManager.formatConditions({
		entity,
		conditions: rawConditions,
	});

	if (rawOptions) {
		result.options = rawOptions;
	}

	return result;
};
