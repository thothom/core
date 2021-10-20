import { EntityManager } from "../../../entity-manager";
import { FindConditions } from "../../queries/types/find-conditions";
import { BaseQueryOptions } from "../../queries/types/query-options";
import { formatData } from "./helpers/format-data";
import { DatabaseEntity } from "../../../types/database-entity";
import { ClassType } from "../../../types/class-type";

interface Injectables {
	entityManager: EntityManager;
	entity: any;
}

export interface BeforeUpdateParams<Entity> {
	conditions: FindConditions<Entity>;
	data: ClassType<Entity>;
	options?: BaseQueryOptions;
}
export const beforeUpdate = <Entity>(
	{ entity, entityManager }: Injectables,
	{
		conditions: rawConditions,
		data: rawData,
		options: rawOptions,
	}: BeforeUpdateParams<Entity>,
) => {
	const result = {} as BeforeUpdateParams<DatabaseEntity>;

	result.data = formatData<Entity>({
		data: rawData as Entity,
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
