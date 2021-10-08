import { EntityManager } from "../../../entity-manager";
import { FindOneOptions } from "../../queries/types/find-options";
import { BaseQueryOptions } from "../../queries/types/query-options";
import { handleData } from "./helpers/handle-data";

interface Injectables<EntityExtraMetadata, ColumnExtraMetadata> {
	entityManager: EntityManager<EntityExtraMetadata, ColumnExtraMetadata>;
	entity: any;
}

export interface AfterFindOneParams<Entity> {
	dataToReturn: Record<string, any>;
	conditions: FindOneOptions<Entity>;
	options?: BaseQueryOptions;
}

export const afterFindOne = <Entity, EntityExtraMetadata, ColumnExtraMetadata>(
	{
		entity,
		entityManager,
	}: Injectables<EntityExtraMetadata, ColumnExtraMetadata>,
	{ dataToReturn }: AfterFindOneParams<Entity>,
) => {
	const dataHandled = handleData({
		data: dataToReturn,
		entity,
		entityManager,
	});

	return dataHandled as Entity;
};
