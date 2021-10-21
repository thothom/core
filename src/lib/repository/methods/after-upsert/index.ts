import { EntityManager } from "../../../entity-manager";
import { DatabaseEntity } from "../../../types/database-entity";
import { FindConditions } from "../../types/find-conditions";
import { BaseQueryOptions } from "../../types/query-options";
import { formatData } from "./helpers/format-data";

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
	const dataHandled = formatData<Entity>({
		data,
		entity,
		entityManager,
	});

	return dataHandled as Entity;
};
