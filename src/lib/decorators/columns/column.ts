import { ColumnOptions } from "../types/column-options";
import { MetadataType } from "../../entity-manager/types/metadata-type";
import { makeColumnDecorator } from "./helpers/make-column-decorator";
import { getOptions } from "../@helpers/get-options";
import { MetadataUtil } from "../../utils/metadata-util";
import { getDefaultValue } from "./helpers/get-default-value";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Column = <ColumnExtraMetadata = any>(
	typeOrOptions?: ColumnOptions<ColumnExtraMetadata> | MetadataType,
) => {
	const { name, type, defaultValue, ...metadata } =
		getOptions<ColumnOptions>(typeOrOptions);

	const suggestedType =
		type ||
		(MetadataUtil.isMetadataType(typeOrOptions)
			? (typeOrOptions as MetadataType)
			: undefined);

	const autoGenerationProps = getDefaultValue(defaultValue);

	return makeColumnDecorator({
		metadata: {
			...metadata,
			...autoGenerationProps,
			databaseName: name,
		},
		suggestedType,
	});
};
