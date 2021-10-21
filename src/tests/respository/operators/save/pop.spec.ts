import { Pop } from "../../../../lib/repository/operators/save/pop";

describe("Repository > SaveOperators > Pop", () => {
	it("should create a Pop operator", () => {
		const operator = Pop(1);

		expect(operator.type).toBe("pop");
		expect(operator.values).toStrictEqual([1]);
	});

	it("should create a Pop operator (with multiple params)", () => {
		const operator = Pop(1, 2, 3);

		expect(operator.type).toBe("pop");
		expect(operator.values).toStrictEqual([1, 2, 3]);
	});
});
