import { EntityManager } from "../../../entity-manager";
import { DatabaseEntity } from "../../../types/database-entity";
import { BaseQueryOptions } from "../../types/query-options";
import { SaveData } from "../../types/save-conditions";
import { beforeFormatDataArray } from "../@helpers/before-format-data-array";

interface Injectables {
	entityManager: EntityManager;
	entity: any;
}

export interface BeforeInsertParams<Entity> {
	data: SaveData<Entity>;
	options?: BaseQueryOptions;
}

export const beforeInsert = <Entity>(
	{ entity, entityManager }: Injectables,
	{ data, options: rawOptions }: BeforeInsertParams<Entity>,
) => {
	const result = {} as BeforeInsertParams<DatabaseEntity>;

	const dataArray = Array.isArray(data) ? data : [data];

	const dataHandled = beforeFormatDataArray<Entity>({
		data: dataArray as Array<Entity>,
		entity,
		entityManager,
		autoGenerateEvents: ["insert"],
	});

	result.data = Array.isArray(data)
		? dataHandled
		: (dataHandled.shift() as DatabaseEntity);

	if (rawOptions) {
		result.options = rawOptions;
	}

	return result;
};
