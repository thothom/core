import { Column } from "../../../lib/decorators/columns/column";
import { Entity } from "../../../lib/decorators/entity";
import { PrimaryGeneratedColumn } from "../../../lib/decorators/columns/primary-generated-column";
import { TestConnection } from "../../constants/test-connection";
import { TestRepository } from "../../constants/test-repository";

describe("Repository > Methods > afterFind", () => {
	@Entity()
	class TestEntity {
		@PrimaryGeneratedColumn("uuid")
		public id: string;

		@Column()
		public foo: number;
	}

	let repository: TestRepository<TestEntity>;
	const id = "11cb020e-6dcb-4c51-93ed-a7a6abbfc771";

	beforeAll(() => {
		const connection = new TestConnection({
			entities: [TestEntity],
			namingStrategy: {
				column: "UPPER_CASE",
			},
		});

		repository = new TestRepository<TestEntity>(
			connection.entityManager,
			connection.logger,
			TestEntity,
		);
	});

	it("should convert fields to the entity format", () => {
		const result = repository.afterFind({
			dataToReturn: [
				{
					// eslint-disable-next-line @typescript-eslint/naming-convention
					ID: id,
					// eslint-disable-next-line @typescript-eslint/naming-convention
					FOO: 1,
				},
			],
			conditions: {
				where: {
					id: "foo",
				},
			},
		});

		expect(result).toStrictEqual([
			{
				id,
				foo: 1,
			},
		]);
	});
});
