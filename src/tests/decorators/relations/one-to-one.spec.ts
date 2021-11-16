import { MetadataUtil } from "../../..";
import { Column } from "../../../lib/decorators/columns/column";
import { Entity } from "../../../lib/decorators/entities/entity";
import { OneToOne } from "../../../lib/decorators/relations/one-to-one";

describe("Decorators > OneToOne", () => {
	it("should define relation", () => {
		@Entity()
		class Bar {
			@Column()
			public bar: string;
		}

		@OneToOne({
			targetEntity: Bar,
			relationMap: {
				foo: "bar",
			},
		})
		@Entity()
		class Foo {
			@Column()
			public foo: string;
		}

		const metadata = MetadataUtil.getAllEntityMetadata({
			entity: Foo,
		});

		expect(metadata).toStrictEqual({
			name: "Foo",
			databaseName: "Foo",
			columns: [
				{
					databaseName: "foo",
					name: "foo",
					type: String,
				},
			],
			relations: [
				{
					type: "ONE_TO_ONE",
					targetEntity: Bar,
					relationMap: {
						foo: "bar",
					},
				},
			],
		});
	});
});
