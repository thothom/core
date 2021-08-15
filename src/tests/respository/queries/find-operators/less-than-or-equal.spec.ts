import { LessThanOrEqual } from "../../../../lib/repository/queries/find-operators/less-than-or-equal";

describe("Repository > Queries > Find > Operators > LessThanOrEqual", () => {
	it("should create a LessThanOrEqual operator", () => {
		const operator = LessThanOrEqual(1);

		expect(operator.type).toBe("lessThanOrEqual");
		expect(operator.values).toStrictEqual([1]);
		expect(operator.not).toBeUndefined();
	});
});
