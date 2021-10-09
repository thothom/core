import { EntityManager } from "../../../entity-manager";
import { DatabaseEntity } from "../../../types/database-entity";
import { FindOptions } from "../../queries/types/find-options";
import { BaseQueryOptions } from "../../queries/types/query-options";
import { formatData } from "./helpers/format-data";

interface Injectables<EntityExtraMetadata, ColumnExtraMetadata> {
	entityManager: EntityManager<EntityExtraMetadata, ColumnExtraMetadata>;
	entity: any;
}

export interface AfterFindParams<Entity> {
	dataToReturn: Array<DatabaseEntity>;
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
	const dataHandled = formatData({
		data: dataToReturn,
		entity,
		entityManager,
	});

	return dataHandled as Array<Entity>;
};
