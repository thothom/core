import { Remove } from "../../../../lib/repository/operators/save/remove";

describe("Repository > SaveOperators > Remove", () => {
	it("should create a StartsWith operator", () => {
		const operator = Remove();

		expect(operator.type).toBe("remove");
		expect(operator.values).toStrictEqual([]);
	});
});
