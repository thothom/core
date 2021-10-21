import { LessThan } from "../../../../lib/repository/operators/find/less-than";

describe("Repository > FindOperators > LessThan", () => {
	it("should create a LessThan operator", () => {
		const operator = LessThan(1);

		expect(operator.type).toBe("lessThan");
		expect(operator.values).toStrictEqual([1]);
		expect(operator.not).toBeUndefined();
	});
});
