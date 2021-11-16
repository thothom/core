import { MetadataUtil } from "../../..";
import { Column } from "../../../lib/decorators/columns/column";
import { Entity } from "../../../lib/decorators/entities/entity";
import { OneToOne } from "../../../lib/decorators/relations/one-to-one";

describe("Decorators > OneToOne", () => {
	it("should define relation (foreign key on current entity)", () => {
		@Entity()
		class Bar {
			@Column()
			public id: string;
		}

		@OneToOne({
			targetEntity: Bar,
			foreignKey: "Foo.barId",
			relationMap: {
				barId: "id",
			},
		})
		@Entity()
		class Foo {
			@Column()
			public barId: string;

			@Column()
			public bar: Bar;
		}

		const metadata = MetadataUtil.getAllEntityMetadata({
			entity: Foo,
		});

		expect(metadata).toStrictEqual({
			name: "Foo",
			databaseName: "Foo",
			columns: [
				{
					databaseName: "barId",
					name: "barId",
					type: String,
				},
				{
					databaseName: "bar",
					name: "bar",
					type: Bar,
				},
			],
			relations: [
				{
					type: "ONE_TO_ONE",
					foreignKey: "Foo.barId",
					targetEntity: Bar,
					relationMap: {
						barId: "id",
					},
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

		@OneToOne({
			targetEntity: Bar,
			foreignKey: "Bar.fooId",
			relationMap: {
				id: "fooId",
			},
		})
		@Entity()
		class Foo {
			@Column()
			public id: string;

			@Column()
			public bar: Bar;
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
				{
					databaseName: "bar",
					name: "bar",
					type: Bar,
				},
			],
			relations: [
				{
					type: "ONE_TO_ONE",
					foreignKey: "Bar.fooId",
					targetEntity: Bar,
					relationMap: {
						id: "fooId",
					},
				},
			],
		});
	});
});
