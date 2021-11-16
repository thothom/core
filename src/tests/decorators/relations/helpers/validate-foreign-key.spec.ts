import { Column } from "../../../../lib/decorators/columns/column";
import { validateForeignKey } from "../../../../lib/decorators/relations/helpers/validate-foreign-key";
import { SymbiosisError } from "../../../../lib/error";

describe("Decorators > Relations > helpers > validateForeignKey", () => {
	const ERROR_MESSAGE = "Invalid Foreign Key";

	const DETAILS_ERROR_MESSAGE = 'Column "foo" does not exist in entity "Bar"';

	describe("Everything is fine", () => {
		class Foo {
			@Column()
			public foo: string;
		}

		class Bar {
			@Column()
			public bar: string;
		}

		it("should do nothing with foreign key at current entity", () => {
			let result: any;

			const foreignKey = "Foo.foo";

			try {
				result = validateForeignKey({
					currentEntity: Foo,
					targetEntity: Bar,
					foreignKey,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toBeUndefined();
		});

		it("should do nothing with foreign key at target entity", () => {
			let result: any;

			const foreignKey = "Bar.bar";

			try {
				result = validateForeignKey({
					currentEntity: Foo,
					targetEntity: Bar,
					foreignKey,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toBeUndefined();
		});
	});

	describe("Missing parts from foreign key", () => {
		class Foo {
			@Column()
			public foo: string;
		}

		class Bar {
			@Column()
			public bar: string;
		}

		it("should throw error (missing entity name)", () => {
			let result: any;

			const foreignKey = ".bar";

			try {
				result = validateForeignKey({
					currentEntity: Foo,
					targetEntity: Bar,
					foreignKey,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual(
				new SymbiosisError({
					code: "INVALID_PARAM",
					origin: "SYMBIOSIS",
					message: ERROR_MESSAGE,
					details: [
						`Foreign keys must follow the pattern "entityName.columnName", received "${foreignKey}"`,
					],
				}),
			);
		});

		it("should throw error (missing column name)", () => {
			let result: any;

			const foreignKey = "Foo.";

			try {
				result = validateForeignKey({
					currentEntity: Foo,
					targetEntity: Bar,
					foreignKey,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual(
				new SymbiosisError({
					code: "INVALID_PARAM",
					origin: "SYMBIOSIS",
					message: ERROR_MESSAGE,
					details: [
						`Foreign keys must follow the pattern "entityName.columnName", received "${foreignKey}"`,
					],
				}),
			);
		});

		it("should throw error (missing entity and column names)", () => {
			let result: any;

			const foreignKey = ".";

			try {
				result = validateForeignKey({
					currentEntity: Foo,
					targetEntity: Bar,
					foreignKey,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual(
				new SymbiosisError({
					code: "INVALID_PARAM",
					origin: "SYMBIOSIS",
					message: ERROR_MESSAGE,
					details: [
						`Foreign keys must follow the pattern "entityName.columnName", received "${foreignKey}"`,
					],
				}),
			);
		});

		it("should throw error (missing dot)", () => {
			let result: any;

			const foreignKey = "Foobar";

			try {
				result = validateForeignKey({
					currentEntity: Foo,
					targetEntity: Bar,
					foreignKey,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual(
				new SymbiosisError({
					code: "INVALID_PARAM",
					origin: "SYMBIOSIS",
					message: ERROR_MESSAGE,
					details: [
						`Foreign keys must follow the pattern "entityName.columnName", received "${foreignKey}"`,
					],
				}),
			);
		});
	});

	describe("Invalid foreign key (current entity)", () => {
		class Foo {
			@Column()
			public foo: string;
		}

		class Bar {
			@Column()
			public bar: string;
		}

		it("should throw error with invalid column", () => {
			let result: any;

			const foreignKey = "Foo.bar";

			try {
				result = validateForeignKey({
					currentEntity: Foo,
					targetEntity: Bar,
					foreignKey,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual(
				new SymbiosisError({
					code: "INVALID_PARAM",
					origin: "SYMBIOSIS",
					message: ERROR_MESSAGE,
					details: ['Column "bar" does not exist in entity "Foo"'],
				}),
			);
		});
	});

	describe("Invalid foreign key (target entity)", () => {
		class Foo {
			@Column()
			public foo: string;
		}

		class Bar {
			@Column()
			public bar: string;
		}

		it("should throw error with invalid column", () => {
			let result: any;

			const foreignKey = "Bar.foo";

			try {
				result = validateForeignKey({
					currentEntity: Foo,
					targetEntity: Bar,
					foreignKey,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual(
				new SymbiosisError({
					code: "INVALID_PARAM",
					origin: "SYMBIOSIS",
					message: ERROR_MESSAGE,
					details: [],
				}),
			);
		});
	});

	describe("Invalid entity", () => {
		class Foo {
			@Column()
			public foo: string;
		}

		class Bar {
			@Column()
			public bar: string;
		}

		it("should throw error with third entity", () => {
			let result: any;

			const foreignKey = "FooBar.foo";

			try {
				result = validateForeignKey({
					currentEntity: Foo,
					targetEntity: Bar,
					foreignKey,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual(
				new SymbiosisError({
					code: "INVALID_PARAM",
					origin: "SYMBIOSIS",
					message: ERROR_MESSAGE,
					details: [DETAILS_ERROR_MESSAGE],
				}),
			);
		});

		it("should throw error with invalid target entity", () => {
			let result: any;

			const foreignKey = "FooBar.foo";

			try {
				result = validateForeignKey({
					currentEntity: Foo,
					targetEntity: {} as any,
					foreignKey,
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual(
				new SymbiosisError({
					code: "INVALID_PARAM",
					origin: "SYMBIOSIS",
					message: ERROR_MESSAGE,
					details: [DETAILS_ERROR_MESSAGE],
				}),
			);
		});
	});
});
