import { MetadataUtil } from "../../../lib/utils/metadata-util";

describe("Utils > MetadataUtil > defineAllEntityMetadata", () => {
	describe("Valid metadata", () => {
		it("should get mandatory metadata", () => {
			const entity = class CustomClass {};

			const metadata = {
				name: "foo",
				databaseName: "foo",
				columns: [],
			};

			MetadataUtil.defineAllEntityMetadata({
				entity,
				metadata,
			});

			const result = MetadataUtil.getAllEntityMetadata({
				entity,
			});

			expect(result).toStrictEqual(metadata);
		});

		it("should get mandatory and optional metadata", () => {
			const entity = class CustomClass {};

			const metadata = {
				name: "foo",
				databaseName: "foo",
				columns: [],
				isSubEntity: true,
				extras: {},
			};

			MetadataUtil.defineAllEntityMetadata({
				entity,
				metadata,
			});

			const result = MetadataUtil.getAllEntityMetadata({
				entity,
			});

			expect(result).toStrictEqual(metadata);
		});

		it("should get optional metadata even if the value = `false`", () => {
			const entity = class CustomClass {};

			const metadata = {
				name: "foo",
				databaseName: "foo",
				columns: [],
				isSubEntity: false,
				extras: {},
			};

			MetadataUtil.defineAllEntityMetadata({
				entity,
				metadata,
			});

			const result = MetadataUtil.getAllEntityMetadata({
				entity,
			});

			expect(result).toStrictEqual(metadata);
		});
	});
});
