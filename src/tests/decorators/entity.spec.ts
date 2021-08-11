import { Column } from "../../lib/decorators/column";
import { Entity } from "../../lib/decorators/entity/entity";
import { CompassError } from "../../lib/error";
import { CompassErrorCodeEnum } from "../../lib/error/types/error-code.enum";
import { MetadataUtil } from "../../lib/utils/metadata-util";

describe("Decorators > Entity", () => {
	describe("No Parameters", () => {
		it("should define basic data", () => {
			@Entity()
			class Test {
				@Column()
				public foo: string;
			}

			const metadata = MetadataUtil.getAllEntityMetadata({
				entity: Test,
			});

			expect(metadata).toStrictEqual({
				name: "Test",
				databaseName: "Test",
				columns: [
					{
						databaseName: "foo",
						name: "foo",
						type: String,
					},
				],
			});
		});
	});

	describe("Name Parameter", () => {
		it("should define database name based on param", () => {
			@Entity("SuperTest")
			class Test {
				@Column()
				public foo: string;
			}

			const metadata = MetadataUtil.getAllEntityMetadata({
				entity: Test,
			});

			expect(metadata).toStrictEqual({
				name: "Test",
				databaseName: "SuperTest",
				isNameAlreadyFormatted: true,
				columns: [
					{
						databaseName: "foo",
						name: "foo",
						type: String,
					},
				],
			});
		});
	});

	describe("Options Parameter", () => {
		it("should define database name based on options", () => {
			@Entity({
				name: "SuperTest",
			})
			class Test {
				@Column()
				public foo: string;
			}

			const metadata = MetadataUtil.getAllEntityMetadata({
				entity: Test,
			});

			expect(metadata).toStrictEqual({
				name: "Test",
				databaseName: "SuperTest",
				isNameAlreadyFormatted: true,
				columns: [
					{
						databaseName: "foo",
						name: "foo",
						type: String,
					},
				],
			});
		});

		it("should define database isSubEntity based on options", () => {
			@Entity({
				isSubEntity: true,
			})
			class Test {
				@Column()
				public foo: string;
			}

			const metadata = MetadataUtil.getAllEntityMetadata({
				entity: Test,
			});

			expect(metadata).toStrictEqual({
				name: "Test",
				databaseName: "Test",
				isSubEntity: true,
				columns: [
					{
						databaseName: "foo",
						name: "foo",
						type: String,
					},
				],
			});
		});

		it("should define database extras based on options", () => {
			@Entity({
				extras: {
					foo: "bar",
				},
			})
			class Test {
				@Column()
				public foo: string;
			}

			const metadata = MetadataUtil.getAllEntityMetadata({
				entity: Test,
			});

			expect(metadata).toStrictEqual({
				name: "Test",
				databaseName: "Test",
				extras: {
					foo: "bar",
				},
				columns: [
					{
						databaseName: "foo",
						name: "foo",
						type: String,
					},
				],
			});
		});
	});

	describe("General Errors", () => {
		it("should throw if entity doesn't have any columns", () => {
			let result;

			try {
				@Entity() // <- Decorator here!
				/**
				 * Because TypeScript Doesn't like variables that are unused
				 */
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-ignore
				class Test {}
			} catch (err) {
				result = err;
			}

			expect(result instanceof CompassError).toBe(true);
			expect(result.message).toBe("Entity must have at least one column");
			expect(result.code).toBe(CompassErrorCodeEnum.MISSING_DECORATOR);
			expect(result.origin).toBe("COMPASS");
			expect(result.details).toStrictEqual(["Entity: Test"]);
		});
	});
});
