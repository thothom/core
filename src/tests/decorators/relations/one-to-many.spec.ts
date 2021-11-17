/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column } from "../../../lib/decorators/columns/column";
import { PrimaryColumn } from "../../../lib/decorators/columns/primary-column";
import { Entity } from "../../../lib/decorators/entities/entity";
import { OneToMany } from "../../../lib/decorators/relations/one-to-many";
import { SymbiosisError } from "../../../lib/error";
import { MetadataUtil } from "../../../lib/utils/metadata-util";

describe("Decorators > OneToMany", () => {
	describe("Everything is fine", () => {
		it("should define relation (single relation map)", () => {
			@Entity()
			class Bar {
				@Column()
				public fooId: string;
			}

			@Entity()
			class Foo {
				@Column()
				public id: string;

				@OneToMany({
					targetEntity: Bar,
					relationMap: {
						columnName: "id",
						targetColumnName: "fooId",
					},
				})
				public bar: Array<Bar>;
			}

			const metadata = MetadataUtil.getAllEntityMetadata({
				entity: Foo,
			});

			expect(metadata).toStrictEqual({
				name: "Foo",
				databaseName: "Foo",
				columns: [
					{
						databaseName: "id",
						name: "id",
						type: String,
					},
				],
				relations: [
					{
						type: "ONE_TO_MANY",
						relationColumn: "bar",
						targetEntity: Bar,
						relationMap: [
							{
								columnName: "id",
								targetColumnName: "fooId",
								foreignKeyEntity: "target",
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
				public fooId: string;
			}

			@Entity()
			class Foo {
				@Column()
				public id: string;

				@OneToMany({
					targetEntity: Bar,
					relationMap: [
						{
							columnName: "id",
							targetColumnName: "fooId",
						},
					],
				})
				public bar: Array<Bar>;
			}

			const metadata = MetadataUtil.getAllEntityMetadata({
				entity: Foo,
			});

			expect(metadata).toStrictEqual({
				name: "Foo",
				databaseName: "Foo",
				columns: [
					{
						databaseName: "id",
						name: "id",
						type: String,
					},
				],
				relations: [
					{
						type: "ONE_TO_MANY",
						relationColumn: "bar",
						targetEntity: Bar,
						relationMap: [
							{
								columnName: "id",
								targetColumnName: "fooId",
								foreignKeyEntity: "target",
							},
						],
					},
				],
			});
		});
	});

	describe("General errors", () => {
		const ERROR_MESSAGE = "Column type isn't supported";

		it("should throw error id column type is not an array", () => {
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

					@OneToMany({
						targetEntity: SubTestEntity,
						relationMap: {
							columnName: "id",
							targetColumnName: "testId",
						},
					})
					public subTest: SubTestEntity;
				}
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual(
				new SymbiosisError({
					code: "INVALID_PARAM_TYPE",
					origin: "SYMBIOSIS",
					message: `${ERROR_MESSAGE}: "Column must be an array"`,
					details: ["Entity: TestEntity.name", "Column: subTest"],
				}),
			);
		});
	});
});
