import { FormatPrefixSuffixParams } from "./types";

export const formatSuffix = ({
	value,
	options,
}: Omit<FormatPrefixSuffixParams, "defaultCase">) => {
	if (!options) return value;
	if (!options.remove && !options.add) return value;

	let formattedName = value;

	if (options.remove) {
		const columnLengthWithoutSuffix =
			formattedName.length - options.remove.length;
		const finalLetters = formattedName.substr(columnLengthWithoutSuffix);

		if (finalLetters === options.remove) {
			// eslint-disable-next-line @typescript-eslint/no-magic-numbers
			formattedName = formattedName.substr(0, columnLengthWithoutSuffix);
		}
	}

	if (options.add) {
		formattedName += options.add;
	}

	return formattedName;
};
