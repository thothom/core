/* eslint-disable @typescript-eslint/naming-convention */
import { validate } from "uuid";
import { Column } from "../../../../lib/decorators/columns/column";
import { Entity } from "../../../../lib/decorators/entities/entity";
import { PrimaryGeneratedColumn } from "../../../../lib/decorators/columns/primary-generated-column";
import { BaseQueryOptions } from "../../../../lib/repository/types/query-options";
import { DatabaseEntity } from "../../../../lib/types/database-entity";
import { TestConnection } from "../../../constants/test-connection";
import { TestRepository } from "../../../constants/test-repository";
import { PrimaryColumn } from "../../../../lib/decorators/columns/primary-column";
import { OneToMany } from "../../../../lib/decorators/relations/one-to-many";

describe("Repository > Methods > beforeInsert", () => {
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
			const result = repository.beforeInsert({
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
					ID: result.data[0].ID,
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

	describe("Entity with relations", () => {
		@Entity()
		class AnotherSubTestEntity {
			@PrimaryColumn()
			public id: string;

			@Column()
			public testId: string;
		}

		@Entity()
		class SubTestEntity {
			@PrimaryColumn()
			public id: string;

			@Column()
			public testId: string;
		}

		@Entity()
		class TestEntity {
			@PrimaryColumn()
			public id: string;

			@OneToMany({
				targetEntity: SubTestEntity,
				relationMap: {
					columnName: "id",
					targetColumnName: "testId",
				},
			})
			public subTest: Array<SubTestEntity>;

			@OneToMany({
				targetEntity: AnotherSubTestEntity,
				relationMap: {
					columnName: "id",
					targetColumnName: "testId",
				},
			})
			public anotherSubTest: Array<AnotherSubTestEntity>;
		}

		let repository: TestRepository<TestEntity>;

		beforeAll(async () => {
			const connection = new TestConnection({
				entities: [TestEntity, SubTestEntity, AnotherSubTestEntity],
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

		it("should auto-generate fields and convert to the database format (one relation)", () => {
			const result = repository.beforeInsert({
				data: {
					id: "foo",
					subTest: [
						{
							id: "bar",
						},
					],
				},
			});

			expect(result).toHaveProperty("data");
			expect(result.data).toStrictEqual([
				{
					ID: "foo",
				},
			]);
			expect(result.relations).toStrictEqual([
				[
					{
						entity: SubTestEntity,
						data: {
							ID: "bar",
							TEST_ID: "foo",
						},
					},
				],
			]);
		});

		it("should auto-generate fields and convert to the database format (multiple relations)", () => {
			const result = repository.beforeInsert({
				data: {
					id: "foo",
					subTest: [
						{
							id: "bar",
						},
					],
					anotherSubTest: [
						{
							id: "xyz",
						},
					],
				},
			});

			expect(result).toHaveProperty("data");
			expect(result.data).toStrictEqual([
				{
					ID: "foo",
				},
			]);
			expect(result.relations).toStrictEqual([
				[
					{
						entity: SubTestEntity,
						data: {
							ID: "bar",
							TEST_ID: "foo",
						},
					},
					{
						entity: AnotherSubTestEntity,
						data: {
							ID: "xyz",
							TEST_ID: "foo",
						},
					},
				],
			]);
		});
	});
});
