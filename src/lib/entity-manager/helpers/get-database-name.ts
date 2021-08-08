import { formatNamingPattern } from "../../utils/format-naming-pattern";
import { NamingPatterns } from "../../utils/format-naming-pattern/types/naming-patterns";
import { formatPrefix } from "../../utils/prefix-suffix/format-prefix";
import { formatSuffix } from "../../utils/prefix-suffix/format-suffix";

interface GetDatabaseNameParams {
	value: string;
	namingPattern?: NamingPatterns;
	optionsPrefix?: {
		add?: string;
		remove?: string;
	};
	optionsSuffix?: {
		add?: string;
		remove?: string;
	};
}

export const getDatabaseName = ({
	value,
	namingPattern,
	optionsPrefix,
	optionsSuffix,
}: GetDatabaseNameParams) => {
	const databaseName = formatNamingPattern({
		value,
		namingPattern,
	});

	const databaseNameWithPrefix = formatPrefix({
		value: databaseName,
		options: optionsPrefix,
	});

	const databaseNameWithPrefixAndSuffix = formatSuffix({
		value: databaseNameWithPrefix,
		options: optionsSuffix,
	});

	return databaseNameWithPrefixAndSuffix;
};
