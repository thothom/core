import { EntityManager } from "../../../entity-manager";
import { CustomClass } from "../../../entity-manager/types/metadata-type";
import { DatabaseEntity } from "../../../types/database-entity";
import { FindConditions } from "../../types/find-conditions";
import { BaseQueryOptions } from "../../types/query-options";

interface Injectables {
	entityManager: EntityManager;
	entity: CustomClass;
}

export interface BeforeDeleteInput<Entity> {
	where: FindConditions<Entity>;
	options?: BaseQueryOptions;
}

export interface BeforeDeleteOutput {
	where: FindConditions<DatabaseEntity>;
	options?: BaseQueryOptions;
}

export const beforeDelete = <Entity>(
	{ entityManager, entity }: Injectables,
	{ where: rawWhere, options: rawOptions }: BeforeDeleteInput<Entity>,
) => {
	const result = {} as BeforeDeleteOutput;

	result.where = entityManager.formatConditions({
		entity,
		conditions: rawWhere,
	});

	if (rawOptions) {
		result.options = rawOptions;
	}

	return result;
};
