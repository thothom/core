import {
	pascalCase,
	constantCase,
	snakeCase,
	camelCase,
	paramCase,
} from "change-case";
import { NamingStrategy } from "./types/naming-strategy";

interface FormatNamingStrategyParams {
	value: string;
	namingStrategy?: NamingStrategy;
}

const getFunction = (namingStrategy?: NamingStrategy) => {
	switch (namingStrategy) {
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

export const formatNamingStrategy = ({
	value,
	namingStrategy,
}: FormatNamingStrategyParams) => {
	const func = getFunction(namingStrategy);

	return func(value);
};
