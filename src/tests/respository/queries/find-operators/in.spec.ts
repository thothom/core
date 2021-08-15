import { In } from "../../../../lib/repository/queries/find-operators/in";

describe("Repository > Queries > Find > Operators > In", () => {
	it("should create a In operator", () => {
		const operator = In([1, 10]);

		expect(operator.type).toBe("in");
		expect(operator.values).toStrictEqual([1, 10]);
		expect(operator.not).toBeUndefined();
	});
});
