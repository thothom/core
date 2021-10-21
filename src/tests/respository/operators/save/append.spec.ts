import { Append } from "../../../../lib/repository/operators/save/append";

describe("Repository > SaveOperators > Append", () => {
	it("should create a Append operator", () => {
		const operator = Append(1);

		expect(operator.type).toBe("append");
		expect(operator.values).toStrictEqual([1]);
	});
});
