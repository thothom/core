import { IfNotExists } from "../../../../lib/repository/operators/save/if-not-exists";

describe("Repository > SaveOperators > IfNotExists", () => {
	it("should create a IfNotExists operator", () => {
		const operator = IfNotExists();

		expect(operator.type).toBe("if-not-exists");
		expect(operator.values).toStrictEqual([]);
	});
});
