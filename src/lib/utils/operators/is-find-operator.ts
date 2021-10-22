import { FindOperator } from "../../repository/operators/find/base";

export const isFindOperator = (value: any) =>
	Boolean(
		value instanceof FindOperator ||
			/*
			 * This is done because of a bug that only happens in production (Transpiled JS)
			 * I couldn't test this, so I leave the alert here
			 */
			value?.constructor?.toString()?.startsWith(`class ${FindOperator.name}`),
	);
