import { validate } from "uuid";
import { Column } from "../../../lib/decorators/column";
import { Entity } from "../../../lib/decorators/entity/entity";
import { PrimaryGeneratedColumn } from "../../../lib/decorators/primary-generated-column";
import { beforeSave } from "../../../lib/repository/methods/before-save";
import { TestConnection } from "../../constants/test-connection";

describe("Repository > Methods > beforeSave", () => {
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

	it("should auto-generate fields and convert to the database format", () => {
		const result = beforeSave<TestEntity, void, void>(
			{
				entity: TestEntity,
				entityManager: connection.entityManager,
			},
			{
				data: {
					foo: 1,
				},
			},
		);

		expect(result).toStrictEqual({
			// eslint-disable-next-line @typescript-eslint/naming-convention
			ID: result.ID,
			// eslint-disable-next-line @typescript-eslint/naming-convention
			FOO: 1,
		});
		expect(typeof result.ID === "string").toBeTruthy();
		expect(validate(result.ID)).toBeTruthy();
	});
});
