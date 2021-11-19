import { cleanObj, getTypeof, isNotEmptyArray } from "@techmmunity/utils";
import { EntityManager } from "../../../entity-manager";
import { DatabaseEvents } from "../../../entity-manager/types/database-events";
import { Relation } from "../../../entity-manager/types/entity-metadata";
import { DatabaseEntity } from "../../../types/database-entity";
import { MetadataUtil } from "../../../utils/metadata-util";
import { DataWithRelations } from "../../types/data-with-relations";
import { beforeFormatDataArray } from "./before-format-data-array";

interface InternalFormatRelationsParams<Entity = any> {
	entity: any;
	entityManager: EntityManager;
	/**
	 * Data already formatted, with
	 * columns already auto-generated
	 */
	data: DatabaseEntity;
	/**
	 * Data without any formatting,
	 * as the user defined
	 */
	rawData: Entity;
	autoGenerateEvents: Array<DatabaseEvents>;
}

interface FormatRelationsParams<Entity = any> {
	entity: any;
	entityManager: EntityManager;
	/**
	 * Data already formatted, with
	 * columns already auto-generated
	 */
	data: Array<DatabaseEntity>;
	/**
	 * Data without any formatting,
	 * as the user defined
	 */
	rawData: Array<Entity>;
	autoGenerateEvents: Array<DatabaseEvents>;
}

interface GetRelationDataParams {
	relation: Relation;
	entityManager: EntityManager;
	data: DatabaseEntity;
	autoGenerateEvents: Array<DatabaseEvents>;
	value: any;
	entity: any;
}

const getRelationData = ({
	value,
	entityManager,
	autoGenerateEvents,
	relation,
	data,
	entity,
}: GetRelationDataParams) => {
	const relationData = beforeFormatDataArray({
		data: [value],
		entity: relation.targetEntity,
		entityManager,
		autoGenerateEvents,
	}).shift()!;

	relation.relationMap.forEach(rm => {
		if (rm.foreignKeyEntity === "target") {
			const columnMetadata = entityManager.getColumnMetadata(
				entity,
				rm.columnName,
			);

			const relationColumnValue = data[columnMetadata.databaseName];

			const relationColumnMetadata = entityManager.getColumnMetadata(
				relation.targetEntity,
				rm.targetColumnName,
			);

			relationData[relationColumnMetadata.databaseName] = relationColumnValue;
		}
	});

	return relationData;
};

const internalFormatRelations = ({
	entity,
	entityManager,
	data,
	rawData,
	autoGenerateEvents,
}: InternalFormatRelationsParams): Array<DataWithRelations> => {
	const relations = MetadataUtil.getEntityMetadata<"relations">({
		metadataKey: "relations",
		entity,
	});

	return relations
		?.map(relation => {
			/**
			 * Use "name" instead "databaseName",
			 * because the rawData ins't formatted yet
			 */
			const value = rawData[relation.relationColumn];

			if (getTypeof(value) === "undefined") return null;

			const arrayData = ["MANY_TO_MANY", "ONE_TO_MANY"].includes(relation.type)
				? value
				: [value];

			return arrayData.map((val: any) => {
				const formattedRelationData = getRelationData({
					value: val,
					entityManager,
					autoGenerateEvents,
					data,
					relation,
					entity,
				});

				return cleanObj({
					entity: relation.targetEntity,
					data: formattedRelationData,
					relations: internalFormatRelations({
						entity: relation.targetEntity,
						entityManager,
						data: formattedRelationData,
						rawData: val,
						autoGenerateEvents,
					}),
				});
			});
		})
		.filter(Boolean)
		.flat() as Array<DataWithRelations>;
};

export const formatRelations = ({
	entity,
	entityManager,
	data,
	rawData,
	autoGenerateEvents,
}: FormatRelationsParams): Array<Array<DataWithRelations>> =>
	rawData
		.map((rd, idx) =>
			internalFormatRelations({
				entity,
				entityManager,
				data: data[idx],
				rawData: rd,
				autoGenerateEvents,
			}),
		)
		.filter(isNotEmptyArray);
