import { EntityManager } from "../../../entity-manager";
import { FindOneOptions } from "../../queries/types/find-options";
import { BaseQueryOptions } from "../../queries/types/query-options";
import { handleData } from "./helpers/handle-data";

interface Injectables<EntityExtraMetadata, ColumnExtraMetadata> {
	entityManager: EntityManager<EntityExtraMetadata, ColumnExtraMetadata>;
	entity: any;
}

export interface BeforeUpdateParams<Entity> {
	conditions: FindOneOptions<Entity>["where"];
	data: Partial<Entity>;
	options?: BaseQueryOptions;
}
export const beforeUpdate = <Entity, EntityExtraMetadata, ColumnExtraMetadata>(
	{
		entity,
		entityManager,
	}: Injectables<EntityExtraMetadata, ColumnExtraMetadata>,
	{ conditions, data, options }: BeforeUpdateParams<Entity>,
) => {
	const dataHandled = handleData({
		data,
		entity,
		entityManager,
	});

	return {
		data: dataHandled,
		conditions,
		options,
	};
};
