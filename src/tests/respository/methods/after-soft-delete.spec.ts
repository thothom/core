import { Column } from "../../../lib/decorators/columns/column";
import { Entity } from "../../../lib/decorators/entity";
import { PrimaryGeneratedColumn } from "../../../lib/decorators/columns/primary-generated-column";
import { TestConnection } from "../../constants/test-connection";
import { TestRepository } from "../../constants/test-repository";

describe("Repository > Methods > afterSoftDelete", () => {
	@Entity()
	class TestEntity {
		@PrimaryGeneratedColumn("uuid")
		public id: string;

		@Column()
		public foo: number;
	}

	let repository: TestRepository<TestEntity>;

	beforeAll(() => {
		const connection = new TestConnection({
			entities: [TestEntity],
			namingStrategy: {
				column: "UPPER_CASE",
			},
		});

		repository = new TestRepository(connection.entityManager, TestEntity);
	});

	it("should convert fields to the entity format", () => {
		const DELETED_COUNT = 1;

		const result = repository.afterSoftDelete({
			dataToReturn: DELETED_COUNT,
			where: {
				id: "foo",
			},
		});

		expect(result).toStrictEqual(DELETED_COUNT);
	});
});
