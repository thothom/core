import { Like } from "../../../../lib/repository/queries/find-operators/like";

describe("Repository > Queries > Find > Operators > Like", () => {
	it("should create a Like operator", () => {
		const operator = Like("foo");

		expect(operator.type).toBe("like");
		expect(operator.values).toStrictEqual(["foo"]);
		expect(operator.not).toBeUndefined();
	});
});
