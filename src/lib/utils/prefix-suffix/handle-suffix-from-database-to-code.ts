import { formatNamingPattern } from "../format-naming-pattern";
import { detectCase } from "../format-naming-pattern/detect-case";
import { getGlue } from "../format-naming-pattern/get-glue";
import { HandlePrefixSuffixParams } from "./types";

/**
 * This functions makes the REVERSE path, so:
 * Add -> Remove suffix
 * Remove -> Add suffix
 */
export const handleSuffixFromDatabaseToCode = ({
	value,
	options,
	defaultCase,
}: HandlePrefixSuffixParams) => {
	if (!options) return value;
	if (!options.remove && !options.add) return value;

	let formattedName = value;

	const namingPattern = detectCase(formattedName, defaultCase);
	const glue = getGlue(namingPattern);

	if (options.add) {
		const columnLengthWithoutSuffix =
			formattedName.length - glue.length - options.add.length;

		formattedName = formattedName.slice(0, columnLengthWithoutSuffix);
	}

	if (options.remove) {
		// Convert suffix to the same naming pattern
		const remove = formatNamingPattern({
			value: options.remove,
			namingPattern:
				/**
				 * If the pattern of the value is camelCase, the suffix must have
				 * PascalCase, because it will be added to the end of the string
				 *
				 * Ex with camelCase:
				 * entitysuffix
				 *
				 * Ex with PascalCase:
				 * entitySuffix
				 */
				namingPattern === "camelCase" ? "PascalCase" : namingPattern,
		});

		formattedName += glue + remove;
	}

	return formattedName;
};
