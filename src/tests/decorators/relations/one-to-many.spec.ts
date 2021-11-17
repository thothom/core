import { MetadataUtil } from "../../..";
import { Column } from "../../../lib/decorators/columns/column";
import { Entity } from "../../../lib/decorators/entities/entity";
import { OneToMany } from "../../../lib/decorators/relations/one-to-many";

describe("Decorators > OneToMany", () => {
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
