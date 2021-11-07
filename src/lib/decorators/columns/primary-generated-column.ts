import { getTypeof } from "@techmmunity/utils";
import { PrimaryGeneratedColumnOptions } from "../types/column-options";
import { makeColumnDecorator } from "./helpers/make-column-decorator";
import { getOptions } from "../helpers/get-options";

type PrimaryColumnPreDefinedAutoGenerationMethods = "uuid";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PrimaryGeneratedColumn = <ColumnExtraMetadata = any>(
	strategyOrOptions?:
		| PrimaryColumnPreDefinedAutoGenerationMethods
		| PrimaryGeneratedColumnOptions<ColumnExtraMetadata>,
) => {
	const { name, ...metadata } =
		getOptions<PrimaryGeneratedColumnOptions<ColumnExtraMetadata>>(
			strategyOrOptions,
		);

	const autoGenerate =
		getTypeof(strategyOrOptions) === "string"
			? (strategyOrOptions as PrimaryColumnPreDefinedAutoGenerationMethods)
			: "uuid";

	return makeColumnDecorator({
		metadata: {
			...metadata,
			autoGenerate,
			databaseName: name,
			primary: true,
			autoGenerateOnlyOnEvents: ["save"],
		},
		acceptedTypes: ["string", "number"],
	});
};
