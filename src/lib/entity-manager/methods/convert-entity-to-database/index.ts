import { EntityManager } from "../..";
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
	const entityMetadata = metadataManager.getEntityMetadata(entity);

	return entityMetadata.columns.reduce((acc, columnMetadata) => {
		if (!data) return acc;

		let value = data[columnMetadata.name];

		if (!value) return acc;

		if (MetadataUtil.isCustomMetadataType(columnMetadata.type)) {
			const subEntityMetadata = metadataManager.getEntityMetadata(
				columnMetadata.type,
			);

			if (columnMetadata.isArray) {
				value = value.map((val: CustomClass) =>
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
			} else {
				value = convertEntityToDatabase(
					{
						metadataManager,
					},
					{
						entity: subEntityMetadata,
						data: value,
					},
				);
			}
		}

		acc[columnMetadata.databaseName] = value;

		return acc;
	}, {} as Record<string, any>);
};
