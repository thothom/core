import { MetadataUtil } from "../../..";
import { Column } from "../../../lib/decorators/columns/column";
import { Entity } from "../../../lib/decorators/entities/entity";
import { ManyToOne } from "../../../lib/decorators/relations/many-to-one";

describe("Decorators > ManyToOne", () => {
	it("should define relation", () => {
		@Entity()
		class Bar {
			@Column()
			public id: string;
		}

		@ManyToOne({
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
					type: "MANY_TO_ONE",
					foreignKey: "Foo.barId",
					targetEntity: Bar,
					relationMap: {
						barId: "id",
					},
				},
			],
		});
	});
});
