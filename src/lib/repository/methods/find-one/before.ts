import { EntityManager } from "../../../entity-manager";
import { CustomClass } from "../../../entity-manager/types/metadata-type";
import { DatabaseEntity } from "../../../types/database-entity";
import { FindOneOptions } from "../../types/find-options";
import { BaseQueryOptions } from "../../types/query-options";

interface Injectables {
	entityManager: EntityManager;
	entity: CustomClass;
}

export interface BeforeFindOneInput<Entity> {
	conditions: FindOneOptions<Entity>;
	options?: BaseQueryOptions;
}

export interface BeforeFindOneOutput {
	conditions: FindOneOptions<DatabaseEntity>;
	options?: BaseQueryOptions;
}

export const beforeFindOne = <Entity>(
	{ entityManager, entity }: Injectables,
	{
		conditions: rawConditions,
		options: rawOptions,
	}: BeforeFindOneInput<Entity>,
) => {
	const result = {} as BeforeFindOneOutput;

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
