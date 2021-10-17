import { Column } from "../../lib/decorators/column";
import { SymbiosisError } from "../../lib/error";
import { SymbiosisErrorCodeEnum } from "../../lib/error/types/error-code.enum";
import { MetadataUtil } from "../../lib/utils/metadata-util";
import {
	TestNumberEnum,
	TestStringEnum,
	TestUnknownEnum,
} from "../constants/test-enum";

describe("Decorators > Column", () => {
	describe("Implicitly Type", () => {
		it("should add column metadata correctly (string)", () => {
			class Test {
				@Column()
				public foo: string;
			}

			const metadata = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(metadata).toStrictEqual([
				{
					databaseName: "foo",
					name: "foo",
					type: String,
				},
			]);
		});

		it("should add column metadata correctly (number)", () => {
			class Test {
				@Column()
				public foo: number;
			}

			const metadata = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(metadata).toStrictEqual([
				{
					databaseName: "foo",
					name: "foo",
					type: Number,
				},
			]);
		});

		it("should add column metadata correctly (date)", () => {
			class Test {
				@Column()
				public foo: Date;
			}

			const metadata = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(metadata).toStrictEqual([
				{
					databaseName: "foo",
					name: "foo",
					type: Date,
				},
			]);
		});

		it("should add column metadata correctly (custom type)", () => {
			class CustomClass {}

			class Test {
				@Column()
				public foo: CustomClass;
			}

			const metadata = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(metadata).toStrictEqual([
				{
					databaseName: "foo",
					name: "foo",
					type: CustomClass,
				},
			]);
		});

		it("should add column metadata correctly (optional field)", () => {
			class Test {
				@Column()
				public foo?: string;
			}

			const metadata = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(metadata).toStrictEqual([
				{
					databaseName: "foo",
					name: "foo",
					type: String,
				},
			]);
		});
	});

	describe("Specified Type Unique Decorator Param", () => {
		it("should add column metadata correctly (array string)", () => {
			class Test {
				@Column(String)
				public foo: Array<string>;
			}

			const metadata = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(metadata).toStrictEqual([
				{
					databaseName: "foo",
					isArray: true,
					name: "foo",
					type: String,
				},
			]);
		});

		it("should add column metadata correctly (array number)", () => {
			class Test {
				@Column(Number)
				public foo: Array<number>;
			}

			const metadata = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(metadata).toStrictEqual([
				{
					databaseName: "foo",
					isArray: true,
					name: "foo",
					type: Number,
				},
			]);
		});

		it("should add column metadata correctly (array date)", () => {
			class Test {
				@Column(Date)
				public foo: Array<Date>;
			}

			const metadata = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(metadata).toStrictEqual([
				{
					databaseName: "foo",
					isArray: true,
					name: "foo",
					type: Date,
				},
			]);
		});

		it("should add column metadata correctly (array custom type)", () => {
			class CustomClass {}

			class Test {
				@Column(CustomClass)
				public foo: Array<CustomClass>;
			}

			const metadata = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(metadata).toStrictEqual([
				{
					databaseName: "foo",
					isArray: true,
					name: "foo",
					type: CustomClass,
				},
			]);
		});
	});

	describe("Specified Type At Decorator Options", () => {
		it("should add column metadata correctly (array string)", () => {
			class Test {
				@Column({
					type: String,
				})
				public foo: Array<string>;
			}

			const metadata = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(metadata).toStrictEqual([
				{
					databaseName: "foo",
					isArray: true,
					name: "foo",
					type: String,
				},
			]);
		});

		it("should add column metadata correctly (array number)", () => {
			class Test {
				@Column({
					type: Number,
				})
				public foo: Array<number>;
			}

			const metadata = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(metadata).toStrictEqual([
				{
					databaseName: "foo",
					isArray: true,
					name: "foo",
					type: Number,
				},
			]);
		});

		it("should add column metadata correctly (array date)", () => {
			class Test {
				@Column({
					type: Date,
				})
				public foo: Array<Date>;
			}

			const metadata = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(metadata).toStrictEqual([
				{
					databaseName: "foo",
					isArray: true,
					name: "foo",
					type: Date,
				},
			]);
		});

		it("should ignore options type if is simple type", () => {
			class Test {
				@Column({
					type: Number,
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
					name: "foo",
					type: String,
				},
			]);
		});
	});

	describe("Specified DatabaseName At Decorator Options", () => {
		it("should define database name that is passed at the options", () => {
			class Test {
				@Column({
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
					name: "foo",
					type: String,
				},
			]);
		});
	});

	describe("Using Column Options", () => {
		it('should define "extras" that is passed at the options', () => {
			class Test {
				@Column({
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
					name: "foo",
					type: String,
				},
			]);
		});

		it('should define "defaultValue" that is passed at the options (raw value)', () => {
			class Test {
				@Column({
					defaultValue: true,
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
					defaultValue: true,
					name: "foo",
					type: String,
				},
			]);
		});

		it('should define "defaultValue" that is passed at the options (function value)', () => {
			const generateDefaultValue = () => "foo";

			class Test {
				@Column({
					defaultValue: generateDefaultValue,
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
					defaultValue: generateDefaultValue,
					name: "foo",
					type: String,
				},
			]);
		});

		it('should define "comment" that is passed at the options', () => {
			class Test {
				@Column({
					comment: "foo",
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
					comment: "foo",
					name: "foo",
					type: String,
				},
			]);
		});

		it('should define get values from "enum" that is passed at the options (enum Object-String)', () => {
			class Test {
				@Column({
					enum: TestStringEnum,
				})
				public foo: TestStringEnum;
			}

			const metadata = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(metadata).toStrictEqual([
				{
					databaseName: "foo",
					enumValues: ["FOO", "BAR"],
					name: "foo",
					type: String,
				},
			]);
		});

		it('should define get values from "enum" that is passed at the options (enum Object-Number)', () => {
			class Test {
				@Column({
					enum: TestNumberEnum,
				})
				public foo: TestNumberEnum;
			}

			const metadata = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(metadata).toStrictEqual([
				{
					databaseName: "foo",
					enumValues: [1, 2],
					name: "foo",
					type: Number,
				},
			]);
		});

		it('should define get values from "enum" that is passed at the options (enum String)', () => {
			enum StringEnum {
				FOO = "FOO",
			}

			class Test {
				@Column({
					enum: StringEnum,
				})
				public foo: StringEnum;
			}

			const metadata = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(metadata).toStrictEqual([
				{
					databaseName: "foo",
					enumValues: ["FOO"],
					name: "foo",
					type: String,
				},
			]);
		});

		it('should define get values from "enum" that is passed at the options (enum Number)', () => {
			enum NumberEnum {
				FOO = 1,
			}

			class Test {
				@Column({
					enum: NumberEnum,
				})
				public foo: NumberEnum;
			}

			const metadata = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(metadata).toStrictEqual([
				{
					databaseName: "foo",
					enumValues: ["FOO", 1],
					name: "foo",
					type: Number,
				},
			]);
		});
	});

	describe("General Errors", () => {
		const DEFAULT_DETAILS = ["Entity: Test", "Column: foo"];
		const ERROR_MESSAGE_INVALID_TYPE = "Column type isn't supported";

		it("should throw an error if is array and type isn't specified", () => {
			let result: any;

			try {
				/**
				 * Because TypeScript Doesn't like variables that are unused
				 */
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-ignore
				class Test {
					@Column()
					public foo: Array<string>;
				}
			} catch (err) {
				result = err;
			}

			expect(result instanceof SymbiosisError).toBeTruthy();
			expect(result.message).toBe("You must explicitly declare array types");
			expect(result.code).toBe(SymbiosisErrorCodeEnum.INVALID_PARAM_TYPE);
			expect(result.origin).toBe("SYMBIOSIS");
			expect(result.details).toStrictEqual(DEFAULT_DETAILS);
		});

		it("should throw an error if invalid type specified", () => {
			let result: any;

			try {
				class Test {
					@Column()
					public foo: any;
				}
			} catch (err) {
				result = err;
			}

			expect(result instanceof SymbiosisError).toBeTruthy();
			expect(result.message).toBe(ERROR_MESSAGE_INVALID_TYPE);
			expect(result.code).toBe(SymbiosisErrorCodeEnum.INVALID_PARAM_TYPE);
			expect(result.origin).toBe("SYMBIOSIS");
			expect(result.details).toStrictEqual(DEFAULT_DETAILS);
		});

		it("should throw an error if invalid type specified (enum Object-Unknown)", () => {
			let result: any;

			try {
				class Test {
					@Column({
						enum: TestUnknownEnum,
					})
					public foo: TestUnknownEnum;
				}
			} catch (err) {
				result = err;
			}

			expect(result instanceof SymbiosisError).toBeTruthy();
			expect(result.message).toBe(ERROR_MESSAGE_INVALID_TYPE);
			expect(result.code).toBe(SymbiosisErrorCodeEnum.INVALID_PARAM_TYPE);
			expect(result.origin).toBe("SYMBIOSIS");
			expect(result.details).toStrictEqual(DEFAULT_DETAILS);
		});

		it("should throw error if field has multiple types", () => {
			let result: any;

			try {
				class Test {
					@Column()
					public foo: number | string;
				}

				// eslint-disable-next-line @typescript-eslint/no-unused-expressions
				Test;
			} catch (err) {
				result = err;
			}

			expect(result instanceof SymbiosisError).toBeTruthy();
			expect(result.message).toBe("Column type isn't supported");
			expect(result.code).toBe(SymbiosisErrorCodeEnum.INVALID_PARAM_TYPE);
			expect(result.origin).toBe("SYMBIOSIS");
			expect(result.details).toStrictEqual(DEFAULT_DETAILS);
		});
	});
});
