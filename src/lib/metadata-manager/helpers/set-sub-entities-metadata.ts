import { BaseConnectionOptions } from "../../connection/types/connection-options";
import { Logger } from "../../logger";
import { MetadataUtil } from "../../utils/metadata-util";
import { MetadataManagerEntities } from "../types/manager-metadata";
import { ColumnMetadata } from "../types/metadata";
import { formatColumns } from "./format-columns";
import { getDatabaseName } from "./get-database-name";

interface SetSubEntitiesMetadataParams<
	EntityExtraMetadata,
	ColumnExtraMetadata,
> {
	logger: Logger;
	allEntitiesColumns: Array<ColumnMetadata<ColumnExtraMetadata>>;
	subEntities: MetadataManagerEntities<
		EntityExtraMetadata,
		ColumnExtraMetadata
	>;
	connectionOptions: BaseConnectionOptions;
}

export const setSubEntitiesMetadata = <
	EntityExtraMetadata,
	ColumnExtraMetadata,
>({
	logger,
	allEntitiesColumns,
	subEntities,
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

		if (subEntities[metadata.name]) {
			logger.info(`Duplicated SubEntity: ${metadata.name}`);

			return;
		}

		const databaseName = getDatabaseName({
			value: metadata.databaseName,
			namingPattern: connectionOptions.namingPattern?.entity,
			optionsPrefix: connectionOptions.prefix?.entity,
			optionsSuffix: connectionOptions.suffix?.entity,
		});

		const formattedColumns = formatColumns<ColumnExtraMetadata>({
			columns: metadata.columns,
			applyPrefixSuffix: false,
			connectionOptions,
		});

		subEntities[metadata.name] = {
			...metadata,
			databaseName,
			columns: formattedColumns,
		};

		logger.debug(
			`Add SubEntity: ${JSON.stringify(subEntities[metadata.name])}`,
		);

		setSubEntitiesMetadata({
			allEntitiesColumns: formattedColumns,
			logger,
			subEntities,
			connectionOptions,
		});
	}, {});
};
