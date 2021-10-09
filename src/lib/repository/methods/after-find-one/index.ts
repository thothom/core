import { EntityManager } from "../../../entity-manager";
import { DatabaseEntity } from "../../../types/database-entity";
import { FindOneOptions } from "../../queries/types/find-options";
import { BaseQueryOptions } from "../../queries/types/query-options";
import { formatData } from "./helpers/format-data";

interface Injectables<EntityExtraMetadata, ColumnExtraMetadata> {
	entityManager: EntityManager<EntityExtraMetadata, ColumnExtraMetadata>;
	entity: any;
}

export interface AfterFindOneParams<Entity> {
	dataToReturn: DatabaseEntity;
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
	const dataHandled = formatData({
		data: dataToReturn,
		entity,
		entityManager,
	});

	return dataHandled as Entity;
};
