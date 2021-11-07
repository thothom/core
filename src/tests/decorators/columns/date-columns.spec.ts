/* eslint-disable sonarjs/no-duplicate-string */

import { DeleteDateColumn } from "../../../lib/decorators/columns/delete-date-column";
import { SaveDateColumn } from "../../../lib/decorators/columns/save-date-column";
import { UpdateDateColumn } from "../../../lib/decorators/columns/update-date-column";
import { SymbiosisError } from "../../../lib/error";
import { MetadataUtil } from "../../../lib/utils/metadata-util";

describe("Decorators > DateColumns", () => {
	describe("Implicitly Type (DeleteDateColumn)", () => {
		it("should add column metadata correctly (string)", () => {
			class Test {
				@DeleteDateColumn()
				public createdAt: string;
			}

			const [columnMetadata] = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(columnMetadata).toStrictEqual(
				expect.objectContaining({
					name: "createdAt",
					databaseName: "createdAt",
					autoGenerateOnlyOnEvents: ["delete"],
					autoGenerate: "date",
					type: String,
				}),
			);
		});

		it("should add column metadata correctly (number)", () => {
			class Test {
				@DeleteDateColumn()
				public createdAt: number;
			}

			const [columnMetadata] = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(columnMetadata).toStrictEqual({
				name: "createdAt",
				databaseName: "createdAt",
				autoGenerateOnlyOnEvents: ["delete"],
				autoGenerate: "date",
				type: Number,
			});
		});

		it("should add column metadata correctly (date)", () => {
			class Test {
				@DeleteDateColumn()
				public createdAt: Date;
			}

			const [columnMetadata] = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(columnMetadata).toStrictEqual({
				name: "createdAt",
				databaseName: "createdAt",
				autoGenerateOnlyOnEvents: ["delete"],
				autoGenerate: "date",
				type: Date,
			});
		});
	});

	describe("Implicitly Type (SaveDateColumn)", () => {
		it("should add column metadata correctly (string)", () => {
			class Test {
				@SaveDateColumn()
				public createdAt: string;
			}

			const [columnMetadata] = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(columnMetadata).toStrictEqual({
				name: "createdAt",
				databaseName: "createdAt",
				autoGenerateOnlyOnEvents: ["save"],
				autoGenerate: "date",
				type: String,
			});
		});

		it("should add column metadata correctly (number)", () => {
			class Test {
				@SaveDateColumn()
				public createdAt: number;
			}

			const [columnMetadata] = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(columnMetadata).toStrictEqual({
				name: "createdAt",
				databaseName: "createdAt",
				autoGenerateOnlyOnEvents: ["save"],
				autoGenerate: "date",
				type: Number,
			});
		});

		it("should add column metadata correctly (date)", () => {
			class Test {
				@SaveDateColumn()
				public createdAt: Date;
			}

			const [columnMetadata] = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(columnMetadata).toStrictEqual({
				name: "createdAt",
				databaseName: "createdAt",
				autoGenerateOnlyOnEvents: ["save"],
				autoGenerate: "date",
				type: Date,
			});
		});
	});

	describe("Implicitly Type (UpdateDateColumn)", () => {
		it("should add column metadata correctly (string)", () => {
			class Test {
				@UpdateDateColumn()
				public createdAt: string;
			}

			const [columnMetadata] = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(columnMetadata).toStrictEqual({
				name: "createdAt",
				databaseName: "createdAt",
				autoGenerateOnlyOnEvents: ["save", "update"],
				autoGenerate: "date",
				type: String,
			});
		});

		it("should add column metadata correctly (number)", () => {
			class Test {
				@UpdateDateColumn()
				public createdAt: number;
			}

			const [columnMetadata] = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(columnMetadata).toStrictEqual({
				name: "createdAt",
				databaseName: "createdAt",
				autoGenerateOnlyOnEvents: ["save", "update"],
				autoGenerate: "date",
				type: Number,
			});
		});

		it("should add column metadata correctly (date)", () => {
			class Test {
				@UpdateDateColumn()
				public createdAt: Date;
			}

			const [columnMetadata] = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(columnMetadata).toStrictEqual({
				name: "createdAt",
				databaseName: "createdAt",
				autoGenerateOnlyOnEvents: ["save", "update"],
				autoGenerate: "date",
				type: Date,
			});
		});
	});

	describe("Passing Options", () => {
		it("should define database name and extras based on options (DeleteDateColumn)", () => {
			class Test {
				@DeleteDateColumn({
					name: "created_at",
					extras: {
						foo: "bar",
					},
				})
				public createdAt: string;
			}

			const [columnMetadata] = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(columnMetadata).toStrictEqual({
				name: "createdAt",
				databaseName: "created_at",
				isNameAlreadyFormatted: true,
				autoGenerateOnlyOnEvents: ["delete"],
				autoGenerate: "date",
				type: String,
				extras: {
					foo: "bar",
				},
			});
		});

		it("should define database name and extras based on options (SaveDateColumn)", () => {
			class Test {
				@SaveDateColumn({
					name: "created_at",
					extras: {
						foo: "bar",
					},
				})
				public createdAt: string;
			}

			const [columnMetadata] = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(columnMetadata).toStrictEqual({
				name: "createdAt",
				databaseName: "created_at",
				isNameAlreadyFormatted: true,
				autoGenerateOnlyOnEvents: ["save"],
				autoGenerate: "date",
				type: String,
				extras: {
					foo: "bar",
				},
			});
		});

		it("should define database name and extras based on options (UpdateDateColumn)", () => {
			class Test {
				@UpdateDateColumn({
					name: "created_at",
					extras: {
						foo: "bar",
					},
				})
				public createdAt: string;
			}

			const [columnMetadata] = MetadataUtil.getEntityMetadata({
				metadataKey: "columns",
				entity: Test,
			});

			expect(columnMetadata).toStrictEqual({
				name: "createdAt",
				databaseName: "created_at",
				isNameAlreadyFormatted: true,
				autoGenerateOnlyOnEvents: ["save", "update"],
				autoGenerate: "date",
				type: String,
				extras: {
					foo: "bar",
				},
			});
		});
	});

	describe("Errors", () => {
		it("should throw error if invalid type", () => {
			let result: any;

			try {
				class Test {
					@SaveDateColumn({
						name: "created_at",
					})
					public createdAt: Array<string>;
				}

				// eslint-disable-next-line @typescript-eslint/no-unused-expressions
				Test;
			} catch (err) {
				result = err;
			}

			expect(result instanceof SymbiosisError).toBe(true);
			expect(result.message).toBe("Column type isn't supported");
			expect(result.code).toBe("INVALID_PARAM_TYPE");
			expect(result.origin).toBe("SYMBIOSIS");
			expect(result.details).toStrictEqual([
				"Entity: Test",
				"Column: createdAt",
			]);
		});
	});
});
