import { LessThan } from "../../../../lib/repository/queries/find-operators/less-than";

describe("Repository > Queries > Find > Operators > LessThan", () => {
	it("should create a LessThan operator", () => {
		const operator = LessThan(1);

		expect(operator.type).toBe("lessThan");
		expect(operator.values).toStrictEqual([1]);
		expect(operator.not).toBeUndefined();
	});
});
