/* eslint-disable @typescript-eslint/no-var-requires */
import { PrimaryGeneratedColumnStrategy } from "..";
import { SymbiosisError } from "../../../error";
import { SymbiosisErrorCodeEnum } from "../../../error/types/error-code.enum";
import { PrimaryGeneratedColumnOptions } from "../../types/column-options";

interface GetStrategyParams {
	entityPrototype: any;
	propertyName: string;
	strategyOrOptions?:
		| PrimaryGeneratedColumnOptions
		| PrimaryGeneratedColumnStrategy;
}

const getStrategyName = (
	strategyOrOptions: GetStrategyParams["strategyOrOptions"],
) => {
	if (typeof strategyOrOptions === "string") {
		return strategyOrOptions;
	}

	if (strategyOrOptions?.strategy) {
		return strategyOrOptions.strategy;
	}

	/**
	 * Default Strategy
	 */
	return "uuid";
};

export const getStrategy = ({
	strategyOrOptions,
	entityPrototype,
	propertyName,
}: GetStrategyParams) => {
	const strategyName = getStrategyName(strategyOrOptions);

	switch (strategyName) {
		case "uuid": {
			// eslint-disable-next-line @typescript-eslint/no-require-imports
			const { v4 } = require("uuid");

			return v4;
		}
		default:
			throw new SymbiosisError({
				message: "Invalid Strate To Auto Generation",
				code: SymbiosisErrorCodeEnum.INVALID_PARAM,
				origin: "SYMBIOSIS",
				details: [
					`Entity: ${entityPrototype.constructor.name}`,
					`Column: ${propertyName}`,
				],
			});
	}
};
