import { FormatPrefixSuffixParams } from "./types";

export const formatPrefix = ({
	value,
	options,
}: Omit<FormatPrefixSuffixParams, "defaultCase">) => {
	if (!options) return value;
	if (!options.remove && !options.add) return value;

	let formattedName = value;

	if (options.remove) {
		formattedName = formattedName.slice(
			options.remove.length,
			formattedName.length,
		);
	}

	if (options.add) {
		formattedName = options.add + formattedName;
	}

	return formattedName;
};
