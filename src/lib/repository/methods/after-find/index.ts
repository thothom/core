import { EntityManager } from "../../../entity-manager";
import { DatabaseEntity } from "../../../types/database-entity";
import { FindOptions } from "../../queries/types/find-options";
import { BaseQueryOptions } from "../../queries/types/query-options";
import { formatData } from "./helpers/format-data";

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
	const dataHandled = formatData<Entity>({
		data: dataToReturn,
		entity,
		entityManager,
	});

	return dataHandled as Array<Entity>;
};
