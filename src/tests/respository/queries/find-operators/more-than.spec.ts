import { MoreThan } from "../../../../lib/repository/queries/find-operators/more-than";

describe("Repository > Queries > Find > Operators > MoreThan", () => {
	it("should create a MoreThan operator", () => {
		const operator = MoreThan(1);

		expect(operator.type).toBe("moreThan");
		expect(operator.values).toStrictEqual([1]);
		expect(operator.not).toBeUndefined();
	});
});
