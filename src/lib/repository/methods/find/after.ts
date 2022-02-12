import type { EntityManager } from "../../../entity-manager";
import { afterFormatDataArray } from "../@helpers/after-format-data-array";

import type { DatabaseEntity } from "../../../types/database-entity";
import type { FindOptions } from "../../types/find-options";
import type { BaseQueryOptions } from "../../types/query-options";

interface Injectables {
	entityManager: EntityManager;
	entity: any;
}

export interface AfterFindParams<Entity> {
	dataToReturn: Array<DatabaseEntity>;
	conditions: FindOptions<Entity>;
	options?: BaseQueryOptions;
}

export const afterFind = <Entity>(
	{ entity, entityManager }: Injectables,
	{ dataToReturn }: AfterFindParams<Entity>,
) => {
	const dataHandled = afterFormatDataArray<Entity>({
		data: dataToReturn,
		entity,
		entityManager,
	});

	return dataHandled as Array<Entity>;
};
