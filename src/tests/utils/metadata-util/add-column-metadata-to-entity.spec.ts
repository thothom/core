import { METADATA_PREFIX } from "../../../config";
import { MetadataUtil } from "../../../lib/utils/metadata-util";

describe("Utils > MetadataUtil > addColumnMetadataToEntity", () => {
	const COLUMNS_METADATA_KEY = `${METADATA_PREFIX}columns`;

	describe("Valid metadata", () => {
		it("should define mandatory metadata", () => {
			const entity = class CustomClass {};

			const metadata = {
				name: "foo",
				databaseName: "foo",
				type: String,
			};

			MetadataUtil.addColumnMetadataToEntity({
				entity,
				metadata,
			});

			const result = Reflect.getMetadata(COLUMNS_METADATA_KEY, entity);

			expect(result).toStrictEqual([metadata]);
		});

		it("should define mandatory and optional metadata", () => {
			const entity = class CustomClass {};

			const metadata = {
				name: "foo",
				databaseName: "foo",
				type: String,
				isArray: true,
				primary: true,
				extras: {},
			};

			MetadataUtil.addColumnMetadataToEntity({
				entity,
				metadata,
			});

			const result = Reflect.getMetadata(COLUMNS_METADATA_KEY, entity);

			expect(result).toStrictEqual([metadata]);
		});

		it("should define mandatory metadata filtering undefined values", () => {
			const entity = class CustomClass {};

			const metadata = {
				name: "foo",
				databaseName: "foo",
				type: String,
			};

			MetadataUtil.addColumnMetadataToEntity({
				entity,
				metadata: {
					...metadata,
					isArray: undefined,
				},
			});

			const result = Reflect.getMetadata(COLUMNS_METADATA_KEY, entity);

			expect(result).toStrictEqual([metadata]);
		});
	});

	describe("Valid metadata with previous value", () => {
		const entity = class CustomClass {};

		MetadataUtil.addColumnMetadataToEntity({
			entity,
			metadata: {
				name: "foo",
				databaseName: "foo",
				type: String,
			},
		});

		it("should define metadata without remove previous metadata", () => {
			const metadata = {
				name: "bar",
				databaseName: "bar",
				type: String,
			};

			MetadataUtil.addColumnMetadataToEntity({
				entity,
				metadata,
			});

			const result = Reflect.getMetadata(COLUMNS_METADATA_KEY, entity);

			expect(result).toStrictEqual([
				{
					name: "foo",
					databaseName: "foo",
					type: String,
				},
				metadata,
			]);
		});
	});
});
