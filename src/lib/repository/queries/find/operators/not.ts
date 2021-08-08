import { FindOperator } from "./base";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Not = <T>(value: FindOperator<T> | T) => {
	/**
	 * The `Not` operator accepts another FindOperator as param,
	 * so it can reverse the query, like this:
	 *
	 * ```ts
	 * Not(Between(foo, bar))
	 * ```
	 */
	if (value instanceof FindOperator) {
		return new FindOperator<T>({
			type: value.type,
			values: value.values,
			not: true,
		});
	}

	return new FindOperator<T>({
		type: "not",
		values: [value],
	});
};
