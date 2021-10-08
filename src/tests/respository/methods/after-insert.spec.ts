import { Column } from "../../../lib/decorators/column";
import { Entity } from "../../../lib/decorators/entity/entity";
import { PrimaryGeneratedColumn } from "../../../lib/decorators/primary-generated-column";
import { TestConnection } from "../../constants/test-connection";
import { TestRepository } from "../../constants/test-repository";

describe("Repository > Methods > afterInsert", () => {
	@Entity()
	class TestEntity {
		@PrimaryGeneratedColumn("uuid")
		public id: string;

		@Column()
		public foo: number;
	}

	let repository: TestRepository<any>;
	const id = "11cb020e-6dcb-4c51-93ed-a7a6abbfc771";

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
		const result = repository.afterInsert({
			data: {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				ID: id,
				// eslint-disable-next-line @typescript-eslint/naming-convention
				FOO: 1,
			},
		});

		expect(result).toStrictEqual({
			id,
			foo: 1,
		});
	});

	it("should convert of fields to the entity format (array)", () => {
		const result = repository.afterInsert({
			data: [
				{
					// eslint-disable-next-line @typescript-eslint/naming-convention
					ID: id,
					// eslint-disable-next-line @typescript-eslint/naming-convention
					FOO: 1,
				},
			],
		});

		expect(result).toStrictEqual([
			{
				id,
				foo: 1,
			},
		]);
	});
});
