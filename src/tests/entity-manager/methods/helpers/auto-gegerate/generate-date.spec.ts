import { generateDate } from "../../../../../lib/entity-manager/methods/helpers/auto-generate/generate-date";

describe("generateUuid", () => {
	describe("With valid type", () => {
		it("should return a ISO date", () => {
			let result: any;

			try {
				result = generateDate(String, { entities: [] });
			} catch (err) {
				result = err;
			}

			expect(typeof result).toBe("string");
		});

		it("should return a epoch count", () => {
			let result: any;

			try {
				result = generateDate(Number, { entities: [] });
			} catch (err) {
				result = err;
			}

			expect(typeof result).toBe("number");
		});

		it("should return a Date", () => {
			let result: any;

			try {
				result = generateDate(Date, { entities: [] });
			} catch (err) {
				result = err;
			}

			expect(result instanceof Date).toBeTruthy();
		});

		it("should return a Date (with any type)", () => {
			let result: any;

			try {
				result = generateDate(Array, { entities: [] });
			} catch (err) {
				result = err;
			}

			expect(result instanceof Date).toBeTruthy();
		});
	});
});
