import { EntityManager } from "../../../entity-manager";
import { ClassType } from "../../../types/class-type";
import { DatabaseEntity } from "../../../types/database-entity";
import { BaseQueryOptions } from "../../queries/types/query-options";
import { formatDataArray } from "./helpers/format-data-array";

interface Injectables {
	entityManager: EntityManager;
	entity: any;
}

export interface BeforeSaveParams<Entity> {
	data: Array<ClassType<Entity>> | ClassType<Entity>;
	options?: BaseQueryOptions;
}
export const beforeSave = <Entity>(
	{ entity, entityManager }: Injectables,
	{ data: rawData, options: rawOptions }: BeforeSaveParams<Entity>,
) => {
	const result = {} as BeforeSaveParams<DatabaseEntity>;

	const dataArray = Array.isArray(rawData) ? rawData : [rawData];

	const dataHandled = formatDataArray<Entity>({
		data: dataArray as Array<Entity>,
		entity,
		entityManager,
	});

	result.data = Array.isArray(rawData)
		? dataHandled
		: (dataHandled.shift() as DatabaseEntity);

	if (rawOptions) {
		result.options = rawOptions;
	}

	return result;
};
