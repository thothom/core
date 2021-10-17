import { ColumnOptions } from "./types/column-options";
import { MetadataType } from "../entity-manager/types/metadata-type";
import { makeColumnDecorator } from "./helpers/make-column-decorator";
import { getOptions } from "./helpers/get-options";
import { MetadataUtil } from "../..";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Column = (typeOrOptions?: ColumnOptions | MetadataType) => {
	const {
		extras,
		name,
		type,
		defaultValue,
		comment,
		enum: enumParam,
	} = getOptions<ColumnOptions>(typeOrOptions);

	const suggestedType =
		type ||
		(MetadataUtil.isMetadataType(typeOrOptions)
			? (typeOrOptions as MetadataType)
			: undefined);

	return makeColumnDecorator({
		metadata: {
			extras,
			comment,
			enum: enumParam,
			defaultValue,
			databaseName: name,
		},
		suggestedType,
	});
};
