import { METADATA_PREFIX } from "../../../config";
import { MetadataUtil } from "../../../lib/utils/metadata-util";

describe("Utils > MetadataUtil > defineAllEntityMetadata", () => {
	const METADATA_NAME_KEY = `${METADATA_PREFIX}name`;
	const METADATA_DATABASE_NAME_KEY = `${METADATA_PREFIX}databasename`;
	const METADATA_COLUMNS_KEY = `${METADATA_PREFIX}columns`;
	const METADATA_IS_SUB_ENTITY_KEY = `${METADATA_PREFIX}issubentity`;
	const METADATA_EXTRAS_KEY = `${METADATA_PREFIX}extras`;

	describe("Valid metadata", () => {
		it("should define mandatory metadata", () => {
			const entity = class CustomClass {};

			MetadataUtil.defineAllEntityMetadata({
				entity,
				metadata: {
					name: "foo",
					databaseName: "foo",
					columns: [],
				},
			});

			const name = Reflect.getMetadata(METADATA_NAME_KEY, entity);
			const databaseName = Reflect.getMetadata(
				METADATA_DATABASE_NAME_KEY,
				entity,
			);
			const columns = Reflect.getMetadata(METADATA_COLUMNS_KEY, entity);

			expect(name).toBe("foo");
			expect(databaseName).toBe("foo");
			expect(columns).toStrictEqual([]);
		});

		it("should define mandatory and optional metadata", () => {
			const entity = class CustomClass {};

			MetadataUtil.defineAllEntityMetadata({
				entity,
				metadata: {
					name: "foo",
					databaseName: "foo",
					columns: [],
					isSubEntity: true,
					extras: {},
				},
			});

			const name = Reflect.getMetadata(METADATA_NAME_KEY, entity);
			const databaseName = Reflect.getMetadata(
				METADATA_DATABASE_NAME_KEY,
				entity,
			);
			const columns = Reflect.getMetadata(METADATA_COLUMNS_KEY, entity);
			const isSubEntity = Reflect.getMetadata(
				METADATA_IS_SUB_ENTITY_KEY,
				entity,
			);
			const extras = Reflect.getMetadata(METADATA_EXTRAS_KEY, entity);

			expect(name).toBe("foo");
			expect(databaseName).toBe("foo");
			expect(columns).toStrictEqual([]);
			expect(isSubEntity).toBe(true);
			expect(extras).toStrictEqual({});
		});

		it("should define optional metadata even if the value = `false`", () => {
			const entity = class CustomClass {};

			MetadataUtil.defineAllEntityMetadata({
				entity,
				metadata: {
					name: "foo",
					databaseName: "foo",
					columns: [],
					isSubEntity: false,
					extras: {},
				},
			});

			const name = Reflect.getMetadata(METADATA_NAME_KEY, entity);
			const databaseName = Reflect.getMetadata(
				METADATA_DATABASE_NAME_KEY,
				entity,
			);
			const columns = Reflect.getMetadata(METADATA_COLUMNS_KEY, entity);
			const isSubEntity = Reflect.getMetadata(
				METADATA_IS_SUB_ENTITY_KEY,
				entity,
			);
			const extras = Reflect.getMetadata(METADATA_EXTRAS_KEY, entity);

			expect(name).toBe("foo");
			expect(databaseName).toBe("foo");
			expect(columns).toStrictEqual([]);
			expect(isSubEntity).toBe(false);
			expect(extras).toStrictEqual({});
		});
	});
});
