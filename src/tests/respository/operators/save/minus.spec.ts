import { Minus } from "../../../../lib/repository/operators/save/minus";

describe("Repository > SaveOperators > Minus", () => {
	it("should create a Minus operator", () => {
		const operator = Minus(1);

		expect(operator.type).toBe("minus");
		expect(operator.values).toStrictEqual([1]);
	});
});
