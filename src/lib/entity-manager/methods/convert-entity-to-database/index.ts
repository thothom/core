import { EntityManager } from "../..";
import { isUndefined } from "../../../utils/validations/is-undefined";
import { MetadataUtil } from "../../../utils/metadata-util";
import { CustomClass } from "../../types/metadata-type";
import { DatabaseEntity } from "../../../types/database-entity";
import { isNotEmptyObject } from "../../../utils/validations/is-not-empty-object";
import { generateDefaultValue } from "./helpers/generate-default-value";

interface Injectables {
	entityManager: EntityManager<any, any>;
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
	if (isUndefined(data)) return;

	const entityMetadata = entityManager.getEntityMetadata(entity);

	return entityMetadata.columns.reduce((acc, columnMetadata) => {
		const value = data[columnMetadata.name];

		if (isUndefined(value)) {
			// Has mutability!!!
			generateDefaultValue({
				columnMetadata,
				acc,
			});

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
