import { FormatPrefixSuffixParams } from "./types";

export const formatPrefix = ({
	value,
	options,
}: Omit<FormatPrefixSuffixParams, "defaultCase">) => {
	if (!options) return value;
	if (!options.remove && !options.add) return value;

	let formattedName = value;

	if (options.remove) {
		const prefixLength = options.remove.length;

		// eslint-disable-next-line @typescript-eslint/no-magic-numbers
		const initialLetters = formattedName.substr(0, prefixLength);

		if (initialLetters === options.remove) {
			formattedName = formattedName.substr(prefixLength);
		}
	}

	if (options.add) {
		formattedName = options.add + formattedName;
	}

	return formattedName;
};
