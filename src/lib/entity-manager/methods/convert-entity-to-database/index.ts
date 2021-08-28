import { EntityManager } from "../..";
import { isUndefined } from "../../../utils/validations/is-undefined";
import { MetadataUtil } from "../../../utils/metadata-util";
import { CustomClass } from "../../types/metadata-type";

interface Injectables {
	entityManager: EntityManager<any, any>;
}

export interface ConvertEntityToDatabaseParams {
	entity: any;
	data: Record<string, any>;
}

export const convertEntityToDatabase = (
	{ entityManager }: Injectables,
	{ entity, data }: ConvertEntityToDatabaseParams,
) => {
	if (isUndefined(data)) return {};

	const entityMetadata = entityManager.getEntityMetadata(entity);

	return entityMetadata.columns.reduce((acc, columnMetadata) => {
		const value = data[columnMetadata.name];

		if (isUndefined(value)) return acc;

		if (MetadataUtil.isCustomMetadataType(columnMetadata.type)) {
			const subEntityMetadata = entityManager.getEntityMetadata(
				columnMetadata.type,
			);

			if (columnMetadata.isArray) {
				acc[columnMetadata.databaseName] = value.map((val: CustomClass) =>
					convertEntityToDatabase(
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

			acc[columnMetadata.databaseName] = convertEntityToDatabase(
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

		acc[columnMetadata.databaseName] = value;

		return acc;
	}, {} as Record<string, any>);
};
