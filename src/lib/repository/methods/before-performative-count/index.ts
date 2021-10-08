import { EntityManager } from "../../../entity-manager";
import { CustomClass } from "../../../entity-manager/types/metadata-type";
import { FindConditions } from "../../queries/types/find-conditions";
import { BaseQueryOptions } from "../../queries/types/query-options";

interface Injectables<EntityExtraMetadata, ColumnExtraMetadata> {
	entityManager: EntityManager<EntityExtraMetadata, ColumnExtraMetadata>;
	entity: CustomClass;
}

export interface BeforePerformativeCountParams<Entity> {
	where: FindConditions<Entity>;
	options?: BaseQueryOptions;
}

export const beforePerformativeCount = <
	Entity,
	EntityExtraMetadata,
	ColumnExtraMetadata,
>(
	{
		entityManager,
		entity,
	}: Injectables<EntityExtraMetadata, ColumnExtraMetadata>,
	{ where: rawWhere, options }: BeforePerformativeCountParams<Entity>,
) => {
	const where = entityManager.formatConditions({
		entity,
		conditions: rawWhere,
	});

	return {
		where,
		options,
	};
};
