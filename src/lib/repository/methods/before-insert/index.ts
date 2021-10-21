import { EntityManager } from "../../../entity-manager";
import { ClassType } from "../../../types/class-type";
import { DatabaseEntity } from "../../../types/database-entity";
import { BaseQueryOptions } from "../../types/query-options";
import { formatDataArray } from "./helpers/format-data-array";

interface Injectables {
	entityManager: EntityManager;
	entity: any;
}

export interface BeforeInsertParams<Entity> {
	data: Array<ClassType<Entity>> | ClassType<Entity>;
	options?: BaseQueryOptions;
}

export const beforeInsert = <Entity>(
	{ entity, entityManager }: Injectables,
	{ data, options: rawOptions }: BeforeInsertParams<Entity>,
) => {
	const result = {} as BeforeInsertParams<DatabaseEntity>;

	const dataArray = Array.isArray(data) ? data : [data];

	const dataHandled = formatDataArray<Entity>({
		data: dataArray as Array<Entity>,
		entity,
		entityManager,
	});

	result.data = Array.isArray(data)
		? dataHandled
		: (dataHandled.shift() as DatabaseEntity);

	if (rawOptions) {
		result.options = rawOptions;
	}

	return result;
};
