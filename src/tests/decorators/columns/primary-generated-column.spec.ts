import { PrimaryGeneratedColumn } from "../../../lib/decorators/columns/primary-generated-column";
import { ThothError } from "../../../lib/error";

import { MetadataUtil } from "../../../lib/utils/metadata-util";

describe("Decorators > PrimaryGeneratedColumn", () => {
	describe("Implicitly Type", () => {
		it("should add column metadata correctly (string)", () => {
			class Test {
				@PrimaryGeneratedColumn()
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
					autoGenerate: "uuid",
					autoGenerateOnlyOnEvents: ["insert"],
					name: "foo",
					type: String,
				},
			]);
		});

		it("should add column metadata correctly (number)", () => {
			class Test {
				@PrimaryGeneratedColumn()
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
					autoGenerate: "uuid",
					autoGenerateOnlyOnEvents: ["insert"],
					name: "foo",
					type: Number,
				},
			]);
		});
	});

	describe("Specified Strategy At Decorator Params", () => {
		it("should define strategy that is passed as param", () => {
			class Test {
				@PrimaryGeneratedColumn("uuid")
				public foo: string;
			}

			const metadata = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(metadata).toStrictEqual([
				{
					databaseName: "foo",
					autoGenerate: "uuid",
					autoGenerateOnlyOnEvents: ["insert"],
					primary: true,
					name: "foo",
					type: String,
				},
			]);
		});

		it("should define function to auto-generate if it's passed as param", () => {
			const foo = () => "foo";

			class Test {
				@PrimaryGeneratedColumn(foo)
				public foo: string;
			}

			const metadata = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(metadata).toStrictEqual([
				{
					databaseName: "foo",
					autoGenerate: foo,
					autoGenerateOnlyOnEvents: ["insert"],
					primary: true,
					name: "foo",
					type: String,
				},
			]);
		});
	});

	describe("Specified Strategy At Decorator Options", () => {
		it("should define strategy that is passed at the options", () => {
			class Test {
				@PrimaryGeneratedColumn({
					strategy: "uuid",
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
					autoGenerate: "uuid",
					autoGenerateOnlyOnEvents: ["insert"],
					primary: true,
					name: "foo",
					type: String,
				},
			]);
		});

		it("should define function to auto-generate if it's passed as option", () => {
			const foo = () => "foo";

			class Test {
				@PrimaryGeneratedColumn({
					strategy: foo,
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
					autoGenerate: foo,
					autoGenerateOnlyOnEvents: ["insert"],
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
				@PrimaryGeneratedColumn({
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
					autoGenerate: "uuid",
					autoGenerateOnlyOnEvents: ["insert"],
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
				@PrimaryGeneratedColumn({
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
					autoGenerate: "uuid",
					autoGenerateOnlyOnEvents: ["insert"],
					name: "foo",
					type: String,
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
					@PrimaryGeneratedColumn()
					public foo: any;
				}
			} catch (err) {
				result = err;
			}

			expect(result instanceof ThothError).toBe(true);
			expect(result.message).toBe(ERROR_MESSAGE);
			expect(result.code).toBe("INVALID_PARAM_TYPE");
			expect(result.origin).toBe("THOTHOM");
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
					@PrimaryGeneratedColumn()
					public foo: Date;
				}
			} catch (err) {
				result = err;
			}

			expect(result instanceof ThothError).toBe(true);
			expect(result.message).toBe(ERROR_MESSAGE);
			expect(result.code).toBe("INVALID_PARAM_TYPE");
			expect(result.origin).toBe("THOTHOM");
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
					@PrimaryGeneratedColumn()
					public foo: Array<string>;
				}
			} catch (err) {
				result = err;
			}

			expect(result instanceof ThothError).toBe(true);
			expect(result.message).toBe(ERROR_MESSAGE);
			expect(result.code).toBe("INVALID_PARAM_TYPE");
			expect(result.origin).toBe("THOTHOM");
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
					@PrimaryGeneratedColumn()
					public foo: CustomType;
				}
			} catch (err) {
				result = err;
			}

			expect(result instanceof ThothError).toBe(true);
			expect(result.message).toBe(ERROR_MESSAGE);
			expect(result.code).toBe("INVALID_PARAM_TYPE");
			expect(result.origin).toBe("THOTHOM");
			expect(result.details).toStrictEqual(ERROR_DETAILS);
		});
	});
});
