import { Between } from "../../../../lib/repository/operators/find/between";

describe("Repository > FindOperators > Between", () => {
	it("should create a Between operator", () => {
		const operator = Between(1, 10);

		expect(operator.type).toBe("between");
		expect(operator.values).toStrictEqual([1, 10]);
		expect(operator.not).toBeUndefined();
	});
});
