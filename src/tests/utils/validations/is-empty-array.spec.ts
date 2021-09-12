import { isEmptyArray } from "../../../lib/utils/validations/is-empty-array";

describe("Utils > Validations > isEmptyArray", () => {
	describe("With empty array", () => {
		it("should return true", () => {
			const result = isEmptyArray([]);

			expect(result).toBe(true);
		});
	});

	describe("With invalid values", () => {
		it("should return false with no params", () => {
			const result = isEmptyArray();

			expect(result).toBe(false);
		});

		it("should return false with undefined", () => {
			const result = isEmptyArray(undefined);

			expect(result).toBe(false);
		});

		it("should return false with null", () => {
			const result = isEmptyArray(null);

			expect(result).toBe(false);
		});

		it("should return false with string", () => {
			const result = isEmptyArray("foo");

			expect(result).toBe(false);
		});

		it("should return false with number", () => {
			const result = isEmptyArray(123);

			expect(result).toBe(false);
		});

		it("should return false with empty object", () => {
			const result = isEmptyArray({});

			expect(result).toBe(false);
		});

		it("should return false with object", () => {
			const result = isEmptyArray({
				foo: "bar",
			});

			expect(result).toBe(false);
		});
	});

	describe("With arrays with items", () => {
		it("should return false with array with undefined values", () => {
			const result = isEmptyArray([undefined]);

			expect(result).toBe(false);
		});

		it("should return false with array with null values", () => {
			const result = isEmptyArray([null]);

			expect(result).toBe(false);
		});

		it("should return false with array with string values", () => {
			const result = isEmptyArray(["foo"]);

			expect(result).toBe(false);
		});

		it("should return false with array with number values", () => {
			const result = isEmptyArray([123]);

			expect(result).toBe(false);
		});

		it("should return false with array with empty objects values", () => {
			const result = isEmptyArray([{}]);

			expect(result).toBe(false);
		});

		it("should return false with array with objects values", () => {
			const result = isEmptyArray([
				{
					foo: "bar",
				},
			]);

			expect(result).toBe(false);
		});
	});
});
