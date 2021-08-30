import { validate } from "uuid";
import { Column } from "../../../lib/decorators/column";
import { Entity } from "../../../lib/decorators/entity/entity";
import { PrimaryGeneratedColumn } from "../../../lib/decorators/primary-generated-column";
import { BaseQueryOptions } from "../../../lib/repository/queries/types/query-options";
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

	let repository: TestRepository<any>;

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
		const result = repository.beforeInsert({
			data: {
				foo: 1,
			},
		}) as {
			data: Record<string, any>;
			options: BaseQueryOptions | undefined;
		};

		expect(result).toStrictEqual({
			data: {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				ID: result.data.ID,
				// eslint-disable-next-line @typescript-eslint/naming-convention
				FOO: 1,
			},
			options: undefined,
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
			data: Array<Record<string, any>>;
			options: BaseQueryOptions | undefined;
		};

		expect(result).toStrictEqual({
			data: [
				{
					// eslint-disable-next-line @typescript-eslint/naming-convention
					ID: result.data[0].ID,
					// eslint-disable-next-line @typescript-eslint/naming-convention
					FOO: 1,
				},
			],
			options: undefined,
		});
		expect(typeof result.data[0].ID === "string").toBeTruthy();
		expect(validate(result.data[0].ID)).toBeTruthy();
	});
});
