import { EntityManager } from "../../../entity-manager";
import { BaseQueryOptions } from "../../queries/types/query-options";
import { handleDataArray } from "./helpers/handle-data-array";

interface Injectables<EntityExtraMetadata, ColumnExtraMetadata> {
	entityManager: EntityManager<EntityExtraMetadata, ColumnExtraMetadata>;
	entity: any;
}

export interface AfterInsertParams {
	data: Array<Record<string, any>> | Partial<Record<string, any>>;
	options?: BaseQueryOptions;
}

export const afterInsert = <EntityExtraMetadata, ColumnExtraMetadata>(
	{
		entity,
		entityManager,
	}: Injectables<EntityExtraMetadata, ColumnExtraMetadata>,
	{ data, options }: AfterInsertParams,
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
