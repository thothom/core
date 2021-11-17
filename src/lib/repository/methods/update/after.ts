import { EntityManager } from "../../../entity-manager";
import { DatabaseEntity } from "../../../types/database-entity";
import { FindOneOptions } from "../../types/find-options";
import { BaseQueryOptions } from "../../types/query-options";
import { afterFormatDataArray } from "../@helpers/after-format-data-array";

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
