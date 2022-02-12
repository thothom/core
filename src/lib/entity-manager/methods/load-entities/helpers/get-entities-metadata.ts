import { SymbiosisError } from "../../../../error";
import type { Logger } from "../../../../logger";

import { formatColumns } from "./format-columns";
import { getDatabaseName } from "./get-database-name";

import { MetadataUtil } from "../../../../utils/metadata-util";

import type { BaseConnectionOptions } from "../../../../connection/types/connection-options";
import type { ColumnMetadata } from "../../../types/column-metadata";
import type { EntityManagerEntities } from "../../../types/manager-metadata";
import type { CustomClass } from "../../../types/metadata-type";

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
	const entities: EntityManagerEntities = {};
	const columns: Array<ColumnMetadata> = [];

	rawEntities.forEach(rawEntity => {
		const metadata = MetadataUtil.getAllEntityMetadata({
			entity: rawEntity,
		});

		if (entities[metadata.name]) {
			throw new SymbiosisError({
				message: "Duplicated Entity",
				code: "DUPLICATED_ENTITY",
				origin: "SYMBIOSIS",
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
