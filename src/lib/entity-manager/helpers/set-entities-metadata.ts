import { BaseConnectionOptions } from "../../connection/types/connection-options";
import { CompassError } from "../../error";
import { CompassErrorCodeEnum } from "../../error/types/error-code.enum";
import { Logger } from "../../logger";
import { MetadataUtil } from "../../utils/metadata-util";
import { EntityManagerEntities } from "../types/manager-metadata";
import { CustomClass } from "../types/metadata-type";
import { formatColumns } from "./format-columns";
import { getDatabaseName } from "./get-database-name";

interface SetEntitiesMetadataParams<EntityExtraMetadata, ColumnExtraMetadata> {
	logger: Logger;
	rawEntities: Array<CustomClass>;
	entities: EntityManagerEntities<EntityExtraMetadata, ColumnExtraMetadata>;
	connectionOptions: BaseConnectionOptions;
}

export const setEntitiesMetadata = <EntityExtraMetadata, ColumnExtraMetadata>({
	logger,
	rawEntities,
	entities,
	connectionOptions,
}: SetEntitiesMetadataParams<EntityExtraMetadata, ColumnExtraMetadata>) =>
	rawEntities.forEach(rawEntity => {
		const metadata = MetadataUtil.getAllEntityMetadata<
			EntityExtraMetadata,
			ColumnExtraMetadata
		>({
			entity: rawEntity,
		});

		if (entities[metadata.name]) {
			throw new CompassError({
				message: "Duplicated Entity",
				code: CompassErrorCodeEnum.DUPLICATED_ENTITY,
				origin: "COMPASS",
				details: [`Entity: ${metadata.name}`],
			});
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
			connectionOptions,
		});

		entities[metadata.name] = {
			...metadata,
			databaseName,
			columns: formattedColumns,
		};

		logger.debug(`Add Entity: ${JSON.stringify(entities[metadata.name])}`);
	}, {});
