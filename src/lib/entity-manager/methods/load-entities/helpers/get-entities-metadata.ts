import { BaseConnectionOptions } from "../../../../connection/types/connection-options";
import { CompassError } from "../../../../error";
import { CompassErrorCodeEnum } from "../../../../error/types/error-code.enum";
import { Logger } from "../../../../logger";
import { MetadataUtil } from "../../../../utils/metadata-util";
import { ColumnMetadata } from "../../../types/column-metadata";
import { EntityManagerEntities } from "../../../types/manager-metadata";
import { CustomClass } from "../../../types/metadata-type";
import { formatColumns } from "./format-columns";
import { getDatabaseName } from "./get-database-name";

interface GetEntitiesMetadataParams {
	logger: Logger;
	rawEntities: Array<CustomClass>;
	connectionOptions: BaseConnectionOptions;
}

export const getEntitiesMetadata = ({
	logger,
	rawEntities,
	connectionOptions,
}: GetEntitiesMetadataParams) => {
	const entities: EntityManagerEntities<any, any> = {};
	const columns: Array<ColumnMetadata> = [];

	rawEntities.forEach(rawEntity => {
		const metadata = MetadataUtil.getAllEntityMetadata<any, any>({
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

		/**
		 * Format Values
		 */

		const databaseName = getDatabaseName({
			value: metadata.databaseName,
			isNameAlreadyFormatted: metadata.isNameAlreadyFormatted,
			namingStrategy: connectionOptions.namingStrategy?.entity,
			optionsPrefix: connectionOptions.prefix?.entity,
			optionsSuffix: connectionOptions.suffix?.entity,
		});

		const formattedColumns = formatColumns({
			columns: metadata.columns,
			connectionOptions,
		});

		/**
		 * Set values
		 */

		entities[metadata.name] = {
			...metadata,
			databaseName,
			columns: formattedColumns,
		};

		columns.push(...formattedColumns);

		/**
		 * Log
		 */

		logger.debug(`Add Entity: ${JSON.stringify(entities[metadata.name])}`);
	});

	return {
		entities,
		columns,
	};
};
