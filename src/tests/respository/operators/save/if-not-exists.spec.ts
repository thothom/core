import { IfNotExists } from "../../../../lib/repository/operators/save/if-not-exists";

describe("Repository > SaveOperators > IfNotExists", () => {
	it("should create a IfNotExists operator", () => {
		const operator = IfNotExists("abc");

		expect(operator.type).toBe("ifNotExists");
		expect(operator.values).toStrictEqual(["abc"]);
	});
});
