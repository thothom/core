import { StartsWith } from "../../../../lib/repository/operators/find/starts-with";

describe("Repository > FindOperators > StartsWith", () => {
	it("should create a StartsWith operator", () => {
		const operator = StartsWith("foo");

		expect(operator.type).toBe("startsWith");
		expect(operator.values).toStrictEqual(["foo"]);
		expect(operator.not).toBeUndefined();
	});
});
