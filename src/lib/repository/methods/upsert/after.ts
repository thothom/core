import type { EntityManager } from "../../../entity-manager";
import { afterFormatDataArray } from "../@helpers/after-format-data-array";

import type { DatabaseEntity } from "../../../types/database-entity";
import type { FindConditions } from "../../types/find-conditions";
import type { BaseQueryOptions } from "../../types/query-options";

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

	const dataHandled = afterFormatDataArray<Entity>({
		data: dataArray,
		entity,
		entityManager,
	});

	return dataHandled as Array<Entity>;
};
