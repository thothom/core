import { EntityManager } from "../../entity-manager";
import { BaseQueryOptions } from "../queries/types/query-options";

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
	{ data }: BeforeSaveParams<Entity>,
) => {
	const dataWithAutoGeneratedFields =
		entityManager.autoGenerateEntityToDatabase({
			events: ["save"],
			entity,
			data,
		});

	const dataInDatabaseFormat = entityManager.convertEntityToDatabase({
		data: dataWithAutoGeneratedFields,
		entity,
	});

	return dataInDatabaseFormat;
};