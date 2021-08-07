import { formatNamingPattern } from "../..";
import { BaseConnectionOptions } from "../../connection/types/connection-options";
import { ColumnMetadata } from "../types/metadata";

interface FormatColumnsParams<ColumnExtraMetadata> {
	columns: Array<ColumnMetadata<ColumnExtraMetadata>>;
	namingPattern: BaseConnectionOptions["namingPattern"];
}

export const formatColumns = <ColumnExtraMetadata>({
	columns,
	namingPattern,
}: FormatColumnsParams<ColumnExtraMetadata>) =>
	columns.map(metadata => {
		const formattedName = formatNamingPattern({
			value: metadata.formattedName,
			namingPattern: namingPattern?.column?.database,
		});

		return {
			...metadata,
			formattedName,
		};
	});
