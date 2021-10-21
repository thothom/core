import { Plus } from "../../../../lib/repository/operators/save/plus";

describe("Repository > SaveOperators > Plus", () => {
	it("should create a Plus operator", () => {
		const operator = Plus(1);

		expect(operator.type).toBe("plus");
		expect(operator.values).toStrictEqual([1]);
	});
});
