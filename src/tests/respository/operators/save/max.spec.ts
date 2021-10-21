import { Max } from "../../../../lib/repository/operators/save/max";

describe("Repository > SaveOperators > Max", () => {
	it("should create a Max operator", () => {
		const operator = Max(1);

		expect(operator.type).toBe("max");
		expect(operator.values).toStrictEqual([1]);
	});
});
