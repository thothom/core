import { EntityManager } from "../../../entity-manager";
import { FindConditions } from "../../types/find-conditions";
import { BaseQueryOptions } from "../../types/query-options";
import { DatabaseEntity } from "../../../types/database-entity";
import { SingleSaveData } from "../../types/save-conditions";
import { beforeFormatDataArray } from "../@helpers/before-format-data-array";

interface Injectables {
	entityManager: EntityManager;
	entity: any;
}

export interface BeforeUpsertParams<Entity> {
	conditions: FindConditions<Entity>;
	data: SingleSaveData<Entity>;
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

	result.data = beforeFormatDataArray<Entity>({
		data: [rawData],
		entity,
		entityManager,
		autoGenerateEvents: ["insert", "update"],
	}).shift();

	result.conditions = entityManager.formatConditions({
		entity,
		conditions: rawConditions,
	});

	if (rawOptions) {
		result.options = rawOptions;
	}

	return result;
};
