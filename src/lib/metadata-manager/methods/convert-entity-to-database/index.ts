import { MetadataManager } from "../..";
import { MetadataUtil } from "../../../utils/metadata-util";
import { CustomClass } from "../../types/metadata-type";

interface Injectables {
	metadataManager: MetadataManager<any, any>;
}

export interface ConvertEntityToDatabaseParams {
	entity: any;
	isSubEntity?: boolean;
	data: Record<string, any>;
}

export const convertEntityToDatabase = (
	{ metadataManager }: Injectables,
	{ entity, isSubEntity, data }: ConvertEntityToDatabaseParams,
) => {
	const entityMetadata = isSubEntity
		? metadataManager.getSubEntityMetadata(entity)
		: metadataManager.getEntityMetadata(entity);

	const acc = {} as Record<string, any>;

	entityMetadata.columns.forEach(columnMetadata => {
		if (!data) return;

		let value = data[columnMetadata.name];

		if (!value) return;

		if (MetadataUtil.isCustomMetadataType(columnMetadata.type)) {
			const subEntityMetadata = metadataManager.getSubEntityMetadata(
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
							isSubEntity: true,
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
						isSubEntity: true,
					},
				);
			}
		}

		acc[columnMetadata.databaseName] = value;
	});

	return acc;
};
