import type { EntityManager } from "../../../entity-manager";
import { beforeFormatDataArray } from "../@helpers/before-format-data-array";

import type { DatabaseEvents } from "../../../entity-manager/types/database-events";
import type { DatabaseEntity } from "../../../types/database-entity";
import type { BaseQueryOptions } from "../../types/query-options";
import type { ArraySaveData, SaveData } from "../../types/save-conditions";

interface Injectables {
	entityManager: EntityManager;
	entity: any;
}

export interface BeforeInsertInput<Entity> {
	data: SaveData<Entity>;
	options?: BaseQueryOptions;
}

export interface BeforeInsertOutput {
	data: ArraySaveData<DatabaseEntity>;
	returnArray: boolean;
	options?: BaseQueryOptions;
}

export const beforeInsert = <Entity>(
	{ entity, entityManager }: Injectables,
	{ data, options: rawOptions }: BeforeInsertInput<Entity>,
): BeforeInsertOutput => {
	const result = {
		returnArray: Array.isArray(data),
	} as BeforeInsertOutput;

	const dataArray = Array.isArray(data) ? data : [data];

	const autoGenerateEvents: Array<DatabaseEvents> = ["insert"];

	result.data = beforeFormatDataArray<Entity>({
		data: dataArray as Array<Entity>,
		entity,
		entityManager,
		autoGenerateEvents,
	});

	if (rawOptions) {
		result.options = rawOptions;
	}

	return result;
};
