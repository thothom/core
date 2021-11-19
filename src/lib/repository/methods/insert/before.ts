import { EntityManager } from "../../../entity-manager";
import { DatabaseEvents } from "../../../entity-manager/types/database-events";
import { DatabaseEntity } from "../../../types/database-entity";
import { DataWithRelations } from "../../types/data-with-relations";
import { BaseQueryOptions } from "../../types/query-options";
import { ArraySaveData, SaveData } from "../../types/save-conditions";
import { beforeFormatDataArray } from "../@helpers/before-format-data-array";
import { formatRelations } from "../@helpers/format-relations";

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
	relations?: Array<Array<DataWithRelations>>;
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

	result.relations = formatRelations({
		entity,
		entityManager,
		data: result.data,
		rawData: dataArray,
		autoGenerateEvents,
	});

	if (rawOptions) {
		result.options = rawOptions;
	}

	return result;
};
