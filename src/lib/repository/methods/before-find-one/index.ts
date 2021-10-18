import { EntityManager } from "../../../entity-manager";
import { CustomClass } from "../../../entity-manager/types/metadata-type";
import { DatabaseEntity } from "../../../types/database-entity";
import { FindOneOptions } from "../../queries/types/find-options";
import { BaseQueryOptions } from "../../queries/types/query-options";

interface Injectables<EntityExtraMetadata, ColumnExtraMetadata> {
	entityManager: EntityManager<EntityExtraMetadata, ColumnExtraMetadata>;
	entity: CustomClass;
}

export interface BeforeFindOneParams<Entity> {
	conditions: FindOneOptions<Entity>;
	options?: BaseQueryOptions;
}
export const beforeFindOne = <Entity, EntityExtraMetadata, ColumnExtraMetadata>(
	{
		entityManager,
		entity,
	}: Injectables<EntityExtraMetadata, ColumnExtraMetadata>,
	{
		conditions: rawConditions,
		options: rawOptions,
	}: BeforeFindOneParams<Entity>,
) => {
	const result = {} as BeforeFindOneParams<DatabaseEntity>;

	result.conditions = {
		...(rawConditions as FindOneOptions<DatabaseEntity>),
	};

	if (rawConditions.where) {
		result.conditions.where = entityManager.formatConditions({
			entity,
			conditions: rawConditions.where,
		});
	}

	if (rawConditions.select) {
		result.conditions.select = entityManager.convertColumnsNames({
			entity,
			columnsNames: rawConditions.select,
		});
	}

	if (rawConditions.order) {
		result.conditions.order = entityManager.formatOrder({
			entity,
			orderBy: rawConditions.order,
		});
	}

	if (rawOptions) {
		result.options = rawOptions;
	}

	return result;
};
