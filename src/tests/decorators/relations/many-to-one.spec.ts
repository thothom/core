import { MetadataUtil } from "../../..";
import { Column } from "../../../lib/decorators/columns/column";
import { Entity } from "../../../lib/decorators/entities/entity";
import { ManyToOne } from "../../../lib/decorators/relations/many-to-one";

describe("Decorators > ManyToOne", () => {
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
