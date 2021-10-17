import { Column } from "../../../lib/decorators/column";
import { Entity } from "../../../lib/decorators/entity/entity";
import { PrimaryGeneratedColumn } from "../../../lib/decorators/primary-generated-column";
import { TestConnection } from "../../constants/test-connection";
import { TestRepository } from "../../constants/test-repository";

describe("Repository > Methods > beforeRecover", () => {
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

	it("should convert 'where' option to the database format", () => {
		const result = repository.beforeRecover({
			where: {
				foo: 1,
			},
		});

		expect(result).toStrictEqual({
			where: {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				FOO: 1,
			},
		});
	});

	it("should do nothing with the options", () => {
		const result = repository.beforeRecover({
			where: {
				foo: 1,
			},
			options: {
				retries: 3,
			},
		});

		expect(result).toStrictEqual({
			where: {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				FOO: 1,
			},
			options: {
				retries: 3,
			},
		});
	});
});
