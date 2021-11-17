/* eslint-disable @typescript-eslint/naming-convention */
import { Column } from "../../../../lib/decorators/columns/column";
import { Entity } from "../../../../lib/decorators/entities/entity";
import { PrimaryGeneratedColumn } from "../../../../lib/decorators/columns/primary-generated-column";
import { TestConnection } from "../../../constants/test-connection";
import { TestRepository } from "../../../constants/test-repository";

describe("Repository > Methods > beforeUpdate", () => {
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
		const result = repository.beforeUpdate({
			conditions: {
				id,
			},
			data: {
				foo: 1,
			},
		});

		expect(result).toStrictEqual({
			conditions: {
				ID: id,
			},
			data: {
				FOO: 1,
			},
		});
	});

	it("should auto-generate fields and convert to the database format (array)", () => {
		const result = repository.beforeUpdate({
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

		expect(result).toStrictEqual({
			conditions: [
				{
					ID: id,
				},
				{
					FOO: 2,
				},
			],
			data: {
				FOO: 1,
			},
		});
	});

	it("should do nothing with the options", () => {
		const result = repository.beforeUpdate({
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

		expect(result).toStrictEqual({
			conditions: {
				ID: id,
			},
			data: {
				FOO: 1,
			},
			options: {
				retries: 3,
			},
		});
	});
});
