import { EntityManager } from "../../../entity-manager";
import { FindConditions } from "../../types/find-conditions";
import { BaseQueryOptions } from "../../types/query-options";
import { DatabaseEntity } from "../../../types/database-entity";
import { SingleSaveData } from "../../types/save-conditions";
import { beforeFormatDataArray } from "../@helpers/before-format-data-array";
import { DataWithRelations } from "../../types/data-with-relations";
import { formatRelations } from "../@helpers/format-relations";
import { DatabaseEvents } from "../../../entity-manager/types/database-events";

interface Injectables {
	entityManager: EntityManager;
	entity: any;
}

export interface BeforeUpsertInput<Entity> {
	conditions: FindConditions<Entity>;
	data: SingleSaveData<Entity>;
	options?: BaseQueryOptions;
}

export interface BeforeUpsertOutput {
	conditions: FindConditions<DatabaseEntity>;
	data: SingleSaveData<DatabaseEntity>;
	options?: BaseQueryOptions;
	relations: Array<DataWithRelations>;
}

export const beforeUpsert = <Entity>(
	{ entity, entityManager }: Injectables,
	{
		conditions: rawConditions,
		data: rawData,
		options: rawOptions,
	}: BeforeUpsertInput<Entity>,
): BeforeUpsertOutput => {
	const result = {} as BeforeUpsertOutput;

	const dataArray = [rawData];

	const autoGenerateEvents: Array<DatabaseEvents> = ["insert", "update"];

	result.data = beforeFormatDataArray<Entity>({
		data: dataArray,
		entity,
		entityManager,
		autoGenerateEvents,
	}).shift()!;

	result.conditions = entityManager.formatConditions({
		entity,
		conditions: rawConditions,
	});

	const relations = formatRelations({
		entity,
		entityManager,
		data: [result.data],
		rawData: dataArray,
		autoGenerateEvents,
	}).shift()!;

	if (relations) {
		result.relations = relations;
	}

	if (rawOptions) {
		result.options = rawOptions;
	}

	return result;
};
