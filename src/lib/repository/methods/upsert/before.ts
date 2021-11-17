import { EntityManager } from "../../../entity-manager";
import { FindConditions } from "../../types/find-conditions";
import { BaseQueryOptions } from "../../types/query-options";
import { DatabaseEntity } from "../../../types/database-entity";
import { SingleSaveData } from "../../types/save-conditions";
import { beforeFormatDataArray } from "../@helpers/before-format-data-array";
import { DataWithRelations } from "../../types/data-with-relations";

interface Injectables {
	entityManager: EntityManager;
	entity: any;
}

export interface BeforeUpsertInput<Entity> {
	conditions: FindConditions<Entity>;
	data: SingleSaveData<Entity>;
	options?: BaseQueryOptions;
}

export interface BeforeUpsertOutput extends BeforeUpsertInput<DatabaseEntity> {
	relations: Array<DataWithRelations<DatabaseEntity>>;
}

export const beforeUpsert = <Entity>(
	{ entity, entityManager }: Injectables,
	{
		conditions: rawConditions,
		data: rawData,
		options: rawOptions,
	}: BeforeUpsertInput<Entity>,
): BeforeUpsertOutput => {
	const result: BeforeUpsertOutput = {
		data: beforeFormatDataArray<Entity>({
			data: [rawData],
			entity,
			entityManager,
			autoGenerateEvents: ["insert", "update"],
		}).shift(),
		conditions: entityManager.formatConditions({
			entity,
			conditions: rawConditions,
		}),
		relations: [],
	};

	if (rawOptions) {
		result.options = rawOptions;
	}

	return result;
};
