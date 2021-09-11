import { EntityManager } from "../../../entity-manager";
import { FindOptions } from "../../queries/types/find-options";
import { BaseQueryOptions } from "../../queries/types/query-options";
import { handleData } from "./helpers/handle-data";

interface Injectables<EntityExtraMetadata, ColumnExtraMetadata> {
	entityManager: EntityManager<EntityExtraMetadata, ColumnExtraMetadata>;
	entity: any;
}

export interface AfterFindParams<Entity> {
	dataToReturn: Array<Record<string, any>>;
	conditions: FindOptions<Entity>;
	options?: BaseQueryOptions;
}

export const afterFind = <Entity, EntityExtraMetadata, ColumnExtraMetadata>(
	{
		entity,
		entityManager,
	}: Injectables<EntityExtraMetadata, ColumnExtraMetadata>,
	{ dataToReturn }: AfterFindParams<Entity>,
) => {
	const dataHandled = handleData({
		data: dataToReturn,
		entity,
		entityManager,
	});

	return dataHandled as Array<Entity>;
};
