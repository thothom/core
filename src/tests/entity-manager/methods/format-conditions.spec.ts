/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */

import { Like } from "../../../lib/repository/operators/find/like";
import { In } from "../../../lib/repository/operators/find/in";
import { Column } from "../../../lib/decorators/columns/column";
import { Entity } from "../../../lib/decorators/entities/entity";
import { PrimaryColumn } from "../../../lib/decorators/columns/primary-column";
import { TestConnection } from "../../constants/test-connection";
import { MoreThan } from "../../../lib/repository/operators/find/more-than";
import { Exist } from "../../../lib/repository/operators/find/exist";
import { SubEntity } from "../../../lib/decorators/entities/sub-entity";

const createConnection = async (entities: Array<any>) => {
	const connection = new TestConnection({
		entities,
		prefix: {
			column: {
				add: "test_",
			},
		},
		suffix: {
			entity: {
				remove: "Entity",
			},
		},
	});
	await connection.load();

	return connection;
};

describe("EntityManager > formatConditions", () => {
	describe("Simple entity", () => {
		let connection: TestConnection;

		@Entity()
		class TestEntity {
			@PrimaryColumn()
			public id: string;

			@Column()
			public test?: string;
		}

		beforeAll(async () => {
			connection = await createConnection([TestEntity]);
		});

		it("should convert partial conditions correctly", () => {
			const result = connection.entityManager.formatConditions({
				entity: TestEntity,
				conditions: {
					id: "Test",
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
			});
		});

		it("should convert partial conditions correctly (with find operator)", () => {
			const result = connection.entityManager.formatConditions({
				entity: TestEntity,
				conditions: {
					id: Like("Test"),
				},
			});

			expect(result).toStrictEqual({
				test_id: Like("Test"),
			});
		});

		it("should convert array of partial conditions correctly", () => {
			const result = connection.entityManager.formatConditions({
				entity: TestEntity,
				conditions: [
					{
						id: "Test",
					},
				],
			});

			expect(result).toStrictEqual([
				{
					test_id: "Test",
				},
			]);
		});

		it("should convert array of partial conditions correctly (with find operators)", () => {
			const result = connection.entityManager.formatConditions({
				entity: TestEntity,
				conditions: [
					{
						id: Like("Test"),
					},
				],
			});

			expect(result).toStrictEqual([
				{
					test_id: Like("Test"),
				},
			]);
		});

		it("should convert complete conditions correctly", () => {
			const result = connection.entityManager.formatConditions({
				entity: TestEntity,
				conditions: {
					id: "Test",
					test: "SuperTest",
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
				test_test: "SuperTest",
			});
		});

		it("should filter null values", () => {
			const result = connection.entityManager.formatConditions({
				entity: TestEntity,
				conditions: {
					id: "Test",
					test: null,
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
			});
		});

		it("should filter undefined values", () => {
			const result = connection.entityManager.formatConditions({
				entity: TestEntity,
				conditions: {
					id: "Test",
					test: undefined,
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
			});
		});

		it("should return an empty object if no conditions is passed", () => {
			const result = connection.entityManager.formatConditions({
				entity: TestEntity,
				conditions: undefined as any,
			});

			expect(result).toStrictEqual({});
		});
	});

	describe("Simple entity with custom column names", () => {
		it("should not format name if it is passed on primary-column param", async () => {
			@Entity()
			class TestEntity {
				@PrimaryColumn("CUSTOM_FIELD_NAME")
				public id: string;

				@Column()
				public test: string;
			}

			const connection = await createConnection([TestEntity]);

			const result = connection.entityManager.formatConditions({
				entity: TestEntity,
				conditions: {
					id: "Test",
					test: "foo",
				},
			});

			expect(result).toStrictEqual({
				CUSTOM_FIELD_NAME: "Test",
				test_test: "foo",
			});
		});

		it("should not format name if it is passed on primary-column param (with find operators)", async () => {
			@Entity()
			class TestEntity {
				@PrimaryColumn("CUSTOM_FIELD_NAME")
				public id: string;

				@Column()
				public test: string;
			}

			const connection = await createConnection([TestEntity]);

			const result = connection.entityManager.formatConditions({
				entity: TestEntity,
				conditions: {
					id: Like("Test"),
					test: "foo",
				},
			});

			expect(result).toStrictEqual({
				CUSTOM_FIELD_NAME: Like("Test"),
				test_test: "foo",
			});
		});

		it("should not format name if it is passed on primary-column options", async () => {
			@Entity()
			class TestEntity {
				@PrimaryColumn({
					name: "CUSTOM_FIELD_NAME",
				})
				public id: string;

				@Column()
				public test: string;
			}

			const connection = await createConnection([TestEntity]);

			const result = connection.entityManager.formatConditions({
				entity: TestEntity,
				conditions: {
					id: "Test",
					test: "foo",
				},
			});

			expect(result).toStrictEqual({
				CUSTOM_FIELD_NAME: "Test",
				test_test: "foo",
			});
		});

		it("should not format name if it is passed on primary-column options (with find operators)", async () => {
			@Entity()
			class TestEntity {
				@PrimaryColumn({
					name: "CUSTOM_FIELD_NAME",
				})
				public id: string;

				@Column()
				public test: string;
			}

			const connection = await createConnection([TestEntity]);

			const result = connection.entityManager.formatConditions({
				entity: TestEntity,
				conditions: {
					id: Like("Test"),
					test: "foo",
				},
			});

			expect(result).toStrictEqual({
				CUSTOM_FIELD_NAME: Like("Test"),
				test_test: "foo",
			});
		});

		it("should not format the name if it is passed on column options", async () => {
			@Entity()
			class TestEntity {
				@PrimaryColumn()
				public id: string;

				@Column({
					name: "CUSTOM_FIELD_NAME",
				})
				public test: string;
			}

			const connection = await createConnection([TestEntity]);

			const result = connection.entityManager.formatConditions({
				entity: TestEntity,
				conditions: {
					id: "Test",
					test: "foo",
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
				CUSTOM_FIELD_NAME: "foo",
			});
		});

		it("should not format the name if it is passed on column options (with find operators)", async () => {
			@Entity()
			class TestEntity {
				@PrimaryColumn()
				public id: string;

				@Column({
					name: "CUSTOM_FIELD_NAME",
				})
				public test: string;
			}

			const connection = await createConnection([TestEntity]);

			const result = connection.entityManager.formatConditions({
				entity: TestEntity,
				conditions: {
					id: "Test",
					test: Like("foo"),
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
				CUSTOM_FIELD_NAME: Like("foo"),
			});
		});
	});

	describe("Entity with array", () => {
		let connection: TestConnection;

		@Entity()
		class TestEntity {
			@PrimaryColumn()
			public id: string;

			@Column(String)
			public test?: Array<string>;
		}

		beforeAll(async () => {
			connection = await createConnection([TestEntity]);
		});

		it("should convert complete conditions correctly", () => {
			const result = connection.entityManager.formatConditions({
				entity: TestEntity,
				conditions: {
					id: "Test",
					test: ["SuperTest"],
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
				test_test: ["SuperTest"],
			});
		});

		it("should convert complete conditions correctly (with find operators)", () => {
			const result = connection.entityManager.formatConditions({
				entity: TestEntity,
				conditions: {
					id: "Test",
					test: In(["SuperTest"]),
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
				test_test: In(["SuperTest"]),
			});
		});

		it("should convert complete conditions correctly (array with find operators)", () => {
			const result = connection.entityManager.formatConditions({
				entity: TestEntity,
				conditions: {
					id: "Test",
					test: [Like("SuperTest")],
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
				test_test: [Like("SuperTest")],
			});
		});
	});

	describe("Entity with subEntity", () => {
		let connection: TestConnection;

		@SubEntity()
		class SubTestEntity {
			@Column()
			public field?: string;

			@Column()
			public anotherField: number;
		}

		@Entity()
		class TestEntity {
			@PrimaryColumn()
			public id: string;

			@Column()
			public subEntity: SubTestEntity;
		}

		beforeAll(async () => {
			connection = await createConnection([TestEntity]);
		});

		it("should convert partial conditions of sub-entity correctly", () => {
			const result = connection.entityManager.formatConditions({
				entity: TestEntity,
				conditions: {
					id: "Test",
					subEntity: {
						anotherField: 1,
					},
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
				test_subEntity: {
					anotherField: 1,
				},
			});
		});

		it("should convert partial conditions of sub-entity correctly (with find operators)", () => {
			const result = connection.entityManager.formatConditions({
				entity: TestEntity,
				conditions: {
					id: "Test",
					subEntity: {
						anotherField: MoreThan(1),
					},
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
				test_subEntity: {
					anotherField: MoreThan(1),
				},
			});
		});

		it("should convert complete conditions correctly", () => {
			const result = connection.entityManager.formatConditions({
				entity: TestEntity,
				conditions: {
					id: "Test",
					subEntity: {
						field: "foo",
						anotherField: 1,
					},
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
				test_subEntity: {
					field: "foo",
					anotherField: 1,
				},
			});
		});

		it("should accept find operator as sub-entity", () => {
			const result = connection.entityManager.formatConditions({
				entity: TestEntity,
				conditions: {
					id: "Test",
					subEntity: Exist(),
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
				test_subEntity: Exist(),
			});
		});

		it("should filter null values", () => {
			const result = connection.entityManager.formatConditions({
				entity: TestEntity,
				conditions: {
					id: "Test",
					subEntity: null,
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
			});
		});

		it("should filter undefined values", () => {
			const result = connection.entityManager.formatConditions({
				entity: TestEntity,
				conditions: {
					id: "Test",
					subEntity: undefined,
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
			});
		});
	});

	describe("Entity with array of sub-entities", () => {
		let connection: TestConnection;

		@SubEntity()
		class SubTestEntity {
			@Column()
			public field?: string;

			@Column()
			public anotherField: number;
		}

		@Entity()
		class TestEntity {
			@PrimaryColumn()
			public id: string;

			@Column(SubTestEntity)
			public subEntities: Array<SubTestEntity>;
		}

		beforeAll(async () => {
			connection = await createConnection([TestEntity]);
		});

		it("should convert partial conditions of sub-entity correctly", () => {
			const result = connection.entityManager.formatConditions({
				entity: TestEntity,
				conditions: {
					id: "Test",
					subEntities: [
						{
							anotherField: 1,
						},
					],
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
				test_subEntities: [
					{
						anotherField: 1,
					},
				],
			});
		});

		it("should convert partial conditions of sub-entity correctly (with find operators)", () => {
			const result = connection.entityManager.formatConditions({
				entity: TestEntity,
				conditions: {
					id: "Test",
					subEntities: [
						{
							anotherField: MoreThan(1),
						},
					],
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
				test_subEntities: [
					{
						anotherField: MoreThan(1),
					},
				],
			});
		});

		it("should convert complete conditions correctly", () => {
			const result = connection.entityManager.formatConditions({
				entity: TestEntity,
				conditions: {
					id: "Test",
					subEntities: [
						{
							field: "foo",
							anotherField: 1,
						},
						{
							field: "bar",
							anotherField: 2,
						},
					],
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
				test_subEntities: [
					{
						field: "foo",
						anotherField: 1,
					},
					{
						field: "bar",
						anotherField: 2,
					},
				],
			});
		});
	});

	describe("Entity With SubEntity + SubSubEntity", () => {
		let connection: TestConnection;

		@SubEntity()
		class SubSubTestEntity {
			@Column()
			public subField: string;

			@Column()
			public subFieldTwo: number;
		}

		@SubEntity()
		class SubTestEntity {
			@Column()
			public field?: string;

			@Column()
			public subSubEntity: SubSubTestEntity;
		}

		@Entity()
		class TestEntity {
			@PrimaryColumn()
			public id: string;

			@Column()
			public subEntity: SubTestEntity;
		}

		beforeAll(async () => {
			connection = await createConnection([TestEntity]);
		});

		it("should convert partial conditions of sub-sub-entity correctly", () => {
			const result = connection.entityManager.formatConditions({
				entity: TestEntity,
				conditions: {
					id: "Test",
					subEntity: {
						field: "1",
						subSubEntity: {
							subField: "foo",
						},
					},
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
				test_subEntity: {
					field: "1",
					subSubEntity: {
						subField: "foo",
					},
				},
			});
		});

		it("should convert partial conditions of sub-sub-entity correctly (with find operators)", () => {
			const result = connection.entityManager.formatConditions({
				entity: TestEntity,
				conditions: {
					id: "Test",
					subEntity: {
						field: "1",
						subSubEntity: {
							subField: Like("foo"),
						},
					},
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
				test_subEntity: {
					field: "1",
					subSubEntity: {
						subField: Like("foo"),
					},
				},
			});
		});

		it("should convert complete conditions correctly", () => {
			const result = connection.entityManager.formatConditions({
				entity: TestEntity,
				conditions: {
					id: "Test",
					subEntity: {
						field: "1",
						subSubEntity: {
							subField: "foo",
							subFieldTwo: 1,
						},
					},
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
				test_subEntity: {
					field: "1",
					subSubEntity: {
						subField: "foo",
						subFieldTwo: 1,
					},
				},
			});
		});
	});

	describe("Entity With SubEntity + Array of SubSubEntities", () => {
		let connection: TestConnection;

		@SubEntity()
		class SubSubTestEntity {
			@Column()
			public subField: string;

			@Column()
			public subFieldTwo: number;
		}

		@SubEntity()
		class SubTestEntity {
			@Column()
			public field?: string;

			@Column(SubSubTestEntity)
			public subSubEntity: Array<SubSubTestEntity>;
		}

		@Entity()
		class TestEntity {
			@PrimaryColumn()
			public id: string;

			@Column()
			public subEntity: SubTestEntity;
		}

		beforeAll(async () => {
			connection = await createConnection([TestEntity]);
		});

		it("should convert partial conditions of sub-sub-entity correctly", () => {
			const result = connection.entityManager.formatConditions({
				entity: TestEntity,
				conditions: {
					id: "Test",
					subEntity: {
						field: "1",
						subSubEntity: [
							{
								subField: "foo",
							},
						],
					},
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
				test_subEntity: {
					field: "1",
					subSubEntity: [
						{
							subField: "foo",
						},
					],
				},
			});
		});

		it("should convert partial conditions of sub-sub-entity correctly (with find operators)", () => {
			const result = connection.entityManager.formatConditions({
				entity: TestEntity,
				conditions: {
					id: "Test",
					subEntity: {
						field: "1",
						subSubEntity: [
							{
								subField: Like("foo"),
							},
						],
					},
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
				test_subEntity: {
					field: "1",
					subSubEntity: [
						{
							subField: Like("foo"),
						},
					],
				},
			});
		});

		it("should convert complete conditions correctly", () => {
			const result = connection.entityManager.formatConditions({
				entity: TestEntity,
				conditions: {
					id: "Test",
					subEntity: {
						field: "1",
						subSubEntity: [
							{
								subField: "foo",
								subFieldTwo: 1,
							},
							{
								subField: "bar",
								subFieldTwo: 2,
							},
						],
					},
				},
			});

			expect(result).toStrictEqual({
				test_id: "Test",
				test_subEntity: {
					field: "1",
					subSubEntity: [
						{
							subField: "foo",
							subFieldTwo: 1,
						},
						{
							subField: "bar",
							subFieldTwo: 2,
						},
					],
				},
			});
		});
	});
});
