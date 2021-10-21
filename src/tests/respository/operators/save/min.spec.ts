import { Min } from "../../../../lib/repository/operators/save/min";

describe("Repository > SaveOperators > Min", () => {
	it("should create a Min operator", () => {
		const operator = Min(1);

		expect(operator.type).toBe("min");
		expect(operator.values).toStrictEqual([1]);
	});
});
