import { Column } from "../../../lib/decorators/columns/column";
import { Entity } from "../../../lib/decorators/entities/entity";
import { PrimaryGeneratedColumn } from "../../../lib/decorators/columns/primary-generated-column";
import { TestConnection } from "../../constants/test-connection";
import { TestRepository } from "../../constants/test-repository";

describe("Repository > Methods > afterUpsert", () => {
	@Entity()
	class TestEntity {
		@PrimaryGeneratedColumn("uuid")
		public id: string;

		@Column()
		public foo: number;
	}

	let repository: TestRepository<TestEntity>;

	const id = "11cb020e-6dcb-4c51-93ed-a7a6abbfc771";

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
		const result = repository.afterUpsert({
			conditions: {
				id,
			},
			data: {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				ID: id,
				// eslint-disable-next-line @typescript-eslint/naming-convention
				FOO: 1,
			},
		});

		expect(result).toStrictEqual([
			{
				id,
				foo: 1,
			},
		]);
	});

	it("should convert fields to the entity format (conditions array)", () => {
		const result = repository.afterUpsert({
			conditions: [
				{
					id,
				},
				{
					foo: 2,
				},
			],
			data: {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				ID: id,
				// eslint-disable-next-line @typescript-eslint/naming-convention
				FOO: 1,
			},
		});

		expect(result).toStrictEqual([
			{
				id,
				foo: 1,
			},
		]);
	});

	it("should convert fields to the entity format (data array)", () => {
		const result = repository.afterUpsert({
			conditions: {
				id,
			},
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
