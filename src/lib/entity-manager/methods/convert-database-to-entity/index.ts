import { getTypeof } from "@techmmunity/utils";

import type { EntityManager } from "../..";

import { MetadataUtil } from "../../../utils/metadata-util";

import type { DatabaseEntity } from "../../../types/database-entity";
import type { CustomClass } from "../../types/metadata-type";

interface Injectables {
	entityManager: EntityManager;
}

export interface ConvertDatabaseToEntityParams {
	entity: CustomClass;
	data?: DatabaseEntity;
}

export const convertDatabaseToEntity = <Entity>(
	{ entityManager }: Injectables,
	{ entity, data }: ConvertDatabaseToEntityParams,
) => {
	if (!data) return;

	const entityMetadata = entityManager.getEntityMetadata(entity);

	return entityMetadata.columns.reduce((acc, columnMetadata) => {
		const key = columnMetadata.name as keyof Entity;

		const value = data[columnMetadata.databaseName];

		if (getTypeof(value) === "undefined") return acc;

		if (MetadataUtil.isCustomMetadataType(columnMetadata.type)) {
			const subEntityMetadata = entityManager.getEntityMetadata(
				columnMetadata.type,
			);

			if (columnMetadata.isArray) {
				acc[key] = value.map((val: CustomClass) =>
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

			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			acc[key] = convertDatabaseToEntity(
				{
					entityManager,
				},
				{
					entity: subEntityMetadata,
					data: value,
				},
			)!;

			return acc;
		}

		acc[key] = value;

		return acc;
	}, {} as Entity);
};
