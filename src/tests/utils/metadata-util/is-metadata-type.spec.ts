import { MetadataUtil } from "../../../lib/utils/metadata-util";

describe("Utils > MetadataUtil > isMetadataType", () => {
	describe("Valid types", () => {
		it("should return true with Number", () => {
			const result = MetadataUtil.isMetadataType(Number);

			expect(result).toBe(true);
		});

		it("should return true with String", () => {
			const result = MetadataUtil.isMetadataType(String);

			expect(result).toBe(true);
		});

		it("should return true with Date", () => {
			const result = MetadataUtil.isMetadataType(Date);

			expect(result).toBe(true);
		});

		it("should return false with custom class", () => {
			class CustomClass {}

			const result = MetadataUtil.isMetadataType(CustomClass);

			expect(result).toBe(true);
		});

		it("should return false with custom class (random name)", () => {
			class XyzClass {}

			const result = MetadataUtil.isCustomMetadataType(XyzClass);

			expect(result).toBe(true);
		});
	});

	describe("Invalid types", () => {
		it("should return false with number", () => {
			const result = MetadataUtil.isMetadataType(123);

			expect(result).toBe(false);
		});

		it("should return false with string", () => {
			const result = MetadataUtil.isMetadataType("123");

			expect(result).toBe(false);
		});

		it("should return false with instance of date", () => {
			const result = MetadataUtil.isMetadataType(new Date());

			expect(result).toBe(false);
		});

		it("should return false with instance of custom class", () => {
			class CustomClass {}

			const result = MetadataUtil.isMetadataType(new CustomClass());

			expect(result).toBe(false);
		});
	});
});
