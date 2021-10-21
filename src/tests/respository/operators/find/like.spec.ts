import { Like } from "../../../../lib/repository/operators/find/like";

describe("Repository > FindOperators > Like", () => {
	it("should create a Like operator", () => {
		const operator = Like("foo");

		expect(operator.type).toBe("like");
		expect(operator.values).toStrictEqual(["foo"]);
		expect(operator.not).toBeUndefined();
	});
});
