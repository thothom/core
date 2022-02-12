/* eslint-disable @typescript-eslint/naming-convention */
import { validate } from "uuid";

import { Column } from "../../../../lib/decorators/columns/column";
import { PrimaryColumn } from "../../../../lib/decorators/columns/primary-column";
import { PrimaryGeneratedColumn } from "../../../../lib/decorators/columns/primary-generated-column";
import { Entity } from "../../../../lib/decorators/entities/entity";
import { SubEntity } from "../../../../lib/decorators/entities/sub-entity";
import { TestConnection } from "../../../constants/test-connection";
import { TestRepository } from "../../../constants/test-repository";

import type { BaseQueryOptions } from "../../../../lib/repository/types/query-options";
import type { DatabaseEntity } from "../../../../lib/types/database-entity";

describe("Repository > Methods > beforeInsert", () => {
	const getRepository = async <T>(entity: any) => {
		const connection = new TestConnection({
			entities: [entity],
			namingStrategy: {
				column: "UPPER_CASE",
			},
		});
		await connection.load();

		return new TestRepository<T>(
			connection.entityManager,
			connection.logger,
			entity,
		);
	};

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
			repository = await getRepository<TestEntity>(TestEntity);
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

	describe("Simple entity with default value", () => {
		it("should work with `false` default value", async () => {
			@Entity()
			class TestEntity {
				@PrimaryColumn()
				public id: string;

				@Column({
					defaultValue: false,
				})
				public foo: boolean;
			}

			const repository = await getRepository<TestEntity>(TestEntity);

			const result = repository.beforeInsert({
				data: {
					id: "foo",
				},
			}) as {
				data: DatabaseEntity;
				options: BaseQueryOptions | undefined;
			};

			expect(result).toHaveProperty("data");
			expect(result.data).toStrictEqual([
				{
					ID: "foo",
					FOO: false,
				},
			]);
		});

		it("should work with `true` default value", async () => {
			@Entity()
			class TestEntity {
				@PrimaryColumn()
				public id: string;

				@Column({
					defaultValue: true,
				})
				public foo: boolean;
			}

			const repository = await getRepository<TestEntity>(TestEntity);

			const result = repository.beforeInsert({
				data: {
					id: "foo",
				},
			}) as {
				data: DatabaseEntity;
				options: BaseQueryOptions | undefined;
			};

			expect(result).toHaveProperty("data");
			expect(result.data).toStrictEqual([
				{
					ID: "foo",
					FOO: true,
				},
			]);
		});

		it('should work with `""` default value', async () => {
			@Entity()
			class TestEntity {
				@PrimaryColumn()
				public id: string;

				@Column({
					defaultValue: "",
				})
				public foo: string;
			}

			const repository = await getRepository<TestEntity>(TestEntity);

			const result = repository.beforeInsert({
				data: {
					id: "foo",
				},
			}) as {
				data: DatabaseEntity;
				options: BaseQueryOptions | undefined;
			};

			expect(result).toHaveProperty("data");
			expect(result.data).toStrictEqual([
				{
					ID: "foo",
					FOO: "",
				},
			]);
		});

		it('should work with `"foo"` default value', async () => {
			@Entity()
			class TestEntity {
				@PrimaryColumn()
				public id: string;

				@Column({
					defaultValue: "foo",
				})
				public foo: string;
			}

			const repository = await getRepository<TestEntity>(TestEntity);

			const result = repository.beforeInsert({
				data: {
					id: "foo",
				},
			}) as {
				data: DatabaseEntity;
				options: BaseQueryOptions | undefined;
			};

			expect(result).toHaveProperty("data");
			expect(result.data).toStrictEqual([
				{
					ID: "foo",
					FOO: "foo",
				},
			]);
		});

		it("should work with `0` default value", async () => {
			@Entity()
			class TestEntity {
				@PrimaryColumn()
				public id: string;

				@Column({
					defaultValue: 0,
				})
				public foo: number;
			}

			const repository = await getRepository<TestEntity>(TestEntity);

			const result = repository.beforeInsert({
				data: {
					id: "foo",
				},
			}) as {
				data: DatabaseEntity;
				options: BaseQueryOptions | undefined;
			};

			expect(result).toHaveProperty("data");
			expect(result.data).toStrictEqual([
				{
					ID: "foo",
					FOO: 0,
				},
			]);
		});

		it("should work with `1` default value", async () => {
			@Entity()
			class TestEntity {
				@PrimaryColumn()
				public id: string;

				@Column({
					defaultValue: 1,
				})
				public foo: number;
			}

			const repository = await getRepository<TestEntity>(TestEntity);

			const result = repository.beforeInsert({
				data: {
					id: "foo",
				},
			}) as {
				data: DatabaseEntity;
				options: BaseQueryOptions | undefined;
			};

			expect(result).toHaveProperty("data");
			expect(result.data).toStrictEqual([
				{
					ID: "foo",
					FOO: 1,
				},
			]);
		});

		it("should work with `[1]` default value", async () => {
			@Entity()
			class TestEntity {
				@PrimaryColumn()
				public id: string;

				@Column({
					type: Number,
					defaultValue: [1],
				})
				public foo: Array<number>;
			}

			const repository = await getRepository<TestEntity>(TestEntity);

			const result = repository.beforeInsert({
				data: {
					id: "foo",
				},
			}) as {
				data: DatabaseEntity;
				options: BaseQueryOptions | undefined;
			};

			expect(result).toHaveProperty("data");
			expect(result.data).toStrictEqual([
				{
					ID: "foo",
					FOO: [1],
				},
			]);
		});

		it('should work with `["1"]` default value', async () => {
			@Entity()
			class TestEntity {
				@PrimaryColumn()
				public id: string;

				@Column({
					type: Number,
					defaultValue: ["1"],
				})
				public foo: Array<number>;
			}

			const repository = await getRepository<TestEntity>(TestEntity);

			const result = repository.beforeInsert({
				data: {
					id: "foo",
				},
			}) as {
				data: DatabaseEntity;
				options: BaseQueryOptions | undefined;
			};

			expect(result).toHaveProperty("data");
			expect(result.data).toStrictEqual([
				{
					ID: "foo",
					FOO: ["1"],
				},
			]);
		});
	});

	describe("Sub entity with default value", () => {
		it("should work with `false` default value", async () => {
			@SubEntity()
			class TestSubEntity {
				@Column({
					defaultValue: false,
				})
				public foo: boolean;
			}

			@Entity()
			class TestEntity {
				@PrimaryColumn()
				public id: string;

				@Column()
				public foo: TestSubEntity;
			}

			const repository = await getRepository<TestEntity>(TestEntity);

			const result = repository.beforeInsert({
				data: {
					id: "foo",
					foo: {},
				},
			}) as {
				data: DatabaseEntity;
				options: BaseQueryOptions | undefined;
			};

			expect(result).toHaveProperty("data");
			expect(result.data).toStrictEqual([
				{
					ID: "foo",
					FOO: {
						FOO: false,
					},
				},
			]);
		});

		it("should work with `0` default value", async () => {
			@SubEntity()
			class TestSubEntity {
				@Column({
					defaultValue: 0,
				})
				public foo: number;
			}

			@Entity()
			class TestEntity {
				@PrimaryColumn()
				public id: string;

				@Column()
				public foo: TestSubEntity;
			}

			const repository = await getRepository<TestEntity>(TestEntity);

			const result = repository.beforeInsert({
				data: {
					id: "foo",
					foo: {},
				},
			}) as {
				data: DatabaseEntity;
				options: BaseQueryOptions | undefined;
			};

			expect(result).toHaveProperty("data");
			expect(result.data).toStrictEqual([
				{
					ID: "foo",
					FOO: {
						FOO: 0,
					},
				},
			]);
		});

		it('should work with `""` default value', async () => {
			@SubEntity()
			class TestSubEntity {
				@Column({
					defaultValue: "",
				})
				public foo: string;
			}

			@Entity()
			class TestEntity {
				@PrimaryColumn()
				public id: string;

				@Column()
				public foo: TestSubEntity;
			}

			const repository = await getRepository<TestEntity>(TestEntity);

			const result = repository.beforeInsert({
				data: {
					id: "foo",
					foo: {},
				},
			}) as {
				data: DatabaseEntity;
				options: BaseQueryOptions | undefined;
			};

			expect(result).toHaveProperty("data");
			expect(result.data).toStrictEqual([
				{
					ID: "foo",
					FOO: {
						FOO: "",
					},
				},
			]);
		});
	});
});
