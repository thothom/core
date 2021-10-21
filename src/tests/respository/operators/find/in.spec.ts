import { In } from "../../../../lib/repository/operators/find/in";

describe("Repository > FindOperators > In", () => {
	it("should create a In operator", () => {
		const operator = In([1, 10]);

		expect(operator.type).toBe("in");
		expect(operator.values).toStrictEqual([1, 10]);
		expect(operator.not).toBeUndefined();
	});
});
