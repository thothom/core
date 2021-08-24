import { BaseConnectionOptions } from "../../../../connection/types/connection-options";
import { Logger } from "../../../../logger";
import { MetadataUtil } from "../../../../utils/metadata-util";
import { EntityManagerEntities } from "../../../types/manager-metadata";
import { ColumnMetadata } from "../../../types/column-metadata";
import { formatColumns } from "./format-columns";
import { getDatabaseName } from "./get-database-name";

interface GetSubEntitiesMetadataParams {
	logger: Logger;
	allEntitiesColumns: Array<ColumnMetadata>;
	entities: EntityManagerEntities<any, any>;
	connectionOptions: BaseConnectionOptions;
}

export const getSubEntitiesMetadata = ({
	logger,
	allEntitiesColumns,
	entities,
	connectionOptions,
}: GetSubEntitiesMetadataParams) => {
	const rawSubEntities = allEntitiesColumns
		.filter(columnMetadata =>
			MetadataUtil.isCustomMetadataType(columnMetadata.type),
		)
		.map(columnMetadata => columnMetadata.type);

	rawSubEntities.forEach(rawSubEntity => {
		const metadata = MetadataUtil.getAllEntityMetadata<any, any>({
			entity: rawSubEntity,
		});

		/**
		 * If the entity already exists, logs a warn,
		 * because one entity can both be an entity and a sub-entity.
		 *
		 * We can't tell if it's an error (2 different entities with
		 * the same name) or not, so we just warn instead throw an error.
		 */
		if (entities[metadata.name]) {
			logger.warn(
				`Duplicated SubEntity skipped, may be an error: ${metadata.name}`,
			);

			return;
		}

		const databaseName = getDatabaseName({
			value: metadata.databaseName,
			isNameAlreadyFormatted: metadata.isNameAlreadyFormatted,
			namingStrategy: connectionOptions.namingStrategy?.entity,
			optionsPrefix: connectionOptions.prefix?.entity,
			optionsSuffix: connectionOptions.suffix?.entity,
		});

		const formattedColumns = formatColumns({
			columns: metadata.columns,
			applyPrefixSuffix: !metadata.isSubEntity,
			connectionOptions,
		});

		entities[metadata.name] = {
			...metadata,
			databaseName,
			columns: formattedColumns,
		};

		logger.debug(`Add SubEntity: ${JSON.stringify(entities[metadata.name])}`);

		/**
		 * Recursive call
		 *
		 * Does it because sub-entities also can have sub-entities
		 */
		getSubEntitiesMetadata({
			allEntitiesColumns: formattedColumns as any,
			logger,
			entities,
			connectionOptions,
		});
	});
};
