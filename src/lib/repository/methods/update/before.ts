import { EntityManager } from "../../../entity-manager";
import { FindConditions } from "../../types/find-conditions";
import { BaseQueryOptions } from "../../types/query-options";
import { DatabaseEntity } from "../../../types/database-entity";
import { SingleSaveData } from "../../types/save-conditions";
import { beforeFormatDataArray } from "../@helpers/before-format-data-array";
import { DatabaseEvents } from "../../../entity-manager/types/database-events";

interface Injectables {
	entityManager: EntityManager;
	entity: any;
}

export interface BeforeUpdateInput<Entity> {
	conditions: FindConditions<Entity>;
	data: SingleSaveData<Entity>;
	options?: BaseQueryOptions;
}

export interface BeforeUpdateOutput {
	conditions: FindConditions<DatabaseEntity>;
	data: SingleSaveData<DatabaseEntity>;
	options?: BaseQueryOptions;
}

export const beforeUpdate = <Entity>(
	{ entity, entityManager }: Injectables,
	{
		conditions: rawConditions,
		data: rawData,
		options: rawOptions,
	}: BeforeUpdateInput<Entity>,
) => {
	const result = {} as BeforeUpdateOutput;

	const dataArray = [rawData];

	const autoGenerateEvents: Array<DatabaseEvents> = ["insert", "update"];

	result.data = beforeFormatDataArray<Entity>({
		data: dataArray,
		entity,
		entityManager,
		autoGenerateEvents,
	}).shift()!;

	result.conditions = entityManager.formatConditions({
		entity,
		conditions: rawConditions,
	});

	if (rawOptions) {
		result.options = rawOptions;
	}

	return result;
};
