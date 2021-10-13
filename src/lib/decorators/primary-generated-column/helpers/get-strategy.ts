/* eslint-disable @typescript-eslint/no-var-requires */
import { PrimaryGeneratedColumnStrategy } from "..";
import { SymbiosisError } from "../../../error";
import { SymbiosisErrorCodeEnum } from "../../../error/types/error-code.enum";
import { PrimaryGeneratedColumnOptions } from "../../types/column-options";

interface GetStrategyParams {
	/*
	 * This is done this way so that a unit test can be done to
	 * see what happens if the lib is not installed
	 */
	checkIfLibExists: (libName: string) => string;
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
	checkIfLibExists,
}: GetStrategyParams) => {
	const strategyName = getStrategyName(strategyOrOptions);

	switch (strategyName) {
		case "uuid": {
			try {
				checkIfLibExists("uuid");

				// eslint-disable-next-line @typescript-eslint/no-require-imports
				const { v4 } = require("uuid");

				return v4;
			} catch (_) {
				throw new SymbiosisError({
					code: SymbiosisErrorCodeEnum.INVALID_PARAM,
					message: "Invalid param",
					origin: "SYMBIOSIS",
					details: [
						'To use the "uuid" option, you need to install the "uuid" lib.',
						"Example: `yarn add uuid` OR `npm i --save uuid`",
					],
				});
			}
		}
		default:
			throw new SymbiosisError({
				message: "Invalid Strategy To Auto Generation",
				code: SymbiosisErrorCodeEnum.INVALID_PARAM,
				origin: "SYMBIOSIS",
				details: [
					`Entity: ${entityPrototype.constructor.name}`,
					`Column: ${propertyName}`,
				],
			});
	}
};
