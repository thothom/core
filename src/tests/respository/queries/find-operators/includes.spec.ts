import { Includes } from "../../../../lib/repository/queries/find-operators/includes";

describe("Repository > Queries > Find > Operators > Includes", () => {
	it("should create a Includes operator", () => {
		const operator = Includes(["foo", 10]);

		expect(operator.type).toBe("includes");
		expect(operator.values).toStrictEqual(["foo", 10]);
		expect(operator.not).toBeUndefined();
	});
});
