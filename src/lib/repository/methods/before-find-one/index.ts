import { EntityManager } from "../../../entity-manager";
import { CustomClass } from "../../../entity-manager/types/metadata-type";
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
	{ conditions: rawConditions, options }: BeforeFindOneParams<Entity>,
) => {
	const conditions: FindOneOptions<Record<string, any>> = {
		...(rawConditions as FindOneOptions<Record<string, any>>),
	};

	if (rawConditions.where) {
		conditions.where = entityManager.formatConditions({
			entity,
			conditions: rawConditions.where,
		});
	}

	if (rawConditions.select) {
		conditions.select = entityManager.convertColumnsNames({
			entity,
			columnsNames: rawConditions.select as Array<string>,
		});
	}

	if (rawConditions.order) {
		conditions.order = entityManager.formatOrder({
			entity,
			orderBy: rawConditions.order,
		});
	}

	return {
		conditions,
		options,
	};
};
