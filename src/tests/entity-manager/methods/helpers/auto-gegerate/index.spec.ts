import { SymbiosisError, SymbiosisErrorCodeEnum } from "../../../../..";
import { autoGenerate } from "../../../../../lib/entity-manager/methods/helpers/auto-generate";

describe("autoGenerate", () => {
	describe("With custom function", () => {
		it("should return the result of the function (with no params)", () => {
			const result: Record<string, any> = {};

			try {
				autoGenerate({
					acc: result,
					columnMetadata: {
						name: "foo",
						autoGenerate: () => "foo",
					} as any,
					connectionOptions: {
						entities: [],
					},
					entityMetadata: {} as any,
					entity: {} as any,
				});
			} catch (err) {
				result.err = err;
			}

			expect(result.err).toBeUndefined();
			expect(result.foo).toBe("foo");
		});

		it("should return the result of the function (with params)", () => {
			const result: Record<string, any> = {};

			try {
				autoGenerate({
					acc: result,
					connectionOptions: {
						entities: [],
						prefix: {
							entity: {
								add: "foo",
							},
						},
					},
					entityMetadata: {} as any,
					entity: {} as any,
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
				result.err = err;
			}

			expect(result.err).toBeUndefined();
			expect(result.foo).toBe("foo_foo");
		});
	});

	describe("General Errors", () => {
		it("should return the result of the function (with no params)", () => {
			let result: any;

			try {
				autoGenerate({
					acc: {},
					columnMetadata: {
						name: "foo",
						autoGenerate: "invalid-method",
					} as any,
					connectionOptions: {
						entities: [],
					},
					entityMetadata: {} as any,
					entity: { name: "Foo" } as any,
				});
			} catch (err) {
				result = err;
			}

			expect(result instanceof SymbiosisError).toBeTruthy();
			expect(result.message).toBe("Invalid auto generation method");
			expect(result.code).toBe(SymbiosisErrorCodeEnum.INVALID_PARAM);
			expect(result.origin).toBe("SYMBIOSIS");
			expect(result.details).toStrictEqual(["Entity: Foo", "Column: foo"]);
		});
	});
});
