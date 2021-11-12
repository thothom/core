import { DateColumnOptions } from "../types/column-options";
import { getOptions } from "../helpers/get-options";
import { makeColumnDecorator } from "./helpers/make-column-decorator";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const UpdateDateColumn = <ColumnExtraMetadata = any>(
	options?: DateColumnOptions<ColumnExtraMetadata>,
) => {
	const { name, ...metadata } =
		getOptions<DateColumnOptions<ColumnExtraMetadata>>(options);

	return makeColumnDecorator({
		metadata: {
			...metadata,
			databaseName: name,
			autoGenerateOnlyOnEvents: ["insert", "update"],
			autoGenerate: "date",
		},
		acceptedTypes: ["string", "number", "date"],
	});
};
