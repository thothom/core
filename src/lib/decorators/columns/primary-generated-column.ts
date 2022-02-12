import { getTypeof } from "@techmmunity/utils";

import { getOptions } from "../@helpers/get-options";

import { makeColumnDecorator } from "./helpers/make-column-decorator";

import type { PrimaryGeneratedColumnOptions } from "../types/column-options";

type StrategyOrOptions<ColumnExtraMetadata> =
	| PrimaryGeneratedColumnOptions["strategy"]
	| PrimaryGeneratedColumnOptions<ColumnExtraMetadata>;

const getAutoGenerate = (strategyOrOptions?: StrategyOrOptions<any>) => {
	if (!strategyOrOptions || getTypeof(strategyOrOptions) === "object") {
		return (
			(strategyOrOptions as PrimaryGeneratedColumnOptions)?.strategy || "uuid"
		);
	}

	return strategyOrOptions as PrimaryGeneratedColumnOptions["strategy"];
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PrimaryGeneratedColumn = <ColumnExtraMetadata = any>(
	strategyOrOptions?: StrategyOrOptions<ColumnExtraMetadata>,
) => {
	const { name, ...metadata } =
		getOptions<PrimaryGeneratedColumnOptions<ColumnExtraMetadata>>(
			strategyOrOptions,
		);

	return makeColumnDecorator({
		metadata: {
			...metadata,
			autoGenerate: getAutoGenerate(strategyOrOptions),
			databaseName: name,
			primary: true,
			autoGenerateOnlyOnEvents: ["insert"],
		},
		acceptedTypes: ["string", "number"],
	});
};
