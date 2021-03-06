import { getDatabaseName } from "./get-database-name";

import type { BaseConnectionOptions } from "../../../../connection/types/connection-options";
import type { ColumnMetadata } from "../../../types/column-metadata";

interface FormatColumnsParams {
	columns: Array<ColumnMetadata>;
	connectionOptions: BaseConnectionOptions;
	applyPrefixSuffix?: boolean;
}

export const formatColumns = ({
	columns,
	connectionOptions,
	applyPrefixSuffix = true,
}: FormatColumnsParams): Array<ColumnMetadata> =>
	columns.map(metadata => {
		const databaseName = getDatabaseName({
			value: metadata.databaseName,
			isNameAlreadyFormatted: metadata.isNameAlreadyFormatted,
			namingStrategy: connectionOptions.namingStrategy?.column,
			optionsPrefix: applyPrefixSuffix
				? connectionOptions.prefix?.column
				: undefined,
			optionsSuffix: applyPrefixSuffix
				? connectionOptions.suffix?.column
				: undefined,
		});

		return {
			...metadata,
			databaseName,
		};
	});
