import { CosmosError } from "../../../error";
import { CosmosErrorCodeEnum } from "../../../error/types/error-code.enum";
import { FindOperator } from "./base";
import { FindOperatorType } from "./base/find-operators-type";

type AcceptedTypes = Date | number | string;

const handleTypeError = (type: FindOperatorType) => {
	const ERROR_MESSAGE = "Incorrect use of NOT operator";

	switch (type) {
		case "lessThan":
			throw new CosmosError({
				message: ERROR_MESSAGE,
				code: CosmosErrorCodeEnum.INVALID_PARAM,
				origin: "COSMOS",
				details: [
					"Not operator should not be used with LessThan operator, use MoreThanOrEqual operator instead",
				],
			});
		case "lessThanOrEqual":
			throw new CosmosError({
				message: ERROR_MESSAGE,
				code: CosmosErrorCodeEnum.INVALID_PARAM,
				origin: "COSMOS",
				details: [
					"Not operator should not be used with LessThanOrEqual operator, use MoreThan operator instead",
				],
			});
		case "moreThan":
			throw new CosmosError({
				message: ERROR_MESSAGE,
				code: CosmosErrorCodeEnum.INVALID_PARAM,
				origin: "COSMOS",
				details: [
					"Not operator should not be used with MoreThan operator, use LessThanOrEqual operator instead",
				],
			});
		case "moreThanOrEqual":
			throw new CosmosError({
				message: ERROR_MESSAGE,
				code: CosmosErrorCodeEnum.INVALID_PARAM,
				origin: "COSMOS",
				details: [
					"Not operator should not be used with LessThanOrEqual operator, use LessThan operator instead",
				],
			});
		case "not":
			throw new CosmosError({
				message: ERROR_MESSAGE,
				code: CosmosErrorCodeEnum.INVALID_PARAM,
				origin: "COSMOS",
				details: ["Not operator should not be used with Not operator"],
			});
		default:
			return;
	}
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Not = (value: AcceptedTypes | FindOperator) => {
	/**
	 * The `Not` operator accepts another FindOperator as param,
	 * so it can reverse the query, like this:
	 *
	 * ```ts
	 * Not(Between(foo, bar))
	 * ```
	 */
	if (value instanceof FindOperator) {
		handleTypeError(value.type);

		return new FindOperator({
			type: value.type,
			values: value.values,
			not: true,
		});
	}

	return new FindOperator({
		type: "not",
		values: [value],
	});
};
