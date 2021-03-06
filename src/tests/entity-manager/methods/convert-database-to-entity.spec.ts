/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */

import { Column } from "../../../lib/decorators/columns/column";
import { Entity } from "../../../lib/decorators/entities/entity";
import { PrimaryColumn } from "../../../lib/decorators/columns/primary-column";
import { TestConnection } from "../../constants/test-connection";
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

describe("EntityManager > convertDatabaseToEntity", () => {
	describe("Simple Entity", () => {
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

		it("should convert partial data correctly", () => {
			const result =
				connection.entityManager.convertDatabaseToEntity<TestEntity>({
					entity: TestEntity,
					data: {
						test_id: "Test",
					},
				});

			expect(result).toStrictEqual({
				id: "Test",
			});
		});

		it("should convert complete data correctly", () => {
			const result =
				connection.entityManager.convertDatabaseToEntity<TestEntity>({
					entity: TestEntity,
					data: {
						test_id: "Test",
						test_test: "SuperTest",
					},
				});

			expect(result).toStrictEqual({
				id: "Test",
				test: "SuperTest",
			});
		});

		it("should filter null values", () => {
			const result =
				connection.entityManager.convertDatabaseToEntity<TestEntity>({
					entity: TestEntity,
					data: {
						test_id: "Test",
						test_test: null,
					},
				});

			expect(result).toStrictEqual({
				id: "Test",
			});
		});

		it("should filter undefined values", () => {
			const result =
				connection.entityManager.convertDatabaseToEntity<TestEntity>({
					entity: TestEntity,
					data: {
						test_id: "Test",
						test_test: undefined,
					},
				});

			expect(result).toStrictEqual({
				id: "Test",
			});
		});

		it("should return undefined if no data is passed", () => {
			const result =
				connection.entityManager.convertDatabaseToEntity<TestEntity>({
					entity: TestEntity,
					data: undefined as any,
				});

			expect(result).toBeUndefined();
		});
	});

	describe("Simple Entity With Custom Column Names", () => {
		it("should not format name if it is passed on primary-column param", async () => {
			@Entity()
			class TestEntity {
				@PrimaryColumn("CUSTOM_FIELD_NAME")
				public id: string;

				@Column()
				public test: string;
			}

			const connection = await createConnection([TestEntity]);

			const result =
				connection.entityManager.convertDatabaseToEntity<TestEntity>({
					entity: TestEntity,
					data: {
						CUSTOM_FIELD_NAME: "Test",
						test_test: "foo",
					},
				});

			expect(result).toStrictEqual({
				id: "Test",
				test: "foo",
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

			const result =
				connection.entityManager.convertDatabaseToEntity<TestEntity>({
					entity: TestEntity,
					data: {
						CUSTOM_FIELD_NAME: "Test",
						test_test: "foo",
					},
				});

			expect(result).toStrictEqual({
				id: "Test",
				test: "foo",
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

			const result =
				connection.entityManager.convertDatabaseToEntity<TestEntity>({
					entity: TestEntity,
					data: {
						test_id: "Test",
						CUSTOM_FIELD_NAME: "foo",
					},
				});

			expect(result).toStrictEqual({
				id: "Test",
				test: "foo",
			});
		});
	});

	describe("Entity With Array", () => {
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

		it("should convert complete data correctly", () => {
			const result =
				connection.entityManager.convertDatabaseToEntity<TestEntity>({
					entity: TestEntity,
					data: {
						test_id: "Test",
						test_test: ["SuperTest"],
					},
				});

			expect(result).toStrictEqual({
				id: "Test",
				test: ["SuperTest"],
			});
		});
	});

	describe("Entity With SubEntity", () => {
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

		it("should convert partial data of sub-entity correctly", () => {
			const result =
				connection.entityManager.convertDatabaseToEntity<TestEntity>({
					entity: TestEntity,
					data: {
						test_id: "Test",
						test_subEntity: {
							anotherField: 1,
						},
					},
				});

			expect(result).toStrictEqual({
				id: "Test",
				subEntity: {
					anotherField: 1,
				},
			});
		});

		it("should convert complete data correctly", () => {
			const result =
				connection.entityManager.convertDatabaseToEntity<TestEntity>({
					entity: TestEntity,
					data: {
						test_id: "Test",
						test_subEntity: {
							field: "foo",
							anotherField: 1,
						},
					},
				});

			expect(result).toStrictEqual({
				id: "Test",
				subEntity: {
					field: "foo",
					anotherField: 1,
				},
			});
		});
	});

	describe("Entity With Array of SubEntities", () => {
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

		it("should convert partial data of sub-entity correctly", () => {
			const result =
				connection.entityManager.convertDatabaseToEntity<TestEntity>({
					entity: TestEntity,
					data: {
						test_id: "Test",
						test_subEntities: [
							{
								anotherField: 1,
							},
						],
					},
				});

			expect(result).toStrictEqual({
				id: "Test",
				subEntities: [
					{
						anotherField: 1,
					},
				],
			});
		});

		it("should convert complete data correctly", () => {
			const result =
				connection.entityManager.convertDatabaseToEntity<TestEntity>({
					entity: TestEntity,
					data: {
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
					},
				});

			expect(result).toStrictEqual({
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

		it("should convert partial data of sub-sub-entity correctly", () => {
			const result =
				connection.entityManager.convertDatabaseToEntity<TestEntity>({
					entity: TestEntity,
					data: {
						test_id: "Test",
						test_subEntity: {
							field: "1",
							subSubEntity: {
								subField: "foo",
							},
						},
					},
				});

			expect(result).toStrictEqual({
				id: "Test",
				subEntity: {
					field: "1",
					subSubEntity: {
						subField: "foo",
					},
				},
			});
		});

		it("should convert complete data correctly", () => {
			const result =
				connection.entityManager.convertDatabaseToEntity<TestEntity>({
					entity: TestEntity,
					data: {
						test_id: "Test",
						test_subEntity: {
							field: "1",
							subSubEntity: {
								subField: "foo",
								subFieldTwo: 1,
							},
						},
					},
				});

			expect(result).toStrictEqual({
				id: "Test",
				subEntity: {
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

		it("should convert partial data of sub-sub-entity correctly", () => {
			const result =
				connection.entityManager.convertDatabaseToEntity<TestEntity>({
					entity: TestEntity,
					data: {
						test_id: "Test",
						test_subEntity: {
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
				id: "Test",
				subEntity: {
					field: "1",
					subSubEntity: [
						{
							subField: "foo",
						},
					],
				},
			});
		});

		it("should convert complete data correctly", () => {
			const result =
				connection.entityManager.convertDatabaseToEntity<TestEntity>({
					entity: TestEntity,
					data: {
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
					},
				});

			expect(result).toStrictEqual({
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
			});
		});
	});
});
