import { EndsWith } from "../../../../lib/repository/operators/find/ends-with";

describe("Repository > FindOperators > EndsWith", () => {
	it("should create a EndsWith operator", () => {
		const operator = EndsWith("foo");

		expect(operator.type).toBe("endsWith");
		expect(operator.values).toStrictEqual(["foo"]);
		expect(operator.not).toBeUndefined();
	});
});
