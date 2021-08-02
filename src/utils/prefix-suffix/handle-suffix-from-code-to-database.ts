import { HandlePrefixSuffixParams } from "./types";

export const handleSuffixFromCodeToDatabase = ({
	value,
	options,
}: Omit<HandlePrefixSuffixParams, "defaultCase">) => {
	if (!options) return value;
	if (!options.remove && !options.add) return value;

	let formattedName = value;

	if (options.remove) {
		const columnLengthWithoutSuffix =
			formattedName.length - options.remove.length;

		formattedName = formattedName.slice(0, columnLengthWithoutSuffix);
	}

	if (options.add) {
		formattedName += options.add;
	}

	return formattedName;
};
