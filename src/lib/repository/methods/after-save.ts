import { EntityManager } from "../../entity-manager";
import { BaseQueryOptions } from "../queries/types/query-options";

interface Injectables<EntityExtraMetadata, ColumnExtraMetadata> {
	entityManager: EntityManager<EntityExtraMetadata, ColumnExtraMetadata>;
	entity: any;
}

export interface AfterSaveParams {
	data: Array<Record<string, any>> | Partial<Record<string, any>>;
	options?: BaseQueryOptions;
}

export const afterSave = <EntityExtraMetadata, ColumnExtraMetadata>(
	{
		entity,
		entityManager,
	}: Injectables<EntityExtraMetadata, ColumnExtraMetadata>,
	{ data, options }: AfterSaveParams,
) => {
	const dataInEntityFormat = Array.isArray(data)
		? data.map(d =>
				entityManager.convertDatabaseToEntity({
					data: d,
					entity,
				}),
		  )
		: entityManager.convertDatabaseToEntity({
				data,
				entity,
		  });

	return {
		data: dataInEntityFormat,
		options,
	};
};
