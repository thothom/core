import { isEmptyObject } from "../../../lib/utils/validations/is-empty-object";

describe("Utils > Validations > isFindOperator", () => {
	describe("With empty objects", () => {
		it("should return true", () => {
			const result = isEmptyObject({});

			expect(result).toBe(true);
		});
	});

	describe("With not empty objects", () => {
		it("should return false with object with value", () => {
			const result = isEmptyObject({
				foo: "bar",
			});

			expect(result).toBe(false);
		});

		it("should return false with object with undefined value", () => {
			const result = isEmptyObject({
				foo: undefined,
			});

			expect(result).toBe(false);
		});
	});
});
