import { getTypeof } from "@techmmunity/utils";
import { EntityManager } from "../..";
import { MetadataUtil } from "../../../utils/metadata-util";
import { CustomClass } from "../../types/metadata-type";
import { DatabaseEntity } from "../../../types/database-entity";

interface Injectables {
	entityManager: EntityManager;
}

export interface ConvertDatabaseToEntityParams {
	entity: CustomClass;
	data?: DatabaseEntity;
}

export const convertDatabaseToEntity = (
	{ entityManager }: Injectables,
	{ entity, data }: ConvertDatabaseToEntityParams,
) => {
	if (!data) return;

	const entityMetadata = entityManager.getEntityMetadata(entity);

	return entityMetadata.columns.reduce((acc, columnMetadata) => {
		const value = data[columnMetadata.databaseName];

		if (getTypeof(value) === "undefined") return acc;

		if (MetadataUtil.isCustomMetadataType(columnMetadata.type)) {
			const subEntityMetadata = entityManager.getEntityMetadata(
				columnMetadata.type,
			);

			if (columnMetadata.isArray) {
				acc[columnMetadata.name] = value.map((val: CustomClass) =>
					convertDatabaseToEntity(
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

			acc[columnMetadata.name] = convertDatabaseToEntity(
				{
					entityManager,
				},
				{
					entity: subEntityMetadata,
					data: value,
				},
			);

			return acc;
		}

		acc[columnMetadata.name] = value;

		return acc;
	}, {} as DatabaseEntity);
};
