import { MetadataUtil } from "../../..";
import { Column } from "../../../lib/decorators/columns/column";
import { Entity } from "../../../lib/decorators/entities/entity";
import { OneToOne } from "../../../lib/decorators/relations/one-to-one";

describe("Decorators > OneToOne", () => {
	describe("Everything is fine", () => {
		it("should define relation (foreign key on current entity)", () => {
			@Entity()
			class Bar {
				@Column()
				public id: string;
			}

			@Entity()
			class Foo {
				@Column()
				public barId: string;

				@OneToOne({
					relationMap: {
						columnName: "barId",
						targetColumnName: "id",
						foreignKeyEntity: "current",
					},
				})
				public bar: Bar;
			}

			const metadata = MetadataUtil.getAllEntityMetadata({
				entity: Foo,
			});

			expect(metadata).toStrictEqual({
				columns: [
					{
						databaseName: "barId",
						name: "barId",
						type: String,
					},
				],
				databaseName: "Foo",
				name: "Foo",
				relations: [
					{
						relationColumn: "bar",
						relationMap: [
							{
								columnName: "barId",
								foreignKeyEntity: "current",
								targetColumnName: "id",
							},
						],
						targetEntity: Bar,
						type: "ONE_TO_ONE",
					},
				],
			});
		});

		it("should define relation (foreign key on target entity)", () => {
			@Entity()
			class Bar {
				@Column()
				public fooId: string;
			}

			@Entity()
			class Foo {
				@Column()
				public id: string;

				@OneToOne({
					relationMap: {
						columnName: "id",
						targetColumnName: "fooId",
						foreignKeyEntity: "target",
					},
				})
				public bar: Bar;
			}

			const metadata = MetadataUtil.getAllEntityMetadata({
				entity: Foo,
			});

			expect(metadata).toStrictEqual({
				columns: [
					{
						databaseName: "id",
						name: "id",
						type: String,
					},
				],
				databaseName: "Foo",
				name: "Foo",
				relations: [
					{
						relationColumn: "bar",
						relationMap: [
							{
								columnName: "id",
								foreignKeyEntity: "target",
								targetColumnName: "fooId",
							},
						],
						targetEntity: Bar,
						type: "ONE_TO_ONE",
					},
				],
			});
		});
	});
});
