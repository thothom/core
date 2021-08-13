import { isNotEmptyArray } from "../../../lib/utils/validations/is-not-empty-array";

describe("Utils > Validations > isNotEmptyArray", () => {
	describe("With empty array", () => {
		it("should return false", () => {
			const result = isNotEmptyArray([]);

			expect(result).toBe(false);
		});
	});

	describe("With invalid values", () => {
		it("should return false with no params", () => {
			const result = isNotEmptyArray();

			expect(result).toBe(false);
		});

		it("should return false with undefined", () => {
			const result = isNotEmptyArray(undefined);

			expect(result).toBe(false);
		});

		it("should return false with null", () => {
			const result = isNotEmptyArray(null);

			expect(result).toBe(false);
		});

		it("should return false with string", () => {
			const result = isNotEmptyArray("foo");

			expect(result).toBe(false);
		});

		it("should return false with number", () => {
			const result = isNotEmptyArray(123);

			expect(result).toBe(false);
		});

		it("should return false with empty object", () => {
			const result = isNotEmptyArray({});

			expect(result).toBe(false);
		});

		it("should return false with object", () => {
			const result = isNotEmptyArray({
				foo: "bar",
			});

			expect(result).toBe(false);
		});
	});

	describe("With arrays with items", () => {
		it("should return true with array with undefined values", () => {
			const result = isNotEmptyArray([undefined]);

			expect(result).toBe(true);
		});

		it("should return true with array with null values", () => {
			const result = isNotEmptyArray([null]);

			expect(result).toBe(true);
		});

		it("should return true with array with string values", () => {
			const result = isNotEmptyArray(["foo"]);

			expect(result).toBe(true);
		});

		it("should return true with array with number values", () => {
			const result = isNotEmptyArray([123]);

			expect(result).toBe(true);
		});

		it("should return true with array with empty objects values", () => {
			const result = isNotEmptyArray([{}]);

			expect(result).toBe(true);
		});

		it("should return true with array with objects values", () => {
			const result = isNotEmptyArray([
				{
					foo: "bar",
				},
			]);

			expect(result).toBe(true);
		});
	});
});
