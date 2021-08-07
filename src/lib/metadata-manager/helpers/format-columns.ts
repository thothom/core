import { BaseConnectionOptions } from "../../connection/types/connection-options";
import { ColumnMetadata } from "../types/metadata";
import { getDatabaseName } from "./get-database-name";

interface FormatColumnsParams<ColumnExtraMetadata> {
	columns: Array<ColumnMetadata<ColumnExtraMetadata>>;
	connectionOptions: BaseConnectionOptions;
}

export const formatColumns = <ColumnExtraMetadata>({
	columns,
	connectionOptions,
}: FormatColumnsParams<ColumnExtraMetadata>) =>
	columns.map(metadata => {
		const databaseName = getDatabaseName({
			value: metadata.databaseName,
			namingPattern: connectionOptions.namingPattern?.column,
			optionsPrefix: connectionOptions.prefix?.column,
			optionsSuffix: connectionOptions.suffix?.column,
		});

		return {
			...metadata,
			databaseName,
		};
	});
