import { SaveOperator } from "../../repository/operators/save/base";

export const isSaveOperator = (value: any) =>
	Boolean(
		value instanceof SaveOperator ||
			/*
			 * This is done because of a bug that only happens in production (Transpiled JS)
			 * I couldn't test this, so I leave the alert here
			 */
			value?.constructor?.toString()?.startsWith(`class ${SaveOperator.name}`),
	);
