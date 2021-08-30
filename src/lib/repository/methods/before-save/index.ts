import { EntityManager } from "../../../entity-manager";
import { BaseQueryOptions } from "../../queries/types/query-options";
import { handleDataArray } from "./helpers/handle-data-array";

interface Injectables<EntityExtraMetadata, ColumnExtraMetadata> {
	entityManager: EntityManager<EntityExtraMetadata, ColumnExtraMetadata>;
	entity: any;
}

export interface BeforeSaveParams<Entity> {
	data: Array<Partial<Entity>> | Partial<Entity>;
	options?: BaseQueryOptions;
}
export const beforeSave = <Entity, EntityExtraMetadata, ColumnExtraMetadata>(
	{
		entity,
		entityManager,
	}: Injectables<EntityExtraMetadata, ColumnExtraMetadata>,
	{ data, options }: BeforeSaveParams<Entity>,
) => {
	const dataArray = Array.isArray(data) ? data : [data];

	const dataHandled = handleDataArray({
		data: dataArray,
		entity,
		entityManager,
	});

	const dataToReturn = Array.isArray(data) ? dataHandled : dataHandled.shift();

	return {
		data: dataToReturn,
		options,
	};
};
