import type { EntityManager } from "../../../entity-manager";
import { beforeFormatDataArray } from "../@helpers/before-format-data-array";

import type { DatabaseEvents } from "../../../entity-manager/types/database-events";
import type { DatabaseEntity } from "../../../types/database-entity";
import type { FindConditions } from "../../types/find-conditions";
import type { BaseQueryOptions } from "../../types/query-options";
import type { SingleSaveData } from "../../types/save-conditions";

interface Injectables {
	entityManager: EntityManager;
	entity: any;
}

export interface BeforeUpsertInput<Entity> {
	conditions: FindConditions<Entity>;
	data: SingleSaveData<Entity>;
	options?: BaseQueryOptions;
}

export interface BeforeUpsertOutput {
	conditions: FindConditions<DatabaseEntity>;
	data: SingleSaveData<DatabaseEntity>;
	options?: BaseQueryOptions;
}

export const beforeUpsert = <Entity>(
	{ entity, entityManager }: Injectables,
	{
		conditions: rawConditions,
		data: rawData,
		options: rawOptions,
	}: BeforeUpsertInput<Entity>,
): BeforeUpsertOutput => {
	const result = {} as BeforeUpsertOutput;

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
