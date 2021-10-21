import { IsNull } from "../../../../lib/repository/operators/find/is-null";

describe("Repository > FindOperators > IsNull", () => {
	it("should create a IsNull operator", () => {
		const operator = IsNull();

		expect(operator.type).toBe("isNull");
		expect(operator.values).toStrictEqual([]);
		expect(operator.not).toBeUndefined();
	});
});
