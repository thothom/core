import { getTypeof, isNotEmptyObject } from "@techmmunity/utils";
import { EntityManager } from "../..";
import { MetadataUtil } from "../../../utils/metadata-util";
import { CustomClass } from "../../types/metadata-type";
import { DatabaseEntity } from "../../../types/database-entity";
import { isSaveOperator } from "../../../utils/operators/is-save-operator";

interface Injectables {
	entityManager: EntityManager;
}

// eslint-disable-next-line import/exports-last
export interface ConvertEntityToDatabaseParams {
	entity: CustomClass;
	data: Record<string, any>; // Normal Entity, NOT an database entity
}

const recursiveConvertEntityToDatabase = (
	{ entityManager }: Injectables,
	{ entity, data }: ConvertEntityToDatabaseParams,
) => {
	if (getTypeof(data) === "undefined") return;

	const entityMetadata = entityManager.getEntityMetadata(entity);

	return entityMetadata.columns.reduce((acc, columnMetadata) => {
		const value = data[columnMetadata.name];

		if (getTypeof(value) === "undefined") {
			return acc;
		}

		if (isSaveOperator(value)) {
			acc[columnMetadata.databaseName] = value;

			return acc;
		}

		if (MetadataUtil.isCustomMetadataType(columnMetadata.type)) {
			const subEntityMetadata = entityManager.getEntityMetadata(
				columnMetadata.type,
			);

			if (columnMetadata.isArray) {
				/**
				 * ALERT: Recursive call!!!
				 * ALERT: Recursive call!!!
				 * ALERT: Recursive call!!!
				 */
				acc[columnMetadata.databaseName] = value.map((val: CustomClass) =>
					recursiveConvertEntityToDatabase(
						{
							entityManager,
						},
						{
							entity: subEntityMetadata,
							data: val,
						},
					),
				);

				return acc;
			}

			/**
			 * ALERT: Recursive call!!!
			 * ALERT: Recursive call!!!
			 * ALERT: Recursive call!!!
			 */
			const convertedSubEntityValue = recursiveConvertEntityToDatabase(
				{
					entityManager,
				},
				{
					entity: subEntityMetadata,
					data: value,
				},
			);

			if (
				convertedSubEntityValue &&
				isNotEmptyObject(convertedSubEntityValue)
			) {
				acc[columnMetadata.databaseName] = convertedSubEntityValue;
			}

			return acc;
		}

		acc[columnMetadata.databaseName] = value;

		return acc;
	}, {} as DatabaseEntity);
};

export const convertEntityToDatabase = (
	{ entityManager }: Injectables,
	{ entity, data }: ConvertEntityToDatabaseParams,
) =>
	recursiveConvertEntityToDatabase({ entityManager }, { entity, data }) || {};
