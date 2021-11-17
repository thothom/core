/* eslint-disable @typescript-eslint/naming-convention */
import { validate } from "uuid";
import { Column } from "../../../../lib/decorators/columns/column";
import { Entity } from "../../../../lib/decorators/entities/entity";
import { PrimaryGeneratedColumn } from "../../../../lib/decorators/columns/primary-generated-column";
import { TestConnection } from "../../../constants/test-connection";
import { TestRepository } from "../../../constants/test-repository";

describe("Repository > Methods > beforeUpsert", () => {
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

	it("should auto-generate fields and convert to the database format", () => {
		const result = repository.beforeUpsert({
			conditions: {
				id,
			},
			data: {
				foo: 1,
			},
		});

		expect(result).toHaveProperty("data");
		expect(result).toHaveProperty("conditions");
		expect(result.data).toStrictEqual({
			ID: result.data.ID,
			FOO: 1,
		});
		expect(result.conditions).toStrictEqual({
			ID: id,
		});
		expect(typeof result.data.ID === "string").toBeTruthy();
		expect(validate(result.data.ID as any)).toBeTruthy();
	});

	it("should auto-generate fields and convert to the database format (array)", () => {
		const result = repository.beforeUpsert({
			conditions: [
				{
					id,
				},
				{
					foo: 2,
				},
			],
			data: {
				foo: 1,
			},
		});

		expect(result).toHaveProperty("conditions");
		expect(result).toHaveProperty("data");
		expect(result.conditions).toStrictEqual([
			{
				ID: id,
			},
			{
				FOO: 2,
			},
		]);
		expect(typeof result.data?.ID === "string").toBeTruthy();
		expect(validate(result.data?.ID as any)).toBeTruthy();
	});

	it("should do nothing with the options", () => {
		const result = repository.beforeUpsert({
			conditions: {
				id,
			},
			data: {
				foo: 1,
			},
			options: {
				retries: 3,
			},
		});

		expect(result?.options).toStrictEqual({
			retries: 3,
		});
	});
});
