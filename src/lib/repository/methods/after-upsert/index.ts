import { EntityManager } from "../../../entity-manager";
import { DatabaseEntity } from "../../../types/database-entity";
import { FindConditions } from "../../types/find-conditions";
import { BaseQueryOptions } from "../../types/query-options";
import { basicFormatDataArray } from "../@helpers/basic-format-data-array";

interface Injectables {
	entityManager: EntityManager;
	entity: any;
}

export interface AfterUpsertParams<Entity> {
	conditions: FindConditions<Entity>;
	data: Partial<DatabaseEntity>;
	options?: BaseQueryOptions;
}

export const afterUpsert = <Entity>(
	{ entity, entityManager }: Injectables,
	{ data }: AfterUpsertParams<Entity>,
) => {
	const dataArray = Array.isArray(data) ? data : [data];

	const dataHandled = basicFormatDataArray<Entity>({
		data: dataArray,
		entity,
		entityManager,
	});

	return dataHandled as Array<Entity>;
};
