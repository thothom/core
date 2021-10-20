import { EntityManager } from "../../../entity-manager";
import { DatabaseEntity } from "../../../types/database-entity";
import { FindOneOptions } from "../../queries/types/find-options";
import { BaseQueryOptions } from "../../queries/types/query-options";
import { formatData } from "./helpers/format-data";

interface Injectables {
	entityManager: EntityManager;
	entity: any;
}

export interface AfterFindOneParams<Entity> {
	dataToReturn?: DatabaseEntity;
	conditions: FindOneOptions<Entity>;
	options?: BaseQueryOptions;
}

export const afterFindOne = <Entity>(
	{ entity, entityManager }: Injectables,
	{ dataToReturn }: AfterFindOneParams<Entity>,
) => {
	const dataHandled = formatData<Entity>({
		data: dataToReturn,
		entity,
		entityManager,
	});

	return dataHandled;
};
