import { NamingPatterns } from "./types/naming-patterns";

export const getGlue = (namingPattern: NamingPatterns) => {
	switch (namingPattern) {
		case "snake_case":
		case "UPPER_CASE":
			return "_";
		case "kebab-case":
			return "-";
		case "PascalCase":
		case "camelCase":
		default:
			return "";
	}
};
