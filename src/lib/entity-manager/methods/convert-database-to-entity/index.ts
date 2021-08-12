import { EntityManager } from "../..";
import { isUndefined } from "../../../utils/validations/is-undefined";
import { MetadataUtil } from "../../../utils/metadata-util";
import { CustomClass } from "../../types/metadata-type";

interface Injectables {
	metadataManager: EntityManager<any, any>;
}

export interface ConvertDatabaseToEntityParams {
	entity: any;
	data: Record<string, any>;
}

export const convertDatabaseToEntity = (
	{ metadataManager }: Injectables,
	{ entity, data }: ConvertDatabaseToEntityParams,
) => {
	const entityMetadata = metadataManager.getEntityMetadata(entity);

	return entityMetadata.columns.reduce((acc, columnMetadata) => {
		if (isUndefined(data)) return acc;

		const value = data[columnMetadata.databaseName];

		if (isUndefined(value)) return acc;

		if (MetadataUtil.isCustomMetadataType(columnMetadata.type)) {
			const subEntityMetadata = metadataManager.getEntityMetadata(
				columnMetadata.type,
			);

			if (columnMetadata.isArray) {
				acc[columnMetadata.name] = value.map((val: CustomClass) =>
					convertDatabaseToEntity(
						{
							metadataManager,
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
					metadataManager,
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
	}, {} as Record<string, any>);
};
