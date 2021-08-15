import { EndsWith } from "../../../../lib/repository/queries/find-operators/ends-with";

describe("Repository > Queries > Find > Operators > EndsWith", () => {
	it("should create a EndsWith operator", () => {
		const operator = EndsWith("foo");

		expect(operator.type).toBe("endsWith");
		expect(operator.values).toStrictEqual(["foo"]);
		expect(operator.not).toBeUndefined();
	});
});
