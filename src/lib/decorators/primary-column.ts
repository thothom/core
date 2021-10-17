import { getTypeof } from "@techmmunity/utils";
import { PrimaryColumnOptions } from "./types/column-options";
import { makeColumnDecorator } from "./helpers/make-column-decorator";
import { getOptions } from "./helpers/get-options";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PrimaryColumn = (
	nameOrOptions?: PrimaryColumnOptions | string,
) => {
	const { extras, name: rawName } =
		getOptions<PrimaryColumnOptions>(nameOrOptions);

	const name =
		rawName ||
		(getTypeof(nameOrOptions) === "string"
			? (nameOrOptions as string)
			: undefined);

	return makeColumnDecorator({
		metadata: {
			extras,
			databaseName: name,
			primary: true,
		},
		acceptedTypes: ["string", "number"],
	});
};
