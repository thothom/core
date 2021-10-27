import { Column } from "../../../lib/decorators/columns/column";
import { Entity } from "../../../lib/decorators/entity";
import { PrimaryGeneratedColumn } from "../../../lib/decorators/columns/primary-generated-column";
import { MoreThan } from "../../../lib/repository/operators/find/more-than";
import { TestConnection } from "../../constants/test-connection";
import { TestRepository } from "../../constants/test-repository";

describe("Repository > Methods > beforeFind", () => {
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

	it("should do nothing if no options are specified", () => {
		const result = repository.beforeFind({
			conditions: {},
		});

		expect(result).toStrictEqual({
			conditions: {},
		});
	});

	it("should convert 'where' option to the database format", () => {
		const result = repository.beforeFind({
			conditions: {
				where: {
					foo: 1,
				},
			},
		});

		expect(result).toStrictEqual({
			conditions: {
				where: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					FOO: 1,
				},
			},
		});
	});

	it("should convert 'select' option to the database format", () => {
		const result = repository.beforeFind({
			conditions: {
				select: ["id", "foo"],
			},
		});

		expect(result).toStrictEqual({
			conditions: {
				select: ["ID", "FOO"],
			},
		});
	});

	it("should convert 'order' option to the database format", () => {
		const result = repository.beforeFind({
			conditions: {
				order: {
					id: "ASC",
				},
			},
		});

		expect(result).toStrictEqual({
			conditions: {
				order: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					ID: "ASC",
				},
			},
		});
	});

	it("should convert 'startFrom' option to the database format", () => {
		const result = repository.beforeFind({
			conditions: {
				startFrom: {
					foo: 1,
				},
			},
		});

		expect(result).toStrictEqual({
			conditions: {
				startFrom: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					FOO: 1,
				},
			},
		});
	});

	it("should convert to the database format (with find operators)", () => {
		const result = repository.beforeFind({
			conditions: {
				where: {
					foo: MoreThan(1),
				},
			},
		});

		expect(result).toStrictEqual({
			conditions: {
				where: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					FOO: MoreThan(1),
				},
			},
		});
	});

	it("should auto-generate fields and convert to the database format (array)", () => {
		const result = repository.beforeFind({
			conditions: {
				where: [
					{
						foo: 1,
					},
				],
			},
		});

		expect(result).toStrictEqual({
			conditions: {
				where: [
					{
						// eslint-disable-next-line @typescript-eslint/naming-convention
						FOO: 1,
					},
				],
			},
		});
	});

	it("should auto-generate fields and convert to the database format (array with find operators)", () => {
		const result = repository.beforeFind({
			conditions: {
				where: [
					{
						foo: MoreThan(1),
					},
				],
			},
		});

		expect(result).toStrictEqual({
			conditions: {
				where: [
					{
						// eslint-disable-next-line @typescript-eslint/naming-convention
						FOO: MoreThan(1),
					},
				],
			},
		});
	});

	it("should do nothing with the options", () => {
		const result = repository.beforeFind({
			conditions: {
				where: {
					foo: 1,
				},
			},
			options: {
				retries: 3,
			},
		});

		expect(result).toStrictEqual({
			conditions: {
				where: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					FOO: 1,
				},
			},
			options: {
				retries: 3,
			},
		});
	});
});
