/* eslint-disable @typescript-eslint/naming-convention */
import { validate } from "uuid";
import { Column } from "../../../lib/decorators/column";
import { Entity } from "../../../lib/decorators/entity/entity";
import { PrimaryGeneratedColumn } from "../../../lib/decorators/primary-generated-column";
import { TestConnection } from "../../constants/test-connection";
import { TestRepository } from "../../constants/test-repository";

describe("Repository > Methods > beforeUpsert", () => {
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

	it("should auto-generate fields and convert to the database format", () => {
		const result = repository.beforeUpsert({
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
				ID: result.data.ID,
				FOO: 1,
			},
		});
		expect(typeof result.data.ID === "string").toBeTruthy();
		expect(validate(result.data.ID)).toBeTruthy();
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
				ID: result.data?.ID,
				FOO: 1,
			},
		});
		expect(typeof result.data?.ID === "string").toBeTruthy();
		expect(validate(result.data?.ID)).toBeTruthy();
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

		expect(result).toStrictEqual({
			conditions: {
				ID: id,
			},
			data: {
				ID: result.data.ID,
				FOO: 1,
			},
			options: {
				retries: 3,
			},
		});
		expect(typeof result.data.ID === "string").toBeTruthy();
		expect(validate(result.data.ID)).toBeTruthy();
	});
});
