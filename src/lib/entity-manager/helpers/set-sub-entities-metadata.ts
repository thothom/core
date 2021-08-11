import { BaseConnectionOptions } from "../../connection/types/connection-options";
import { Logger } from "../../logger";
import { MetadataUtil } from "../../utils/metadata-util";
import { EntityManagerEntities } from "../types/manager-metadata";
import { ColumnMetadata } from "../types/metadata";
import { formatColumns } from "./format-columns";
import { getDatabaseName } from "./get-database-name";

interface SetSubEntitiesMetadataParams<
	EntityExtraMetadata,
	ColumnExtraMetadata,
> {
	logger: Logger;
	allEntitiesColumns: Array<ColumnMetadata<ColumnExtraMetadata>>;
	entities: EntityManagerEntities<EntityExtraMetadata, ColumnExtraMetadata>;
	connectionOptions: BaseConnectionOptions;
}

export const setSubEntitiesMetadata = <
	EntityExtraMetadata,
	ColumnExtraMetadata,
>({
	logger,
	allEntitiesColumns,
	entities,
	connectionOptions,
}: SetSubEntitiesMetadataParams<EntityExtraMetadata, ColumnExtraMetadata>) => {
	const rawSubEntities = allEntitiesColumns
		.filter(columnMetadata =>
			MetadataUtil.isCustomMetadataType(columnMetadata.type),
		)
		.map(columnMetadata => columnMetadata.type);

	rawSubEntities.forEach(rawSubEntity => {
		const metadata = MetadataUtil.getAllEntityMetadata<
			EntityExtraMetadata,
			ColumnExtraMetadata
		>({
			entity: rawSubEntity,
		});

		if (entities[metadata.name]) {
			logger.warn(
				`Duplicated SubEntity skipped, may be an error: ${metadata.name}`,
			);

			return;
		}

		const databaseName = getDatabaseName({
			value: metadata.databaseName,
			isNameAlreadyFormatted: metadata.isNameAlreadyFormatted,
			namingPattern: connectionOptions.namingPattern?.entity,
			optionsPrefix: connectionOptions.prefix?.entity,
			optionsSuffix: connectionOptions.suffix?.entity,
		});

		const formattedColumns = formatColumns<ColumnExtraMetadata>({
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

		setSubEntitiesMetadata({
			allEntitiesColumns: formattedColumns,
			logger,
			entities,
			connectionOptions,
		});
	}, {});
};
