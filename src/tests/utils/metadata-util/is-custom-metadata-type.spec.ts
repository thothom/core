import { MetadataUtil } from "../../../lib/utils/metadata-util";

describe("Utils > MetadataUtil > isCustomMetadataType", () => {
	describe("Valid types", () => {
		it("should return false with custom class", () => {
			class CustomClass {}

			const result = MetadataUtil.isCustomMetadataType(CustomClass);

			expect(result).toBe(true);
		});

		it("should return false with custom class (random name)", () => {
			class XyzClass {}

			const result = MetadataUtil.isCustomMetadataType(XyzClass);

			expect(result).toBe(true);
		});
	});

	describe("Invalid Custom", () => {
		it("should return true with Number", () => {
			const result = MetadataUtil.isCustomMetadataType(Number);

			expect(result).toBe(false);
		});

		it("should return true with String", () => {
			const result = MetadataUtil.isCustomMetadataType(String);

			expect(result).toBe(false);
		});

		it("should return true with Date", () => {
			const result = MetadataUtil.isCustomMetadataType(Date);

			expect(result).toBe(false);
		});

		it("should return false with number", () => {
			const result = MetadataUtil.isCustomMetadataType(123);

			expect(result).toBe(false);
		});

		it("should return false with string", () => {
			const result = MetadataUtil.isCustomMetadataType("123");

			expect(result).toBe(false);
		});

		it("should return false with instance of date", () => {
			const result = MetadataUtil.isCustomMetadataType(new Date());

			expect(result).toBe(false);
		});

		it("should return false with instance of custom class", () => {
			class CustomClass {}

			const result = MetadataUtil.isCustomMetadataType(new CustomClass());

			expect(result).toBe(false);
		});
	});
});
