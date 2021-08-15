import { Exist } from "../../../../lib/repository/queries/find-operators/exist";

describe("Repository > Queries > Find > Operators > Exist", () => {
	it("should create a Exist operator", () => {
		const operator = Exist();

		expect(operator.type).toBe("exist");
		expect(operator.values).toStrictEqual([]);
		expect(operator.not).toBeUndefined();
	});
});
