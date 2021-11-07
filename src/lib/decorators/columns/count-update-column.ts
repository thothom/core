import { BaseColumnOptions, DateColumnOptions } from "../types/column-options";
import { getOptions } from "../helpers/get-options";
import { makeColumnDecorator } from "./helpers/make-column-decorator";
import { Plus } from "../../repository/operators/save/plus";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CountUpdateColumn = <ColumnExtraMetadata = any>(
	options?: BaseColumnOptions<ColumnExtraMetadata>,
) => {
	const { name, ...metadata } =
		getOptions<DateColumnOptions<ColumnExtraMetadata>>(options);

	return makeColumnDecorator({
		metadata: {
			...metadata,
			databaseName: name,
			autoGenerateOnlyOnEvents: ["update"],
			// eslint-disable-next-line @typescript-eslint/no-magic-numbers
			autoGenerate: Plus(1),
		},
		acceptedTypes: ["number"],
	});
};
