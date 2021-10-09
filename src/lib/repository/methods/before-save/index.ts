import { EntityManager } from "../../../entity-manager";
import { ClassType } from "../../../types/class-type";
import { DatabaseEntity } from "../../../types/database-entity";
import { BaseQueryOptions } from "../../queries/types/query-options";
import { formatDataArray } from "./helpers/format-data-array";

interface Injectables<EntityExtraMetadata, ColumnExtraMetadata> {
	entityManager: EntityManager<EntityExtraMetadata, ColumnExtraMetadata>;
	entity: any;
}

export interface BeforeSaveParams<Entity> {
	data: Array<ClassType<Entity>> | ClassType<Entity>;
	options?: BaseQueryOptions;
}
export const beforeSave = <Entity, EntityExtraMetadata, ColumnExtraMetadata>(
	{
		entity,
		entityManager,
	}: Injectables<EntityExtraMetadata, ColumnExtraMetadata>,
	{ data: rawData, options: rawOptions }: BeforeSaveParams<Entity>,
) => {
	const result = {} as BeforeSaveParams<DatabaseEntity>;

	const dataArray = Array.isArray(rawData) ? rawData : [rawData];

	const dataHandled = formatDataArray({
		data: dataArray,
		entity,
		entityManager,
	});

	result.data = Array.isArray(rawData)
		? dataHandled
		: (dataHandled.shift() as DatabaseEntity);

	if (rawOptions) {
		result.options = rawOptions;
	}

	return result;
};
