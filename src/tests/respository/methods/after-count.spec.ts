import { Column } from "../../../lib/decorators/columns/column";
import { Entity } from "../../../lib/decorators/entities/entity";
import { PrimaryGeneratedColumn } from "../../../lib/decorators/columns/primary-generated-column";
import { TestConnection } from "../../constants/test-connection";
import { TestRepository } from "../../constants/test-repository";

describe("Repository > Methods > afterCount", () => {
	@Entity()
	class TestEntity {
		@PrimaryGeneratedColumn("uuid")
		public id: string;

		@Column()
		public foo: number;
	}

	let repository: TestRepository<TestEntity>;

	beforeAll(async () => {
		const connection = new TestConnection({
			entities: [TestEntity],
			namingStrategy: {
				column: "UPPER_CASE",
			},
		});
		await connection.load();

		repository = new TestRepository<TestEntity>(
			connection.entityManager,
			connection.logger,
			TestEntity,
		);
	});

	it("should convert fields to the entity format", () => {
		const COUNT = 1;

		const result = repository.afterCount({
			dataToReturn: COUNT,
			where: {
				id: "foo",
			},
		});

		expect(result).toStrictEqual(COUNT);
	});
});
