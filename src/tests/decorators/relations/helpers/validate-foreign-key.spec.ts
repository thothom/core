import { Column } from "../../../../lib/decorators/columns/column";
import { validateForeignKey } from "../../../../lib/decorators/relations/helpers/validate-foreign-key";
import { SymbiosisError } from "../../../../lib/error";

describe("Decorators > Relations > helpers > validateForeignKey", () => {
	const ERROR_MESSAGE = "Invalid Foreign Key";

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

			try {
				result = validateForeignKey({
					currentEntity: Foo,
					targetEntity: Bar,
					relationMap: {
						columnName: "foo",
						targetColumnName: "bar",
						foreignKeyEntity: "current",
					},
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual([
				{
					columnName: "foo",
					foreignKeyEntity: "current",
					targetColumnName: "bar",
				},
			]);
		});

		it("should do nothing with foreign key at target entity", () => {
			let result: any;

			try {
				result = validateForeignKey({
					currentEntity: Foo,
					targetEntity: Bar,
					relationMap: {
						columnName: "foo",
						targetColumnName: "bar",
						foreignKeyEntity: "target",
					},
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual([
				{
					columnName: "foo",
					foreignKeyEntity: "target",
					targetColumnName: "bar",
				},
			]);
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

		it("should throw error (missing current entity column)", () => {
			let result: any;

			try {
				result = validateForeignKey({
					currentEntity: Foo,
					targetEntity: Bar,
					relationMap: {
						columnName: "notFoo",
						targetColumnName: "bar",
						foreignKeyEntity: "current",
					},
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual(
				new SymbiosisError({
					code: "INVALID_PARAM",
					origin: "SYMBIOSIS",
					message: ERROR_MESSAGE,
					details: [`Column "$notFoo" does not exist in entity "${Foo.name}"`],
				}),
			);
		});

		it("should throw error (missing target entity column)", () => {
			let result: any;

			try {
				result = validateForeignKey({
					currentEntity: Foo,
					targetEntity: Bar,
					relationMap: {
						columnName: "foo",
						targetColumnName: "notBar",
						foreignKeyEntity: "current",
					},
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual(
				new SymbiosisError({
					code: "INVALID_PARAM",
					origin: "SYMBIOSIS",
					message: ERROR_MESSAGE,
					details: [`Column "$notBar" does not exist in entity "${Bar.name}"`],
				}),
			);
		});
	});

	describe("Invalid foreign key", () => {
		class Foo {
			@Column()
			public foo: string;
		}

		class Bar {
			@Column()
			public bar: string;
		}

		it("should throw error with missing foreign key", () => {
			let result: any;

			try {
				result = validateForeignKey({
					currentEntity: Foo,
					targetEntity: Bar,
					relationMap: {
						columnName: "foo",
						targetColumnName: "bar",
					},
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual(
				new SymbiosisError({
					code: "INVALID_PARAM",
					origin: "SYMBIOSIS",
					message: "Invalid Foreign Key Entity",
					details: [
						'"foreignKeyEntity" must be "current" or "target", but received "undefined"',
					],
				}),
			);
		});
	});
});
