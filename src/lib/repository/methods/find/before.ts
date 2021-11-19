import { EntityManager } from "../../../entity-manager";
import { CustomClass } from "../../../entity-manager/types/metadata-type";
import { DatabaseEntity } from "../../../types/database-entity";
import { FindOptions } from "../../types/find-options";
import { BaseQueryOptions } from "../../types/query-options";

interface Injectables {
	entityManager: EntityManager;
	entity: CustomClass;
}

export interface BeforeFindInput<Entity> {
	conditions: FindOptions<Entity>;
	options?: BaseQueryOptions;
}

export interface BeforeFindOutput {
	conditions: FindOptions<DatabaseEntity>;
	options?: BaseQueryOptions;
}

export const beforeFind = <Entity>(
	{ entityManager, entity }: Injectables,
	{ conditions: rawConditions, options: rawOptions }: BeforeFindInput<Entity>,
) => {
	const result = {} as BeforeFindOutput;

	result.conditions = {
		...(rawConditions as FindOptions<DatabaseEntity>),
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

	if (rawConditions.startFrom) {
		result.conditions.startFrom = entityManager.formatConditions({
			entity,
			conditions: rawConditions.startFrom,
		});
	}

	if (rawOptions) {
		result.options = rawOptions;
	}

	return result;
};
