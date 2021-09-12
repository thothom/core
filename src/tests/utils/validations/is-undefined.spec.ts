import { isUndefined } from "../../../lib/utils/validations/is-undefined";

describe("Utils > Validations > isUndefined", () => {
	describe("With empty array", () => {
		it("should return false", () => {
			const result = isUndefined([]);

			expect(result).toBe(false);
		});
	});

	describe("With undefined values", () => {
		it("should return true with no params", () => {
			const result = isUndefined();

			expect(result).toBe(true);
		});

		it("should return true with undefined", () => {
			const result = isUndefined(undefined);

			expect(result).toBe(true);
		});

		it("should return true with null", () => {
			const result = isUndefined(null);

			expect(result).toBe(true);
		});
	});

	describe("With non-undefined values", () => {
		it("should return false with string", () => {
			const result = isUndefined("foo");

			expect(result).toBe(false);
		});

		it("should return false with boolean (false)", () => {
			const result = isUndefined(false);

			expect(result).toBe(false);
		});

		it("should return false with boolean (true)", () => {
			const result = isUndefined(true);

			expect(result).toBe(false);
		});

		it("should return false with number", () => {
			const result = isUndefined(123);

			expect(result).toBe(false);
		});

		it("should return false with empty object", () => {
			const result = isUndefined({});

			expect(result).toBe(false);
		});

		it("should return false with object", () => {
			const result = isUndefined({
				foo: "bar",
			});

			expect(result).toBe(false);
		});
	});
});
