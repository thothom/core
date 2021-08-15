import { IsNull } from "../../../../lib/repository/queries/find-operators/is-null";

describe("Repository > Queries > Find > Operators > IsNull", () => {
	it("should create a IsNull operator", () => {
		const operator = IsNull();

		expect(operator.type).toBe("isNull");
		expect(operator.values).toStrictEqual([]);
		expect(operator.not).toBeUndefined();
	});
});
