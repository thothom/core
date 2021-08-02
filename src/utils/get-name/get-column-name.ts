import { BaseConnectionOptions } from "../../types/connection";
import { formatNamingPattern } from "../format-naming-pattern";
import { handlePrefixSuffix } from "./helpers/handle-prefix-suffix";

interface GetColumnNameParams {
	columnName: string;
	connectionOptions: BaseConnectionOptions;
	convert: "FROM_code_TO_database" | "FROM_database_TO_code";
}

export const getColumnName = ({
	columnName: tempColumnName,
	connectionOptions,
	convert,
}: GetColumnNameParams): string => {
	const columnName = handlePrefixSuffix({
		connectionOptions,
		value: tempColumnName,
		convert,
		type: "column",
	});

	const convertTo = convert === "FROM_code_TO_database" ? "database" : "code";

	return formatNamingPattern({
		value: columnName,
		namingPattern: connectionOptions.namingPattern?.column?.[convertTo],
	});
};
