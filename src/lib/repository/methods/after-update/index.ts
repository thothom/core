import { EntityManager } from "../../../entity-manager";
import { FindOneOptions } from "../../queries/types/find-options";
import { BaseQueryOptions } from "../../queries/types/query-options";
import { handleData } from "./helpers/handle-data";

interface Injectables<EntityExtraMetadata, ColumnExtraMetadata> {
	entityManager: EntityManager<EntityExtraMetadata, ColumnExtraMetadata>;
	entity: any;
}

export interface AfterUpdateParams<Entity> {
	conditions: FindOneOptions<Entity>["where"];
	data: Partial<Record<string, any>>;
	options?: BaseQueryOptions;
}

export const afterUpdate = <Entity, EntityExtraMetadata, ColumnExtraMetadata>(
	{
		entity,
		entityManager,
	}: Injectables<EntityExtraMetadata, ColumnExtraMetadata>,
	{ data }: AfterUpdateParams<Entity>,
) => {
	const dataHandled = handleData({
		data,
		entity,
		entityManager,
	});

	return dataHandled as Entity;
};
