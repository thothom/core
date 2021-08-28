import { Column } from "../../../lib/decorators/column";
import { Entity } from "../../../lib/decorators/entity/entity";
import { PrimaryGeneratedColumn } from "../../../lib/decorators/primary-generated-column";
import { afterSave } from "../../../lib/repository/methods/after-save";
import { TestConnection } from "../../constants/test-connection";

describe("Repository > Methods > afterSave", () => {
	@Entity()
	class TestEntity {
		@PrimaryGeneratedColumn("uuid")
		public id: string;

		@Column()
		public foo: number;
	}

	let connection: TestConnection;

	beforeAll(() => {
		connection = new TestConnection({
			entities: [TestEntity],
			namingStrategy: {
				column: "UPPER_CASE",
			},
		});
	});

	it("should convert fields to the entity format", () => {
		const result = afterSave<void, void>(
			{
				entity: TestEntity,
				entityManager: connection.entityManager,
			},
			{
				data: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					ID: "11cb020e-6dcb-4c51-93ed-a7a6abbfc771",
					// eslint-disable-next-line @typescript-eslint/naming-convention
					FOO: 1,
				},
			},
		);

		expect(result).toStrictEqual({
			id: "11cb020e-6dcb-4c51-93ed-a7a6abbfc771",
			foo: 1,
		});
	});
});
