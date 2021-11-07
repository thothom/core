import { Column } from "../../../lib/decorators/columns/column";
import { SubEntity } from "../../../lib/decorators/entities/sub-entity";
import { SymbiosisError } from "../../../lib/error";
import { MetadataUtil } from "../../../lib/utils/metadata-util";

describe("Decorators > SubEntity", () => {
	describe("No Parameters", () => {
		it("should define basic data", () => {
			@SubEntity()
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
		it("should define database extras based on options", () => {
			@SubEntity({
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
				isSubEntity: true,
				isNameAlreadyFormatted: true,
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
			let result: any;

			try {
				@SubEntity() // <- Decorator here!
				/**
				 * Because TypeScript Doesn't like variables that are unused
				 */
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-ignore
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				class Test {}
			} catch (err) {
				result = err;
			}

			expect(result instanceof SymbiosisError).toBe(true);
			expect(result.message).toBe("Entity must have at least one column");
			expect(result.code).toBe("MISSING_DECORATOR");
			expect(result.origin).toBe("SYMBIOSIS");
			expect(result.details).toStrictEqual(["Entity: Test"]);
		});
	});
});
