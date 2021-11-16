import { MetadataUtil } from "../../..";
import { Column } from "../../../lib/decorators/columns/column";
import { Entity } from "../../../lib/decorators/entities/entity";
import { OneToMany } from "../../../lib/decorators/relations/one-to-many";

describe("Decorators > OneToMany", () => {
	it("should define relation", () => {
		@Entity()
		class Bar {
			@Column()
			public fooId: string;
		}

		@OneToMany({
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

			@Column(Bar)
			public foo: Array<Bar>;
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
					databaseName: "foo",
					name: "foo",
					type: Bar,
					isArray: true,
				},
			],
			relations: [
				{
					type: "ONE_TO_MANY",
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
