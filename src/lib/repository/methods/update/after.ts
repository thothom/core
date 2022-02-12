import type { EntityManager } from "../../../entity-manager";
import { afterFormatDataArray } from "../@helpers/after-format-data-array";

import type { DatabaseEntity } from "../../../types/database-entity";
import type { FindOneOptions } from "../../types/find-options";
import type { BaseQueryOptions } from "../../types/query-options";

interface Injectables {
	entityManager: EntityManager;
	entity: any;
}

export interface AfterUpdateParams<Entity> {
	conditions: FindOneOptions<Entity>["where"];
	data: Array<Partial<DatabaseEntity>> | Partial<DatabaseEntity>;
	options?: BaseQueryOptions;
}

export const afterUpdate = <Entity>(
	{ entity, entityManager }: Injectables,
	{ data }: AfterUpdateParams<Entity>,
) => {
	const dataArray = Array.isArray(data) ? data : [data];

	const dataHandled = afterFormatDataArray<Entity>({
		data: dataArray,
		entity,
		entityManager,
	});

	return dataHandled as Array<Entity>;
};
