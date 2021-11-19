import { EntityManager } from "../../../entity-manager";
import { CustomClass } from "../../../entity-manager/types/metadata-type";
import { DatabaseEntity } from "../../../types/database-entity";
import { FindConditions } from "../../types/find-conditions";
import { BaseQueryOptions } from "../../types/query-options";

interface Injectables {
	entityManager: EntityManager;
	entity: CustomClass;
}

export interface BeforeSoftDeleteInput<Entity> {
	where: FindConditions<Entity>;
	options?: BaseQueryOptions;
}

export interface BeforeSoftDeleteOutput {
	where: FindConditions<DatabaseEntity>;
	options?: BaseQueryOptions;
}

export const beforeSoftDelete = <Entity>(
	{ entityManager, entity }: Injectables,
	{ where: rawWhere, options: rawOptions }: BeforeSoftDeleteInput<Entity>,
) => {
	const result = {} as BeforeSoftDeleteOutput;

	result.where = entityManager.formatConditions({
		entity,
		conditions: rawWhere,
	});

	if (rawOptions) {
		result.options = rawOptions;
	}

	return result;
};
