import { BaseConnectionOptions } from "../../../types/connection";
import { handlePrefixFromCodeToDatabase } from "../../prefix-suffix/handle-prefix-from-code-to-database";
import { handlePrefixFromDatabaseToCode } from "../../prefix-suffix/handle-prefix-from-database-to-code";
import { handleSuffixFromCodeToDatabase } from "../../prefix-suffix/handle-suffix-from-code-to-database";
import { handleSuffixFromDatabaseToCode } from "../../prefix-suffix/handle-suffix-from-database-to-code";

interface HandlePrefixSuffixParams {
	convert: "FROM_code_TO_database" | "FROM_database_TO_code";
	value: string;
	connectionOptions: BaseConnectionOptions;
	type: string;
}

export const handlePrefixSuffix = ({
	convert,
	connectionOptions,
	type,
	value: valueParam,
}: HandlePrefixSuffixParams) => {
	let value = valueParam;

	if (convert === "FROM_code_TO_database") {
		value = handlePrefixFromCodeToDatabase({
			value,
			options:
				connectionOptions.prefix?.[
					type as keyof typeof connectionOptions.prefix
				],
		});

		value = handleSuffixFromCodeToDatabase({
			value,
			options:
				connectionOptions.suffix?.[
					type as keyof typeof connectionOptions.suffix
				],
		});
	}

	if (convert === "FROM_database_TO_code") {
		value = handlePrefixFromDatabaseToCode({
			defaultCase:
				connectionOptions.namingPattern?.[
					type as keyof typeof connectionOptions.namingPattern
				]?.code,
			value,
			options:
				connectionOptions.prefix?.[
					type as keyof typeof connectionOptions.prefix
				],
		});

		value = handleSuffixFromDatabaseToCode({
			defaultCase:
				connectionOptions.namingPattern?.[
					type as keyof typeof connectionOptions.namingPattern
				]?.code,
			value,
			options:
				connectionOptions.suffix?.[
					type as keyof typeof connectionOptions.suffix
				],
		});
	}

	return value;
};
