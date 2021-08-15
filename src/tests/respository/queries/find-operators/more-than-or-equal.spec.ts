import { MoreThanOrEqual } from "../../../../lib/repository/queries/find-operators/more-than-or-equal";

describe("Repository > Queries > Find > Operators > MoreThanOrEqual", () => {
	it("should create a MoreThanOrEqual operator", () => {
		const operator = MoreThanOrEqual(1);

		expect(operator.type).toBe("moreThanOrEqual");
		expect(operator.values).toStrictEqual([1]);
		expect(operator.not).toBeUndefined();
	});
});
