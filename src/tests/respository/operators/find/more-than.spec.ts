import { MoreThan } from "../../../../lib/repository/operators/find/more-than";

describe("Repository > FindOperators > MoreThan", () => {
	it("should create a MoreThan operator", () => {
		const operator = MoreThan(1);

		expect(operator.type).toBe("moreThan");
		expect(operator.values).toStrictEqual([1]);
		expect(operator.not).toBeUndefined();
	});
});
