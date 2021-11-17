import { cleanObj, getTypeof } from "@techmmunity/utils";
import { EntityManager } from "../../../entity-manager";
import { DatabaseEvents } from "../../../entity-manager/types/database-events";
import { Relation } from "../../../entity-manager/types/entity-metadata";
import { DatabaseEntity } from "../../../types/database-entity";
import { MetadataUtil } from "../../../utils/metadata-util";
import { DataWithRelations } from "../../types/data-with-relations";
import { beforeFormatDataArray } from "./before-format-data-array";

interface FormatRelationsParams<Entity = any> {
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

interface GetRelationDataParams {
	r: Relation;
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
	r,
	data,
	entity,
}: GetRelationDataParams) => {
	const relationData = beforeFormatDataArray({
		data: [value],
		entity: r.targetEntity,
		entityManager,
		autoGenerateEvents,
	}).shift()!;

	r.relationMap.forEach(rm => {
		if (rm.foreignKeyEntity === "target") {
			const columnMetadata = entityManager.getColumnMetadata(
				entity,
				rm.columnName,
			);

			const relationColumnValue = data[columnMetadata.databaseName];

			const relationColumnMetadata = entityManager.getColumnMetadata(
				r.targetEntity,
				rm.targetColumnName,
			);

			relationData[relationColumnMetadata.databaseName] = relationColumnValue;
		}
	});

	return relationData;
};

export const formatRelations = ({
	entity,
	entityManager,
	data,
	rawData,
	autoGenerateEvents,
}: FormatRelationsParams): Array<DataWithRelations> => {
	const relations = MetadataUtil.getEntityMetadata<"relations">({
		metadataKey: "relations",
		entity,
	});

	return relations
		?.map(r => {
			/**
			 * Use "name" instead
			 */
			const value = rawData[r.relationColumn];

			if (getTypeof(value) === "undefined") return null;

			const arrayData = ["MANY_TO_MANY", "ONE_TO_MANY"].includes(r.type)
				? value
				: [value];

			return arrayData.map((val: any) => {
				const formattedRelationData = getRelationData({
					value: val,
					entityManager,
					autoGenerateEvents,
					r,
					data,
					entity,
				});

				return cleanObj({
					entity: r.targetEntity,
					data: formattedRelationData,
					relations: formatRelations({
						entity: r.targetEntity,
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
