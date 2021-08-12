import { EntityManager } from "../..";
import { isUndefined } from "../../../utils/validations/is-undefined";
import { MetadataUtil } from "../../../utils/metadata-util";
import { CustomClass } from "../../types/metadata-type";

interface Injectables {
	metadataManager: EntityManager<any, any>;
}

export interface ConvertEntityToDatabaseParams {
	entity: any;
	data: Record<string, any>;
}

export const convertEntityToDatabase = (
	{ metadataManager }: Injectables,
	{ entity, data }: ConvertEntityToDatabaseParams,
) => {
	if (isUndefined(data)) return {};

	const entityMetadata = metadataManager.getEntityMetadata(entity);

	return entityMetadata.columns.reduce((acc, columnMetadata) => {
		const value = data[columnMetadata.name];

		if (isUndefined(value)) return acc;

		if (MetadataUtil.isCustomMetadataType(columnMetadata.type)) {
			const subEntityMetadata = metadataManager.getEntityMetadata(
				columnMetadata.type,
			);

			if (columnMetadata.isArray) {
				acc[columnMetadata.databaseName] = value.map((val: CustomClass) =>
					convertEntityToDatabase(
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

			acc[columnMetadata.databaseName] = convertEntityToDatabase(
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

		acc[columnMetadata.databaseName] = value;

		return acc;
	}, {} as Record<string, any>);
};
