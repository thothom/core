import { HandlePrefixSuffixParams } from "./types";

export const handlePrefixFromCodeToDatabase = ({
	value,
	options,
}: Omit<HandlePrefixSuffixParams, "defaultCase">) => {
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
