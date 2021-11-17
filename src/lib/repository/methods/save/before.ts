import { EntityManager } from "../../../entity-manager";
import { DatabaseEntity } from "../../../types/database-entity";
import { BaseQueryOptions } from "../../types/query-options";
import { SaveData } from "../../types/save-conditions";
import { beforeFormatDataArray } from "../@helpers/before-format-data-array";

interface Injectables {
	entityManager: EntityManager;
	entity: any;
}

export interface BeforeSaveParams<Entity> {
	data: SaveData<Entity>;
	options?: BaseQueryOptions;
}
export const beforeSave = <Entity>(
	{ entity, entityManager }: Injectables,
	{ data: rawData, options: rawOptions }: BeforeSaveParams<Entity>,
) => {
	const result = {} as BeforeSaveParams<DatabaseEntity>;

	const dataArray = Array.isArray(rawData) ? rawData : [rawData];

	const dataHandled = beforeFormatDataArray<Entity>({
		data: dataArray as Array<Entity>,
		entity,
		entityManager,
		autoGenerateEvents: ["insert", "update"],
	});

	result.data = Array.isArray(rawData)
		? dataHandled
		: (dataHandled.shift() as DatabaseEntity);

	if (rawOptions) {
		result.options = rawOptions;
	}

	return result;
};
