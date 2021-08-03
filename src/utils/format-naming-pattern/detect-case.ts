import { NamingPatterns } from "../../types/naming-patterns";

/**
 * This function isn't 100% precise. If the value is only ONE word,
 * in all lowercase, the pattern cold be kebab, snake or camel. By default,
 * the camelCase is used.
 */
export const detectCase = (
	value: string,
	defaultCase?: NamingPatterns,
): NamingPatterns => {
	if (/^[A-Z]*$/.test(value)) {
		return "UPPER_CASE";
	}

	if (/^[_a-z]*$/.test(value)) {
		return "snake_case";
	}

	if (/^[-a-z]*$/.test(value)) {
		return "kebab-case";
	}

	if (/^[a-zA-Z]*$/.test(value) && /^[A-Z]*$/.test(value.charAt(0))) {
		return "PascalCase";
	}

	return defaultCase || "camelCase";
};
