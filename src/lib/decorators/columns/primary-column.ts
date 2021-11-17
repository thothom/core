import { getTypeof } from "@techmmunity/utils";
import { PrimaryColumnOptions } from "../types/column-options";
import { makeColumnDecorator } from "./helpers/make-column-decorator";
import { getOptions } from "../@helpers/get-options";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PrimaryColumn = <ColumnExtraMetadata = any>(
	nameOrOptions?: PrimaryColumnOptions<ColumnExtraMetadata> | string,
) => {
	const { name: rawName, ...metadata } =
		getOptions<PrimaryColumnOptions<ColumnExtraMetadata>>(nameOrOptions);

	const name =
		rawName ||
		(getTypeof(nameOrOptions) === "string"
			? (nameOrOptions as string)
			: undefined);

	return makeColumnDecorator({
		metadata: {
			...metadata,
			databaseName: name,
			primary: true,
		},
		acceptedTypes: ["string", "number"],
	});
};
