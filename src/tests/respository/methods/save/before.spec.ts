/* eslint-disable @typescript-eslint/naming-convention */
import { validate } from "uuid";
import { Column } from "../../../../lib/decorators/columns/column";
import { Entity } from "../../../../lib/decorators/entities/entity";
import { PrimaryGeneratedColumn } from "../../../../lib/decorators/columns/primary-generated-column";
import { BaseQueryOptions } from "../../../../lib/repository/types/query-options";
import { DatabaseEntity } from "../../../../lib/types/database-entity";
import { TestConnection } from "../../../constants/test-connection";
import { TestRepository } from "../../../constants/test-repository";

describe("Repository > Methods > beforeSave", () => {
	describe("Simple entity", () => {
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

		it("should auto-generate fields and convert to the database format", () => {
			const result = repository.beforeSave({
				data: {
					foo: 1,
				},
			}) as {
				data: DatabaseEntity;
				options: BaseQueryOptions | undefined;
			};

			expect(result).toHaveProperty("data");
			expect(result.data).toStrictEqual([
				{
					ID: result.data[0].ID,
					FOO: 1,
				},
			]);
			expect(typeof result.data[0].ID === "string").toBeTruthy();
			expect(validate(result.data[0].ID)).toBeTruthy();
		});

		it("should auto-generate fields and convert to the database format (array)", () => {
			const result = repository.beforeSave({
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
					ID: result.data[0].ID,
					FOO: 1,
				},
			]);
			expect(typeof result.data[0].ID === "string").toBeTruthy();
			expect(validate(result.data[0].ID)).toBeTruthy();
		});

		it("should do nothing with options", () => {
			const result = repository.beforeSave({
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
			expect(result.data).toStrictEqual([
				{
					ID: result.data[0].ID,
					FOO: 1,
				},
			]);
			expect(result.options).toStrictEqual({
				retries: 3,
			});
			expect(typeof result.data[0].ID === "string").toBeTruthy();
			expect(validate(result.data[0].ID)).toBeTruthy();
		});
	});
});
