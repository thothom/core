import { PrimaryColumn } from "../../lib/decorators/primary-column";
import { CompassError } from "../../lib/error";
import { CompassErrorCodeEnum } from "../../lib/error/types/error-code.enum";
import { MetadataUtil } from "../../lib/utils/metadata-util";

describe("Decorators > PrimaryColumn", () => {
	describe("Implicitly Type", () => {
		it("should add column metadata correctly (string)", () => {
			class Test {
				@PrimaryColumn()
				public foo: string;
			}

			const metadata = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(metadata).toStrictEqual([
				{
					databaseName: "foo",
					primary: true,
					name: "foo",
					type: String,
				},
			]);
		});

		it("should add column metadata correctly (number)", () => {
			class Test {
				@PrimaryColumn()
				public foo: number;
			}

			const metadata = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(metadata).toStrictEqual([
				{
					databaseName: "foo",
					primary: true,
					name: "foo",
					type: Number,
				},
			]);
		});

		it("should add column metadata correctly (date)", () => {
			class Test {
				@PrimaryColumn()
				public foo: Date;
			}

			const metadata = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(metadata).toStrictEqual([
				{
					databaseName: "foo",
					primary: true,
					name: "foo",
					type: Date,
				},
			]);
		});
	});

	describe("Specified Name Parameter", () => {
		it("should define databaseName based on param", () => {
			class Test {
				@PrimaryColumn("superTest")
				public foo: string;
			}

			const metadata = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(metadata).toStrictEqual([
				{
					databaseName: "superTest",
					isNameAlreadyFormatted: true,
					primary: true,
					name: "foo",
					type: String,
				},
			]);
		});
	});

	describe("Specified DatabaseName At Decorator Options", () => {
		it("should define database name that is passed at the options", () => {
			class Test {
				@PrimaryColumn({
					name: "bar",
				})
				public foo: string;
			}

			const metadata = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(metadata).toStrictEqual([
				{
					databaseName: "bar",
					isNameAlreadyFormatted: true,
					primary: true,
					name: "foo",
					type: String,
				},
			]);
		});
	});

	describe("Specified Extras At Decorator Options", () => {
		it("should define extras that is passed at the options", () => {
			class Test {
				@PrimaryColumn({
					extras: {
						foo: "bar",
					},
				})
				public foo: string;
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
					primary: true,
					name: "foo",
					type: String,
				},
			]);
		});
	});

	describe("General Errors", () => {
		const ERROR_MESSAGE =
			"Primary columns can only have simple types, ARRAYS, OBJECTS and CLASSES aren't supported";
		const ERROR_DETAILS = ["Entity: Test", "Column: foo"];

		it("should throw an error if invalid type specified", () => {
			let result;

			try {
				/**
				 * Because TypeScript Doesn't like variables that are unused
				 */
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-ignore
				class Test {
					@PrimaryColumn()
					public foo: any;
				}
			} catch (err) {
				result = err;
			}

			expect(result instanceof CompassError).toBe(true);
			expect(result.message).toBe(ERROR_MESSAGE);
			expect(result.code).toBe(CompassErrorCodeEnum.INVALID_PARAM_TYPE);
			expect(result.origin).toBe("COMPASS");
			expect(result.details).toStrictEqual(ERROR_DETAILS);
		});

		it("should throw an error if complex type specified (array)", () => {
			let result;

			try {
				/**
				 * Because TypeScript Doesn't like variables that are unused
				 */
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-ignore
				class Test {
					@PrimaryColumn()
					public foo: Array<string>;
				}
			} catch (err) {
				result = err;
			}

			expect(result instanceof CompassError).toBe(true);
			expect(result.message).toBe(ERROR_MESSAGE);
			expect(result.code).toBe(CompassErrorCodeEnum.INVALID_PARAM_TYPE);
			expect(result.origin).toBe("COMPASS");
			expect(result.details).toStrictEqual(ERROR_DETAILS);
		});

		it("should throw an error if complex type specified (custom type)", () => {
			let result;

			try {
				class CustomType {}

				/**
				 * Because TypeScript Doesn't like variables that are unused
				 */
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-ignore
				class Test {
					@PrimaryColumn()
					public foo: CustomType;
				}
			} catch (err) {
				result = err;
			}

			expect(result instanceof CompassError).toBe(true);
			expect(result.message).toBe(ERROR_MESSAGE);
			expect(result.code).toBe(CompassErrorCodeEnum.INVALID_PARAM_TYPE);
			expect(result.origin).toBe("COMPASS");
			expect(result.details).toStrictEqual(ERROR_DETAILS);
		});
	});
});
