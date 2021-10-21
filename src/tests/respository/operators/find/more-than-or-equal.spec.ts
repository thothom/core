import { MoreThanOrEqual } from "../../../../lib/repository/operators/find/more-than-or-equal";

describe("Repository > FindOperators > MoreThanOrEqual", () => {
	it("should create a MoreThanOrEqual operator", () => {
		const operator = MoreThanOrEqual(1);

		expect(operator.type).toBe("moreThanOrEqual");
		expect(operator.values).toStrictEqual([1]);
		expect(operator.not).toBeUndefined();
	});
});
