import {
	pascalCase,
	constantCase,
	snakeCase,
	camelCase,
	paramCase,
} from "change-case";
import { NamingPatterns } from "../../types/naming-patterns";

interface FormatNamingPatternParams {
	value: string;
	namingPattern?: NamingPatterns;
}

const getFunction = (namingPattern?: NamingPatterns) => {
	switch (namingPattern) {
		case "PascalCase":
			return pascalCase;
		case "UPPER_CASE":
			return constantCase;
		case "snake_case":
			return snakeCase;
		case "camelCase":
			return camelCase;
		case "kebab-case":
			return paramCase;
		default:
			return (value: string) => value;
	}
};

export const formatNamingPattern = ({
	value,
	namingPattern,
}: FormatNamingPatternParams) => {
	const func = getFunction(namingPattern);

	return func(value);
};
