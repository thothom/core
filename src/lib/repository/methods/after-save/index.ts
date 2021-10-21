import { EntityManager } from "../../../entity-manager";
import { DatabaseEntity } from "../../../types/database-entity";
import { BaseQueryOptions } from "../../types/query-options";
import { formatDataArray } from "./helpers/format-data-array";

interface Injectables {
	entityManager: EntityManager;
	entity: any;
}

export interface AfterSaveParams {
	data: Array<DatabaseEntity> | Partial<DatabaseEntity>;
	options?: BaseQueryOptions;
}

export const afterSave = <Entity>(
	{ entity, entityManager }: Injectables,
	{ data }: AfterSaveParams,
) => {
	const dataArray = Array.isArray(data) ? data : [data];

	const dataHandled = formatDataArray<Entity>({
		data: dataArray,
		entity,
		entityManager,
	});

	return Array.isArray(data)
		? (dataHandled as Array<Entity>)
		: (dataHandled.shift() as Entity);
};
