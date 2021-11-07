import { autoGenerate } from "../../../../../lib/entity-manager/methods/helpers/auto-generate";

describe("autoGenerate", () => {
	describe("With custom function", () => {
		it("should return the result of the function (with no params)", () => {
			let result: any;

			try {
				result = autoGenerate({
					columnMetadata: {
						name: "foo",
						autoGenerate: () => "foo",
					} as any,
					connectionOptions: {
						entities: [],
					},
					entityMetadata: {} as any,
				});
			} catch (err) {
				result = err;
			}

			expect(result).toBe("foo");
		});

		it("should return the result of the function (with params)", () => {
			let result: any;

			try {
				result = autoGenerate({
					connectionOptions: {
						entities: [],
						prefix: {
							entity: {
								add: "foo",
							},
						},
					},
					entityMetadata: {} as any,
					columnMetadata: {
						name: "foo",
						autoGenerate: ({
							connectionOptions,
							columnMetadata: colMetadata,
						}: any) =>
							`${colMetadata.name}_${connectionOptions.prefix.entity.add}`,
					} as any,
				});
			} catch (err) {
				result = err;
			}

			expect(result).toBe("foo_foo");
		});
	});
});
