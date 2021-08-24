import { formatNamingStrategy } from "../../../../utils/format-naming-strategy";
import { NamingStrategy } from "../../../../utils/format-naming-strategy/types/naming-strategy";
import { formatPrefix } from "../../../../utils/prefix-suffix/format-prefix";
import { formatSuffix } from "../../../../utils/prefix-suffix/format-suffix";

interface GetDatabaseNameParams {
	value: string;
	isNameAlreadyFormatted?: boolean;
	namingStrategy?: NamingStrategy;
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
	namingStrategy,
	optionsPrefix,
	optionsSuffix,
}: GetDatabaseNameParams) => {
	if (isNameAlreadyFormatted) {
		return value;
	}

	const databaseName = formatNamingStrategy({
		value,
		namingStrategy,
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
