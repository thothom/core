import { validate } from "uuid";
import { Column } from "../../../lib/decorators/column";
import { Entity } from "../../../lib/decorators/entity/entity";
import { PrimaryGeneratedColumn } from "../../../lib/decorators/primary-generated-column";
import { TestConnection } from "../../constants/test-connection";
import { TestRepository } from "../../constants/test-repository";

describe("Repository > Methods > beforeUpdate", () => {
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
				id,
			},
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
					id,
				},
				{
					foo: 2,
				},
			],
			data: {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				ID: result.data?.ID,
				// eslint-disable-next-line @typescript-eslint/naming-convention
				FOO: 1,
			},
			options: undefined,
		});
		expect(typeof result.data?.ID === "string").toBeTruthy();
		expect(validate(result.data?.ID)).toBeTruthy();
	});
});
