import { EntityManager } from "../../../entity-manager";
import { DatabaseEntity } from "../../../types/database-entity";
import { BaseQueryOptions } from "../../types/query-options";
import { afterFormatDataArray } from "../@helpers/after-format-data-array";

interface Injectables {
	entityManager: EntityManager;
	entity: any;
}

export interface AfterSaveParams {
	data: Array<DatabaseEntity>;
	returnArray: boolean;
	options?: BaseQueryOptions;
}

export const afterSave = <Entity>(
	{ entity, entityManager }: Injectables,
	{ data, returnArray }: AfterSaveParams,
) => {
	const dataHandled = afterFormatDataArray<Entity>({
		data,
		entity,
		entityManager,
	});

	return returnArray
		? (dataHandled as Array<Entity>)
		: (dataHandled.shift() as Entity);
};
