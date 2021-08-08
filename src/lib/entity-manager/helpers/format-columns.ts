import { BaseConnectionOptions } from "../../connection/types/connection-options";
import { ColumnMetadata } from "../types/metadata";
import { getDatabaseName } from "./get-database-name";

interface FormatColumnsParams<ColumnExtraMetadata> {
	columns: Array<ColumnMetadata<ColumnExtraMetadata>>;
	connectionOptions: BaseConnectionOptions;
	applyPrefixSuffix?: boolean;
}

export const formatColumns = <ColumnExtraMetadata>({
	columns,
	connectionOptions,
	applyPrefixSuffix = true,
}: FormatColumnsParams<ColumnExtraMetadata>) =>
	columns.map(metadata => {
		const databaseName = getDatabaseName({
			value: metadata.databaseName,
			namingPattern: connectionOptions.namingPattern?.column,
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
