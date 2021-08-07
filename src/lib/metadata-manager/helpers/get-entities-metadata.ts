import { BaseConnectionOptions } from "../../connection/types/connection-options";
import { Logger } from "../../logger";
import { MetadataUtil } from "../../utils/metadata-util";
import { MetadataManagerEntities } from "../types/manager-metadata";
import { CustomClass } from "../types/metadata-type";
import { formatColumns } from "./format-columns";
import { getDatabaseName } from "./get-database-name";

interface GetEntitiesMetadataParams {
	logger: Logger;
	entities: Array<CustomClass>;
	connectionOptions: BaseConnectionOptions;
}

export const getEntitiesMetadata = <EntityExtraMetadata, ColumnExtraMetadata>({
	logger,
	entities,
	connectionOptions,
}: GetEntitiesMetadataParams) =>
	entities.reduce<
		MetadataManagerEntities<EntityExtraMetadata, ColumnExtraMetadata>
	>((acc, entity) => {
		const metadata = MetadataUtil.getAllEntityMetadata<
			EntityExtraMetadata,
			ColumnExtraMetadata
		>({
			entity,
		});

		const databaseName = getDatabaseName({
			value: metadata.databaseName,
			namingPattern: connectionOptions.namingPattern?.entity,
			optionsPrefix: connectionOptions.prefix?.entity,
			optionsSuffix: connectionOptions.suffix?.entity,
		});

		const formattedColumns = formatColumns<ColumnExtraMetadata>({
			columns: metadata.columns,
			connectionOptions,
		});

		acc[metadata.name] = {
			...metadata,
			databaseName,
			columns: formattedColumns,
		};

		logger.debug(`Add Entity: ${JSON.stringify(acc[metadata.name])}`);

		return acc;
	}, {});
