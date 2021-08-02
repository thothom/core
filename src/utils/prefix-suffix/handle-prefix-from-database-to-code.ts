import { formatNamingPattern } from "../format-naming-pattern";
import { detectCase } from "../format-naming-pattern/detect-case";
import { getGlue } from "../format-naming-pattern/get-glue";
import { HandlePrefixSuffixParams } from "./types";

/**
 * This functions makes the REVERSE path, so:
 * Add -> Remove prefix
 * Remove -> Add prefix
 */
export const handlePrefixFromDatabaseToCode = ({
	value,
	defaultCase,
	options,
}: HandlePrefixSuffixParams) => {
	if (!options) return value;
	if (!options.remove && !options.add) return value;

	let formattedName = value;

	const namingPattern = detectCase(formattedName, defaultCase);
	const glue = getGlue(namingPattern);

	if (options.add) {
		// Removes prefix
		formattedName = formattedName.slice(
			options.add.length + glue.length,
			formattedName.length,
		);

		// If pattern is camelCame, lower the first char
		if (namingPattern === "camelCase") {
			formattedName =
				formattedName.charAt(0).toLowerCase() + formattedName.slice();
		}
	}

	if (options.remove) {
		// Convert prefix to the same naming pattern
		const remove = formatNamingPattern({
			value: options.remove,
			namingPattern,
		});

		// If pattern is camelCame, upper the first char
		if (namingPattern === "camelCase") {
			formattedName =
				formattedName.charAt(0).toUpperCase() + formattedName.slice();
		}

		formattedName = remove + glue + formattedName;
	}

	return formattedName;
};
