import { EntityManager } from "../../../entity-manager";
import { ClassType } from "../../../types/class-type";
import { DatabaseEntity } from "../../../types/database-entity";
import { BaseQueryOptions } from "../../queries/types/query-options";
import { formatDataArray } from "./helpers/format-data-array";

interface Injectables<EntityExtraMetadata, ColumnExtraMetadata> {
	entityManager: EntityManager<EntityExtraMetadata, ColumnExtraMetadata>;
	entity: any;
}

export interface BeforeInsertParams<Entity> {
	data: Array<ClassType<Entity>> | ClassType<Entity>;
	options?: BaseQueryOptions;
}
export const beforeInsert = <Entity, EntityExtraMetadata, ColumnExtraMetadata>(
	{
		entity,
		entityManager,
	}: Injectables<EntityExtraMetadata, ColumnExtraMetadata>,
	{ data, options: rawOptions }: BeforeInsertParams<Entity>,
) => {
	const result = {} as BeforeInsertParams<DatabaseEntity>;

	const dataArray = Array.isArray(data) ? data : [data];

	const dataHandled = formatDataArray({
		data: dataArray,
		entity,
		entityManager,
	});

	result.data = Array.isArray(data)
		? dataHandled
		: (dataHandled.shift() as DatabaseEntity);

	if (rawOptions) {
		result.options = rawOptions;
	}

	return result;
};
