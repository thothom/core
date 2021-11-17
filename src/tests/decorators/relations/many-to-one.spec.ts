/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column } from "../../../lib/decorators/columns/column";
import { PrimaryColumn } from "../../../lib/decorators/columns/primary-column";
import { Entity } from "../../../lib/decorators/entities/entity";
import { ManyToOne } from "../../../lib/decorators/relations/many-to-one";
import { SymbiosisError } from "../../../lib/error";
import { MetadataUtil } from "../../../lib/utils/metadata-util";

describe("Decorators > ManyToOne", () => {
	describe("Everything is fine", () => {
		it("should define relation (single relation map)", () => {
			@Entity()
			class Bar {
				@Column()
				public id: string;
			}

			@Entity()
			class Foo {
				@Column()
				public barId: string;

				@ManyToOne({
					relationMap: {
						columnName: "barId",
						targetColumnName: "id",
					},
				})
				public bar: Bar;
			}

			const metadata = MetadataUtil.getAllEntityMetadata({
				entity: Foo,
			});

			expect(metadata).toStrictEqual({
				databaseName: "Foo",
				name: "Foo",
				columns: [
					{
						databaseName: "barId",
						name: "barId",
						type: String,
					},
				],
				relations: [
					{
						type: "MANY_TO_ONE",
						relationColumn: "bar",
						targetEntity: Bar,
						relationMap: [
							{
								columnName: "barId",
								targetColumnName: "id",
								foreignKeyEntity: "current",
							},
						],
					},
				],
			});
		});

		it("should define relation (array relation map)", () => {
			@Entity()
			class Bar {
				@Column()
				public id: string;
			}

			@Entity()
			class Foo {
				@Column()
				public barId: string;

				@ManyToOne({
					relationMap: [
						{
							columnName: "barId",
							targetColumnName: "id",
						},
					],
				})
				public bar: Bar;
			}

			const metadata = MetadataUtil.getAllEntityMetadata({
				entity: Foo,
			});

			expect(metadata).toStrictEqual({
				databaseName: "Foo",
				name: "Foo",
				columns: [
					{
						databaseName: "barId",
						name: "barId",
						type: String,
					},
				],
				relations: [
					{
						type: "MANY_TO_ONE",
						relationColumn: "bar",
						targetEntity: Bar,
						relationMap: [
							{
								columnName: "barId",
								targetColumnName: "id",
								foreignKeyEntity: "current",
							},
						],
					},
				],
			});
		});
	});

	describe("General errors", () => {
		const ERROR_MESSAGE = "Column type isn't supported";

		it("should throw error id column type is an array", () => {
			let result: any;

			try {
				@Entity()
				class SubTestEntity {
					@PrimaryColumn()
					public id: string;

					@Column()
					public testId: string;

					@Column({
						defaultValue: "FAKE-DATE",
					})
					public createdAt: string;
				}

				@Entity()
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-ignore
				class TestEntity {
					@PrimaryColumn()
					public id: string;

					@ManyToOne({
						relationMap: {
							columnName: "id",
							targetColumnName: "testId",
						},
					})
					public subTest: Array<SubTestEntity>;
				}
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual(
				new SymbiosisError({
					code: "INVALID_PARAM_TYPE",
					origin: "SYMBIOSIS",
					message: `${ERROR_MESSAGE}: "Column cannot be an array"`,
					details: ["Entity: TestEntity.name", "Column: subTest"],
				}),
			);
		});
	});
});
