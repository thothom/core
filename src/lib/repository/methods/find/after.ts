import { EntityManager } from "../../../entity-manager";
import { DatabaseEntity } from "../../../types/database-entity";
import { FindOptions } from "../../types/find-options";
import { BaseQueryOptions } from "../../types/query-options";
import { afterFormatDataArray } from "../@helpers/after-format-data-array";

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
