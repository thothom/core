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

export interface BeforeUpdateParams<Entity> {
	conditions: FindConditions<Entity>;
	data: SingleSaveData<Entity>;
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

	result.data = beforeFormatDataArray<Entity>({
		data: [rawData],
		entity,
		entityManager,
		autoGenerateEvents: ["update"],
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
