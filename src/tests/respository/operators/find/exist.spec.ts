import { Exist } from "../../../../lib/repository/operators/find/exist";

describe("Repository > FindOperators > Exist", () => {
	it("should create a Exist operator", () => {
		const operator = Exist();

		expect(operator.type).toBe("exist");
		expect(operator.values).toStrictEqual([]);
		expect(operator.not).toBeUndefined();
	});
});
