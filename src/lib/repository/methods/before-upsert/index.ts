import { EntityManager } from "../../../entity-manager";
import { FindConditions } from "../../types/find-conditions";
import { BaseQueryOptions } from "../../types/query-options";
import { formatData } from "./helpers/format-data";
import { DatabaseEntity } from "../../../types/database-entity";
import { ClassType } from "../../../types/class-type";

interface Injectables {
	entityManager: EntityManager;
	entity: any;
}

export interface BeforeUpsertParams<Entity> {
	conditions: FindConditions<Entity>;
	data: ClassType<Entity>;
	options?: BaseQueryOptions;
}
export const beforeUpsert = <Entity>(
	{ entity, entityManager }: Injectables,
	{
		conditions: rawConditions,
		data: rawData,
		options: rawOptions,
	}: BeforeUpsertParams<Entity>,
) => {
	const result = {} as BeforeUpsertParams<DatabaseEntity>;

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
