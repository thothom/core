import { formatNamingPattern } from "../../utils/format-naming-pattern";
import { NamingPatterns } from "../../utils/format-naming-pattern/types/naming-patterns";
import { formatPrefix } from "../../utils/prefix-suffix/format-prefix";
import { formatSuffix } from "../../utils/prefix-suffix/format-suffix";

interface GetDatabaseNameParams {
	value: string;
	isNameAlreadyFormatted?: boolean;
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
	isNameAlreadyFormatted,
	namingPattern,
	optionsPrefix,
	optionsSuffix,
}: GetDatabaseNameParams) => {
	if (isNameAlreadyFormatted) {
		return value;
	}

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
