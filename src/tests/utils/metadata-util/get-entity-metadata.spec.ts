import { MetadataUtil } from "../../../lib/utils/metadata-util";

describe("Utils > MetadataUtil > getEntityMetadata", () => {
	const entity = class CustomClass {};
	const metadata = {
		name: "entity",
		databaseName: "entity",
		columns: [],
	};

	beforeAll(() => {
		MetadataUtil.defineAllEntityMetadata({
			entity,
			metadata,
		});
	});

	describe("Valid metadata", () => {
		it("should return 'name' metadata", () => {
			const result = MetadataUtil.getEntityMetadata({
				entity,
				metadataKey: "name",
			});

			expect(result).toBe(metadata.name);
		});

		it("should return 'databaseName' metadata", () => {
			const result = MetadataUtil.getEntityMetadata({
				entity,
				metadataKey: "databaseName",
			});

			expect(result).toBe(metadata.databaseName);
		});

		it("should return 'columns' metadata", () => {
			const result = MetadataUtil.getEntityMetadata({
				entity,
				metadataKey: "columns",
			});

			expect(result).toBe(metadata.columns);
		});
	});

	describe("Invalid metadata", () => {
		it("should return undefined if inexistent metadata", () => {
			const result = MetadataUtil.getEntityMetadata({
				entity,
				metadataKey: "foo",
			});

			expect(result).toBeUndefined();
		});
	});
});
