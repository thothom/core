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
	{ data }: AfterSaveParams,
) => {
	const dataInEntityFormat = entityManager.convertDatabaseToEntity({
		data,
		entity,
	});

	return dataInEntityFormat;
};
