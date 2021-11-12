import { Plus } from "../../..";
import { CountColumn } from "../../../lib/decorators/columns/count-column";
import { SymbiosisError } from "../../../lib/error";
import { MetadataUtil } from "../../../lib/utils/metadata-util";

describe("Decorators > CountUpdateColumn", () => {
	describe("Implicitly Type", () => {
		it("should add column metadata correctly (number)", () => {
			class Test {
				@CountColumn(["update"])
				public foo: number;
			}

			const metadata = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(metadata).toStrictEqual([
				{
					databaseName: "foo",
					autoGenerate: Plus(1),
					autoGenerateOnlyOnEvents: ["update"],
					name: "foo",
					type: Number,
				},
			]);
		});
	});

	describe("Specified DatabaseName At Decorator Options", () => {
		it("should define database name that is passed at the options", () => {
			class Test {
				@CountColumn({
					events: ["insert"],
					name: "bar",
				})
				public foo: number;
			}

			const metadata = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(metadata).toStrictEqual([
				{
					databaseName: "bar",
					isNameAlreadyFormatted: true,
					autoGenerate: Plus(1),
					autoGenerateOnlyOnEvents: ["insert"],
					name: "foo",
					type: Number,
				},
			]);
		});
	});

	describe("Specified Extras At Decorator Options", () => {
		it("should define extras that is passed at the options", () => {
			class Test {
				@CountColumn({
					events: ["update"],
					extras: {
						foo: "bar",
					},
				})
				public foo: number;
			}

			const metadata = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(metadata).toStrictEqual([
				{
					databaseName: "foo",
					extras: {
						foo: "bar",
					},
					autoGenerate: Plus(1),
					autoGenerateOnlyOnEvents: ["update"],
					name: "foo",
					type: Number,
				},
			]);
		});
	});

	describe("General Errors", () => {
		const ERROR_MESSAGE = "Column type isn't supported";
		const ERROR_DETAILS = ["Entity: Test", "Column: foo"];

		it("should throw an error if invalid type specified", () => {
			let result: any;

			try {
				/**
				 * Because TypeScript Doesn't like variables that are unused
				 */
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-ignore
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				class Test {
					@CountColumn(["delete"])
					public foo: any;
				}
			} catch (err) {
				result = err;
			}

			expect(result instanceof SymbiosisError).toBe(true);
			expect(result.message).toBe(ERROR_MESSAGE);
			expect(result.code).toBe("INVALID_PARAM_TYPE");
			expect(result.origin).toBe("SYMBIOSIS");
			expect(result.details).toStrictEqual(ERROR_DETAILS);
		});

		it("should throw an error if invalid type specified (string)", () => {
			let result: any;

			try {
				/**
				 * Because TypeScript Doesn't like variables that are unused
				 */
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-ignore
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				class Test {
					@CountColumn(["update"])
					public foo: string;
				}
			} catch (err) {
				result = err;
			}

			expect(result instanceof SymbiosisError).toBe(true);
			expect(result.message).toBe(ERROR_MESSAGE);
			expect(result.code).toBe("INVALID_PARAM_TYPE");
			expect(result.origin).toBe("SYMBIOSIS");
			expect(result.details).toStrictEqual(ERROR_DETAILS);
		});

		it("should throw an error if invalid type specified (date)", () => {
			let result: any;

			try {
				/**
				 * Because TypeScript Doesn't like variables that are unused
				 */
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-ignore
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				class Test {
					@CountColumn(["find"])
					public foo: Date;
				}
			} catch (err) {
				result = err;
			}

			expect(result instanceof SymbiosisError).toBe(true);
			expect(result.message).toBe(ERROR_MESSAGE);
			expect(result.code).toBe("INVALID_PARAM_TYPE");
			expect(result.origin).toBe("SYMBIOSIS");
			expect(result.details).toStrictEqual(ERROR_DETAILS);
		});

		it("should throw an error if complex type specified (array)", () => {
			let result: any;

			try {
				/**
				 * Because TypeScript Doesn't like variables that are unused
				 */
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-ignore
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				class Test {
					@CountColumn(["update"])
					public foo: Array<string>;
				}
			} catch (err) {
				result = err;
			}

			expect(result instanceof SymbiosisError).toBe(true);
			expect(result.message).toBe(ERROR_MESSAGE);
			expect(result.code).toBe("INVALID_PARAM_TYPE");
			expect(result.origin).toBe("SYMBIOSIS");
			expect(result.details).toStrictEqual(ERROR_DETAILS);
		});

		it("should throw an error if complex type specified (custom type)", () => {
			let result: any;

			try {
				class CustomType {}

				/**
				 * Because TypeScript Doesn't like variables that are unused
				 */
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-ignore
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				class Test {
					@CountColumn(["insert"])
					public foo: CustomType;
				}
			} catch (err) {
				result = err;
			}

			expect(result instanceof SymbiosisError).toBe(true);
			expect(result.message).toBe(ERROR_MESSAGE);
			expect(result.code).toBe("INVALID_PARAM_TYPE");
			expect(result.origin).toBe("SYMBIOSIS");
			expect(result.details).toStrictEqual(ERROR_DETAILS);
		});
	});
});
