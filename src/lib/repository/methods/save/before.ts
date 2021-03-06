import type { EntityManager } from "../../../entity-manager";
import { beforeFormatDataArray } from "../@helpers/before-format-data-array";

import type { DatabaseEvents } from "../../../entity-manager/types/database-events";
import type { DatabaseEntity } from "../../../types/database-entity";
import type { BaseQueryOptions } from "../../types/query-options";
import type { SaveData } from "../../types/save-conditions";

interface Injectables {
	entityManager: EntityManager;
	entity: any;
}

export interface BeforeSaveInput<Entity> {
	data: SaveData<Entity>;
	options?: BaseQueryOptions;
}

export interface BeforeSaveOutput {
	data: SaveData<DatabaseEntity>;
	returnArray: boolean;
	options?: BaseQueryOptions;
}

export const beforeSave = <Entity>(
	{ entity, entityManager }: Injectables,
	{ data, options }: BeforeSaveInput<Entity>,
): BeforeSaveOutput => {
	const result = {
		returnArray: Array.isArray(data),
	} as BeforeSaveOutput;

	const dataArray = Array.isArray(data) ? data : [data];

	const autoGenerateEvents: Array<DatabaseEvents> = ["insert", "update"];

	result.data = beforeFormatDataArray<Entity>({
		data: dataArray,
		entity,
		entityManager,
		autoGenerateEvents,
	});

	if (options) {
		result.options = options;
	}

	return result;
};
