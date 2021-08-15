import { StartsWith } from "../../../../lib/repository/queries/find-operators/starts-with";

describe("Repository > Queries > Find > Operators > StartsWith", () => {
	it("should create a StartsWith operator", () => {
		const operator = StartsWith("foo");

		expect(operator.type).toBe("startsWith");
		expect(operator.values).toStrictEqual(["foo"]);
		expect(operator.not).toBeUndefined();
	});
});
