import { validate } from "uuid";
import { Column } from "../../../lib/decorators/columns/column";
import { Entity } from "../../../lib/decorators/entity";
import { PrimaryGeneratedColumn } from "../../../lib/decorators/columns/primary-generated-column";
import { BaseQueryOptions } from "../../../lib/repository/types/query-options";
import { DatabaseEntity } from "../../../lib/types/database-entity";
import { TestConnection } from "../../constants/test-connection";
import { TestRepository } from "../../constants/test-repository";

describe("Repository > Methods > beforeInsert", () => {
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

		repository = new TestRepository<TestEntity>(
			connection.entityManager,
			TestEntity,
		);
	});

	it("should auto-generate fields and convert to the database format", () => {
		const result = repository.beforeInsert({
			data: {
				foo: 1,
			},
		}) as {
			data: DatabaseEntity;
			options: BaseQueryOptions | undefined;
		};

		expect(result).toHaveProperty("data");
		expect(result.data).toStrictEqual({
			// eslint-disable-next-line @typescript-eslint/naming-convention
			ID: result.data.ID,
			// eslint-disable-next-line @typescript-eslint/naming-convention
			FOO: 1,
		});
		expect(typeof result.data.ID === "string").toBeTruthy();
		expect(validate(result.data.ID)).toBeTruthy();
	});

	it("should auto-generate fields and convert to the database format (array)", () => {
		const result = repository.beforeInsert({
			data: [
				{
					foo: 1,
				},
			],
		}) as {
			data: Array<DatabaseEntity>;
			options: BaseQueryOptions | undefined;
		};

		expect(result).toHaveProperty("data");
		expect(result.data).toStrictEqual([
			{
				// eslint-disable-next-line @typescript-eslint/naming-convention
				ID: result.data[0].ID,
				// eslint-disable-next-line @typescript-eslint/naming-convention
				FOO: 1,
			},
		]);
		expect(typeof result.data[0].ID === "string").toBeTruthy();
		expect(validate(result.data[0].ID)).toBeTruthy();
	});

	it("should do nothing with the options", () => {
		const result = repository.beforeInsert({
			data: {
				foo: 1,
			},
			options: {
				retries: 3,
			},
		}) as {
			data: DatabaseEntity;
			options: BaseQueryOptions | undefined;
		};

		expect(result).toHaveProperty("data");
		expect(result).toHaveProperty("options");
		expect(result.data).toStrictEqual({
			// eslint-disable-next-line @typescript-eslint/naming-convention
			ID: result.data.ID,
			// eslint-disable-next-line @typescript-eslint/naming-convention
			FOO: 1,
		});
		expect(result.options).toStrictEqual({
			retries: 3,
		});
		expect(typeof result.data.ID === "string").toBeTruthy();
		expect(validate(result.data.ID)).toBeTruthy();
	});
});
