import { EntityManager } from "../../../entity-manager";
import { CustomClass } from "../../../entity-manager/types/metadata-type";
import { FindOptions } from "../../queries/types/find-options";
import { BaseQueryOptions } from "../../queries/types/query-options";

interface Injectables<EntityExtraMetadata, ColumnExtraMetadata> {
	entityManager: EntityManager<EntityExtraMetadata, ColumnExtraMetadata>;
	entity: CustomClass;
}

export interface BeforeFindParams<Entity> {
	conditions: FindOptions<Entity>;
	options?: BaseQueryOptions;
}
export const beforeFind = <Entity, EntityExtraMetadata, ColumnExtraMetadata>(
	{
		entityManager,
		entity,
	}: Injectables<EntityExtraMetadata, ColumnExtraMetadata>,
	{ conditions: rawConditions, options }: BeforeFindParams<Entity>,
) => {
	const conditions: FindOptions<Record<string, any>> = {
		...(rawConditions as FindOptions<Record<string, any>>),
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

	return {
		conditions,
		options,
	};
};
