import { METADATA_PREFIX } from "../../../config";
import { MetadataUtil } from "../../../lib/utils/metadata-util";

describe("Utils > MetadataUtil > defineEntityMetadata", () => {
	describe("Valid metadata", () => {
		it("should define 'name' metadata", () => {
			const entity = class CustomClass {};

			MetadataUtil.defineEntityMetadata({
				entity,
				metadataKey: "name",
				metadataValue: "foo",
			});

			const result = Reflect.getMetadata(`${METADATA_PREFIX}name`, entity);

			expect(result).toBe("foo");
		});

		it("should define 'random' metadata", () => {
			const entity = class CustomClass {};

			MetadataUtil.defineEntityMetadata({
				entity,
				metadataKey: "random",
				metadataValue: "bar",
			});

			const result = Reflect.getMetadata(`${METADATA_PREFIX}random`, entity);

			expect(result).toBe("bar");
		});

		it("should define 'UPPERCASE' metadata with lowercase name", () => {
			const entity = class CustomClass {};

			MetadataUtil.defineEntityMetadata({
				entity,
				metadataKey: "UPPERCASE",
				metadataValue: "foobar",
			});

			const result = Reflect.getMetadata(`${METADATA_PREFIX}uppercase`, entity);

			expect(result).toBe("foobar");
		});
	});
});
