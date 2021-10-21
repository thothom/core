import { LessThanOrEqual } from "../../../../lib/repository/operators/find/less-than-or-equal";

describe("Repository > FindOperators > LessThanOrEqual", () => {
	it("should create a LessThanOrEqual operator", () => {
		const operator = LessThanOrEqual(1);

		expect(operator.type).toBe("lessThanOrEqual");
		expect(operator.values).toStrictEqual([1]);
		expect(operator.not).toBeUndefined();
	});
});
